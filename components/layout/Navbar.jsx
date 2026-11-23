import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import logoMascota from "../../assets/images/logo/logo-mascota.png";
import "../../styles/layout/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const cerrarMenu = () => setMenuOpen(false);

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const q = params.get("q") || "";

  const buscar = (e) => {
    e.preventDefault();
    cerrarMenu();
    const texto = String(new FormData(e.currentTarget).get("q") || "").trim();
    navigate(texto ? `/?q=${encodeURIComponent(texto)}` : "/");
    setTimeout(() => document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" }), 80);
  };

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

        <form className="nav-search" key={q} onSubmit={buscar} role="search">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="¿Qué necesitas hoy?"
            aria-label="Buscar productos por nombre o categoría"
            autoComplete="off"
          />
          <button type="submit" aria-label="Buscar"><FaSearch /></button>
        </form>

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
