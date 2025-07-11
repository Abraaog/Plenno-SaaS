// src/utils/foodDatabase.ts
export interface Alimento {
  id: number;
  nome: string;
  kcal: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
  unidadeDeMedida: 'g' | 'unidade'; // 'g' para gramas, 'unidade' para itens contáveis
}

export const foodDatabase: Alimento[] = [
  // Para 'unidade', os valores são por unidade. Para 'g', são por 100g.
  { id: 1, nome: 'Ovo Cozido', kcal: 77, proteinas: 6.3, carboidratos: 0.6, gorduras: 5.3, unidadeDeMedida: 'unidade' },
  { id: 2, nome: 'Peito de Frango Grelhado', kcal: 165, proteinas: 31, carboidratos: 0, gorduras: 3.6, unidadeDeMedida: 'g' },
  { id: 3, nome: 'Arroz Branco Cozido', kcal: 130, proteinas: 2.7, carboidratos: 28, gorduras: 0.3, unidadeDeMedida: 'g' },
  { id: 4, nome: 'Brócolos Cozidos', kcal: 34, proteinas: 2.8, carboidratos: 6.6, gorduras: 0.4, unidadeDeMedida: 'g' },
  { id: 5, nome: 'Batata Doce Cozida', kcal: 86, proteinas: 1.6, carboidratos: 20.1, gorduras: 0.1, unidadeDeMedida: 'g' },
  { id: 6, nome: 'Salmão Grelhado', kcal: 208, proteinas: 20, carboidratos: 0, gorduras: 13, unidadeDeMedida: 'g' },
  { id: 7, nome: 'Azeite de Oliva', kcal: 119, proteinas: 0, carboidratos: 0, gorduras: 13.5, unidadeDeMedida: 'g' }, // Assumindo colher de sopa ~15g
  { id: 8, nome: 'Pão de Forma Integral', kcal: 69, proteinas: 3.6, carboidratos: 13, gorduras: 1.1, unidadeDeMedida: 'unidade' },
];
