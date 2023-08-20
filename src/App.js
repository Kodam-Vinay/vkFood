import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import ResturantCardInfo from "./pages/ResturantCardInfo";
import CartContext from "./context/CartContext";
import useNavigationLink from "./utils/useNavigationLinkSessionStorage";
import NavigationContext from "./context/NavigationContext";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginRoute from "./components/LoginRoute";
import { BallTriangle } from "react-loader-spinner";
import CartLogoWithCount from "./components/CartLogoWithCount";
import AddToCartContext from "./context/AddToCartContext";
import Payment from "./pages/Payment";
import UpiPage from "./pages/UpiPage";
import CardPage from "./pages/CardPage";
import PaymentRoute from "./components/PaymentRoute";
import CodPage from "./pages/CodPage";
import AddressPage from "./pages/AddressPage";
import OrderDetailsContext from "./context/OrderDetailsContext";

const Home = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return import("./pages/Home");
});

const OrderSuccessfulPage = lazy(() => import("./pages/OrderSuccessfulPage"));

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
    id: "contact",
    value: "Contact",
    route: "/contact",
  },
  {
    id: "cart",
    value: <CartLogoWithCount />,
    route: "/cart",
  },
];

const RenderLayout = () => {
  const storedData = JSON.parse(localStorage.getItem("cartList"));
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [paymentMode, setPayMentMode] = useState("");
  const [orderTotalRupees, setOrderTotalRupees] = useState(0);
  const [userAddress, setUserAdress] = useState({});
  const [cardNumber, setCardNumber] = useState("");
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

  function onClickContextMenu(event) {
    event.preventDefault();
    return false;
  }

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

  const onClickAdd = (id, menuDetails) => {
    const result = cartItemsList.find((eachItem) => eachItem.id === id);
    if (result) {
      const newCount = result.ItemsInCart + 1;
      const updatedList = cartItemsList.map((eachItem) => {
        if (eachItem.id === id) {
          return { ...eachItem, ItemsInCart: newCount };
        }
        return eachItem;
      });
      setCartItemList(updatedList);
    } else {
      setCartItemList((prev) => [...prev, { ...menuDetails, ItemsInCart: 1 }]);
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        activeId: activeId,
        setActiveId: setActiveId,
        navigationLinks: navigationLinks,
      }}
    >
      <OrderDetailsContext.Provider
        value={{
          userAddress: userAddress,
          setUserAdress: setUserAdress,
          paymentMode: paymentMode,
          setPayMentMode: setPayMentMode,
          orderTotalRupees: orderTotalRupees,
          setOrderTotalRupees: setOrderTotalRupees,
          setCardNumber: setCardNumber,
          cardNumber: cardNumber,
        }}
      >
        <AddToCartContext.Provider
          value={{
            isAddClicked: isAddClicked,
            setIsAddClicked: setIsAddClicked,
            onClickAdd: onClickAdd,
          }}
        >
          <CartContext.Provider
            value={{
              onClickMinus: onClickMinus,
              onClickPlus: onClickPlus,
              onClickRemove: onClickRemove,
              cartItemsList: cartItemsList,
              setCartItemList: setCartItemList,
            }}
          >
            <div
              className="h-[93vh] sm:h-[99vh] flex flex-col apply-font"
              onContextMenu={onClickContextMenu}
            >
              <Header />
              <Outlet />{" "}
              {/* this outlet will replaced by children components  */}
            </div>
          </CartContext.Provider>
        </AddToCartContext.Provider>
      </OrderDetailsContext.Provider>
    </NavigationContext.Provider>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <RenderLayout />
        </ProtectedRoute>
      ),
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Suspense
                fallback={
                  <div className="h-[80vh] flex flex-col items-center justify-center">
                    <BallTriangle />
                  </div>
                }
              >
                <Home />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "contact",
          element: (
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          ),
        },
        {
          path: "explore-food",
          children: [
            {
              path: "",
              element: (
                <ProtectedRoute>
                  <Suspense fallback={<h1>Loading.....</h1>}>
                    <Explore />
                  </Suspense>
                </ProtectedRoute>
              ),
            },
            {
              path: ":id",
              element: (
                <ProtectedRoute>
                  <ResturantCardInfo />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "payment",
          children: [
            {
              path: "",
              element: (
                <PaymentRoute>
                  <Payment />
                </PaymentRoute>
              ),
            },
            {
              path: "address",
              element: (
                <PaymentRoute>
                  <AddressPage />
                </PaymentRoute>
              ),
            },
            {
              path: "upi",
              element: (
                <PaymentRoute>
                  <UpiPage />
                </PaymentRoute>
              ),
            },
            {
              path: "card",
              element: (
                <PaymentRoute>
                  <CardPage />
                </PaymentRoute>
              ),
            },
            {
              path: "cod",
              element: (
                <PaymentRoute>
                  <CodPage />
                </PaymentRoute>
              ),
            },
            {
              path: "successful",
              element: (
                <ProtectedRoute>
                  <Suspense
                    fallback={
                      <div className="h-[80vh] flex flex-col items-center justify-center">
                        <BallTriangle />
                      </div>
                    }
                  >
                    <OrderSuccessfulPage />
                  </Suspense>
                </ProtectedRoute>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: (
        <LoginRoute>
          <Login />
        </LoginRoute>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
