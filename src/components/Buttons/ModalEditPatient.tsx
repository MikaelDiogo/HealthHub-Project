import { useEffect, useState } from "react";
import { 
    Button, Modal, Text, Tabs, Stack, TextInput, Group, Textarea, Box, LoadingOverlay 
} from "@mantine/core";
import { useForm } from '@mantine/form';
import { 
    IconUser, IconStethoscope, IconClipboardText, IconDeviceFloppy,
    IconThermometer, IconActivity, IconHeartRateMonitor, IconDroplet
} from "@tabler/icons-react";
import api from "../../services/api";

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
  rg: string;
  telefone: string;
  endereco: string;
  alergias: string;
  medicamentos_em_uso: string;
  anamnese: string;
  sinaisVitais?: SinalVital[];
}

interface ModalEditProps {
    opened: boolean;
    onClose: () => void;
    patient: Patient | null; 
}

export const ModalEditPatient = ({ opened, onClose, patient }: ModalEditProps) => {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            nome_completo: '',
            rg: '',
            cpf: '',
            idade: '',
            sexo: '',
            telefone: '',
            endereco: '',
            alergias: '',
            medicamentos_em_uso: '',
            anamnese: '',
            temperatura: '',
            pressao_arterial: '',
            frequencia_cardiaca: '',
            saturacao_oxigenio: '',
        },
    });

    useEffect(() => {
        if (opened && patient) {
            const ultimaMedicao = patient.sinaisVitais?.[0];
            
            form.initialize({
                nome_completo: patient.nome_completo || '',
                rg: patient.rg || '',
                cpf: patient.cpf || '',
                idade: String(patient.idade) || '',
                sexo: patient.sexo || '',
                telefone: patient.telefone || '',
                endereco: patient.endereco || '',
                alergias: patient.alergias || '',
                medicamentos_em_uso: patient.medicamentos_em_uso || '',
                anamnese: patient.anamnese || '',
                temperatura: ultimaMedicao?.temperatura || '',
                pressao_arterial: ultimaMedicao?.pressao_arterial || '',
                frequencia_cardiaca: ultimaMedicao?.frequencia_cardiaca || '',
                saturacao_oxigenio: ultimaMedicao?.saturacao_oxigenio || '',
            });
        }
    }, [form, opened, patient]); 

    const handleUpdate = async (values: typeof form.values) => {
        if (!patient) return;
        
        setLoading(true);
        try {
            await api.put(`/patients/${patient.id}`, {
                nome_completo: values.nome_completo,
                rg: values.rg,
                cpf: values.cpf,
                idade: Number(values.idade),
                sexo: values.sexo,
                telefone: values.telefone,
                endereco: values.endereco,
                alergias: values.alergias,
                medicamentos_em_uso: values.medicamentos_em_uso,
                anamnese: values.anamnese,
                temperatura: values.temperatura ? Number(values.temperatura) : undefined,
                frequencia_cardiaca: values.frequencia_cardiaca ? Number(values.frequencia_cardiaca) : undefined,
                saturacao_oxigenio: values.saturacao_oxigenio ? Number(values.saturacao_oxigenio) : undefined,
                pressao_arterial: values.pressao_arterial || undefined
            });

            alert("Paciente atualizado com sucesso!");
            onClose();
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar dados.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal 
            opened={opened} 
            onClose={onClose} 
            title={<Text fw={700} size="lg" className="text-brand-navy!">Editar Ficha: {patient?.nome_completo}</Text>}
            centered 
            size="lg"
            radius="md"
            overlayProps={{ backgroundOpacity: 0.6, blur: 4 }}
        >
            <Box pos="relative">
                <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />
                <form onSubmit={form.onSubmit(handleUpdate)}>
                    <Tabs color='cyan' defaultValue="pessoais" variant="pills">
                        <Tabs.List grow mb="xl" className="bg-blue-50 p-1 rounded-lg">
                            <Tabs.Tab value="pessoais" leftSection={<IconUser size={16} />}>Pessoais</Tabs.Tab>
                            <Tabs.Tab value="hospitalares" leftSection={<IconStethoscope size={16} />}>Hospitalares</Tabs.Tab>
                            <Tabs.Tab value="anamnese" leftSection={<IconClipboardText size={16} />}>Anamnese</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="pessoais">
                            <Stack gap="sm">
                                <TextInput label="Nome Completo" required {...form.getInputProps('nome_completo')} />
                                <Group grow>
                                    <TextInput label="RG" {...form.getInputProps('rg')} />
                                    <TextInput label="CPF" {...form.getInputProps('cpf')} />
                                </Group>
                                <Group grow>
                                    <TextInput label="Idade" {...form.getInputProps('idade')} />
                                    <TextInput label="Sexo" {...form.getInputProps('sexo')} />
                                </Group>
                                <TextInput label="Telefone" {...form.getInputProps('telefone')} />
                                <TextInput label="Endereço" {...form.getInputProps('endereco')} />
                            </Stack>
                        </Tabs.Panel>

                        <Tabs.Panel value="hospitalares">
                            <Stack gap="md">
                                <Group grow>
                                    <TextInput label="Temperatura(°C)" leftSection={<IconThermometer size={16}/>} {...form.getInputProps('temperatura')} />
                                    <TextInput label="Saturação(SpO²)" leftSection={<IconDroplet size={16}/>} {...form.getInputProps('saturacao_oxigenio')} />
                                </Group>
                                <Group grow>
                                    <TextInput label="Pressão Arterial" leftSection={<IconActivity size={16}/>} {...form.getInputProps('pressao_arterial')} />
                                    <TextInput label="Frequência (bpm)" leftSection={<IconHeartRateMonitor size={16}/>} {...form.getInputProps('frequencia_cardiaca')} />
                                </Group>
                                <TextInput label="Alergias" {...form.getInputProps('alergias')} />
                                <TextInput label="Medicamentos em Uso" {...form.getInputProps('medicamentos_em_uso')} />
                            </Stack>
                        </Tabs.Panel>

                        <Tabs.Panel value="anamnese">
                            <Textarea label="Relato da Anamnese" minRows={8} {...form.getInputProps('anamnese')} />
                        </Tabs.Panel>
                    </Tabs>

                    <Group justify="flex-end" mt="xl">
                        <Button variant="subtle" color="gray" onClick={onClose}>Cancelar</Button>
                        <Button type="submit" className="bg-cyan-700! text-white!" leftSection={<IconDeviceFloppy size={18} />}>
                            Salvar Alterações
                        </Button>
                    </Group>
                </form>
            </Box>
        </Modal>
    );
};