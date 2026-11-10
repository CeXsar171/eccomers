import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import "../../styles/home/LocationSection.css";

function LocationSection() {

  const locales = [
    {
      nombre: "Sucursal Matriz",
      direccion: "AV.Miguel Iturralde",
      url: "https://maps.app.goo.gl/1muiF6X66yjyezRU7",
      posicion: [-0.884403, -78.615407],
    },
    {
      nombre: "Sucursal Norte",
      direccion: "San Buenaventura - calle. San Bernandino",
      url: "https://maps.app.goo.gl/xMV6Yre1E6KBr8Dy9",
      posicion: [-0.894174, -78.612243],
    },
    {
      nombre: "Sucursal Sur",
      direccion: "Alaquez - calle.Reinaldo Hidalgo",
      url: "https://maps.app.goo.gl/MtoYx4CfHyWkMPQT7",
      posicion: [-0.863787, -78.596076],
    },
  ];

  return (
    <motion.section
      id="ubicacion"
      className="location"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container">

        <h2 className="section-title">
          Nuestras Sucursales
        </h2>

        <p className="section-subtitle">
          Visítanos en cualquiera de nuestros locales. Estaremos encantados de atenderte.
        </p>

        <MapContainer
         center={[-0.8852, -78.6155]}
         zoom={13}
         scrollWheelZoom={false}
         className="map"
         >

          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {locales.map((local, index) => (
            <Marker key={index} position={local.posicion}>
              <Popup>
                <strong>{local.nombre}</strong>
                <br />
                {local.direccion}
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="locations-list">

          {locales.map((local, index) => (
            <div className="location-card" key={index}>
              <h3>{local.nombre}</h3>
              <p>{local.direccion}</p>
              <a href={local.url} target="_blank" rel="noopener noreferrer">
                Ver en Google Maps
              </a>
            </div>
          ))}

        </div>

      </div>
    </motion.section>
  );
}

export default LocationSection;