// src/pages/dashboard/PlanoAlimentarPage.tsx
import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PlusCircle, Trash2, Pencil, ArrowLeft } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { AddFoodModal } from '../../components/plano/AddFoodModal';
import { EditFoodModal } from '../../components/plano/EditFoodModal';
import type { Alimento } from '../../utils/foodDatabase';
import { gerarPlanoPDF } from '../../utils/pdfGenerator';

interface AlimentoNoPlano extends Alimento {
  quantidade: number;
  totalKcal: number;
  totalProteinas: number;
  totalCarboidratos: number;
  totalGorduras: number;
}

type PlanoAlimentar = {
  'Café da Manhã': AlimentoNoPlano[];
  'Almoço': AlimentoNoPlano[];
  'Jantar': AlimentoNoPlano[];
};

const metas = { metaCalorica: 1800, proteinas: 130, carboidratos: 180, gorduras: 60 };

export function PlanoAlimentarPage() {
  const { alunoId } = useParams<{ alunoId: string }>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [refeicaoAtual, setRefeicaoAtual] = useState<keyof PlanoAlimentar | null>(null);
  const [editingFood, setEditingFood] = useState<{ refeicao: keyof PlanoAlimentar; index: number; } | null>(null);

  const [plano, setPlano] = useState<PlanoAlimentar>({
    'Café da Manhã': [], 'Almoço': [], 'Jantar': [],
  });

  const handleOpenAddModal = (refeicao: keyof PlanoAlimentar) => {
    setRefeicaoAtual(refeicao);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (refeicao: keyof PlanoAlimentar, index: number) => {
    setEditingFood({ refeicao, index });
    setIsEditModalOpen(true);
  };

  const handleAddFood = (alimento: Alimento, quantidade: number) => {
    if (!refeicaoAtual) return;
    const fator = (alimento.unidadeDeMedida === 'g') ? quantidade / 100 : quantidade;
    const novoAlimento: AlimentoNoPlano = {
        ...alimento, quantidade,
        totalKcal: alimento.kcal * fator,
        totalProteinas: alimento.proteinas * fator,
        totalCarboidratos: alimento.carboidratos * fator,
        totalGorduras: alimento.gorduras * fator,
    };
    setPlano(p => ({ ...p, [refeicaoAtual]: [...p[refeicaoAtual], novoAlimento] }));
  };

  const handleUpdateFood = (novaQuantidade: number) => {
    if (!editingFood) return;
    const { refeicao, index } = editingFood;

    setPlano(p => {
        const planoAtualizado = { ...p };
        const alimentosDaRefeicao = [...planoAtualizado[refeicao]];
        const alimentoParaAtualizar = alimentosDaRefeicao[index];

        const fator = (alimentoParaAtualizar.unidadeDeMedida === 'g') ? novaQuantidade / 100 : novaQuantidade;

        const alimentoAtualizado: AlimentoNoPlano = {
            ...alimentoParaAtualizar,
            quantidade: novaQuantidade,
            totalKcal: alimentoParaAtualizar.kcal * fator,
            totalProteinas: alimentoParaAtualizar.proteinas * fator,
            totalCarboidratos: alimentoParaAtualizar.carboidratos * fator,
            totalGorduras: alimentoParaAtualizar.gorduras * fator,
        };

        alimentosDaRefeicao[index] = alimentoAtualizado;
        planoAtualizado[refeicao] = alimentosDaRefeicao;
        return planoAtualizado;
    });

    setIsEditModalOpen(false);
    setEditingFood(null);
  };

  const handleRemoveFood = (refeicao: keyof PlanoAlimentar, index: number) => {
    setPlano(p => ({ ...p, [refeicao]: p[refeicao].filter((_, i) => i !== index) }));
  };

  const totais = useMemo(() => {
    let kcal = 0, proteinas = 0, carboidratos = 0, gorduras = 0;
    Object.values(plano).flat().forEach(alimento => {
        kcal += alimento.totalKcal;
        proteinas += alimento.totalProteinas;
        carboidratos += alimento.totalCarboidratos;
        gorduras += alimento.totalGorduras;
    });
    return { kcal, proteinas, carboidratos, gorduras };
  }, [plano]);

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link to={`/alunos/${alunoId}`} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Montagem do Plano - [Nome do Aluno]</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          {(Object.keys(plano) as Array<keyof PlanoAlimentar>).map(refeicao => (
            <Card
              key={refeicao}
              title={refeicao}
              actions={<Button onClick={() => handleOpenAddModal(refeicao)} className="text-xs !p-2"><PlusCircle size={16} className="mr-2" /> Adicionar Alimento</Button>}
            >
              {plano[refeicao].length > 0 ? (
                <ul className="space-y-2">
                    {plano[refeicao].map((alimento, index) => (
                        <li key={index} className="flex justify-between items-center text-sm p-2 rounded-md hover:bg-gray-50">
                            <span>{alimento.nome} - {alimento.quantidade}{alimento.unidadeDeMedida === 'g' ? 'g' : (alimento.quantidade > 1 ? ' unidades' : ' unidade')}</span>
                            <div className='flex items-center gap-4 text-gray-500'>
                                <span>{Math.round(alimento.totalKcal)} kcal</span>
                                <button onClick={() => handleOpenEditModal(refeicao, index)} className="text-blue-500 hover:text-blue-700"><Pencil size={16} /></button>
                                <button onClick={() => handleRemoveFood(refeicao, index)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                            </div>
                        </li>
                    ))}
                </ul>
              ) : <p className="text-sm text-gray-400">Nenhum alimento adicionado.</p>}
            </Card>
          ))}
        </div>
        <aside className="lg:col-span-1">
          <div className="sticky top-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Resumo do Plano</h3>
            <div className="space-y-3">
              <div className="flex justify-between font-medium"><span>Meta Calórica</span><span>{metas.metaCalorica} kcal</span></div>
              <hr/>
              <div className="flex justify-between"><span>Proteínas</span><span>{Math.round(totais.proteinas)}g / {metas.proteinas}g</span></div>
              <div className="flex justify-between"><span>Carboidratos</span><span>{Math.round(totais.carboidratos)}g / {metas.carboidratos}g</span></div>
              <div className="flex justify-between"><span>Gorduras</span><span>{Math.round(totais.gorduras)}g / {metas.gorduras}g</span></div>
              <hr/>
              <div className="flex justify-between font-bold text-lg text-cyan-600"><span>Total de Calorias</span><span>{Math.round(totais.kcal)} kcal</span></div>
            </div>
            <Button 
              className="w-full mt-6"
              onClick={() => gerarPlanoPDF(
                plano, 
                { nome: 'Ana Silva' }, // Dados fictícios do aluno
                metas, 
                totais
              )}
            >
              Salvar e Gerar PDF
            </Button>
          </div>
        </aside>
      </div>
      <AddFoodModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddFood={handleAddFood} />
      <EditFoodModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onUpdateFood={handleUpdateFood}
        alimento={editingFood ? plano[editingFood.refeicao][editingFood.index] : null}
      />
    </div>
  );
}
