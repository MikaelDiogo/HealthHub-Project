import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar'; 
import './styles.css';
import { Center, Loader } from '@mantine/core';
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
    <div className="min-h-screen bg-app-bg p-6 md:p-10 flex flex-col box-border overflow-hidden">
      
    
      <div className='flex-1 bg-white rounded-3xl shadow-2xl flex flex-row overflow-hidden'>
        <SideBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet /> 
        </main>

      </div>
    </div>
  );
}