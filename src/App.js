import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Cart from "./pages/Cart";

const Explore = lazy(() => import("./pages/Explore"));
const ResturantCardInfo = lazy(() => import("./pages/ResturantCardInfo"));

const RenderLayout = () => {
  return (
    <div className="h-[99vh] flex flex-col overflow-x-hidden font-grotesque">
      <Header />
      <Outlet /> {/* this outlet will replaced by children components  */}
    </div>
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
