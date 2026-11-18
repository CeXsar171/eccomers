import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "../../styles/admin/Header.css";

function Header() {

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const salir = async () => {
    await logout();
    navigate("/login");
  };

  return (

    <header className="header">

      <div className="header-left">

        <h2>Panel Administrativo</h2>

      </div>

      <div className="search-box">

        <FaSearch />

        <input
          type="text"
          placeholder="Buscar productos..."
        />

      </div>

      <div className="header-right">

        <button className="notification">

          <FaBell />

        </button>

        <div className="user-info">

          <FaUserCircle />

          <span>

            {user?.email}

          </span>

        </div>

        <button
          className="logout-btn"
          onClick={salir}
        >

          <FaSignOutAlt />

        </button>

      </div>

    </header>

  );

}

export default Header;