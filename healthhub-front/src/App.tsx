import '@mantine/core/styles.css';
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { Patients } from './pages/Patients';
import { Monitoring } from './pages/Monitoring';
import { Alerts } from './pages/Alerts';  
import { DashboardLayout } from './Layouts'; 
import DashboardHome from './pages/Dashboard';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token || token === 'undefined' || token === 'null') {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route
          path='/main'
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          } 
        >
         
          <Route index element={<DashboardHome />} />
          <Route path="pacientes" element={<Patients />} />
          <Route path="monitor" element={<Monitoring />} />
          <Route path="alertas" element={<Alerts />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}