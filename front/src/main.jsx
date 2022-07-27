import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";
import {lightBlue} from "@mui/material/colors";

const themeOptions = createTheme({
    palette: {
        type: 'light',
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <ThemeProvider theme={themeOptions}>
            <App />
        </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
