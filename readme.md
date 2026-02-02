# 🏥 Health Hub - Gestão Hospitalar e Triagem Inteligente

O **Health Hub** é uma plataforma de gestão hospitalar desenvolvida para otimizar o fluxo de atendimento em unidades de saúde. O sistema foca na agilidade do profissional de enfermagem, permitindo uma triagem rápida e um controle preciso da fila de espera, garantindo que pacientes em estado crítico recebam atenção prioritária.

---

## 📋 Visão Geral do Projeto

Em ambientes hospitalares, a organização da fila de espera é vital. O Health Hub centraliza as informações de entrada do paciente, permitindo que a equipe de saúde visualize instantaneamente quem está aguardando, há quanto tempo e qual o seu nível de risco. 

A aplicação foi construída com foco em **performance e segurança**, utilizando o que há de mais moderno no ecossistema React para garantir uma interface fluida e uma experiência de usuário profissional.

### ✨ Principais Funcionalidades

- 🔐 **Sistema de Autenticação Robusto:** Login com validação de credenciais via `Mantine Form`, impedindo envios vazios e garantindo que apenas profissionais autorizados acessem o sistema.
- 🛡️ **Proteção de Acesso (Private Routes):** Implementação de segurança que verifica a existência de um token de sessão, impedindo que usuários não autorizados acessem o painel administrativo diretamente pela URL.
- 📊 **Dashboard Administrativo:** Estrutura baseada em `AppShell`, oferecendo uma navegação lateral intuitiva e cabeçalho fixo para facilitar o dia a dia do enfermeiro.
- 🚦 **Fila de Espera Dinâmica:** Listagem de pacientes com classificação de risco visual baseada em cores, permitindo identificar rapidamente estados Críticos, Urgentes e Estáveis.
- 📱 **Interface Responsiva:** Layout totalmente adaptado para diferentes tamanhos de tela, garantindo usabilidade tanto em computadores quanto em tablets dentro da unidade de saúde.

---

## 🛠️ Tecnologias Utilizadas

- **React.js + Vite:** Base para uma aplicação rápida e moderna.
- **TypeScript:** Segurança e tipagem de dados em todo o projeto.
- **Mantine UI:** Componentes de interface de alto nível e gerenciamento de formulários.
- **Tailwind CSS:** Estilização eficiente e responsividade.
- **React Router Dom:** Controle de navegação e proteção de rotas privadas.
- **Tabler Icons:** Iconografia limpa e profissional.

---

## 🏗️ Organização do Projeto

- `/src/components`: Componentes de UI reutilizáveis (Inputs de senha, campos de texto e botões).
- `/src/pages`: Páginas da aplicação, incluindo a tela de Login e o Dashboard de controle.
- `/src/App.tsx`: Centralização da lógica de rotas e segurança do sistema.

---

## 🔑 Credenciais para Acesso

Para testar o fluxo de autenticação e a proteção de segurança das rotas, utilize os dados abaixo:

- **Usuário:** `enfermeiro@healthhub.com`
- **Senha:** `admin123`

> **Nota:** Caso tente burlar o acesso digitando o caminho do painel diretamente na URL sem estar autenticado, o sistema executará o redirecionamento automático para a tela de login.

---

Desenvolvido com foco em tecnologia aplicada à saúde por **[Mikael Diogo]**.