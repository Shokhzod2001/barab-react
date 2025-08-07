import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { App } from "./app/App"
import { store } from "./app/store"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./app/MaterialTheme"
import { BrowserRouter } from "react-router-dom"
import "./css/index.css"
import ContextProvider from "./app/context/ContextProvider"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <ContextProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </ContextProvider>
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error("Root element not found")
}
