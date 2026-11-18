import { motion } from "framer-motion";
import { FaTools } from "react-icons/fa";

import "../../styles/home/CategoryCard.css";

// Categoría guardada en Firestore: { nombre, descripcion, imagen }
function CategoryCard({ category, activa, onSelect }) {

  return (

    <motion.button

      type="button"

      className={
        activa
          ? "category-card activa"
          : "category-card"
      }

      onClick={() => onSelect(category)}

      whileHover={{ y: -4 }}

      whileTap={{ scale: 0.97 }}

      transition={{ duration: 0.2 }}

      aria-pressed={activa}

    >

      {category.imagen ? (

        <img
          src={category.imagen}
          alt=""
          loading="lazy"
        />

      ) : (

        <span className="category-sin-imagen">
          <FaTools />
        </span>

      )}

      <span className="category-info">

        <h3>{category.nombre}</h3>

        <small>
          {activa ? "Mostrando productos" : "Ver productos"}
        </small>

      </span>

    </motion.button>

  );

}

export default CategoryCard;
