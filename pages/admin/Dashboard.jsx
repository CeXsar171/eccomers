import { useEffect, useState } from "react";

import AdminLayout from "../../components/admin/AdminLayout";
import DashboardCards from "../../components/admin/DashboardCards";
import RecentProducts from "../../components/admin/RecentProducts";
import DashboardChart from "../../components/admin/DashboardChart";
import QuickActions from "../../components/admin/QuickActions";

import { getDashboardData } from "../../services/dashboardService";

import "../../styles/admin/Dashboard.css";

function Dashboard() {

  const [datos, setDatos] = useState({
    productos: 0,
    categorias: 0,
    promociones: 0,
    ultimosProductos: []
  });

  useEffect(() => {
    cargarDashboard();
  }, []);

  const cargarDashboard = async () => {
    try {
      const data = await getDashboardData();
      setDatos(data);
    } catch (error) {
      console.error("Error al cargar el dashboard:", error);
    }
  };

  return (
    <AdminLayout>

      <DashboardCards stats={datos} />

      <RecentProducts
        productos={datos.ultimosProductos}
      />

      <DashboardChart />

      <QuickActions />

    </AdminLayout>
  );
}

export default Dashboard;