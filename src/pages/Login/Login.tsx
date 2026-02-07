import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      navigate("/");
    } catch (err: any) {
      setError("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="icon-box">
            <LogIn size={32} color="#fff" />
          </div>
          <h1>Bem-vindo</h1>
          <p>Insira seus dados para acessar a plataforma</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <div className="label-row">
              <label>Senha</label>
              <a href="#" className="forgot-pass">
                Esqueceu?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>

        <p className="footer-text">
          Não tem uma conta?{" "}
          <Link to="/register" className="signup-link">
            Criar Conta
          </Link>
        </p>
      </div>
    </div>
  );
}
