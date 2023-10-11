import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import PrivateRoute from "../../routes/PrivateRoute";
import PublicRoute from "../../routes/PublicRoutes";
import { useAuth } from "../../context/AuthContext";

// Defining the main content of teamwork app in a separate component
const AppContent = () => {
  const { userToken } = useAuth(); // Access the userToken from the AuthContext
  // Check if the user is authenticated (token is present)
  const isAuthenticated = !!userToken;
  console.log(isAuthenticated);

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    isAuthenticated ? PrivateRoute() : {},
    ...PublicRoute(),
  ]);

  return (
    <div className="w-100 h-100 site-content">
      {/* Provide the router configuration using RouterProvider */}
      <RouterProvider router={router} />
    </div>
  );
}

export default AppContent;