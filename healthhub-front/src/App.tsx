import '@mantine/core/styles.css';
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Patients } from './pages/Patients';
import { Monitoring } from './pages/Monitoring';
import { Alerts } from './pages/Alerts';


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
      <Dashboard/>
      </PrivateRoute>
      } >
        <Route index element=''/>
        <Route path="pacientes" element={
          <PrivateRoute>
            <Patients></Patients>
          </PrivateRoute>
        }/>
        <Route  path="monitor" element={
          <PrivateRoute>
            <Monitoring/>
          </PrivateRoute>
        }/> 
         <Route  path="alertas" element={
          <PrivateRoute>
            <Alerts/>
          </PrivateRoute>
        }/> 

       </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </BrowserRouter>
  );
}

