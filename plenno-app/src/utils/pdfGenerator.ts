// src/utils/pdfGenerator.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Alimento } from './foodDatabase';

// Estendendo a interface do jsPDF para incluir a propriedade do autoTable de forma segura
interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable: {
    finalY: number;
  };
}

interface AlimentoNoPlano extends Alimento {
  quantidade: number;
  totalKcal: number;
  totalProteinas: number;
  totalCarboidratos: number;
  totalGorduras: number;
}

type PlanoAlimentar = {
  [key: string]: AlimentoNoPlano[];
};

interface DadosAluno {
  nome: string;
}

interface Metas {
  metaCalorica: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
}

interface Totais {
  kcal: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
}

// Função para gerar o PDF do plano alimentar
export function gerarPlanoPDF(plano: PlanoAlimentar, aluno: DadosAluno, metas: Metas, totais: Totais) {
  const doc = new jsPDF() as jsPDFWithAutoTable;

  // Cabeçalho
  doc.setFontSize(20);
  doc.setTextColor(40);
  doc.text("Plano Alimentar - Plenno", 14, 22);
  doc.setFontSize(14);
  doc.text(`Cliente: ${aluno.nome}`, 14, 32);

  // Resumo de Metas e Totais
  autoTable(doc, {
    startY: 40,
    head: [['Metas e Totais', 'Valor']],
    body: [
      ['Meta Calórica', `${metas.metaCalorica} kcal`],
      ['Total de Calorias', `${Math.round(totais.kcal)} kcal`],
      ['Proteínas', `${Math.round(totais.proteinas)}g / ${metas.proteinas}g`],
      ['Carboidratos', `${Math.round(totais.carboidratos)}g / ${metas.carboidratos}g`],
      ['Gorduras', `${Math.round(totais.gorduras)}g / ${metas.gorduras}g`],
    ],
    theme: 'striped',
    headStyles: { fillColor: [36, 57, 94] }, // Cor brand-blue
  });

  // Refeições
  let finalY = doc.lastAutoTable.finalY + 15;

  Object.entries(plano).forEach(([refeicao, alimentos]) => {
    if (alimentos.length > 0) {
      autoTable(doc, {
        startY: finalY,
        head: [[refeicao, 'Quantidade', 'Calorias']],
        body: alimentos.map(alimento => [
          alimento.nome,
          `${alimento.quantidade}${alimento.unidadeDeMedida === 'g' ? 'g' : (alimento.quantidade > 1 ? ' unidades' : ' unidade')}`,
          `${Math.round(alimento.totalKcal)} kcal`
        ]),
        theme: 'grid',
        headStyles: { fillColor: [63, 207, 142] }, // Cor brand-green
      });
      finalY = doc.lastAutoTable.finalY + 10;
    }
  });

  // Rodapé
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width / 2, 287, { align: 'center' });
  }

  // Salvar o PDF
  doc.save(`plano-alimentar-${aluno.nome.toLowerCase().replace(/ /g, '-')}.pdf`);
}

// ====================
// Novas Interfaces
// ====================
interface Exercicio {
  nome: string;
  series: string;
  repeticoes: string;
  observacao?: string;
}

interface Treino {
  id: number;
  nome: string;
  exercicios: Exercicio[];
}

// ====================
// Nova Função: gerarFichaDeTreinoPDF
// ====================
export function gerarFichaDeTreinoPDF(treinos: Treino[], aluno: DadosAluno) {
  const doc = new jsPDF() as jsPDFWithAutoTable;

  // Cabeçalho
  doc.setFontSize(20);
  doc.setTextColor(40);
  doc.text("Ficha de Treino - Plenno", 14, 22);
  doc.setFontSize(14);
  doc.text(`Cliente: ${aluno.nome}`, 14, 32);

  let finalY = 40;

  treinos.forEach((treino, index) => {
    if (index > 0) {
      finalY += 10;
    }

    autoTable(doc, {
      startY: finalY,
      head: [[
        { content: treino.nome, colSpan: 4, styles: { halign: 'center', fillColor: [36, 57, 94] } }
      ],
      ['Exercício', 'Séries', 'Repetições', 'Observação']],
      body: treino.exercicios.map(ex => [
        ex.nome,
        ex.series,
        ex.repeticoes,
        ex.observacao || ''
      ]),
      theme: 'grid',
    });

    finalY = doc.lastAutoTable.finalY;
  });

  // Rodapé
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width / 2, 287, { align: 'center' });
  }

  // Salvar o PDF
  doc.save(`ficha-de-treino-${aluno.nome.toLowerCase().replace(/ /g, '-')}.pdf`);
}
