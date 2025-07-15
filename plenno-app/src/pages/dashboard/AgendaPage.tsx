// src/pages/dashboard/AgendaPage.tsx
import { useState, useCallback } from 'react';
import { Calendar, dateFnsLocalizer, type SlotInfo } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '../../components/ui/Button';
import { PlusCircle } from 'lucide-react';
import { AgendaModal } from '../../components/plano/AgendaModal';

const locales = { 'pt-BR': ptBR };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

// Interface para o nosso evento, garantindo que o título é uma string
interface MeuEvento {
  id: number;
  title: string;
  start: Date;
  end: Date;
  type?: 'atendimento' | 'avaliacao';
  alunoId?: string;
}

const eventosIniciais: MeuEvento[] = [
  { id: 1, title: 'Atendimento - Ana Silva', start: new Date(2025, 6, 15, 15, 0, 0), end: new Date(2025, 6, 14, 15, 0, 0), type: 'atendimento', alunoId: '1' },
  { id: 2, title: 'Avaliação - Bruno Costa', start: new Date(2025, 6, 14, 14, 0, 0), end: new Date(2025, 6, 14, 15, 0, 0), type: 'avaliacao', alunoId: '2' },
];

export function AgendaPage() {
  const [eventos, setEventos] = useState<MeuEvento[]>(eventosIniciais);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<MeuEvento | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);

  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    setSelectedEvent(null);
    setSelectedSlot(slotInfo);
    setIsModalOpen(true);
  }, []);

  const handleSelectEvent = useCallback((event: object) => {
    setSelectedEvent(event as MeuEvento); // Casting para o nosso tipo
    setSelectedSlot(null);
    setIsModalOpen(true);
  }, []);

  const handleSaveEvent = (data: { title: string; start: string; end: string; alunoId?: string }, id?: number) => {
     const eventoExistente = id ? eventos.find(e => e.id === id) : null;

     const novoEvento: MeuEvento = {
         id: id ?? Date.now(),
         title: data.title,
         start: new Date(data.start),
         end: new Date(data.end),
         alunoId: data.alunoId,
         type: eventoExistente?.type || 'atendimento',
     };

     if (id) {
         setEventos(prev => prev.map(e => (e.id === id ? novoEvento : e)));
     } else {
         setEventos(prev => [...prev, novoEvento]);
     }
  };

  const handleDeleteEvent = (id: number) => {
    setEventos(prev => prev.filter(e => e.id !== id));
  };

  const eventPropGetter = useCallback(
    (event: MeuEvento) => ({
      ...(event.type === 'avaliacao' && {
        className: 'bg-yellow-500 border-yellow-500',
      }),
      ...(event.type === 'atendimento' && {
        className: 'bg-cyan-500 border-cyan-500',
      }),
    }),
    []
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Minha Agenda</h1>
        <Button onClick={() => { setSelectedSlot(null); setSelectedEvent(null); setIsModalOpen(true); }}>
          <PlusCircle size={16} className="mr-2" />
          Novo Atendimento
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow h-[70vh]">
        <Calendar
          localizer={localizer}
          events={eventos}
          defaultView="day"
          defaultDate={new Date()}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventPropGetter}
          messages={{
            next: "Próximo", previous: "Anterior", today: "Hoje", month: "Mês",
            week: "Semana", day: "Dia", agenda: "Agenda", date: "Data",
            time: "Hora", event: "Evento", noEventsInRange: "Não há atendimentos neste período.",
          }}
        />
      </div>
      <AgendaModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        evento={selectedEvent || (selectedSlot ? { start: selectedSlot.start, end: selectedSlot.end } : null)}
      />
    </div>
  );
}
