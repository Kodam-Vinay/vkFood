import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import SearchContext from "./utils/SearchContext";

const Explore = lazy(() => import("./pages/Explore"));
const ResturantCardInfo = lazy(() => import("./components/ResturantCardInfo"));

const RenderLayout = () => {
  const [searchInput, setSearchInput] = useState("");
  // const [isSearchClicked, setSearchCliked] = useState(false);
  return (
    <SearchContext.Provider
      value={{
        searchInput: searchInput,
        setSearchInput: setSearchInput,
      }}
    >
      <div className="h-[99vh] flex flex-col overflow-x-hidden font-grotesque">
        <Header />
        <Outlet /> {/* this outlet will replaced by children components  */}
      </div>
    </SearchContext.Provider>
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
              element: (
                <Suspense fallback={<h1>Loading.....</h1>}>
                  <ResturantCardInfo />
                </Suspense>
              ),
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
