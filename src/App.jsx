import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/home/Dashboard";
import Error from "./pages/Error";

// Protects private routes: requires adminToken in localStorage
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Public routes (e.g. /login): if already authenticated, redirect to dashboard
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    return <Navigate to="/Dashboard" replace />;
  }
  return children;
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          }
        />

        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Default to dashboard for root when authenticated */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback error page for unknown routes */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
