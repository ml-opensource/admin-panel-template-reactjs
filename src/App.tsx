import React, { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { getPersistor } from "@rematch/persist";
import { PersistGate } from "redux-persist/integration/react";
import Routes from "routes/Routes";
import { store } from "./store/store";

const persistor = getPersistor();

const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
