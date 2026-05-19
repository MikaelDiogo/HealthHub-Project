import { IconAlertTriangle, IconDroplet, IconHeartRateMonitor, IconTemperature, IconChecks } from '@tabler/icons-react';
import { Group, Paper, SimpleGrid, ThemeIcon, Text, Stack, Box } from '@mantine/core';

interface CardDashboardProps {
  patient: any;
}

export const CardDashboard = ({ patient }: CardDashboardProps) => {
  const currentVitals = patient?.sinaisVitais?.[0] || {};
  const hasVitals = !!currentVitals.created_at;
  
  const isHypoxic = hasVitals && currentVitals.saturacao_oxigenio < 92;
  const isTachycardic = hasVitals && currentVitals.frequencia_cardiaca > 100;
  const isCritical = isHypoxic || isTachycardic;

  const stats = [
    { 
      label: 'Saturação', 
      value: currentVitals.saturacao_oxigenio ? `${currentVitals.saturacao_oxigenio}%` : '--', 
      icon: IconDroplet, 
      color: isHypoxic ? 'red' : 'green',
      bgColor: isHypoxic ? 'rgba(250, 82, 82, 0.05)' : 'rgba(64, 192, 87, 0.05)',
      iconBorder: isHypoxic ? '#fa5252' : '#40c057'
    },
    { 
      label: 'Freq. Cardíaca', 
      value: currentVitals.frequencia_cardiaca || '--', 
      unit: 'bpm',
      icon: IconHeartRateMonitor, 
      color: isTachycardic ? 'red' : 'blue',
      bgColor: isTachycardic ? 'rgba(250, 82, 82, 0.05)' : 'rgba(34, 139, 230, 0.05)',
      iconBorder: isTachycardic ? '#fa5252' : '#228be6'
    },
    { 
      label: 'Temperatura', 
      value: currentVitals.temperatura ? `${currentVitals.temperatura}` : '--', 
      unit: '°C',
      icon: IconTemperature, 
      color: 'orange', 
      bgColor: 'rgba(255, 146, 43, 0.05)',
      iconBorder: '#ff922b'
    },
    { 
      label: 'Status', 
      value: !patient ? '--' : (!hasVitals ? 'Sem Dados' : (isCritical ? 'Crítico' : 'Estável')), 
      icon: !hasVitals ? IconAlertTriangle : (isCritical ? IconAlertTriangle : IconChecks), 
      color: !hasVitals ? 'gray' : (isCritical ? 'red' : 'green'), 
      bgColor: isCritical ? 'rgba(250, 82, 82, 0.08)' : 'rgba(134, 142, 150, 0.05)',
      iconBorder: isCritical ? '#fa5252' : '#868e96'
    },
  ];

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
      {stats.map((stat) => (
        <Paper 
          key={stat.label} 
          p="md" 
          radius="lg" 
          style={{ 
            backgroundColor: stat.bgColor,
            border: `1px solid rgba(0,0,0,0.05)`,
            backdropFilter: 'blur(10px)',
            minHeight: '130px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Group justify="space-between" align="flex-start">
            <ThemeIcon 
              color={stat.color} variant="light" size={38} radius="md"
              style={{ border: `1.5px solid ${stat.iconBorder}`, backgroundColor: 'rgba(255,255,255,0.3)' }}
            >
              <stat.icon size={22} />
            </ThemeIcon>
            <Text size="xs" fw={800} c="dark.3" tt="uppercase">{stat.label}</Text>
          </Group>
          <Group align="flex-end" gap={4}>
            <Text fw={800} size="32px" c="dark.9">{stat.value}</Text>
            {stat.unit && <Text size="sm" c="dimmed" mb={4} fw={700}>{stat.unit}</Text>}
          </Group>
        </Paper>
      ))}
    </SimpleGrid>
  );
};