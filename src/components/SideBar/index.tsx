import { Text, Box, Group, Divider, Stack, Avatar, Anchor } from '@mantine/core';
import HealthImg from '../../assets/healthhubPHOTO 1.png'
import './styles.css'
import { ButtonLogOut, SideBarLink }from '../Buttons';
import { IconLayoutDashboard, IconUsers, IconWaveSawTool, IconAlertTriangle, } from '@tabler/icons-react';

/* interface FastStatisticsProps {
    labelAtivos: string;
    labelCriticos: string;
    labelRecuperacao: string;
    quantity: number;
}

export const FastStatistics = ({labelAtivos, quantity, labelCriticos, labelRecuperacao}: FastStatisticsProps) => {
    return(
        <Stack gap={8} className='flex! flex-col! mt-3 ml-2 text-brand-navy '>
            <Group>
            <Text size='sm'>{labelAtivos}</Text>
            <Text
            className='bg-blue-700/20 pr-1! text-blue-600! pl-1! border border-blue-700/30 rounded-lg font-medium!'
             size='sm'>{quantity}</Text>
            </Group>
           
            <Group>
             <Text size='sm'>{labelCriticos}</Text>
            <Text
            className='bg-red-700/20 pr-1! text-red-600! pl-1! border border-red-700/30 rounded-lg font-medium!'
             size='sm'>{quantity}</Text>
             </Group>
            <Group>
             <Text size='sm'>{labelRecuperacao}</Text>
            <Text
            className='bg-green-700/20 pr-1! text-green-600! pl-1! border border-green-700/30 rounded-lg font-medium!'
             size='sm'>{quantity}</Text>
             </Group>
        </Stack>
    );
} */


export default function SideBar(){
    return(
        <div className="flex! flex-col! w-64! h! border-r! border-gray-300 pt-8! pl-4 pr-4!  " >
            <Box className='flex! gap-2'>
            <img src={HealthImg} className='w-14 rounded-full border'  />
            <div className='flex flex-col '>
            <Text className='font-bold! text-2xl!'>Health Hub</Text>
            <Text className='font-normal! text-xs! text-gray-500!' >Sistema de Monitoramento</Text>
            </div>
            </Box>

            <Group className='flex mt-3 h-10 w-55 justify-center! gap-2! bg-brand-blue/18! border border-blue-700/20 text-brand-navy rounded-lg!'>
                <Text className='font-sans! font-medium!'>Status do sistema</Text>
                <Text className='border rounded-2xl pt! pb! pl-2! pr-2! border-brand-green bg-brand-green/20 text-green-800!'>Online</Text>
            </Group>

            <Divider my='sm'/>

            <Text 
            className='text-brand-navy! font-semibold! text-xs!'>
                
            NAVEGAÇÃO
            </Text>
            <Stack className='pt-4' gap={8}>
            <SideBarLink 
             to="/main" 
            label="Dashboard" 
             textLabel='Visão Geral do Sistema'
            icon={<IconLayoutDashboard size={32} />} 
             />
              <SideBarLink 
             to="/main/pacientes" 
            label="Pacientes" 
            textLabel='Gerenciar Pacientes'
           
            icon={<IconUsers size={28} />} 
             />

             <SideBarLink 
             to="/main/monitor" 
            label="Monitoramento" 
            textLabel='Sinais vitais em Tempo Real'
           
            icon={<IconWaveSawTool size={28} />} 
             />

              <SideBarLink 
             to="/main/alertas" 
            label="Alertas" 
            textLabel='Alertas Críticos'
           
            icon={<IconAlertTriangle size={28} />} 
             />
         </Stack>

           <Text 
            className=' mt-5! text-brand-navy! font-semibold! text-xs!'>
                ESTATÍSTICAS RÁPIDAS
            </Text>
      {/*       <FastStatistics
            labelAtivos="Pacientes Ativos"
            labelCriticos='Pacientes Críticos'
            labelRecuperacao='Em recuperação'
            quantity={20}
            /> */}
           

            <Divider 
            my='sm'/>

            <Group gap={8} className='flex! flex-row! mt-3'>
            <Avatar
            className='border border-blue-500/40'
            color='blue' radius="xl" size={45}>Mk</Avatar>
            <Stack gap={0}>
            <Text className='font-semibold! text-sm!'>MIKAEL DIOGO</Text>
            <Text className='text-xs! text-brand-navy!'>Administrador</Text>
            </Stack>
            </Group>
           
           <Group>
            <ButtonLogOut to='/' label={''} textLabel={''} icon={undefined}/>
           </Group>

        </div>
    );
}