import { Text, Box, Group, Divider } from '@mantine/core';
import HealthImg from '../../assets/healthhubPHOTO 1.png'
import './styles.css'
import { SideBarLink }from '../Buttons';
import { IconLayoutDashboard } from '@tabler/icons-react';



export default function SideBar(){
    return(
        <div className="flex! flex-col! w-64! h-full! border-r! border-gray-300 pt-8! pl-4 pr-4!  " >
            <Box className='flex! gap-2'>
            <img src={HealthImg} className='w-14 rounded-full border'  />
            <div className='flex flex-col '>
            <Text className='font-bold! text-2xl!' >Health Hub</Text>
            <Text className='font-normal! text-xs! text-gray-500!' >Sistema de Monitoramento</Text>
            </div>
            </Box>

            <Group className='flex mt-3 border-brand-blue/60 h-12 w-55 justify-center! gap-2! bg-brand-blue/24 text-brand-navy rounded-lg'>
                <Text className='font-sans!'>Status do sistema</Text>
                <Text className='border rounded-2xl pt! pb! pl-2! pr-2! border-brand-green bg-brand-green/20 text-green-800!'>Online</Text>
            </Group>

            <Divider my='sm'/>

            <Text 
            className='text-brand-navy! font-semibold! text-xs!'>
                
            NAVEGAÇÃO
            </Text>
            <SideBarLink 
             to="/main/pacientes" 
            label="Dashboard" 
            icon={<IconLayoutDashboard size={20} />} 
  />

        </div>
    );
}