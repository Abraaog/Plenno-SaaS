// src/pages/dashboard/AdminPage.tsx
import { Button } from "../../components/ui/Button";
import { PlusCircle, Edit, ToggleLeft, ToggleRight } from "lucide-react";

export function EquipaPage() {
  // Dados fictícios
  const profissionais = [
    { id: 1, nome: 'André (Nutricionista)', email: 'andre@vivasaude.com', funcao: 'Nutricionista', ativo: true },
    { id: 2, nome: 'Bianca (Fisioterapeuta)', email: 'bianca@vivasaude.com', funcao: 'Fisioterapeuta', ativo: true },
    { id: 3, nome: 'Carlos (Personal)', email: 'carlos@vivasaude.com', funcao: 'Personal Trainer', ativo: false },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Gestão de Profissionais</h1>
        <Button><PlusCircle size={16} className="mr-2" /> Novo Profissional</Button>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        {/* Tabela de Profissionais */}
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Função</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {profissionais.map(p => (
                    <tr key={p.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{p.nome}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{p.funcao}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {p.ativo ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Ativo</span> : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Inativo</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                            <button className="text-blue-600 hover:text-blue-900"><Edit size={18} /></button>
                            <button className={p.ativo ? 'text-gray-400 hover:text-red-600' : 'text-gray-400 hover:text-green-600'}>
                                {p.ativo ? <ToggleLeft size={24} /> : <ToggleRight size={24} />}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}
