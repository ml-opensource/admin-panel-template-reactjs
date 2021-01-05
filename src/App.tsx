import React, { FC } from "react";

import { BrowserRouter as Router } from "react-router-dom";

import Routes from "@app/routes/Routes";

const App: FC = () => {
  // Auth logic
  // Get user logic
  // Localization logic

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
