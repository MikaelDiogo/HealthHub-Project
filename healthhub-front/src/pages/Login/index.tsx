import axios from 'axios';
import './styles.css'

import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { Avatar, Title, Text, Divider, Box} from "@mantine/core";
import imgHealthHub from '../../assets/healthhubPHOTO 1.png'
import {ButtonLoginGoogle, ButtonEnter} from '../../components/Buttons';
import { InputPass, InputField} from '../../components/InputField';


export default function Login() {
    const navigate = useNavigate();
    
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
        email: (value) => (value.length < 5 ? 'Email muito curto' : null),
        password: (value) => (value.length < 1 ? 'Senha obrigatória' : null),
        },
    });

    const handleEntrar = async (values: typeof form.values) => {

        try {
            const response = await axios.post('http://localhost:3001/login', {
                email: values.email,
                password: values.password
            });

            const { token } = response.data;

             localStorage.setItem('token', token)
             navigate('/main')

        } catch (error: any) {
            const mensagem = error.response?.data?.message || "Erro ao conectar com o servidor";

            form.setErrors({
                password: mensagem
            });
        }

        /* const EMAIL_VERIFICADO = "enfermeiro@healthhub.com";
        const SENHA_VERIFICADA = "admin123"; */
         /*    alert('Email ou senha incorretos! Tente Novamente.')
            form.reset();
      */
    

       
    };


    return(
    <div className="w-screen h-screen grid place-items-center bg-gray-200">
        <form onSubmit={form.onSubmit(handleEntrar)}>
      <div className="w-105 h-170 bg-white border-2 border-gray-300 rounded-xl flex flex-col items-center pt-10">
            <Avatar  size={120} src={imgHealthHub} alt="it's me" radius={360} className="border-2 border-b-black " />
            <Title className="p-3 font-bold" order={2}>Bem Vindo ao Health Hub</Title>
            <Text className="  text-gray-400! font-medium! text-sm!">Faça login para continuar</Text>
            <ButtonLoginGoogle></ButtonLoginGoogle>
            <Box className='h-1 m-6 flex gap-1'>
                <Divider w={120} 
                className='m-2!'
                ></Divider>
                <Text className='text-gray-500! text-xs! '>ou</Text>
                <Divider
                className='m-2!' 
                w={120}></Divider>
            </Box>
            <Box className='
            flex
            flex-col
            justify-center
            items-center
            gap-4
            '>
            <Text
            className='font-semibold! 
                       text-sm!
                       mt-5!
                       '
            >Email
            </Text>
            <InputField placeholder='Digite seu Email' {...form.getInputProps('email')}/>
            <Text
            className='font-semibold! 
                       text-sm!
                       
                       '
            >Senha
            </Text>
             <InputPass {...form.getInputProps('password')}/>
            </Box>

            <ButtonEnter type='submit' />
      </div>
      </form>
    </div>
        
    );
}