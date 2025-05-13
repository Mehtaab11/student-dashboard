import { Navigate } from "react-router-dom";
import { auth } from "./configs/firebase";
import {useAuthState} from "react-firebase-hooks/auth";

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
// This component checks if the user is authenticated. If not, it redirects to the login page.