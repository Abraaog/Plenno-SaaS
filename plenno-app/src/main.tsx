// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AlunosPage } from './pages/dashboard/AlunosPage';
import { ThemeProvider } from './contexts/ThemeContext';

// Importando os layouts
import { DashboardLayout } from './layouts/DashboardLayout'
import { AuthLayout } from './layouts/AuthLayout'

// Importando as páginas
import { HomePage } from './pages/dashboard/HomePage'
import { LoginPage } from './pages/auth/LoginPage'
import { SignupPage } from './pages/auth/SignupPage'
import { AlunoDetailPage } from './pages/dashboard/AlunoDetailPage';
import { PlanoAlimentarPage } from './pages/dashboard/PlanoAlimentarPage';
import { FichasDeTreinoPage } from './pages/dashboard/FichasDeTreinoPage';
import { AgendaPage } from './pages/dashboard/AgendaPage';
import { AdminPage } from './pages/dashboard/AdminPage'

const router = createBrowserRouter([
  // Rotas do Dashboard (área logada)
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "alunos",
        element: <AlunosPage />,
      },
      {
        path: "alunos/:id", // Rota para detalhes do aluno
        element: <AlunoDetailPage />,
      },
      {
        path: "alunos/:alunoId/plano-alimentar", // Nova rota aninhada
        element: <PlanoAlimentarPage />,
      },
      {
        path: "fichas-de-treino",
        element: <FichasDeTreinoPage />,
      },
      {
        path: "agenda",
        element: <AgendaPage />,
      },
      {
        path: "admin",
        element: <AdminPage />, // Rota para a página de administração
      },
      {

        path: "alunos/:alunoId/fichas-de-treino",

        element: <FichasDeTreinoPage />,

},

    ],
  },
  // Rotas de Autenticação
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/cadastro",
        element: <SignupPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
