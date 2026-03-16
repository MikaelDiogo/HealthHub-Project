import { Text, Title, Group, Box, Paper } from '@mantine/core';
import { CardDashboard } from '../../components/CardDashboard';
import { HistoryChart } from '../../components/GraphVital';
import './styles.css'

export default function DashboardHome() {
  return (
    
<Box h="100%" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box mb="sm">
        <Title order={2} className='text-brand-navy'>DashBoard de Monitoramento</Title>
        <Text c="dimmed" size="sm">
          Visão geral dos pacientes e sinais vitais em tempo real.
        </Text>
      </Box>

      <CardDashboard />

      <Group 
        align="stretch" 
        wrap="nowrap" 
        gap="md" 
        mt="lg" 
        style={{ flex: 1, minHeight: 0 }} 
      >
        <HistoryChart />

        <Box w="35%">
          <Paper p="xl" radius="lg" withBorder shadow="md" h="100%">
            <Title order={4} className='text-brand-navy' mb="md">Pacientes no Setor</Title>
            <Box style={{ flex: 1, overflowY: 'auto' }}>
               <Text size="sm" c="dimmed">Lista de pacientes...</Text>
            </Box>
          </Paper>
        </Box>
      </Group>
    </Box>
  );
}