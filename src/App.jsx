import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { NotificationContainer } from "react-notifications";
import 'react-notifications/lib/notifications.css';
function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <NotificationContainer />
      <RouterProvider router={router} />
    </I18nextProvider>
  );
}

export default App;
