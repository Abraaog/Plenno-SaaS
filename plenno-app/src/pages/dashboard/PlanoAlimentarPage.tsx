// src/pages/dashboard/PlanoAlimentarPage.tsx
import { useState, useMemo } from 'react';
import { PlusCircle, Trash2 } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { AddFoodModal } from '../../components/plano/AddFoodModal';
import type { Alimento } from '../../utils/foodDatabase';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refeicaoAtual, setRefeicaoAtual] = useState<keyof PlanoAlimentar | null>(null);
  const [plano, setPlano] = useState<PlanoAlimentar>({
    'Café da Manhã': [],
    'Almoço': [],
    'Jantar': [],
  });

  const handleOpenModal = (refeicao: keyof PlanoAlimentar) => {
    setRefeicaoAtual(refeicao);
    setIsModalOpen(true);
  };

  const handleAddFood = (alimento: Alimento, quantidade: number) => {
    if (!refeicaoAtual) return;

    let fator = quantidade;
    if (alimento.unidadeDeMedida === 'g') {
        fator = quantidade / 100; // Calcula com base em 100g
    }

    const novoAlimento: AlimentoNoPlano = {
        ...alimento,
        quantidade,
        totalKcal: alimento.kcal * fator,
        totalProteinas: alimento.proteinas * fator,
        totalCarboidratos: alimento.carboidratos * fator,
        totalGorduras: alimento.gorduras * fator,
    };

    setPlano(planoAnterior => ({
      ...planoAnterior,
      [refeicaoAtual]: [...planoAnterior[refeicaoAtual], novoAlimento]
    }));
  };

  const handleRemoveFood = (refeicao: keyof PlanoAlimentar, index: number) => {
    setPlano(planoAnterior => ({
        ...planoAnterior,
        [refeicao]: planoAnterior[refeicao].filter((_, i) => i !== index)
    }));
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Montagem do Plano - [Nome do Aluno]</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          {(Object.keys(plano) as Array<keyof PlanoAlimentar>).map(refeicao => (
            <Card
              key={refeicao}
              title={refeicao}
              actions={<Button onClick={() => handleOpenModal(refeicao)} className="text-xs !p-2"><PlusCircle size={16} className="mr-2" /> Adicionar Alimento</Button>}
            >
              {plano[refeicao].length > 0 ? (
                <ul className="space-y-2">
                    {plano[refeicao].map((alimento, index) => (
                        <li key={index} className="flex justify-between items-center text-sm p-2 rounded-md hover:bg-gray-50">
                            <span>{alimento.nome} - {alimento.quantidade}{alimento.unidadeDeMedida === 'g' ? 'g' : (alimento.quantidade > 1 ? ' unidades' : ' unidade')}</span>
                            <div className='flex items-center gap-2 text-gray-500'>
                                <span>{Math.round(alimento.totalKcal)} kcal</span>
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
            <Button className="w-full mt-6">Salvar e Gerar PDF</Button>
          </div>
        </aside>
      </div>
      <AddFoodModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddFood={handleAddFood} />
    </div>
  );
}
