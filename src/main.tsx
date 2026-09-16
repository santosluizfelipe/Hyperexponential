import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

import { HomePage } from "@/pages/HomePage";
import { GlobalStyles } from "@/GlobalStyles.styles";
import { theme } from "@/theme/theme";
import { store } from "@/store/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <HomePage />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
