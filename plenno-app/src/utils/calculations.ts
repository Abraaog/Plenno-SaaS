// src/utils/calculations.ts

interface DadosCalculoTMB {
  genero: 'masculino' | 'feminino';
  peso: number; // em kg
  altura: number; // em cm
  idade: number; // em anos
}

type NivelAtividade = 'sedentario' | 'leve' | 'moderado' | 'ativo' | 'muito_ativo';
type Objetivo = 'emagrecer' | 'manter' | 'ganhar_massa';

// Fatores de atividade física
const fatoresAtividade = {
  sedentario: 1.2,
  leve: 1.375,
  moderado: 1.55,
  ativo: 1.725,
  muito_ativo: 1.9,
};

// Função para calcular o Índice de Massa Corporal (IMC)
export function calcularIMC(peso: number, altura: number): number {
  if (peso <= 0 || altura <= 0) return 0;
  const alturaEmMetros = altura / 100;
  const imc = peso / (alturaEmMetros * alturaEmMetros);
  return parseFloat(imc.toFixed(2));
}

// Função para calcular a Taxa Metabólica Basal (TMB) - Harris-Benedict
export function calcularTMB({ genero, peso, altura, idade }: DadosCalculoTMB): number {
  if (peso <= 0 || altura <= 0 || idade <= 0) return 0;

  let tmb: number;
  if (genero === 'masculino') {
    tmb = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);
  } else { // feminino
    tmb = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
  }
  return parseFloat(tmb.toFixed(2));
}

// Função para calcular as metas diárias completas
export function calcularMetasDiarias(tmb: number, nivelAtividade: NivelAtividade, objetivo: Objetivo) {
  const gastoCaloricoTotal = tmb * fatoresAtividade[nivelAtividade];

  let metaCalorica = gastoCaloricoTotal;
  if (objetivo === 'emagrecer') {
    metaCalorica -= 300; // Défice calórico
  } else if (objetivo === 'ganhar_massa') {
    metaCalorica += 300; // Superávite calórico
  }

  // Distribuição de Macros (ex: 40% C, 30% P, 30% G)
  const carboidratos = (metaCalorica * 0.40) / 4; // 4 kcal por grama
  const proteinas = (metaCalorica * 0.30) / 4; // 4 kcal por grama
  const gorduras = (metaCalorica * 0.30) / 9; // 9 kcal por grama

  return {
    metaCalorica: Math.round(metaCalorica),
    carboidratos: Math.round(carboidratos),
    proteinas: Math.round(proteinas),
    gorduras: Math.round(gorduras),
  };
}
