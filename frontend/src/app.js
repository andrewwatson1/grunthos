// System
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch } from "react-router-dom";

// Mothership
import { AppProvider } from "./context/AppContext";

// Util
import ProtectedRoute from "./util/ProtectedRoute";

// Views
import Holding from "./views/holding";
import Home from "./views/home";

// Base App
const App = () => {

  // Render
  return (
    <BrowserRouter>
      <AppProvider>
        <Switch>

          { /* Landing */}
          <ProtectedRoute
            //acl={[]}
            acl={["member"]}
            exact
            path="/"
            render={() => <Home />}
            renderNoAuth={() => <Holding />}
          />

        </Switch>
      </AppProvider>
    </BrowserRouter>
  );

};

// Build virtual & real DOM
ReactDOM.render(<App />, document.getElementById("v-42"));
