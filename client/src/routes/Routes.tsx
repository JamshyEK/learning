import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../components/Layout/MainLayout";

// Lazy-loaded pages
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Test = lazy(() => import("../pages/Test"));

const router = createBrowserRouter([
  // Public routes
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/page-not-found", element: <div>Page not found</div> },

  // User protected routes
  {
    element: <ProtectedRoute allowedRoles={["user", "admin"]} />, // both can access
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/profile", element: <Dashboard /> },
          { path: "/test", element: <Test /> },
        ],
      },
    ],
  },

  // Admin only routes
  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "/admin",
        element: <MainLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "profile", element: <Dashboard /> }, // Notice: no `/`
          { path: "test", element: <Test /> },
        ],
      },
    ],
  },

  // Catch-all
  { path: "*", element: <Navigate to='/page-not-found' replace /> },
]);

export default router;
