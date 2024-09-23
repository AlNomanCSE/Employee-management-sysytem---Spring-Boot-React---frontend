import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import EmployeeComponent from "./components/EmployeeComponent.tsx";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "employees",
        element: <App />,
      },
      {
        path: "add-employee", // Route for AddEmployee
        element: <EmployeeComponent />,
      },
      {
        path: "edit-employee/:id",
        element: <EmployeeComponent />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
