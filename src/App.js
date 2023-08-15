import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import ResturantCardInfo from "./pages/ResturantCardInfo";
import CartContext from "./context/CartContext";
import useNavigationLink from "./utils/useNavigationLinkSessionStorage";
import NavigationContext from "./context/NavigationContext";

const Explore = lazy(() => import("./pages/Explore"));

const navigationLinks = [
  {
    id: "home",
    value: "Home",
    route: "/",
  },
  {
    id: "explore",
    value: "Explore",
    route: "/explore-food",
  },
  {
    id: "about",
    value: "About",
    route: "/about",
  },
  {
    id: "cart",
    value: "Cart",
    route: "/cart",
  },
];

const RenderLayout = () => {
  const [ItemsInCart, setItemsInCart] = useState(0);
  const storedData = JSON.parse(localStorage.getItem("cartList"));
  const [cartItemsList, setCartItemList] = useState(
    storedData !== null ? storedData : []
  );
  const storedActiveId = JSON.parse(sessionStorage.getItem("activeId"));

  const [activeId, setActiveId] = useState(
    storedActiveId !== null ? storedActiveId : "home"
  );

  useEffect(() => {
    storeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItemsList]);

  const storeData = () => {
    localStorage.setItem("cartList", JSON.stringify(cartItemsList));
  };

  useNavigationLink(activeId);
  const onClickMinus = (id) => {
    const updatedList = cartItemsList.map((eachItem) => {
      if (eachItem.id === id) {
        if (eachItem.ItemsInCart > 1) {
          return { ...eachItem, ItemsInCart: eachItem.ItemsInCart - 1 };
        }
      }
      return eachItem;
    });
    setCartItemList(updatedList);
  };

  const onClickRemove = (id) => {
    const updatedList = cartItemsList.filter((eachItem) => eachItem.id !== id);
    setCartItemList(updatedList);
  };

  const onClickPlus = (id) => {
    const updatedList = cartItemsList.map((eachItem) => {
      if (eachItem.id === id) {
        return { ...eachItem, ItemsInCart: eachItem.ItemsInCart + 1 };
      }
      return eachItem;
    });
    setCartItemList(updatedList);
  };

  return (
    <NavigationContext.Provider
      value={{
        activeId: activeId,
        setActiveId: setActiveId,
        navigationLinks: navigationLinks,
      }}
    >
      <CartContext.Provider
        value={{
          cartItemsList: cartItemsList,
          setCartItemList: setCartItemList,
          ItemsInCart: ItemsInCart,
          setItemsInCart: setItemsInCart,
          onClickMinus: onClickMinus,
          onClickPlus: onClickPlus,
          onClickRemove: onClickRemove,
        }}
      >
        <div className="h-[99vh] flex flex-col overflow-x-hidden font-grotesque">
          <Header />
          <Outlet /> {/* this outlet will replaced by children components  */}
        </div>
      </CartContext.Provider>
    </NavigationContext.Provider>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RenderLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "explore-food",
          children: [
            {
              path: "",
              element: (
                <Suspense fallback={<h1>Loading.....</h1>}>
                  <Explore />
                </Suspense>
              ),
            },
            {
              path: ":id",
              element: <ResturantCardInfo />,
            },
          ],
        },

        {
          path: "cart",
          element: <Cart />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
