import { Box, Text, Title, Group } from "@mantine/core";
import { FilterField } from "../../components/FilterField";
import { ButtonAddPatient } from "../../components/Buttons";
import CardPatient  from "../../components/CardPatient";

export const Patients = () => {
    return (
        <div>
            <Box h="100%" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <Box mb="sm">
                <Title order={2} className='text-brand-navy'>Gerenciamento de Pacientes</Title>
                <Text c="dimmed" size="sm">
                  Visualize e gerencie todos os pacientes
                </Text>
              </Box>
            </Box>
            <Group justify="space-between" align="flex-end" w="100%">
               <FilterField/>
                <ButtonAddPatient />
            </Group>
            <Group className="mt-10">
              <CardPatient
            patientName="Adeilson Aragao"
            patientAge={41}
            patientGender="feminino" patientId={""}/>
            </Group>
               
            </div>
    );
}