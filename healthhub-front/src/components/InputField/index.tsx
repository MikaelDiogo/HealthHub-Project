import './styles.css'
import { IconLock } from '@tabler/icons-react';
import { Input, PasswordInput, type InputProps, type PasswordInputProps } from '@mantine/core';

interface InputFieldProps extends InputProps {
  placeholder?: string;
  [key: string]: any; 
}

export const InputField = ({ placeholder, ...props } : InputFieldProps) => {
    return ( 
    <Input 
        w={320} 
        radius="md" 
        placeholder={placeholder} 
        {...props}
        />

    );
};

export const InputPass = ({ ...props }: PasswordInputProps) => {
      const icon = <IconLock size={18} stroke={1.5} />;
    return  (
    <PasswordInput 
    w={319} 
    radius='md' 
    leftSection={icon}  
    placeholder="Insira a senha" 
    {...props}
    />
    
    );
}

