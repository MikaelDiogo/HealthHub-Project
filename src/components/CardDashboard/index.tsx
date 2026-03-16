import { IconAlertCircle, IconDroplet, IconHeartRateMonitor, IconTemperature } from '@tabler/icons-react';
import { Group, Paper, SimpleGrid, ThemeIcon, Text, Stack,  } from '@mantine/core';

export const CardDashboard = () => {
  const statusMock = 'Crítico';

  const stats = [
    { 
      label: 'Saturação Média', 
      labelDown: 'SpO2 média dos pacientes', 
      value: '95%', 
      badge: 'Normal',
      icon: IconDroplet, 
      color: 'green', 
      bgColor: 'rgba(64, 192, 87, 0.08)',
      borderColor: '#40c057'
    },
    { 
      label: 'Freq. Cardíaca Média', 
      labelDown: 'BPM médio dos pacientes', 
      value: '84', 
      unit: 'bpm',
      badge: 'Normal', 
      icon: IconHeartRateMonitor, 
      color: 'blue', 
      bgColor: 'rgba(34, 139, 230, 0.05)',
      borderColor: '#228be6'
    },
    { 
      label: 'Status do Paciente', 
      labelDown: 'Requer atenção imediata', 
      value: '1', 
      unit: 'Crítico',
      badge: statusMock, 
      icon: IconAlertCircle, 
      color: 'red', 
      bgColor: 'rgba(250, 82, 82, 0.08)',
      borderColor: '#fa5252'
    },
    { 
      label: 'Temperatura Média', 
      labelDown: 'Temperatura corporal pacientes', 
      value: '37.2', 
      unit: '°C',
      badge: 'Normal',
      icon: IconTemperature, 
      color: 'blue', 
      bgColor: 'rgba(34, 139, 230, 0.05)',
      borderColor: '#228be6'
    },
  ];

  return (
    <div className='mt-5'>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
        {stats.map((stat) => (
          <Paper 
            key={stat.label} 
            p="md" 
            radius="lg" 
            bg={stat.bgColor}
            style={{ border: `1.5px solid ${stat.borderColor}` }}
          >

            <Group justify="space-between" align="flex-start" wrap="nowrap">
              <Group align="center" gap="xs">
                <ThemeIcon 
                  color={stat.color} 
                  variant="light" 
                  size={34} 
                  radius="xl"
                >
                  <stat.icon size={29} />
                </ThemeIcon>

                <Stack gap={0}>
                  <Text size="sm" fw={700} c="dark.4">
                    {stat.label}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {stat.labelDown}
                  </Text>
                </Stack>
              </Group>

             
             
            </Group>

            
            <Group align="flex-end" gap={4} mt={25}>
              <Text fw={600} size="28px" c="dark.9">
                {stat.value}
              </Text>
              <Text size="xs" c="dimmed" mb={6} fw={600}>
                {stat.unit}
              </Text>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>
    </div>
  );
};