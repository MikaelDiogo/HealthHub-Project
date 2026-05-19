import { useEffect, useState } from 'react';
import { Text, Title, Box, Paper, Stack, ScrollArea, Center, Loader, Flex } from '@mantine/core';
import { CardDashboard } from '../../components/CardDashboard';
import { HistoryChart } from '../../components/GraphVital';
import api from '../../services/api'; 
import './styles.css';
import { PatientSidebarCard } from '../../components/PatientSideBarCard';

export default function DashboardHome() {
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPatients() {
      try {
        const response = await api.get('/patients');
        setPatients(response.data);
        if (response.data.length > 0) {
          setSelectedPatient(response.data[0]);
        }
      } catch (error) {
        console.error("Erro ao carregar pacientes:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPatients();
  }, []);

  if (loading) {
    return <Center h="100vh"><Loader color="blue" /></Center>;
  }

  return (
    <Box p="md" style={{ overflowX: 'hidden' }}>
      <Box mb="sm">
        <Title order={2} className='text-brand-navy'>DashBoard de Monitoramento</Title>
        <Text c="dimmed" size="sm">
          Paciente em foco: <b>{selectedPatient?.nome_completo || 'Nenhum selecionado'}</b>
        </Text>
      </Box>

      <CardDashboard patient={selectedPatient} />

      <Flex 
        align="flex-start" 
        gap="xs" 
        mt="lg"
        direction="row"
        wrap="nowrap"
      >
        <Box style={{ flex: 1, minWidth: 0 }}> 
          <HistoryChart 
            patientId={selectedPatient?.id} 
            patientName={selectedPatient?.nome_completo} 
          />
        </Box>

        <Box style={{ flex: '0 0 320px' }}>
          <Paper 
            p="md" 
            radius="lg" 
            withBorder 
            h={550} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column' 
            }}
          >
            <Title order={6} className='text-brand-navy' mb="md" tt="uppercase" c="dimmed" ls={0.5}>
              Pacientes Disponíveis
            </Title>
            
            <ScrollArea style={{ flex: 1 }} scrollbars="y" type="hover" offsetScrollbars>
              <Stack gap="xs" pr="xs">
                {patients.map((p) => (
                  <PatientSidebarCard
                    key={p.id}
                    patient={p}
                    isActive={selectedPatient?.id === p.id}
                    onClick={() => setSelectedPatient(p)}
                  />
                ))}
              </Stack>
            </ScrollArea>
          </Paper>
        </Box>
      </Flex>
    </Box>
  );
}