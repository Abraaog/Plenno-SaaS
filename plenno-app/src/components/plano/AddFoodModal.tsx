// src/components/plano/AddFoodModal.tsx
import { useState, useMemo, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { foodDatabase, type Alimento } from '../../utils/foodDatabase';
import { Search } from 'lucide-react';

const addFoodSchema = z.object({
  alimentoId: z.string().min(1, "Por favor, selecione um alimento."),
  quantidade: z.string()
    .refine(val => {
      const num = parseFloat(val.replace(',', '.'));
      return !isNaN(num) && num > 0;
    }, {
      message: "A quantidade deve ser um número positivo."
    }),
});

type FormInputs = z.infer<typeof addFoodSchema>;

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFood: (alimento: Alimento, quantidade: number) => void;
}

export function AddFoodModal({ isOpen, onClose, onAddFood }: AddFoodModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFoodUnit, setSelectedFoodUnit] = useState<'g' | 'unidade' | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormInputs>({
    resolver: zodResolver(addFoodSchema),
  });

  const watchedAlimentoId = watch("alimentoId");

  useEffect(() => {
    if (watchedAlimentoId) {
        const food = foodDatabase.find(f => f.id === Number(watchedAlimentoId));
        setSelectedFoodUnit(food?.unidadeDeMedida ?? null);
    } else {
        setSelectedFoodUnit(null);
    }
  }, [watchedAlimentoId]);

  const filteredFood = useMemo(() => {
    if (!searchTerm) return foodDatabase;
    return foodDatabase.filter(food => 
      food.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const onSubmit: SubmitHandler<FormInputs> = (formData) => {
    const alimentoSelecionado = foodDatabase.find(food => 
      food.id === parseInt(formData.alimentoId, 10)
    );
    
    if (alimentoSelecionado) {
      onAddFood(alimentoSelecionado, parseFloat(formData.quantidade.replace(',', '.')));
      reset();
      setSearchTerm('');
      onClose();
    }
  };

  const handleClose = () => {
    reset();
    setSearchTerm('');
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Adicionar Alimento">
      <div className="relative mb-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="Buscar alimento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-10 py-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="alimentoId" className="block text-sm font-medium text-gray-700">Alimento</label>
          <select 
            id="alimentoId" 
            {...register("alimentoId")} 
            className="w-full h-32 px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
            size={5}
          >
            {filteredFood.length > 0 ? filteredFood.map(alimento => (
              <option key={alimento.id} value={alimento.id} className="p-2 hover:bg-cyan-100">
                {alimento.nome}
              </option>
            )) : (
              <option disabled>Nenhum alimento encontrado</option>
            )}
          </select>
          {errors.alimentoId && <p className="mt-1 text-xs text-red-500">{errors.alimentoId.message}</p>}
        </div>
        <div>
          <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">
            Quantidade ({selectedFoodUnit === 'unidade' ? 'unidades' : 'g'})
          </label>
          <input 
            id="quantidade" 
            type="text"
            inputMode="decimal"
            {...register("quantidade")} 
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500" 
            placeholder="Ex: 100.5"
          />
          {errors.quantidade && <p className="mt-1 text-xs text-red-500">{errors.quantidade.message}</p>}
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" onClick={handleClose} className="bg-gray-200 text-gray-800 hover:bg-gray-300">Cancelar</Button>
          <Button type="submit">Adicionar</Button>
        </div>
      </form>
    </Modal>
  );
}
