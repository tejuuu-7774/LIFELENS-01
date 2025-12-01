import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../utils/api";

export default function PublicRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    api
      .get("/api/auth/me")
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );

  return authenticated ? <Navigate to="/dashboard" replace /> : children;
}
