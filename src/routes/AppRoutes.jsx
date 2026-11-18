import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import ProductoDetalle from "../pages/ProductoDetalle";
import Login from "../pages/Login";
import QuienesSomos from "../pages/QuienesSomos";
import FormasPago from "../pages/FormasPago";
import Ubicacion from "../pages/Ubicacion";

import Dashboard from "../pages/admin/Dashboard";
import Productos from "../pages/admin/Productos";
import Categorias from "../pages/admin/Categorias";
import Promociones from "../pages/admin/Promociones";
import NuevoProducto from "../pages/admin/NuevoProducto";
import EditarProducto from "../pages/admin/EditarProducto";

import ProtectedRoute from "../components/auth/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
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

        <Route
          path="/admin/editar/:id"
          element={
            <ProtectedRoute>
              <EditarProducto />
            </ProtectedRoute>
          }
        />

        {/* Cualquier ruta desconocida vuelve al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
 
  
    </BrowserRouter>
  );
}

export default AppRoutes;