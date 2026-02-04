import '@mantine/core/styles.css';
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';


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
        <Route index element={<div>Aqui é o conteúdo da sua Home/Dash</div>}/>
        <Route path="pacientes" element={<div>Aqui é a página de Pacientes</div>} />

       </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </BrowserRouter>
  );
}

