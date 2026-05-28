# Maison Mobile - Projeto Marcenaria

Este é o projeto **Maison Mobile**, uma plataforma para marcenaria de alto padrão. O projeto está dividido em duas partes principais: **Client** (Front-end) e **Api** (Back-end).

## 🚀 Tecnologias Utilizadas

### Front-end (`/client`)
- **React.js** (via Vite)
- **Tailwind CSS** (v4)
- **React Router DOM** (Navegação)
- **Axios** (Consumo de API)

### Back-end (`/api`)
- **Node.js** com **Express**
- **Mongoose** / **MongoDB**
- **Bun** / **npm** (Runtime e Gerenciamento de Pacotes)

---

## 🛠️ Como Executar o Projeto

### 1. Inicializando o Front-end

```bash
cd client
bun install
bun run dev
```
O cliente estará rodando em `http://localhost:5173/`.

### 2. Inicializando o Back-end

```bash
cd api
bun install
bun run dev
```
O servidor estará rodando em `http://localhost:3000/`.

---

## 📂 Estrutura de Pastas

```
/maison_mobile
├── /client          (React.js + Vite)
│   ├── /src
│   │   ├── /components
│   │   ├── /hooks
│   │   ├── /services
│   │   └── /pages
├── /api             (Node.js + Express + MongoDB)
│   ├── /src
│   │   ├── /config
│   │   ├── /controllers
│   │   ├── /models
│   │   ├── /routes
│   └── server.js
├── /docs            (Documentação)
```
