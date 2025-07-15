// src/components/plano/AgendaModal.tsx
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

const agendamentoSchema = z.object({
  title: z.string().min(3, "O título é obrigatório."),
  start: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Data de início inválida" }),
  end: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Data de fim inválida" }),
  alunoId: z.string().optional(),
}).refine(data => new Date(data.start) < new Date(data.end), {
    message: "A data de fim deve ser posterior à data de início.",
    path: ["end"], // Aponta o erro para o campo 'end'
});

type AgendamentoFormData = z.infer<typeof agendamentoSchema>;

// Interface de props corrigida para aceitar Date
interface AgendaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AgendamentoFormData, id?: number) => void;
  onDelete?: (id: number) => void;
  evento: {
     id?: number;
     title?: string;
     start: Date;
     end: Date;
     alunoId?: string;
  } | null;
}

const alunos = [
    { id: '1', nome: 'Ana Silva' },
    { id: '2', nome: 'Bruno Costa' },
    { id: '3', nome: 'Carla Dias' },
];

export function AgendaModal({ isOpen, onClose, onSave, onDelete, evento }: AgendaModalProps) {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<AgendamentoFormData>({
    resolver: zodResolver(agendamentoSchema),
  });

  useEffect(() => {
    if (isOpen && evento) {
      const formatForInput = (date: Date) => {
        // Converte o fuso horário local para o formato YYYY-MM-DDTHH:mm
        const d = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
        return d.toISOString().slice(0, 16);
      };

      setValue('title', evento.title || '');
      setValue('start', formatForInput(evento.start));
      setValue('end', formatForInput(evento.end));
      setValue('alunoId', evento.alunoId || '');
    } else if (!isOpen) {
      reset();
    }
  }, [evento, isOpen, setValue, reset]);

  const onSubmit: SubmitHandler<AgendamentoFormData> = (data) => {
    onSave(data, evento?.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={evento?.id ? "Editar Atendimento" : "Novo Atendimento"}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
          <input id="title" type="text" {...register("title")} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md" />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="alunoId" className="block text-sm font-medium text-gray-700">Aluno</label>
          <select id="alunoId" {...register("alunoId")} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md">
            <option value="">Nenhum aluno selecionado</option>
            {alunos.map(aluno => <option key={aluno.id} value={aluno.id}>{aluno.nome}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="start" className="block text-sm font-medium text-gray-700">Início</label>
            <input id="start" type="datetime-local" {...register("start")} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md" />
             {errors.start && <p className="mt-1 text-xs text-red-500">{errors.start.message}</p>}
          </div>
          <div>
            <label htmlFor="end" className="block text-sm font-medium text-gray-700">Fim</label>
            <input id="end" type="datetime-local" {...register("end")} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md" />
             {errors.end && <p className="mt-1 text-xs text-red-500">{errors.end.message}</p>}
          </div>
        </div>
        <div className="flex justify-between items-center pt-4">
            <div>
                {evento?.id && onDelete && (
                    <Button type="button" onClick={() => { onDelete(evento.id!); onClose(); }} className="bg-red-500 hover:bg-red-600">
                        Excluir
                    </Button>
                )}
            </div>
            <div className="flex gap-4">
                <Button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 hover:bg-gray-300">Cancelar</Button>
                <Button type="submit">Salvar</Button>
            </div>
        </div>
      </form>
    </Modal>
  );
}
