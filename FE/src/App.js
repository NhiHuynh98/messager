import React from "react";

import "../src/App.less";
import "../src/fontawesome";

import routes from "./routers";
import {
  BrowserRouter as Router,
  useRoutes
} from "react-router-dom";

const AppRoutes = () => {
  return useRoutes(routes);
};

const App = () => {
  // return <RouterProvider router={router} />;
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
