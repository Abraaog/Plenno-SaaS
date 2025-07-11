// src/layouts/AuthLayout.tsx
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Outlet /> {/* As páginas de Login/Cadastro serão renderizadas aqui */}
    </div>
  );
}
