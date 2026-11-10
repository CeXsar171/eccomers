import {
  FaBoxOpen,
  FaTags,
  FaStar,
  FaDollarSign
} from "react-icons/fa";

import StatCard from "./StatCard";

function DashboardCards({ stats }) {

  return (

    <div className="stats-grid">

      <StatCard
        title="Productos"
        value={stats.productos}
        color="#1565C0"
        icon={<FaBoxOpen color="#1565C0" />}
      />

      <StatCard
        title="Categorías"
        value={stats.categorias}
        color="#43A047"
        icon={<FaTags color="#43A047" />}
      />

      <StatCard
        title="Promociones"
        value={stats.promociones}
        color="#FB8C00"
        icon={<FaStar color="#FB8C00" />}
      />

      <StatCard
        title="Ventas"
        value="$0"
        color="#8E24AA"
        icon={<FaDollarSign color="#8E24AA" />}
      />

    </div>

  );

}

export default DashboardCards;