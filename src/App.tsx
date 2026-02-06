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

      {/* Rota Raiz - Meu Dia */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard mode="all" />
          </ProtectedRoute>
        }
      />

      {/* Rota Importante */}
      <Route
        path="/important"
        element={
          <ProtectedRoute>
            <Dashboard mode="important" />
          </ProtectedRoute>
        }
      />

      {/* NOVA ROTA: Planejado (Calendário) */}
      <Route
        path="/planned"
        element={
          <ProtectedRoute>
            <Dashboard mode="planned" />
          </ProtectedRoute>
        }
      />

      {/* Rota Concluído */}
      <Route
        path="/completed"
        element={
          <ProtectedRoute>
            <Dashboard mode="completed" />
          </ProtectedRoute>
        }
      />

      {/* Opcional: Rota 404 para redirecionar caminhos errados */}
      <Route path="*" element={<Dashboard mode="all" />} />
    </Routes>
  );
}
