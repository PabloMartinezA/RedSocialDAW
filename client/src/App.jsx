import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "@/scenes/homePage";
import LoginPage from "@/scenes/loginPage";
import ProfilePage from "@/scenes/profilePage";
import ChatPage from "@/scenes/chatPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "@/theme";
import { SnackbarProvider } from "notistack";

function App() {
  const mode = useSelector((state) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SnackbarProvider anchorOrigin={{horizontal: "right", vertical: "bottom"}}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/home"
                element={isAuth ? <HomePage /> : <Navigate to="/" />}
              />
              <Route
                path="/profile/:userId"
                element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
              />
              <Route
                path="/chat"
                element={isAuth ? <ChatPage /> : <Navigate to="/" />}
              />
            </Routes>
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
