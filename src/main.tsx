import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import EmployeeComponent from "./components/EmployeeComponent.tsx";
import DisplayDepartmentComponemt from "./components/DisplayDepartmentComponemt.tsx";
import AddDepartment from "./components/DepartmentComponent.tsx";

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
      {
        path: "departments",
        element: <DisplayDepartmentComponemt/>,
      }
      , {
        path: "add-department",
        element: <AddDepartment/>
      }, {
        path: "add-department/:id",
        element: <AddDepartment/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
