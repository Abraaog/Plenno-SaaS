// src/layouts/DashboardLayout.tsx
import { Outlet, Link } from "react-router-dom";
import { Home, Users, Settings } from "lucide-react";

export function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Barra Lateral de Navegação */}
      <aside className="w-64 bg-white shadow-md flex-shrink-0">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-cyan-500">Plenno</h1>
        </div>
        <nav className="mt-6">
          <Link to="/" className="flex items-center px-6 py-3 text-gray-700 bg-gray-200">
            <Home className="h-5 w-5" />
            <span className="ml-4">Início</span>
          </Link>
          <Link to="/alunos" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100">
            <Users className="h-5 w-5" />
            <span className="ml-4">Meus Alunos</span>
          </Link>
          <Link to="/configuracoes" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100">
            <Settings className="h-5 w-5" />
            <span className="ml-4">Configurações</span>
          </Link>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet /> {/* As páginas da rota serão renderizadas aqui */}
      </main>
    </div>
  );
}
