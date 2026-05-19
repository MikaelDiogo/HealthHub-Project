import { Paper, Group, Stack, Text, ThemeIcon, Badge } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';

export const PatientSidebarCard = ({ patient, isActive, onClick }: any) => {
  return (
    <Paper
      withBorder
      p="sm" // Padding reduzido para o card ficar mais compacto
      radius="lg"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        // Contorno mais fino e preciso
        border: isActive ? '1.5px solid #228be6' : '1px solid #e9ecef',
        backgroundColor: isActive ? 'rgba(34, 139, 230, 0.05)' : 'white',
        width: '100%', // Ocupa a largura total do container lateral
      }}
      shadow={isActive ? 'xs' : '0'}
    >
      <Group wrap="nowrap" gap="sm">
        {/* Ícone de Pessoa menor e mais discreto */}
        <ThemeIcon 
          size={38} 
          radius="md" 
          variant={isActive ? 'filled' : 'light'}
          color="blue"
        >
          <IconUser size={20} />
        </ThemeIcon>

        <Stack gap={0} style={{ flex: 1, overflow: 'hidden' }}>
          <Text size="sm" fw={700} c="dark.5" truncate="end" style={{ lineHeight: 1.2 }}>
            {patient.nome_completo}
          </Text>
          
          <Group gap={6} mt={2}>
            <Text size="11px" fw={600} c="dimmed">
              {patient.idade ? `${patient.idade} anos` : '-- anos'}
            </Text>
            <Text size="11px" c="dimmed">•</Text>
            <Badge 
              variant="transparent" 
              color="gray" 
              size="xs" 
              p={0}
              tt="capitalize"
            >
              {patient.sexo || 'Não inf.'}
            </Badge>
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
};