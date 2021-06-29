// System
import React from "react";
import { Route } from "react-router-dom";

// Mothership
import AppContext from "./../context/AppContext";

// Util = Create a protected route
const ProtectedRoute = ({ acl, renderNoAuth, ...props }) => {

  // Wire up
  const app = React.useContext(AppContext);

  // State
  const [auth, setAuth] = React.useState(null);

  // Listen for updates to user
  React.useEffect(() => {

    // If there are no acls required
    if (acl.length === 0) { setAuth(true); return; }

    // If the user has no acl
    if (!app.user.acl) { setAuth(false); return; }

    // If we validate
    if (app.util.validateAcl(acl)) { setAuth(true); return; }

    // Fallback
    setAuth(false);

  }, [app.user]);

  // If we haven't set the auth value yet, trigger first re-render
  if (auth === null) { return null; }

  // If we can be here
  if (auth) {

    return <Route {...props} />;

  }

  // Render the no-auth option
  return <Route render={renderNoAuth} />;

};

// Make it
export default ProtectedRoute;