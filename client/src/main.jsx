import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import AboutUs from "./components/AboutUs";
import Events from "./components/Events";
import BioBlog from "./components/BioBlog";
import GetInvolved from "./components/GetInvolved";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AboutUs />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/bioblog",
        element: <BioBlog />,
      },
      {
        path: "/getinvolved",
        element: <GetInvolved />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);