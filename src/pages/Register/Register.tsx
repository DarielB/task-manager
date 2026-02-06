import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock, ArrowLeft, CheckCircle, X } from "lucide-react";
import "./Register.css";

export default function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // New state for popup

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("As senhas não coincidem.");
    }

    setLoading(true);
    try {
      await signUp(email, password);
      setIsSuccess(true); // Trigger the popup instead of immediate navigate
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <button className="back-button" onClick={() => navigate("/login")}>
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>

        <div className="register-header">
          <div className="icon-box-alt">
            <UserPlus size={32} color="#fff" />
          </div>
          <div className="text-header">
            <h1>Criar conta</h1>
            <p>Junte-se a nós e comece sua jornada</p>
          </div>
        </div>

        <form onSubmit={handleRegister} className="register-form">
          <div className="input-group">
            <label>E-mail</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                placeholder="exemplo@email.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Senha</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                placeholder="Crie uma senha forte"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Confirmar Senha</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                placeholder="Repita sua senha"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Criando conta..." : "Finalizar Cadastro"}
          </button>
        </form>

        <p className="footer-text">
          Já possui uma conta?{" "}
          <span className="login-link" onClick={() => navigate("/login")}>
            Fazer Login
          </span>
        </p>
      </div>

      {/* SUCCESS POPUP OVERLAY */}
      {isSuccess && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => navigate("/login")}>
              <X size={20} />
            </button>
            <CheckCircle size={60} color="#10b981" className="modal-icon" />
            <h2>Verifique seu e-mail</h2>
            <p>
              Enviamos um link de confirmação para <strong>{email}</strong>. Por
              favor, verifique sua caixa de entrada e spam.
            </p>
            <button className="modal-button" onClick={() => navigate("/login")}>
              Ir para o Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
