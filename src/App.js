import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import FormKeluhan from "./pages/FormKeluhan";
import Berhasil from "./component/Info/Berhasil";
import Gagal from "./component/Info/Gagal";
import KeluhanSaya from "./pages/KeluhanSaya";
import DetailPage from "./pages/DetailPage";
import { Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";
// import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) setToken(localStorage.getItem("token"));
  }, []);

  const PrivateRoute = ({ auth: { isAuthenticated }, children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage setToken={setToken} token={token} />}
          />
          <Route
            path="/"
            element={
              <PrivateRoute auth={{ isAuthenticated: token }}>
                <Home setToken={setToken} />
              </PrivateRoute>
            }
          />
          <Route
            path="/form-keluhan"
            element={
              <PrivateRoute auth={{ isAuthenticated: token }}>
                <FormKeluhan />
              </PrivateRoute>
            }
          />
          <Route
            path="/form-berhasil"
            element={
              <PrivateRoute auth={{ isAuthenticated: token }}>
                <Berhasil />
              </PrivateRoute>
            }
          />
          <Route
            path="/form-gagal"
            element={
              <PrivateRoute auth={{ isAuthenticated: token }}>
                <Gagal />
              </PrivateRoute>
            }
          />
          <Route
            path="/keluhan-saya"
            element={
              <PrivateRoute auth={{ isAuthenticated: token }}>
                <KeluhanSaya />
              </PrivateRoute>
            }
          />
          <Route
            path="/detail"
            element={
              <PrivateRoute auth={{ isAuthenticated: token }}>
                <DetailPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
