import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar'; 
import './styles.css';
import { Center, Loader, ScrollArea } from '@mantine/core';
import { useEffect, useState } from 'react';

export function DashboardLayout() {
  const navigate = useNavigate();
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || token === 'null' || token === 'undefined') {
      navigate('/', { replace: true });
    } else {
      setAutenticado(true);
    }
  }, [navigate]);

  if (!autenticado) {
    return (
      <Center style={{ width: '100vw', height: '100vh' }}>
        <Loader size="xl" />
      </Center>
    );
  }

  return (
  // O container pai agora é um "palco" que centraliza o sistema
  <div className="h-screen w-screen bg-neutral-100 flex items-center justify-center overflow-hidden p-6 md:p-10 box-border">
    
   
    <div className='w-full h-full bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-row overflow-hidden'>
      
      <SideBar />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden">
          <ScrollArea h="100%" scrollbarSize={8} offsetScrollbars>
              <div style={{ padding: '30px' }}>
                  <Outlet /> 
              </div>
          </ScrollArea>
      </main>
    </div>
  </div>
);
}