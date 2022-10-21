import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Routes";
import "./index.css";
import AppLayout from "./ctx/context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppLayout>
    <App />
  </AppLayout>
);
