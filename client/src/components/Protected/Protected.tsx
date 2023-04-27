// Import Navigate from react-router-dom which is used for navigation
import { Navigate } from "react-router-dom";

interface ProtectedProps {
  // isLoggedIn is a boolean or null representing the user's login status
  isLoggedIn: boolean | null;
  // children are the child components that will be wrapped by the Protected component
  children: React.ReactNode;
}

// Define the Protected component
const Protected: React.FC<ProtectedProps> = ({ isLoggedIn, children }) => {
  // If the user is not logged in
  if (isLoggedIn === false) {
    // Navigate to the home page and replace the current entry in the history stack
    return <Navigate to="/" replace />;
  }
  // If the user is logged in, render the child components
  return <>{children}</>;
};

// Export the Protected component
export default Protected;
