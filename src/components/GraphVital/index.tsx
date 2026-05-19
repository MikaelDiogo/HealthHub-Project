import { useEffect, useState, useMemo } from 'react';
import { Paper, Title, Box, Center, Loader, Text, Group, Badge, Stack } from '@mantine/core';
import { LineChart } from '@mantine/charts';
import { IconActivity, IconAlertCircle, IconTimeline } from '@tabler/icons-react';
import api from '../../services/api';

interface HistoryChartProps {
  patientId: string | number;
  patientName: string;
}

// Interface para tipar os dados que vêm do banco
interface VitalRecord {
  id: string;
  frequencia_cardiaca: number;
  saturacao_oxigenio: number;
  temperatura: number;
  created_at: string | Date;
}

export const HistoryChart = ({ patientId, patientName }: HistoryChartProps) => {
  const [rawData, setRawData] = useState<VitalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchVitalsHistory() {
      if (!patientId) return;
      
      setLoading(true);
      setError(false);

      try {
        const response = await api.get(`/patients/${patientId}/vitals`);
        const result = Array.isArray(response.data) ? response.data : [];
        setRawData(result);
      } catch (err) {
        console.error("Erro ao carregar histórico vital:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchVitalsHistory();
  }, [patientId]);

  // Formatação dos dados memoizada
  const chartData = useMemo(() => {
    return [...rawData]
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      .map((item) => ({
        // Eixo X: Hora formatada para o padrão BR
        hora: new Date(item.created_at).toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit',
          second: '2-digit' 
        }),
        // Valores numéricos (null evita que o gráfico caia para zero se o dado faltar)
        BPM: item.frequencia_cardiaca > 0 ? item.frequencia_cardiaca : null,
        SpO2: item.saturacao_oxigenio > 0 ? item.saturacao_oxigenio : null,
        Temp: item.temperatura > 0 ? item.temperatura : null,
      }));
  }, [rawData]);

  return (
    <Paper 
      p="xl" 
      radius="lg" 
      withBorder 
      h={550} 
      w="100%" 
      style={{ display: 'flex', flexDirection: 'column', background: '#fff' }}
    >
      <Group justify="space-between" mb="xl">
        <Stack gap={2}>
          <Group gap="xs">
            <IconTimeline size={20} color="#1A1B1E" />
            <Title order={5} style={{ color: '#1A1B1E' }}>Histórico de Sinais Vitais</Title>
          </Group>
          <Text size="xs" c="dimmed">
            Linha do tempo de monitoramento: <b>{patientName}</b>
          </Text>
        </Stack>
        
        {chartData.length > 0 && (
          <Badge 
            variant="dot" 
            color="teal" 
            size="lg"
            styles={{ root: { textTransform: 'none' } }}
          >
            {chartData.length} pontos de dados
          </Badge>
        )}
      </Group>

      <Box style={{ flex: 1, minHeight: 0 }}>
        {loading ? (
          <Center h="100%">
            <Stack align="center" gap="xs">
              <Loader size="md" color="blue" />
              <Text size="sm" fw={500} c="dimmed">Sincronizando dados vitais...</Text>
            </Stack>
          </Center>
        ) : error ? (
          <Center h="100%">
            <Stack align="center" gap={4}>
              <IconAlertCircle size={32} color="red" />
              <Text size="sm" fw={500} c="red">Erro ao conectar com a API</Text>
            </Stack>
          </Center>
        ) : chartData.length === 0 ? (
          <Center h="100%">
            <Stack align="center" gap={4}>
              <IconActivity size={32} color="#CED4DA" />
              <Text size="sm" c="dimmed">Nenhum registro encontrado para este paciente.</Text>
            </Stack>
          </Center>
        ) : (
          <LineChart
            h={400}
            data={chartData}
            dataKey="hora"
            withLegend
            legendProps={{ verticalAlign: 'bottom', height: 40 }}
            series={[
              { name: 'BPM', color: 'red.6', label: 'Batimentos (BPM)' },
              { name: 'SpO2', color: 'blue.6', label: 'Saturação (SpO2)' },
              { name: 'Temp', color: 'orange.6', label: 'Temperatura (°C)' },
            ]}
            curveType="monotone"
            tickLine="xy"
            gridAxis="xy"
            withDots={chartData.length < 60} // Esconde pontos se houver muitos dados para não poluir
            dotProps={{ r: 3, strokeWidth: 1 }}
            tooltipProps={{
              content: ({ label, payload }) => (
                <Paper p="xs" withBorder shadow="sm" radius="md">
                  <Text fw={700} size="xs" mb={5}>{label}</Text>
                  {payload?.map((item: any) => (
                    <Group key={item.name} justify="space-between" gap="xl">
                      <Text size="xs" c={item.color}>{item.name}:</Text>
                      <Text size="xs" fw={700}>{item.value}</Text>
                    </Group>
                  ))}
                </Paper>
              ),
            }}
          />
        )}
      </Box>
    </Paper>
  );
};