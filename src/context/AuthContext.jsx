import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import auth from "../firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Correos autorizados como administradores, separados por comas,
// definidos en el archivo .env (VITE_ADMIN_EMAILS).
// Si la variable no existe, nadie es administrador (falla cerrada).
const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || "")
  .split(",")
  .map((correo) => correo.trim().toLowerCase())
  .filter(Boolean);

export const esCorreoAdmin = (email) =>
  !!email && ADMIN_EMAILS.includes(email.toLowerCase());

// URL del script de Google que envía el correo de alerta (VITE_ALERTA_URL).
const URL_ALERTA = import.meta.env.VITE_ALERTA_URL;

// Avisa por correo cada inicio de sesión. Si falla, el ingreso no se ve afectado.
// El token permite al script confirmar con Firebase que el inicio de sesión es real.
const avisarAcceso = async (idToken) => {
  if (!URL_ALERTA) return;

  try {
    const ip = await fetch("https://api.ipify.org").then((r) => r.text()).catch(() => "");

    await fetch(URL_ALERTA, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({ idToken, ip, navegador: navigator.userAgent }),
    });
  } catch (error) {
    console.warn("No se pudo enviar la alerta de acceso:", error);
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    const credencial = await signInWithEmailAndPassword(auth, email, password);

    // Se avisa también si la cuenta no es admin; sin await para no retrasar el ingreso.
    avisarAcceso(await credencial.user.getIdToken());

    // Una cuenta válida de Firebase no basta: debe ser administrador.
    if (!esCorreoAdmin(credencial.user.email)) {
      await signOut(auth);

      const error = new Error("Cuenta no autorizada.");
      error.code = "app/not-admin";
      throw error;
    }

    return credencial;
  };

  const logout = () => {
    return signOut(auth);
  };

  const isAdmin = esCorreoAdmin(user?.email);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        login,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
