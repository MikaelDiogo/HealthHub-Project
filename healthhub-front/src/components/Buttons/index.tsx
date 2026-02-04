import { Button, Text, UnstyledButton, Group } from '@mantine/core';
import { FcGoogle } from "react-icons/fc";
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import './styles.css'

interface SidebarLinkProps {
  to: string;
  label: string;
  icon: React.ReactNode;
}

export const SideBarLink = ({to, label, icon}: SidebarLinkProps) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <UnstyledButton component={RouterLink}
        to={to}
        className={`
        w-full p-3 rounded-xl transition-all duration-200
        ${isActive 
          ? 'bg-brand-blue text-white shadow-md' 
          : 'text-brand-navy hover:bg-brand-blue/10'}
      `}
        >
            <Group gap="md">
        {icon}
        <Text size="sm" fw={600}>{label}</Text>
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