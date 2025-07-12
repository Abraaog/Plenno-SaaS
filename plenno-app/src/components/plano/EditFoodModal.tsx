// src/components/plano/EditFoodModal.tsx
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import type { Alimento } from '../../utils/foodDatabase';

const editFoodSchema = z.object({
  quantidade: z.string()
    .refine(val => {
      const num = parseFloat(val.replace(',', '.'));
      return !isNaN(num) && num > 0;
    }, {
      message: "A quantidade deve ser um número positivo."
    }),
});

type EditFoodFormData = z.infer<typeof editFoodSchema>;

interface AlimentoNoPlano extends Alimento {
    quantidade: number;
}

interface EditFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateFood: (novaQuantidade: number) => void;
  alimento: AlimentoNoPlano | null;
}

export function EditFoodModal({ isOpen, onClose, onUpdateFood, alimento }: EditFoodModalProps) {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<EditFoodFormData>({
    resolver: zodResolver(editFoodSchema),
  });

  useEffect(() => {
    if (alimento) {
      setValue('quantidade', String(alimento.quantidade));
    }
  }, [alimento, setValue]);

  const onSubmit: SubmitHandler<EditFoodFormData> = (data) => {
    onUpdateFood(parseFloat(data.quantidade.replace(',', '.')));
    reset();
    onClose();
  };

  if (!alimento) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Editar ${alimento.nome}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">
            Nova Quantidade ({alimento.unidadeDeMedida === 'unidade' ? 'unidades' : 'g'})
          </label>
          <input 
            id="quantidade" 
            type="text"
            inputMode="decimal"
            {...register("quantidade")} 
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500" 
            placeholder="Ex: 150"
          />
          {errors.quantidade && <p className="mt-1 text-xs text-red-500">{errors.quantidade.message}</p>}
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 hover:bg-gray-300">Cancelar</Button>
          <Button type="submit">Atualizar</Button>
        </div>
      </form>
    </Modal>
  );
}
