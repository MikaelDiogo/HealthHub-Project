import { useEffect, useState } from "react";
import { 
    Box, Text, Title, Group, SimpleGrid, Modal, 
    Divider, Stack, Paper, Badge
} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { 
    IconThermometer, IconHeartRateMonitor, IconDroplet, 
    IconUser, IconAlertCircle, IconStethoscope,  
   IconCapsule, IconActivity
} from "@tabler/icons-react";
import { FilterField } from "../../components/FilterField";
import { ButtonAddPatient } from "../../components/Buttons";
import CardPatient from "../../components/CardPatient";
import api from "../../services/api";
import { ModalEditPatient } from "../../components/Buttons/ModalEditPatient";

interface SinalVital {
  id: string;
  temperatura: string;
  pressao_arterial: string;
  frequencia_cardiaca: string;
  saturacao_oxigenio: string;
  created_at: string;
}

interface Patient {
  id: string;
  nome_completo: string;
  idade: number;
  sexo: string;
  cpf: string;
  rg: string; // Adicionado
  telefone: string;
  endereco: string; // Adicionado
  alergias: string;
  medicamentos_em_uso: string; // Adicionado
  anamnese: string;
  sinaisVitais?: SinalVital[];
}

export const Patients = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const [patientToEdit, setPatientToEdit] = useState<Patient | null>(null);



    useEffect(() => {
        api.get('/patients')
            .then(response => {
                setPatients(Array.isArray(response.data) ? response.data : []);
            })
            .catch(err => console.error("Erro na API:", err));
    }, []);

    const handleOpenView = (patient: Patient) => {
        setSelectedPatient(patient);
        open();
    };

    const handleOpenEdit = (patient: Patient) => {
        setPatientToEdit(patient);
        openEdit();
    };

    // Função auxiliar para exibir campos vazios com estilo
    const renderData = (value: string | number | undefined, label: string) => (
        <Box>
            <Text size="xs" c="dimmed" fw={500} style={{ textTransform: 'uppercase' }}>{label}</Text>
            <Text size="sm" fw={500} c={value ? "dark" : "gray.5"}>
                {value || "Não registrado"}
            </Text>
        </Box>
    );

    return (
        <div>
            <Modal 
                opened={opened} 
                onClose={close} 
                title={<Title order={3} className="text-brand-navy">Ficha Clínica Detalhada</Title>}
                size="lg"
                centered
                overlayProps={{ backgroundOpacity: 0.6, blur: 4 }}
                radius='md'
            >
                {selectedPatient && (
                    <Stack gap="md">
                        {/* 1. CABEÇALHO IDENTIFICADOR */}
                        <Group justify="space-between" align="flex-start">
                            <Box>
                                <Group gap="xs">
                                    <IconUser size={24} color="#1A3B5D" />
                                    <Text fw={700} size="xl">{selectedPatient.nome_completo}</Text>
                                </Group>
                                <Text size="sm" c="dimmed">{selectedPatient.idade} anos • {selectedPatient.sexo}</Text>
                            </Box>
                            <Badge color="blue" variant="filled">PACIENTE ATIVO</Badge>
                        </Group>

                        <Divider label="Documentação e Contato" labelPosition="center" />
                        
                        <SimpleGrid cols={2}>
                            {renderData(selectedPatient.cpf, "CPF")}
                            {renderData(selectedPatient.rg, "RG")}
                            {renderData(selectedPatient.telefone, "Telefone")}
                            {renderData(selectedPatient.endereco, "Endereço")}
                        </SimpleGrid>

                        <Divider label="Sinais Vitais (Última Medição)" labelPosition="center" />

                        <SimpleGrid cols={2} spacing="sm">
                            <Paper withBorder p="xs" radius="md">
                                <Group>
                                    <IconThermometer color="#e63946" />
                                    <Box>
                                        <Text size="xs" c="dimmed">Temperatura</Text>
                                        <Text fw={700}>{selectedPatient.sinaisVitais?.[0]?.temperatura ? `${selectedPatient.sinaisVitais[0].temperatura}°C` : "N/A"}</Text>
                                    </Box>
                                </Group>
                            </Paper>
                            <Paper withBorder p="xs" radius="md">
                                <Group>
                                    <IconActivity color="#d62828" />
                                    <Box>
                                        <Text size="xs" c="dimmed">Pressão Arterial</Text>
                                        <Text fw={700}>{selectedPatient.sinaisVitais?.[0]?.pressao_arterial || "N/A"}</Text>
                                    </Box>
                                </Group>
                            </Paper>
                            <Paper withBorder p="xs" radius="md">
                                <Group>
                                    <IconHeartRateMonitor color="#d62828" />
                                    <Box>
                                        <Text size="xs" c="dimmed">Frequência Cardíaca</Text>
                                        <Text fw={700}>{selectedPatient.sinaisVitais?.[0]?.frequencia_cardiaca ? `${selectedPatient.sinaisVitais[0].frequencia_cardiaca} bpm` : "N/A"}</Text>
                                    </Box>
                                </Group>
                            </Paper>
                            <Paper withBorder p="xs" radius="md">
                                <Group>
                                    <IconDroplet color="#457b9d" />
                                    <Box>
                                        <Text size="xs" c="dimmed">Saturação (SpO2)</Text>
                                        <Text fw={700}>{selectedPatient.sinaisVitais?.[0]?.saturacao_oxigenio ? `${selectedPatient.sinaisVitais[0].saturacao_oxigenio}%` : "N/A"}</Text>
                                    </Box>
                                </Group>
                            </Paper>
                        </SimpleGrid>

                        <Divider label="Histórico de Saúde" labelPosition="center" />

                        <Box>
                            <Group gap="xs" mb={4}>
                                <IconAlertCircle size={18} color="red" />
                                <Text fw={600} size="sm">Alergias Conhecidas:</Text>
                            </Group>
                            <Paper withBorder p="sm" bg={selectedPatient.alergias ? "red.0" : "gray.0"}>
                                <Text size="sm">{selectedPatient.alergias || "Nenhuma alergia registrada até o momento."}</Text>
                            </Paper>
                        </Box>

                        <Box>
                            <Group gap="xs" mb={4}>
                                <IconCapsule size={18} color="teal" />
                                <Text fw={600} size="sm">Medicamentos em Uso:</Text>
                            </Group>
                            <Paper withBorder p="sm" bg="teal.0">
                                <Text size="sm">{selectedPatient.medicamentos_em_uso || "Nenhum medicamento informado."}</Text>
                            </Paper>
                        </Box>

                        <Box>
                            <Group gap="xs" mb={4}>
                                <IconStethoscope size={18} color="#1A3B5D" />
                                <Text fw={600} size="sm">Anamnese / Quadro Clínico:</Text>
                            </Group>
                            <Paper withBorder p="sm" bg="blue.0">
                                <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
                                    {selectedPatient.anamnese || "Sem observações clínicas detalhadas."}
                                </Text>
                            </Paper>
                        </Box>
                    </Stack>
                )}
            </Modal>

            <ModalEditPatient 
                opened={editOpened} 
                onClose={closeEdit} 
                patient={patientToEdit} 
            />

            {/* Cabeçalho e Listagem permanecem os mesmos */}
            <Box mb="sm">
                <Title order={2} className='text-brand-navy'>Gerenciamento de Pacientes</Title>
                <Text c="dimmed" size="sm">Acesse o histórico completo e sinais vitais</Text>
            </Box>

            <Group justify="space-between" align="flex-end" w="100%">
               <FilterField />
               <ButtonAddPatient />
            </Group>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg" mt="xl">
                {patients.map((patient) => {
                    const ultimaMedicao = patient.sinaisVitais?.[0];
                    return (
                        <CardPatient
                            key={patient.id}
                            patientId={patient.id}
                            patientName={patient.nome_completo}
                            patientAge={patient.idade}
                            patientGender={patient.sexo}
                            temp={ultimaMedicao?.temperatura ? `${ultimaMedicao.temperatura}°C` : "--"}
                            bpm={ultimaMedicao?.frequencia_cardiaca ? `${ultimaMedicao.frequencia_cardiaca} bpm` : "--"}
                            spo2={ultimaMedicao?.saturacao_oxigenio ? `${ultimaMedicao.saturacao_oxigenio}%` : "--"}
                            onView={() => handleOpenView(patient)}
                            onEdit={() => handleOpenEdit(patient)}
                        />
                    );
                })}
            </SimpleGrid>
        </div>
    );
};