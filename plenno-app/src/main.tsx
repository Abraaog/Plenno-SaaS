// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AlunosPage } from './pages/dashboard/AlunosPage';

// Importando os layouts
import { DashboardLayout } from './layouts/DashboardLayout'
import { AuthLayout } from './layouts/AuthLayout'

// Importando as páginas
import { HomePage } from './pages/dashboard/HomePage'
import { LoginPage } from './pages/auth/LoginPage'
import { SignupPage } from './pages/auth/SignupPage'
import { AlunoDetailPage } from './pages/dashboard/AlunoDetailPage';
import { PlanoAlimentarPage } from './pages/dashboard/PlanoAlimentarPage';

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
    <RouterProvider router={router} />
  </React.StrictMode>,
)
