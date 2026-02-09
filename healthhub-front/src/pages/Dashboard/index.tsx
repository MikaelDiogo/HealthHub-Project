import { Text, Title } from '@mantine/core';

export default function DashboardHome() {
  //lembrar de adicionar cards dps
  return (
    <div>
      <Title order={2} className='text-brand-navy'>Painel Principal</Title>
      <Text c="dimmed" mt="sm">
        Bem-vindo ao Health Hub. Aqui aparecerão seus cards de monitoramento em breve.
      </Text>
  
        
    </div>
  );
}