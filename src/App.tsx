import * as React from "react";
import * as ReactDOM from "react-dom";
import { DefaultTheme, ThemeProvider, createGlobalStyle, StyleSheetManager } from "styled-components";

import Index from "./App/index";

const theme: DefaultTheme = {
  borderRadius: "5px",
  colors: {
    background: "#071a52",
    background2: "#086972",
    background3: "#17b978"
  },
  font: {
    color: "#a7ff83",
    size: "50px",
    family: "monospace"
  }
};

const GlobalStyle = createGlobalStyle`
*, *::after, *::before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.font.color};
  font-size: ${props => props.theme.font.size};
  font-family: ${props => props.theme.font.family};
}
`;

const App = () => <ThemeProvider theme={theme}>
  <GlobalStyle />
  <Index />
</ThemeProvider>

ReactDOM.render(<App />, document.body);


// Check compatibility for the browser we're running this in
if ("serviceWorker" in navigator) {
  if (navigator.serviceWorker.controller) {
    console.log("[PWA Builder] active service worker found, no need to register");
  } else {
    // Register the service worker
    navigator.serviceWorker
      .register("pwabuilder-sw.js", {
        scope: "./"
      })
      .then(function (reg) {
        console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
      });
  }
}