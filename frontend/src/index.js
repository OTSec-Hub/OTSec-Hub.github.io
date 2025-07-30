import React from "react";
import ReactDOM from "react-dom/client";
// Styles
import "./custom.scss";
// State
import { Provider } from "react-redux";
import { store } from "./app/store";
// Routing
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './app/AuthContext';
// Config
import { filteredProjects, projectCardImages } from "./config";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <App
          filteredProjects={filteredProjects}
          projectCardImages={projectCardImages}
        />
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);

serviceWorkerRegistration.register();
