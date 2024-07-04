import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Survey from "./pages/Survey.jsx";
import "./index.css";
import Admin from "./pages/Admin.jsx";
import Finish from "./pages/Finish.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: "survey",
    element: <Survey />,
  },
  {
    path: "admin",
    element: <Admin />,
  },
  {
    path: "test-completed",
    element: <Finish />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
