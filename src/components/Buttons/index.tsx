import { Button, Text, UnstyledButton, Group } from '@mantine/core';
import { FcGoogle } from "react-icons/fc";
import {  NavLink as RouterLink, useLocation } from 'react-router-dom';
import './styles.css'
import { IconLogout2, IconPlus } from '@tabler/icons-react';
import './styles.css'


import { useState } from "react";

import { useForm } from '@mantine/form';

import api from "../../services/api";


import { Modal, Tabs, TextInput, Textarea, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {  
  IconUser, 
  IconStethoscope, 
  IconClipboardText 
} from '@tabler/icons-react';




interface SidebarLinkProps {
  to: string;
  label: string;
  textLabel: string;
  icon: React.ReactNode;
}

export const ButtonLogOut = ({to}: SidebarLinkProps) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return(
             <UnstyledButton
             component={RouterLink}
             to={to}
             className={`
        flex gap-2 ml-8 mt-5 border! bg-blue-700/10! border-blue-600! p-2! text-blue-500! rounded-lg transition-all duration-200
        ${isActive 
          ? '' 
          : 'text-black! hover:bg-cyan-600/10!'}
      `}
        >
                <Text>Sair do Sistema</Text>
                <IconLogout2 color='blue'></IconLogout2>
             </UnstyledButton>
        
    );
}

export const SideBarLink = ({to, label, icon, textLabel}: SidebarLinkProps) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <UnstyledButton component={RouterLink}
        to={to}
        className={`
        w-full p-3 rounded-lg transition-all duration-200
        ${isActive 
          ? 'bg-brand-blue/14! text-blue-800! border-2! border-blue-400/30! p-1! shadow-lg' 
          : 'text-black! hover:bg-brand-blue/10!'}
      `}
        >
            <Group gap={8}>
        {icon}
        <Group className='flex! flex-col!' gap={0} align='flex-start'>
        <Text className='font-medium!' size="sm" fw={600}>{label}</Text>
        <Text className='font-medium! text-xs! text-brand-navy!'>{textLabel}</Text>
        </Group>
      </Group>
        </UnstyledButton>
    );
}


/* export const ButtonAddPatient = () => {
    return(
        <Button 
        className='flex! justify-center! items-center! bg-blue-900!'
        size='md'
        
        >
            <IconPlus className=''></IconPlus>
            <Text className='text-white! font-bold! text-center text-sm!'>Adicionar Paciente</Text>
        </Button>
    );
} */


