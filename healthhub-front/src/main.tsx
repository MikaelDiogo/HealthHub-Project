import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MantineProvider } from '@mantine/core';
import { AppWrapper } from './Layouts/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <MantineProvider>
      <AppWrapper>
    <App />
    </AppWrapper>
    </MantineProvider>
  
  </StrictMode>,
)
