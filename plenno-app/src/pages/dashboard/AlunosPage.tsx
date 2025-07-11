// src/pages/dashboard/AlunosPage.tsx
import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

// Esquema de validação para o novo aluno
const novoAlunoSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
  email: z.string().email("Formato de e-mail inválido."),
  objetivo: z.string().min(1, "O objetivo é obrigatório."),
});

type NovoAlunoFormData = z.infer<typeof novoAlunoSchema>;

export function AlunosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<NovoAlunoFormData>({
    resolver: zodResolver(novoAlunoSchema),
  });

  function handleNovoAluno(data: NovoAlunoFormData) {
    console.log("Novo Aluno:", data);
    // Aqui, no futuro, faremos a chamada à API para salvar o aluno
    reset();
    setIsModalOpen(false);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Meus Alunos</h1>
        <Button onClick={() => setIsModalOpen(true)}>Novo Aluno</Button>
      </div>

      {/* Lista de Alunos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {/* Dados fictícios - no futuro, virão da nossa API */}
          {[
            { id: 1, nome: 'Ana Silva', objetivo: 'Emagrecer' },
            { id: 2, nome: 'Bruno Costa', objetivo: 'Ganhar Massa Muscular' },
            { id: 3, nome: 'Carla Dias', objetivo: 'Manter Peso' },
          ].map((aluno) => (
            <li key={aluno.id}>
              <Link to={`/alunos/${aluno.id}`} className="block hover:bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-cyan-600 truncate">{aluno.nome}</p>
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {aluno.objetivo}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal para Adicionar Novo Aluno */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Cadastrar Novo Aluno"
      >
        <form onSubmit={handleSubmit(handleNovoAluno)} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome Completo</label>
            <input id="nome" type="text" {...register("nome")} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500" />
            {errors.nome && <p className="mt-1 text-xs text-red-500">{errors.nome.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input id="email" type="email" {...register("email")} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500" />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="objetivo" className="block text-sm font-medium text-gray-700">Objetivo</label>
            <select id="objetivo" {...register("objetivo")} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500">
              <option value="">Selecione um objetivo</option>
              <option value="emagrecer">Emagrecer</option>
              <option value="manter">Manter Peso</option>
              <option value="ganhar_massa">Ganhar Massa Muscular</option>
            </select>
            {errors.objetivo && <p className="mt-1 text-xs text-red-500">{errors.objetivo.message}</p>}
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
              Cancelar
            </Button>
            <Button type="submit">
              Salvar Aluno
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
