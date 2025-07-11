// src/pages/dashboard/PlanoAlimentarPage.tsx
import { PlusCircle } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

// Dados fictícios para as metas (no futuro, virão da página anterior)
const metas = {
  metaCalorica: 1800,
  proteinas: 130,
  carboidratos: 180,
  gorduras: 60,
};

export function PlanoAlimentarPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Montagem do Plano - [Nome do Aluno]</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Coluna Principal com as Refeições */}
        <div className="lg:col-span-3 space-y-6">
          <Card
            title="Café da Manhã"
            actions={<Button className="text-xs !p-2"><PlusCircle size={16} className="mr-2" /> Adicionar Alimento</Button>}
          >
            <p className="text-sm text-gray-400">Nenhum alimento adicionado.</p>
          </Card>

          <Card
            title="Almoço"
            actions={<Button className="text-xs !p-2"><PlusCircle size={16} className="mr-2" /> Adicionar Alimento</Button>}
          >
            <p className="text-sm text-gray-400">Nenhum alimento adicionado.</p>
          </Card>

          <Card
            title="Jantar"
            actions={<Button className="text-xs !p-2"><PlusCircle size={16} className="mr-2" /> Adicionar Alimento</Button>}
          >
             <p className="text-sm text-gray-400">Nenhum alimento adicionado.</p>
          </Card>
        </div>

        {/* Coluna Lateral com o Resumo */}
        <aside className="lg:col-span-1">
          <div className="sticky top-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Resumo do Plano</h3>
            <div className="space-y-3">
              <div className="flex justify-between font-medium">
                <span>Meta Calórica</span>
                <span>{metas.metaCalorica} kcal</span>
              </div>
              <hr/>
              <div className="flex justify-between">
                <span className="text-gray-600">Proteínas</span>
                <span>0g / {metas.proteinas}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Carboidratos</span>
                <span>0g / {metas.carboidratos}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gorduras</span>
                <span>0g / {metas.gorduras}g</span>
              </div>
              <hr/>
               <div className="flex justify-between font-bold text-lg text-cyan-600">
                <span>Total de Calorias</span>
                <span>0 kcal</span>
              </div>
            </div>
            <Button className="w-full mt-6">Salvar Plano</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
