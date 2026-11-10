import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  FaBars,
  FaHome,
  FaBoxOpen,
  FaTags,
  FaStar,
  FaPlus,
  FaCog
} from "react-icons/fa";

import "../../styles/admin/Sidebar.css";

function Sidebar() {

  const [collapsed, setCollapsed] = useState(false);

  return (

    <aside className={collapsed ? "sidebar collapsed" : "sidebar"}>

      <div className="sidebar-header">

    <div className="logo">

        {!collapsed && <h2>Ferretería</h2>}

    </div>

    <button
        className="menu-btn"
        onClick={() => setCollapsed(!collapsed)}
    >
        <FaBars />
    </button>

    </div>

      <nav>

        <NavLink to="/admin">

          <FaHome />

          {!collapsed && <span>Dashboard</span>}

        </NavLink>

        <NavLink to="/admin/productos">

          <FaBoxOpen />

          {!collapsed && <span>Productos</span>}

        </NavLink>

        <NavLink to="/admin/categorias">

          <FaTags />

          {!collapsed && <span>Categorías</span>}

        </NavLink>

        <NavLink to="/admin/promociones">

          <FaStar />

          {!collapsed && <span>Promociones</span>}

        </NavLink>

        <NavLink to="/admin/nuevo-producto">

          <FaPlus />

          {!collapsed && <span>Nuevo Producto</span>}

        </NavLink>

      </nav>

      <div className="sidebar-footer">

        <NavLink to="/admin/configuracion">

          <FaCog />

          {!collapsed && <span>Configuración</span>}

        </NavLink>

      </div>

    </aside>

  );

}

export default Sidebar;