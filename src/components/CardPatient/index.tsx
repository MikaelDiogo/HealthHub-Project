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

  const getInitials = (name: string) => {
    if (!name) return "?";
    return name.split(' ').filter(n => n).map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <Card 
      withBorder 
      padding="lg" 
      radius="md" 
      className="bg-white shadow-md! w-full max-w-md p-0! overflow-hidden!"
    >
      {/* Topo com Gradiente Azul -> Verde */}
      <div className="h-2! w-full bg-gradient-to-r from-blue-500 to-emerald-400" />

      <div className="p-4">
        {/* Cabeçalho */}
        <Group mb="lg" wrap="nowrap">
          <Avatar 
            size={50} 
            radius={100} 
            className="bg-gradient-to-br from-blue-500/10 to-emerald-400/10 text-blue-600! border border-blue-100! font-bold! text-xl!"
          >
            {getInitials(patientName)}
          </Avatar>

          <div className="flex flex-col">
            <Text className="text-slate-700! font-bold! text-xl! leading-tight">
              {patientName}
            </Text>
            <Text className="text-slate-400 text-sm!">
              {patientAge} anos · {patientGender}
            </Text>
          </div>
        </Group>

        {/* Grid de Sinais Vitais */}
        <div className="grid! grid-cols-3! gap-3! mb-6!">
          {[
            { label: temp, icon: <IconTemperature size={20} />, color: 'text-blue-500' },
            { label: bpm, icon: <IconHeartRateMonitor size={20} />, color: 'text-blue-500' },
            { label: spo2, icon: <IconActivity size={20} />, color: 'text-emerald-500' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="bg-white p-2 rounded-lg mb-2 shadow-sm">
                <span className={item.color}>{item.icon}</span>
              </div>
              <Text className="text-slate-700! font-bold! text-lg!">{item.label}</Text>
            </div>
          ))}
        </div>

        {/* Botões de Ação com Gradiente */}
        <Group grow>
          {/* Botão Visualizar: Borda e Texto que remetem ao gradiente */}
          <Button 
            variant="outline" 
            radius="md" 
            size="md"
            leftSection={<IconEye size={18} className="text-blue-500" />}
            className="border-blue-200! hover:bg-blue-50/30! font-semibold! transition-all!"
            onClick={onView}
          >
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent!">
              Visualizar
            </span>
          </Button>
          
          {/* Botão Editar: Gradiente Cheio */}
          <Button 
            variant="filled" 
            radius="md" 
            size="md"
            leftSection={<IconPencil size={18} />}
            className="bg-gradient-to-r! from-blue-500 to-emerald-400! hover:from-blue-600 hover:to-emerald-500! border-0! font-semibold! text-white! shadow-sm! transition-all!"
            onClick={onEdit}
          >
            Editar
          </Button>
        </Group>
      </div>
    </Card>
  );
};

export default CardPatient;