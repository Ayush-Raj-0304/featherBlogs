import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayer({ children, authentication = true }) {
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status); // Should be boolean (true/false)
  const navigate = useNavigate();

  useEffect(() => {
    // Check if authStatus has been properly set
    if (typeof authStatus === "boolean") {
      if (authStatus === false && authentication === true) {
        navigate("/login");
      } else if (authStatus === true && authentication === false) {
        navigate("/");
      } else {
        setLoading(false); // Only stop loading when the conditions are met
      }
    } else {
      // Keep loading until authStatus is known
      setLoading(true);
    }
  }, [authStatus, navigate, authentication]);

  // Still loading if we haven't confirmed authentication status
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render children after loading completes
  return <>{children}</>;
}

export default AuthLayer;
