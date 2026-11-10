import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaTools } from "react-icons/fa";
import "../../styles/layout/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const cerrarMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">

      <div className="navbar-container">

        <Link to="/" className="logo">
      
          <FaTools className="logo-icon" />

          <div>
            <h2>SU CENTRO 
              <br />
              FERRETERO
              </h2>
            <span>Todo para tu construcción</span>
          </div>

        </Link>

        <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>

          <Link onClick={cerrarMenu} to="/">Inicio</Link>

          <Link onClick={cerrarMenu} to="/quienes-somos">Nosotros</Link>

          <Link onClick={cerrarMenu} to="/formas-pago">Pagos</Link>

          <Link onClick={cerrarMenu} to="/ubicacion">Ubicación</Link>

          <Link onClick={cerrarMenu} to="/login" className="admin-btn">

            Administrador

          </Link>

        </nav>

      </div>

    </header>
  );
}

export default Navbar;