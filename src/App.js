import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Explore from "./pages/Explore";
import Error from "./pages/Error";

const RenderLayout = () => {
  return (
    <div className="h-[99vh] flex flex-col overflow-x-hidden">
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
          path: "contact",
          element: <Contact />,
        },
        {
          path: "explore-food",
          element: <Explore />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
