import { Navigate } from "react-router-dom";

interface ProtectedProps {
  isLoggedIn: boolean | null;
  children: React.ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ isLoggedIn, children }) => {
  if (isLoggedIn === false) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default Protected;