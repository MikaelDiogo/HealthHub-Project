import { Box, Text, Title } from "@mantine/core";
import { FilterField } from "../../components/FilterField";

export const Patients = () => {
    return (
        <div>
            <Box h="100%" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <Box mb="sm">
                <Title order={2} className='text-brand-navy'>DashBoard de Monitoramento</Title>
                <Text c="dimmed" size="sm">
                  Visão geral dos pacientes e sinais vitais em tempo real.
                </Text>
              </Box>
            </Box>
                <FilterField/>
            </div>
    );
}