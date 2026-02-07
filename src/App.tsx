import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard mode="all" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/important"
        element={
          <ProtectedRoute>
            <Dashboard mode="important" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/planned"
        element={
          <ProtectedRoute>
            <Dashboard mode="planned" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/completed"
        element={
          <ProtectedRoute>
            <Dashboard mode="completed" />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Dashboard mode="all" />} />
    </Routes>
  );
}