export const ButtonAddPatient = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);

    // Inicializando o formulário com os campos que o seu Back-end espera
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
            // Sinais iniciais (opcional, dependendo de como seu back trata o primeiro registro)
            temperatura: '',
            saturacao_oxigenio: '',
            pressao_arterial: '',
            frequencia_cardiaca: '',
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        try {
            // 1. Criar o Paciente
            const response = await api.post('/patients', {
                nome_completo: values.nome_completo,
                rg: values.rg,
                cpf: values.cpf,
                idade: Number(values.idade),
                sexo: values.sexo,
                telefone: values.telefone,
                endereco: values.endereco,
                alergias: values.alergias,
                medicamentos_em_uso: values.medicamentos_em_uso,
                anamnese: values.anamnese
            });

            // 2. Se você preencheu sinais vitais, envia para a rota de sinais usando o ID retornado
            if (values.temperatura || values.frequencia_cardiaca) {
                const patientId = response.data.id;
                await api.post(`/sinais/${patientId}`, {
                    temperatura: values.temperatura,
                    frequencia_cardiaca: values.frequencia_cardiaca,
                    saturacao_oxigenio: values.saturacao_oxigenio,
                    pressao_arterial: values.pressao_arterial
                });
            }

            alert("Paciente cadastrado com sucesso!");
            form.reset();
            close();
            window.location.reload(); // Recarrega para ver o novo card (ou use um state global)
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao salvar paciente. Verifique os dados.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button 
                className='flex! justify-center! items-center! bg-cyan-800!'
                size='md'
                onClick={open}
            >
                <IconPlus size={18} className="mr-2" />
                <Text className='text-white! font-bold! text-center text-sm!'>
                    Adicionar Paciente
                </Text>
            </Button>

            <Modal 
                opened={opened} 
                onClose={close} 
                title={<Text fw={700} size="lg" className="text-brand-navy!">Novo Paciente - HealthHub</Text>}
                centered 
                size="lg"
                radius="md"
            >
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Tabs color='cyan' defaultValue="pessoais" variant="pills">
                        <Tabs.List grow mb="xl" className="bg-blue-50 p-1 rounded-lg">
                            <Tabs.Tab value="pessoais" leftSection={<IconUser size={16} />}>Pessoais</Tabs.Tab>
                            <Tabs.Tab value="hospitalares" leftSection={<IconStethoscope size={16} />}>Hospitalares</Tabs.Tab>
                            <Tabs.Tab value="anamnese" leftSection={<IconClipboardText size={16} />}>Anamnese</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="pessoais">
                            <Stack gap="lg">
                                <TextInput label="Nome Completo" placeholder="Ex: Maria Silva Santos" required {...form.getInputProps('nome_completo')} />
                                <Group grow>
                                    <TextInput label="RG" placeholder="ex: 11.111.111-2" {...form.getInputProps('rg')} />
                                    <TextInput label="CPF" placeholder='ex: 111.111.111-00' {...form.getInputProps('cpf')} />
                                </Group>
                                <Group grow>
                                    <TextInput label="Idade" placeholder="41" {...form.getInputProps('idade')} />
                                    <TextInput label="Sexo" placeholder="Feminino" {...form.getInputProps('sexo')} />
                                </Group>
                                <TextInput label="Telefone" placeholder="(88) 99999-9999" {...form.getInputProps('telefone')} />
                                <TextInput label="Endereço" placeholder="ex: Av. Dom Pedro II, 58, Crateús - CE" {...form.getInputProps('endereco')} />
                            </Stack>
                        </Tabs.Panel>

                        <Tabs.Panel value="hospitalares">
                            <Stack gap="md">
                                <Group grow>
                                    <TextInput label="Temperatura(°C)" placeholder="ex: 36.5" {...form.getInputProps('temperatura')} />
                                    <TextInput label="Saturação(SpO²)" placeholder="ex: 98" {...form.getInputProps('saturacao_oxigenio')} />
                                </Group>
                                <Group grow>
                                    <TextInput label="Pressão Arterial" placeholder="ex: 12/8" {...form.getInputProps('pressao_arterial')} />
                                    <TextInput label="Frequência Cardíaca (bpm)" placeholder="ex: 80" {...form.getInputProps('frequencia_cardiaca')} />
                                </Group>
                                <TextInput label="Alergias" placeholder="ex: Dipirona" {...form.getInputProps('alergias')} />
                                <TextInput label="Medicamento em Uso" placeholder="ex: Losartana" {...form.getInputProps('medicamentos_em_uso')} />
                            </Stack>
                        </Tabs.Panel>

                        <Tabs.Panel value="anamnese">
                            <Textarea 
                                label="Relato da Anamnese" 
                                placeholder="Descreva o histórico clínico aqui..."
                                minRows={10}
                                {...form.getInputProps('anamnese')}
                            />
                        </Tabs.Panel>
                    </Tabs>

                    <Group justify="flex-end" mt="xl">
                        <Button variant="subtle" color="gray" onClick={close}>Cancelar</Button>
                        <Button 
                            type="submit" 
                            className="bg-cyan-700! hover:bg-cyan-600! text-white!"
                            loading={loading}
                        >
                            Salvar Paciente
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
};


    


export const ButtonLoginGoogle = () => {
    return (
        <div className='w-80' >
        <Button 
        className='w-80! h-11! bg-white! border! border-app-stroke! mt-5! rounded-xl!'>
            <FcGoogle size={25}/>

            <Text className='text-black! font-medium! text-sm! pl-3!'>
                Continuar para o Google
            </Text>
            
        </Button>
        </div>
    );
}

interface ButtonEnterProps {
  onClick?: () => void; 
  type?: "button" | "submit";
}

export const ButtonEnter = ({ onClick, type = "button" }: ButtonEnterProps) => {
    return (
         <div className='w-80' >
        <Button 
        type={type}
        onClick={onClick}
        className='w-80! h-11! bg-app-entrar! border! border-app-strokeentrar! mt-5! rounded-xl!'>
            
            <Text className='text-white! font-semibold! text-sm! pl-3!'>
                Entrar
            </Text>
            
        </Button>
        </div>



    );


}