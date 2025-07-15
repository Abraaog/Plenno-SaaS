// src/components/plano/EditExercicioModal.tsx
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import type { ExercicioFormData } from './AddExercicioModal'; // Reutilizamos o tipo

interface EditExercicioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateExercicio: (data: ExercicioFormData) => void;
  exercicio: ExercicioFormData | null;
}

const exercicioSchema = z.object({
  nome: z.string().min(3, "O nome do exercício é obrigatório."),
  series: z.string().min(1, "As séries são obrigatórias."),
  repeticoes: z.string().min(1, "As repetições são obrigatórias."),
  observacao: z.string().optional(),
});

export function EditExercicioModal({ isOpen, onClose, onUpdateExercicio, exercicio }: EditExercicioModalProps) {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ExercicioFormData>({
    resolver: zodResolver(exercicioSchema),
  });

  useEffect(() => {
    if (exercicio) {
      setValue('nome', exercicio.nome);
      setValue('series', exercicio.series);
      setValue('repeticoes', exercicio.repeticoes);
      setValue('observacao', exercicio.observacao);
    }
  }, [exercicio, setValue]);

  const onSubmit: SubmitHandler<ExercicioFormData> = (data) => {
    onUpdateExercicio(data);
    reset();
    onClose();
  };

  if (!exercicio) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Editar Exercício: ${exercicio.nome}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome do Exercício</label>
          <input id="nome" type="text" {...register("nome")} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md" />
          {errors.nome && <p className="mt-1 text-xs text-red-500">{errors.nome.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="series" className="block text-sm font-medium text-gray-700">Séries</label>
            <input id="series" type="text" {...register("series")} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md" placeholder="Ex: 4" />
            {errors.series && <p className="mt-1 text-xs text-red-500">{errors.series.message}</p>}
          </div>
          <div>
            <label htmlFor="repeticoes" className="block text-sm font-medium text-gray-700">Repetições</label>
            <input id="repeticoes" type="text" {...register("repeticoes")} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md" placeholder="Ex: 10-12" />
            {errors.repeticoes && <p className="mt-1 text-xs text-red-500">{errors.repeticoes.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="observacao" className="block text-sm font-medium text-gray-700">Observação (Opcional)</label>
          <textarea id="observacao" {...register("observacao")} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md" rows={2}></textarea>
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 hover:bg-gray-300">Cancelar</Button>
          <Button type="submit">Atualizar Exercício</Button>
        </div>
      </form>
    </Modal>
  );
}
