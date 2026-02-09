import { Button, Text, UnstyledButton, Group } from '@mantine/core';
import { FcGoogle } from "react-icons/fc";
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import './styles.css'

interface SidebarLinkProps {
  to: string;
  label: string;
  textLabel: string;
  icon: React.ReactNode;
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