import { Card, Text, Avatar, Button, Group } from '@mantine/core';
import { 
  IconHeartRateMonitor, 
  IconActivity, 
  IconEye, 
  IconPencil, 
  IconTemperature
} from '@tabler/icons-react';
import './styles.css'

interface CardPatientProps {
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  temp?: string;
  bpm?: string;
  spo2?: string;
  onView?: () => void; 
  onEdit?: () => void; 
}

const CardPatient = ({ 
  patientName, 
  patientAge, 
  patientGender,
  onView,
  onEdit,
  temp = "--", 
  bpm = "--", 
  spo2 = "--" 
}: CardPatientProps) => {

  // Função para pegar as iniciais (ex: Maria Silva -> MS)
  const getInitials = (name: string) => {
    if (!name) return "?";
    return name.split(' ').filter(n => n).map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <Card 
      withBorder 
      padding="lg" 
      radius="md" 
      className="bg-white shadow-md! w-full max-w-md border-t-4! border-t-cyan-600/70! "
    >
      {/* Cabeçalho: Avatar e Informações do Paciente */}
      <Group mb="lg" wrap="nowrap">
        <Avatar 
          size={50} 
          radius={100} 
          color='cyan'
          className="bg-blue-700/10 text-white! border border-cyan-800/30! font-bold! text-xl! shadow-md!"
        >
          {getInitials(patientName)}
        </Avatar>

        <div className="flex flex-col">
          <Text className="text-cyan-700! font-bold! text-xl! leading-tight">
            {patientName}
          </Text>
          <Text className="text-blue-400 text-sm!">
            {patientAge} anos · {patientGender}
          </Text>
        </div>
      </Group>

      {/* Grid de Sinais Vitais (3 Colunas) */}
      <div className="grid! grid-cols-3! gap-3! mb-6!">
        
        {/* Temperatura */}
        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-cyan-50/50 border border-blue-50">
          <div className="bg-white p-2 rounded-lg mb-2 shadow-sm">
            <IconTemperature size={22} className="text-cyan-500" />
          </div>
          <Text className="text-blue-900! font-bold! text-lg!">{temp}</Text>
        </div>

        {/* BPM */}
        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-cyan-50/50 border border-blue-50">
          <div className="bg-white p-2 rounded-lg mb-2 shadow-sm">
            <IconHeartRateMonitor size={22} className="text-cyan-500" />
          </div>
          <Text className="text-blue-900! font-bold! text-lg!">{bpm}</Text>
        </div>

        {/* Saturação (SpO2) */}
        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-cyan-50/50 border border-blue-50">
          <div className="bg-white p-2 rounded-lg mb-2 shadow-sm">
            <IconActivity size={22} className="text-cyan-500" />
          </div>
          <Text className="text-blue-900! font-bold! text-lg!">{spo2}</Text>
        </div>
      </div>

      {/* Botões de Ação */}
      <Group grow>
        <Button 
          variant="outline" 
          radius="md" 
          size="md"
          leftSection={<IconEye size={18} />}
          className="border-cyan-200! text-cyan-900! hover:bg-cyan-50! font-medium!"
          onClick={onView} // Aciona a abertura do Modal de Visualização
        >
          Visualizar
        </Button>
        <Button 
          variant="filled" 
          radius="md" 
          size="md"
          leftSection={<IconPencil size={18} />}
          className="bg-cyan-800! hover:bg-cyan-700! font-medium!"
          onClick={onEdit} // Aciona a abertura do Modal de Edição
        >
          Editar
        </Button>
      </Group>
    </Card>
  );
};

export default CardPatient;