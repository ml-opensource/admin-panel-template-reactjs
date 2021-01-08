/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "@app/redux/store";

import "@app/features/localization/localization";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";

const render = () => {
  const App = require("./App").default;

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

render();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./App", render);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
