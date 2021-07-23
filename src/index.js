import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  transitions,
  positions,
  Provider as AlertProvider,
} from "../node_modules/react-alert/dist/cjs/react-alert";
import AlertTemplate from "../node_modules/react-alert-template-basic/dist/cjs/react-alert-template-basic";
import App from "./App";

export const types = {
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error'
};

export const transitions1 = {
  FADE: 'fade',
  SCALE: 'scale'
};

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 3000,
  offset: "30px",
  type: types.INFO,
  transition: transitions1.FADE,
  // you can also just use 'scale'
  transition: transitions1.SCALE,
};

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
