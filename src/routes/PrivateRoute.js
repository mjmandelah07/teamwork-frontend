import { lazy } from "react";
import { Navigate } from "react-router-dom";
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Layout = lazy(() => import("../components/Layout"));

export default function privateRoutes() {
  return {
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  };
}