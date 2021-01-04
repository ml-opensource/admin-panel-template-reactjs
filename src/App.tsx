import * as React from "react";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import store from "redux/store";
import Routes from "routes/Routes";

const App: React.FC = () => (
  <Provider store={store} key="provider">
    <Router>
      <Routes />
    </Router>
  </Provider>
);

export default App;
