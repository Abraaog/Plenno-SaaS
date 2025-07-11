import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { calcularIMC, calcularTMB, calcularMetasDiarias } from '../../utils/calculations';
import { Button } from '../../components/ui/Button';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Target, HeartPulse, Flame } from 'lucide-react';

// Tipagem para os resultados das metas
interface Metas {
  metaCalorica: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
}

// Dados fictícios para simulação (depois será substituído por API)
const alunosFicticios = [
  { id: 1, nome: 'Ana Silva', objetivo: 'Emagrecer' },
  { id: 2, nome: 'Bruno Costa', objetivo: 'Ganhar Massa Muscular' },
  { id: 3, nome: 'Carla Dias', objetivo: 'Manter Peso' },
];

// Esquema de validação com transformação segura
const dadosFisicosSchema = z.object({
  peso: z.preprocess(
    (val) => {
      const num = Number(String(val).replace(',', '.'));
      return isNaN(num) ? val : num;
    },
    z.number().positive("Peso deve ser positivo")
  ),
  altura: z.preprocess(
    (val) => Number(val),
    z.number().int().positive("Altura deve ser positiva")
  ),
  idade: z.preprocess(
    (val) => Number(val),
    z.number().int().positive("Idade deve ser positiva")
  ),
  genero: z.enum(['masculino', 'feminino']),
  nivelAtividade: z.enum(['sedentario', 'leve', 'moderado', 'ativo', 'muito_ativo']),
  objetivo: z.enum(['emagrecer', 'manter', 'ganhar_massa']),
});

type DadosFisicosFormData = z.infer<typeof dadosFisicosSchema>;

export function AlunoDetailPage() {
  const { id } = useParams<{ id: string }>(); // Captura o id da rota
  const aluno = alunosFicticios.find((aluno) => aluno.id === Number(id)); // Busca o aluno pelo id

  const [imc, setImc] = useState<number | null>(null);
  const [tmb, setTmb] = useState<number | null>(null);
  const [metas, setMetas] = useState<Metas | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dadosFisicosSchema),
    defaultValues: {
      genero: 'feminino',
      nivelAtividade: 'leve',
      objetivo: aluno?.objetivo.toLowerCase() as DadosFisicosFormData['objetivo'] || 'manter', // Preenche o objetivo do aluno
    },
  });

  const onSubmit: SubmitHandler<DadosFisicosFormData> = (data) => {
    const tmbCalculado = calcularTMB(data);
    setImc(calcularIMC(data.peso, data.altura));
    setTmb(tmbCalculado);
    setMetas(calcularMetasDiarias(tmbCalculado, data.nivelAtividade, data.objetivo));
  };

  const macroData = metas ? [
    { name: 'Carboidratos', value: metas.carboidratos, fill: '#38bdf8' },
    { name: 'Proteínas', value: metas.proteinas, fill: '#fb923c' },
    { name: 'Gorduras', value: metas.gorduras, fill: '#facc15' },
  ] : [];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Detalhes de {aluno ? aluno.nome : 'Aluno não encontrado'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna de Formulário */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Avaliação e Metas</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="peso" className="block text-sm font-medium text-gray-700">Peso (kg)</label>
                <input 
                  id="peso" 
                  type="text" 
                  {...register("peso")} 
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500" 
                />
                {errors.peso && <p className="mt-1 text-xs text-red-500">{errors.peso.message}</p>}
              </div>

              <div>
                <label htmlFor="altura" className="block text-sm font-medium text-gray-700">Altura (cm)</label>
                <input 
                  id="altura" 
                  type="number" 
                  {...register("altura")} 
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500" 
                />
                {errors.altura && <p className="mt-1 text-xs text-red-500">{errors.altura.message}</p>}
              </div>

              <div>
                <label htmlFor="idade" className="block text-sm font-medium text-gray-700">Idade</label>
                <input 
                  id="idade" 
                  type="number" 
                  {...register("idade")} 
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500" 
                />
                {errors.idade && <p className="mt-1 text-xs text-red-500">{errors.idade.message}</p>}
              </div>

              <div>
                <label htmlFor="genero" className="block text-sm font-medium text-gray-700">Gênero</label>
                <select 
                  id="genero" 
                  {...register("genero")} 
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value="feminino">Feminino</option>
                  <option value="masculino">Masculino</option>
                </select>
              </div>

              <div className="md:col-span-1">
                <label htmlFor="nivelAtividade" className="block text-sm font-medium text-gray-700">Nível de Atividade</label>
                <select 
                  id="nivelAtividade" 
                  {...register("nivelAtividade")} 
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value="sedentario">Sedentário</option>
                  <option value="leve">Leve (1-3 dias/semana)</option>
                  <option value="moderado">Moderado (3-5 dias/semana)</option>
                  <option value="ativo">Ativo (6-7 dias/semana)</option>
                  <option value="muito_ativo">Muito Ativo (trabalho físico)</option>
                </select>
              </div>

              <div className="md:col-span-1">
                <label htmlFor="objetivo" className="block text-sm font-medium text-gray-700">Objetivo Principal</label>
                <select 
                  id="objetivo" 
                  {...register("objetivo")} 
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value="emagrecer">Emagrecer</option>
                  <option value="manter">Manter Peso</option>
                  <option value="ganhar_massa">Ganhar Massa Muscular</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <Button type="submit">Calcular Metas</Button>
              </div>
            </form>
          </div>
        </div>

        {/* Coluna de Resultados com Gráficos */}
        <div className="ӣ
space-y-6">
          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <div className="bg-red-100 p-3 rounded-lg"><HeartPulse className="h-6 w-6 text-red-500" /></div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">IMC</p>
              <p className="text-2xl font-bold text-gray-800">{imc ? imc.toFixed(2) : 'N/A'}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg"><Flame className="h-6 w-6 text-yellow-500" /></div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Metabolismo Basal (TMB)</p>
              <p className="text-2xl font-bold text-gray-800">{tmb ? `${tmb.toFixed(0)} kcal` : 'N/A'}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <div className="bg-green-100 p-3 rounded-lg"><Target className="h-6 w-6 text-green-500" /></div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Meta Calórica Diária</p>
              <p className="text-2xl font-bold text-gray-800">{metas ? `${metas.metaCalorica.toFixed(0)} kcal` : 'N/A'}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Distribuição de Macros (g)</h3>
            {metas ? (
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie 
                      data={macroData} 
                      dataKey="value" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={60} 
                      label={(entry) => `${entry.value}g`}
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value}g`, name]} />
                    <Legend iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center">Preencha os dados e clique em calcular.</p>
            )}
            <Link to={`/alunos/${id}/plano-alimentar`}>
              <Button className="w-full mt-6">Criar Plano Alimentar</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}