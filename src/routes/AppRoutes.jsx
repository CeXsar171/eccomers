import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import QuienesSomos from "../pages/QuienesSomos";
import FormasPago from "../pages/FormasPago";
import Ubicacion from "../pages/Ubicacion";

import Dashboard from "../pages/admin/Dashboard";
import Productos from "../pages/admin/Productos";
import Categorias from "../pages/admin/Categorias";
import Promociones from "../pages/admin/Promociones";
import NuevoProducto from "../pages/admin/NuevoProducto";

import ProtectedRoute from "../components/auth/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} /> 
        <Route path="/formas-pago" element={<FormasPago />} />
        <Route path="/ubicacion" element={<Ubicacion />} />
  
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/productos"
          element={
            <ProtectedRoute>
              <Productos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categorias"
          element={
            <ProtectedRoute>
              <Categorias />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/promociones"
          element={
            <ProtectedRoute>
              <Promociones />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/nuevo-producto"
          element={
            <ProtectedRoute>
              <NuevoProducto />
            </ProtectedRoute>
          }
        />

      </Routes>
 
  
    </BrowserRouter>
  );
}

export default AppRoutes;