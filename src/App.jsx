import React from "react";
import "./App.css";
import {Global, ThemeProvider} from "@emotion/react";
import getStyles from "./styles/global";
import useTheme from "./hooks/index";
import {RouterProvider} from "react-router-dom";
import {router} from "./router";

function App() {
  const {changeTheme, theme} = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Global styles={getStyles(theme)}/>
      <RouterProvider router={router}/>
    </ThemeProvider>
  );
}

export default App;
