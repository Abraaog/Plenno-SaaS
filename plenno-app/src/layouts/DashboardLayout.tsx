import { Link, Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { Home, Users, Dumbbell, Calendar, ShieldCheck } from "lucide-react";
import { ThemeSwitcher } from '../components/ui/ThemeSwitcher';

export function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Toaster position="top-right" />
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex-shrink-0 flex flex-col">
        <div className="p-6">
            <h1 className="text-3xl font-bold text-cyan-500">Plenno</h1>
        </div>
        <nav className="mt-6 flex-grow space-y-1 px-4">
            <Link to="/" className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Home className="h-5 w-5" />
                <span className="ml-4">Início</span>
            </Link>
            <Link to="/alunos" className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Users className="h-5 w-5" />
                <span className="ml-4">Meus Alunos</span>
            </Link>
            <Link to="/fichas-de-treino" className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Dumbbell className="h-5 w-5" />
                <span className="ml-4">Fichas de Treino</span>
            </Link>
            <Link to="/agenda" className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Calendar className="h-5 w-5" />
                <span className="ml-4">Agenda</span>
            </Link>
            <Link to="/admin" className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <ShieldCheck className="h-5 w-5" />
                <span className="ml-4">Administração</span>
            </Link>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <ThemeSwitcher />
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
