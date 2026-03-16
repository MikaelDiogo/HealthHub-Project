import { Paper, Title, Text, Stack, Box } from '@mantine/core';
import { LineChart } from '@mantine/charts';
import './styles.css'

export const HistoryChart = () => {
  const data = [
    { hora: '08:00', bpm: 72, spo2: 98 },
    { hora: '10:00', bpm: 80, spo2: 97 },
    { hora: '12:00', bpm: 75, spo2: 99 },
    { hora: '14:00', bpm: 85, spo2: 96 },
    { hora: '16:00', bpm: 90, spo2: 94 },
  ];

  return (
   <Box w="65%"> 
      <Paper 
        p="xl" 
        radius="lg" 
        withBorder 
        shadow="md" 
        bg="white" 
        h={400} 
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Stack gap={2} mb="xl">
          <Title order={4} className="text-brand-navy">
            Monitoramento: Maria Oliveira da Silva
          </Title>
          <Text size="xs" c="dimmed">
            Sinais vitais em tempo real | Leito: 402-A
          </Text>
        </Stack>

      
        <Box style={{ flex: 1, minHeight: 0 }}>
          <LineChart
            h={250} 
            data={data}
            dataKey="hora"
            series={[
              { name: 'bpm', color: 'red.6', label: 'BPM' },
              { name: 'spo2', color: 'blue.6', label: 'SpO2' },
            ]}
            curveType="monotone"
            gridAxis="xy"
            withLegend
            withTooltip
            tooltipProps={{ isAnimationActive: false }}
          />
        </Box>
      </Paper>
    </Box>
  );
};