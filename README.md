# Maison Mobile - Projeto Marcenaria

Este é o projeto **Maison Mobile**, uma plataforma para marcenaria de alto padrão. O projeto está dividido em duas partes principais: **Client** (Front-end) e **Server** (Back-end).

## 🚀 Tecnologias Utilizadas

### Front-end (`/client`)
- **React.js** (via Vite)
- **Tailwind CSS** (v4)
- **React Router DOM** (Navegação)
- **Axios** (Consumo de API)

### Back-end (`/server`)
- **Node.js** com **Express**
- **Bun** (Runtime e Package Manager)
- **MySQL** (Banco de dados)

---

## 🛠️ Como Executar o Projeto

Certifique-se de ter o [Bun](https://bun.sh/) instalado em sua máquina.

### 1. Inicializando o Front-end

```bash
cd client
bun install
bun run dev
```
O cliente estará rodando em `http://localhost:5173/`.

### 2. Inicializando o Back-end

```bash
cd server
bun install
bun run dev
```
O servidor estará rodando em `http://localhost:5000/`.

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
├── /server          (Node.js + Express)
│   ├── /src
│   │   ├── /config
│   │   ├── /controllers
│   │   ├── /models
│   │   ├── /routes
│   │   └── /middlewares
├── /docs            (Documentação)
└── docker-compose.yml
```
