import { useEffect, useState } from "react";

import { FaWhatsapp, FaDesktop, FaGlobe } from "react-icons/fa";

import { destinosWhatsApp } from "../../utils/destinosWhatsApp";

import "../../styles/ui/ElegirWhatsApp.css";

const ES_MOVIL = /Android|iPhone|iPad|iPod|Mobi/i;

// En computador, cualquier enlace wa.me de la página abre antes este aviso para
// elegir entre la app de WhatsApp y WhatsApp Web. En celular se abre directo.
function ElegirWhatsApp() {

  const [destinos, setDestinos] = useState(null);

  useEffect(() => {

    const alHacerClic = (e) => {

      const enlace = e.target.closest?.("a[href]");

      // Con Ctrl/Cmd/Mayús o botón del medio se respeta el comportamiento normal.
      if (!enlace || ES_MOVIL.test(navigator.userAgent) || e.button !== 0 ||
          e.ctrlKey || e.metaKey || e.shiftKey) {
        return;
      }

      const elegidos = destinosWhatsApp(enlace.href);

      if (elegidos) {
        e.preventDefault();
        setDestinos(elegidos);
      }

    };

    const alPulsarTecla = (e) => e.key === "Escape" && setDestinos(null);

    document.addEventListener("click", alHacerClic);
    window.addEventListener("keydown", alPulsarTecla);

    return () => {
      document.removeEventListener("click", alHacerClic);
      window.removeEventListener("keydown", alPulsarTecla);
    };

  }, []);

  if (!destinos) {
    return null;
  }

  const cerrar = () => setDestinos(null);

  return (

    <div className="elegir-wa-fondo" onMouseDown={cerrar}>

      <div
        className="elegir-wa"
        role="dialog"
        aria-modal="true"
        aria-label="Elegir cómo abrir WhatsApp"
        onMouseDown={(e) => e.stopPropagation()}
      >

        <FaWhatsapp className="elegir-wa-logo" />

        <h2>¿Cómo quieres abrir WhatsApp?</h2>

        <a
          className="elegir-wa-opcion"
          href={destinos.app}
          onClick={cerrar}
        >
          <FaDesktop /> Abrir la aplicación
        </a>

        <a
          className="elegir-wa-opcion web"
          href={destinos.web}
          target="_blank"
          rel="noreferrer"
          onClick={cerrar}
        >
          <FaGlobe /> Usar WhatsApp Web
        </a>

        <button type="button" className="elegir-wa-cancelar" onClick={cerrar}>
          Cancelar
        </button>

      </div>

    </div>

  );

}

export default ElegirWhatsApp;
