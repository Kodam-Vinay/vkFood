import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import Error from "../../pages/Error";
import { Suspense, lazy } from "react";
import { BallTriangle } from "react-loader-spinner";
import Contact from "../../pages/Contact";
import ResturantCardInfo from "../../pages/ResturantCardInfo";
import Cart from "../../pages/Cart";
import PaymentRoute from "../PaymentRoute";
import Payment from "../../pages/Payment";
import AddressPage from "../../pages/AddressPage";
import UpiPage from "../../pages/UpiPage";
import CardPage from "../../pages/CardPage";
import CodPage from "../../pages/CodPage";
import LoginRoute from "../LoginRoute";
import Login from "../../pages/Login";

const Explore = lazy(() => import("../../pages/Explore"));
const OrderSuccessfulPage = lazy(() =>
  import("../../pages/OrderSuccessfulPage")
);
const Home = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return import("../../pages/Home");
});

const index = ({ RenderLayout }) => {
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
                  <Suspense
                    fallback={
                      <div className="h-[80vh] flex flex-col items-center justify-center">
                        <h1 className="text-xl font-bold">
                          Payment Section is Loading....
                        </h1>
                      </div>
                    }
                  >
                    <Payment />
                  </Suspense>
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
  return router;
};

export default index;
