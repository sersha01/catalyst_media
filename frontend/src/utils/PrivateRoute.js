import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (user === null) {
    return <Navigate to="/login" />
  } else {
    return children;
  }
}

export function Protect({ children }) {
  const { user } = useContext(AuthContext);
  if (user !== null) {
    return <Navigate to="/" />
  } else {
    return children;
  }
}