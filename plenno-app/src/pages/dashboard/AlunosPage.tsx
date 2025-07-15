// src/pages/dashboard/AlunosPage.tsx
import { useState, useMemo } from "react"; // Importar useMemo
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { PlusCircle, Dumbbell, Search } from 'lucide-react'; // Importar os ícones

const novoAlunoSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
  email: z.string().email("Formato de e-mail inválido."),
  telefone: z.string().min(10, "Telefone inválido."),
  genero: z.enum(['masculino', 'feminino']),
  objetivo: z.string().min(1, "O objetivo é obrigatório."),
});

type NovoAlunoFormData = z.infer<typeof novoAlunoSchema>;

// Dados fictícios com mais exemplos
const alunosFicticios = [
  { id: 1, nome: 'Ana Silva', objetivo: 'Emagrecer' },
  { id: 2, nome: 'Bruno Costa', objetivo: 'Ganhar Massa Muscular' },
  { id: 3, nome: 'Carla Dias', objetivo: 'Manter Peso' },
  { id: 4, nome: 'Daniel Martins', objetivo: 'Emagrecer' },
  { id: 5, nome: 'Eduarda Lima', objetivo: 'Ganhar Massa Muscular' },
];

export function AlunosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para a pesquisa

  const { register, handleSubmit, formState: { errors }, reset } = useForm<NovoAlunoFormData>({
    resolver: zodResolver(novoAlunoSchema),
  });

  function handleNovoAluno(data: NovoAlunoFormData) {
    console.log("Novo Aluno:", data);
    reset();
    setIsModalOpen(false);
  }

  // Filtra os alunos com base no termo de pesquisa
  const filteredAlunos = useMemo(() => {
    return alunosFicticios.filter(aluno => 
      aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="dark:text-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Meus Alunos</h1>
        <div className="w-full md:w-auto flex gap-4">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                    type="text"
                    placeholder="Buscar aluno..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-cyan-500 focus:border-cyan-500"
                />
            </div>
            <Button onClick={() => setIsModalOpen(true)}><PlusCircle size={16} className="mr-2" />Novo Aluno</Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredAlunos.map((aluno) => (
            <li key={aluno.id}>
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <Link to={`/alunos/${aluno.id}`} className="flex-grow">
                    <p className="text-lg font-medium text-cyan-600 dark:text-cyan-400 truncate">{aluno.nome}</p>
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                      {aluno.objetivo}
                    </span>
                </Link>
                <Link to={`/alunos/${aluno.id}/fichas-de-treino`} title="Ver Ficha de Treino" className="ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Dumbbell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Cadastrar Novo Aluno">
        <form onSubmit={handleSubmit(handleNovoAluno)} className="space-y-4">
             {/* Nome */}
             <div>
               <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
               <input
                 id="nome"
                 type="text"
                 {...register("nome")}
                 className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
               />
               {errors.nome && <p className="mt-1 text-xs text-red-500">{errors.nome.message}</p>}
             </div>

             {/* Email */}
             <div>
               <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">E-mail</label>
               <input
                 id="email"
                 type="email"
                 {...register("email")}
                 className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
               />
               {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
             </div>

             {/* Telefone */}
             <div>
               <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefone</label>
               <input
                 id="telefone"
                 type="tel"
                 {...register("telefone")}
                 className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
               />
               {errors.telefone && <p className="mt-1 text-xs text-red-500">{errors.telefone.message}</p>}
             </div>

             {/* Gênero e Objetivo */}
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label htmlFor="genero" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gênero</label>
                 <select
                   id="genero"
                   {...register("genero")}
                   className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                 >
                   <option value="feminino">Feminino</option>
                   <option value="masculino">Masculino</option>
                 </select>
                 {errors.genero && <p className="mt-1 text-xs text-red-500">{errors.genero.message}</p>}
               </div>

               <div>
                 <label htmlFor="objetivo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Objetivo</label>
                 <select
                   id="objetivo"
                   {...register("objetivo")}
                   className="w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                 >
                   <option value="">Selecione um objetivo</option>
                   <option value="emagrecer">Emagrecer</option>
                   <option value="manter">Manter Peso</option>
                   <option value="ganhar_massa">Ganhar Massa Muscular</option>
                 </select>
                 {errors.objetivo && <p className="mt-1 text-xs text-red-500">{errors.objetivo.message}</p>}
               </div>
             </div>

             {/* Botões */}
             <div className="flex justify-end gap-4 pt-4">
               <Button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-500">
                 Cancelar
               </Button>
               <Button type="submit">Salvar Aluno</Button>
             </div>
        </form>
      </Modal>
    </div>
  );
}
