import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logoMascota from "../../assets/images/logo/logo-mascota.png";
import "../../styles/layout/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const cerrarMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">

      <div className="navbar-container">

        <Link to="/" className="logo" onClick={cerrarMenu}>

          <img
            src={logoMascota}
            alt="Logo de Su Centro Ferretero"
            className="logo-img"
            width="60"
            height="60"
          />

          <div>
            <h2>SU CENTRO
              <br />
              FERRETERO
            </h2>
            <span>Todo para tu construcción</span>
          </div>

        </Link>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>

          <Link onClick={cerrarMenu} to="/">Inicio</Link>

          <Link onClick={cerrarMenu} to="/quienes-somos">Nosotros</Link>

          <Link onClick={cerrarMenu} to="/formas-pago">Pagos</Link>

          <Link onClick={cerrarMenu} to="/ubicacion">Ubicación</Link>

        </nav>

      </div>

    </header>
  );
}

export default Navbar;
