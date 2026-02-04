import { Center, Loader, } from '@mantine/core';

import { useNavigate, Outlet } from 'react-router-dom';

import { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar';

export default function Dashboard() {
  
  const navigate = useNavigate();

  const [autenticado, setAutenticado] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token encontrado:", token);

    if(!token || token === 'null' || token === 'undefined') {
      console.log("Sem token! Expulsando...");
      navigate('/', {replace: true});
    }
    else{
      setAutenticado(true);
    }
  }, [navigate]);

  if (!autenticado) {
    return (
      <Center style={{ width: '100vw', height: '100vh' }}>
        <Loader size="xl" />
      </Center>
    )
  }

  return (
      <div className="h-screen w-full p-10 flex flex-col box-border overflow-hidden">

        <div className='flex-1 bg-white rounded-3xl shadow-2xl flex flex-row overflow-hidden'>
          <SideBar/>

          <main className="flex-1 overflow-y-auto p-8">
          <Outlet /> 
        </main>

          
        </div>
        
    </div>
  );
}