import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import ResturantCardInfo from "./pages/ResturantCardInfo";
import CartContext from "./utils/CartContext";

const Explore = lazy(() => import("./pages/Explore"));

const RenderLayout = () => {
  const [ItemsInCart, setItemsInCart] = useState(0);
  const [cartItemsList, setCartItemList] = useState([]);
  const onClickMinus = () => {
    if (ItemsInCart > 0) {
      setItemsInCart((prev) => prev - 1);
    }
  };
  const onClickPlus = () => {
    setItemsInCart((prev) => prev + 1);
  };
  console.log(cartItemsList);
  return (
    <CartContext.Provider
      value={{
        ItemsInCart: ItemsInCart,
        onClickMinus: onClickMinus,
        onClickPlus: onClickPlus,
        cartItemsList: cartItemsList,
        setCartItemList: setCartItemList,
      }}
    >
      <div className="h-[99vh] flex flex-col overflow-x-hidden font-grotesque">
        <Header />
        <Outlet /> {/* this outlet will replaced by children components  */}
      </div>
    </CartContext.Provider>
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
          path: "explore-food/",
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
