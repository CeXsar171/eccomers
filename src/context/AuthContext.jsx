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
