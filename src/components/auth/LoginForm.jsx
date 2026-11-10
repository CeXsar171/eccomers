import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "../../styles/auth/Login.css";

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      console.error(err);

      switch (err.code) {
        case "auth/invalid-credential":
          setError("Correo o contraseña incorrectos.");
          break;

        case "auth/too-many-requests":
          setError("Demasiados intentos. Inténtalo más tarde.");
          break;

        default:
          setError("No fue posible iniciar sesión.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>Ferretería Central</h1>

        <p>Panel Administrativo</p>

        <form onSubmit={iniciarSesion}>

          <div className="input-group">

            <FaEnvelope />

            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="input-group">

            <FaLock />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default LoginForm;