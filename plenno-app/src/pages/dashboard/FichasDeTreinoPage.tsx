// src/pages/dashboard/FichasDeTreinoPage.tsx
import { useState, useMemo } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PlusCircle, Trash2, Pencil, Search } from 'lucide-react';
import { AddExercicioModal, type ExercicioFormData } from '../../components/plano/AddExercicioModal';
import { EditExercicioModal } from '../../components/plano/EditExercicioModal';
import { gerarFichaDeTreinoPDF } from '../../utils/pdfGenerator';

interface Exercicio {
  nome: string;
  series: string;
  repeticoes: string;
  observacao?: string;
}

interface Treino {
  id: number;
  nome: string;
  alunoNome: string; // Adicionar nome do aluno
  exercicios: Exercicio[];
}

const treinosIniciais: Treino[] = [
  { id: 1, nome: 'Treino A - Peito e Tríceps', alunoNome: 'Ana Silva', exercicios: [
    { nome: 'Supino Reto', series: '4', repeticoes: '10-12' },
    { nome: 'Crucifixo com Halteres', series: '3', repeticoes: '12-15' },
  ]},
  { id: 2, nome: 'Treino de Força - Full Body', alunoNome: 'Bruno Costa', exercicios: [
    { nome: 'Agachamento Livre', series: '5', repeticoes: '5' },
    { nome: 'Remada Curvada', series: '5', repeticoes: '5' },
  ]},
  { id: 3, nome: 'Treino Metabólico', alunoNome: 'Ana Silva', exercicios: [
    { nome: 'Burpees', series: '3', repeticoes: '20' },
    { nome: 'Corda Naval', series: '3', repeticoes: '30s' },
  ]},
];

export function FichasDeTreinoPage() {
  const [treinos, setTreinos] = useState<Treino[]>(treinosIniciais);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [treinoAtualId, setTreinoAtualId] = useState<number | null>(null);
  const [editingExercicio, setEditingExercicio] = useState<{ treinoId: number, index: number, data: Exercicio } | null>(null);

  const filteredTreinos = useMemo(() => {
    return treinos.filter(treino => 
      treino.alunoNome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, treinos]);

  const handleOpenAddModal = (treinoId: number) => {
    setTreinoAtualId(treinoId);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (treinoId: number, index: number) => {
    const exercicioParaEditar = treinos.find(t => t.id === treinoId)?.exercicios[index];
    if (exercicioParaEditar) {
        setEditingExercicio({ treinoId, index, data: exercicioParaEditar });
        setIsEditModalOpen(true);
    }
  };

  const handleAddExercicio = (data: ExercicioFormData) => {
    setTreinos(treinosAtuais => 
      treinosAtuais.map(treino => 
        treino.id === treinoAtualId 
          ? { ...treino, exercicios: [...treino.exercicios, data] } 
          : treino
      )
    );
  };

  const handleUpdateExercicio = (data: ExercicioFormData) => {
    if (!editingExercicio) return;
    const { treinoId, index } = editingExercicio;
    setTreinos(treinosAtuais => 
        treinosAtuais.map(treino => {
            if (treino.id === treinoId) {
                const exerciciosAtualizados = [...treino.exercicios];
                exerciciosAtualizados[index] = data;
                return { ...treino, exercicios: exerciciosAtualizados };
            }
            return treino;
        })
    );
    setEditingExercicio(null);
  };

  const handleRemoveExercicio = (treinoId: number, indexExercicio: number) => {
    setTreinos(treinosAtuais => 
      treinosAtuais.map(treino => 
        treino.id === treinoId 
          ? { ...treino, exercicios: treino.exercicios.filter((_, i) => i !== indexExercicio) } 
          : treino
      )
    );
  };

  const handleCriarNovaFicha = () => {
    const nomeNovaFicha = prompt("Qual o nome da nova ficha de treino? (Ex: Treino B - Costas e Bíceps)");
    const nomeAluno = prompt("Para qual aluno é esta ficha?");
    if (nomeNovaFicha && nomeAluno) {
        const novaFicha: Treino = {
            id: Date.now(),
            nome: nomeNovaFicha,
            alunoNome: nomeAluno,
            exercicios: []
        };
        setTreinos(treinosAtuais => [...treinosAtuais, novaFicha]);
    }
  };

  return (
    <div className="dark:text-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Fichas de Treino</h1>
        <div className="w-full md:w-auto flex gap-4">
          <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                  type="text"
                  placeholder="Buscar por aluno..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-cyan-500 focus:border-cyan-500"
              />
          </div>
          <Button onClick={handleCriarNovaFicha}><PlusCircle size={16} className="mr-2" />Nova Ficha</Button>
          <Button 
            onClick={() => gerarFichaDeTreinoPDF(filteredTreinos, { nome: 'Aluno Exemplo' })}
            className="bg-gray-600 hover:bg-gray-700 text-white"
          >
            Exportar PDF
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {filteredTreinos.map((treino) => (
          <Card 
            key={treino.id} 
            title={`${treino.nome} - (${treino.alunoNome})`}
            actions={<Button onClick={() => handleOpenAddModal(treino.id)} className="text-xs !p-2"><PlusCircle size={16} className="mr-2" /> Adicionar Exercício</Button>}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Exercício</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Séries</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Repetições</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Observação</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {treino.exercicios.map((exercicio, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{exercicio.nome}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{exercicio.series}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{exercicio.repeticoes}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">{exercicio.observacao}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                        <button onClick={() => handleOpenEditModal(treino.id, index)} className="text-blue-500 hover:text-blue-700"><Pencil size={16} /></button>
                        <button onClick={() => handleRemoveExercicio(treino.id, index)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ))}
      </div>
      <AddExercicioModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddExercicio={handleAddExercicio}
      />
      <EditExercicioModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdateExercicio={handleUpdateExercicio}
        exercicio={editingExercicio ? editingExercicio.data : null}
      />
    </div>
  );
}
