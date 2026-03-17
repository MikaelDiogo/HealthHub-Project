import { Button, Text, UnstyledButton, Group } from '@mantine/core';
import { FcGoogle } from "react-icons/fc";
import {  NavLink as RouterLink, useLocation } from 'react-router-dom';
import './styles.css'
import { IconLogout2, IconPlus } from '@tabler/icons-react';
import './styles.css'

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
                overlayProps={{ backgroundOpacity: 0.6, blur: 4 }}
            >
                <Tabs color='cyan' defaultValue="pessoais" variant="pills">
                    <Tabs.List grow mb="xl" className="bg-blue-50 p-1 rounded-lg">
                        <Tabs.Tab value="pessoais" leftSection={<IconUser size={16} />}>
                            Pessoais
                        </Tabs.Tab>
                        <Tabs.Tab value="hospitalares" leftSection={<IconStethoscope size={16} />}>
                            Hospitalares
                        </Tabs.Tab>
                        <Tabs.Tab value="anamnese" leftSection={<IconClipboardText size={16} />}>
                            Anamnese
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="pessoais">
                      
                        <Stack gap="lg">
                            <TextInput label="Nome Completo" placeholder="Ex: Maria Silva Santos" required />
                            <Group grow>
                                 <TextInput label="RG" placeholder="ex: 11.111.111-2" />
                                    <TextInput label="CPF" placeholder='ex: 111.111.111-00'/>
                            </Group>
                            <Group grow>
                                <TextInput label="Idade" placeholder="41" />
                                <TextInput label="Sexo" placeholder="Feminino" />
                                
                            </Group>
                            <Group grow>
                                <TextInput label="Telefone" placeholder="(88) 99999-9999" />            
                            </Group>
                            <Group grow>
                                <TextInput label="Endereço" placeholder="ex: Av. Dom Pedro II, 58, Crateús - CE" />            
                            </Group>
                        </Stack>
                    </Tabs.Panel>

                    <Tabs.Panel value="hospitalares">
                        <Stack gap="md">
                            <Group grow>
                                <TextInput label="Temperatura(°C)" placeholder="ex: 99°C" />
                                <TextInput label="Saturação(SpO²)" placeholder="ex: 95%" />
                            </Group>
                             <Group grow>
                                <TextInput label="Pressão Arterial" placeholder="ex: 130/90" />
                                <TextInput label="Frequência Cardíaca (bpm)" placeholder="ex: 88" />
                            </Group>
                             <Group grow>
                                <TextInput label="Alergias" placeholder="ex: Dipirona, CetoProfeno" />            
                            </Group>
                            <Group grow>
                                <TextInput label="Medicamento em Uso" placeholder="ex: Ibuprofeno, 300mg" />            
                            </Group>
                            
                         


                        </Stack>
                    </Tabs.Panel>

                    <Tabs.Panel value="anamnese">
                        <Stack gap="md">
                            <Textarea 
                                label="Relato da Anamnese" 
                                placeholder="Descreva o histórico clínico aqui..."
                                minRows={20}
                                autosize
                            />
                        </Stack>
                    </Tabs.Panel>
                </Tabs>

                <Group justify="flex-end" mt="xl">
                    <Button variant="subtle" color="gray" onClick={close}>
                        Cancelar
                    </Button>
                    <Button className="bg-cyan-700! hover:bg-cyan-600! text-white!" onClick={close}>
                        Salvar Paciente
                    </Button>
                </Group>
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