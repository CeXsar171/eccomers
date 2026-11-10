import { Link } from "react-router-dom";
import "../../styles/layout/Footer.css";
import logo from "../../assets/images/logo/CentroFerre.png";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Información */}
        <div className="footer-section footer-info">

          <img
            src={logo}
            alt="Centro Ferretero"
            className="footer-logo"
          />

          <p>
            Tu aliado estratégico para proyectos profesionales,
            domésticos, remodelaciones y equipamiento diario.
            Ofrecemos productos de calidad para el hogar,
            negocios y empresas.
          </p>

        </div>

        {/* Contacto */}
        <div className="footer-section">

          <h3>Contacto</h3>

          <p>📍 Av. Miguel Iturralde, Latacunga</p>

          <p>📞 0999999999</p>

          <p>✉ correo@ferreteria.com</p>

        </div>

        {/* Enlaces */}
        <div className="footer-section">

          <h3>Enlaces</h3>

          <ul>

            <li><Link to="/">Inicio</Link></li>

            <li><Link to="/quienes-somos">Quiénes Somos</Link></li>

            <li><Link to="/horarios">Horarios</Link></li>

            <li><Link to="/formas-pago">Pagos</Link></li>

            <li><Link to="/ubicacion">Ubicación</Link></li>

          </ul>

        </div>

        {/* Redes */}
        <div className="footer-section">

          <h3>Síguenos</h3>

          <div className="social-links">

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>

            <a
              href="https://wa.me/593999999999"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>

          </div>

        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 Centro Ferretero - Todos los derechos reservados.
      </p>

    </footer>
  );
}

export default Footer;