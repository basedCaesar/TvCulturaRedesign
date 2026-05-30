# TV Cultura — Redesign Fullstack

Redesign de portfólio da [TV Cultura](https://cultura.uol.com.br), com dados reais scraped do site oficial.

**Stack:**
- **Frontend:** Vue 3 + Vite + Tailwind CSS + Vue Router
- **Backend:** Node.js + Express + SQLite (better-sqlite3)

---

## Como rodar — Self-hosted

**Pré-requisitos:** Node.js 20+, npm

```bash
git clone <repo-url>
cd cultura

# Backend
cd backend
cp .env.example .env        # ajuste se necessário
npm install
npm start                   # http://localhost:3000

# Frontend (novo terminal)
cd frontend
cp .env.example .env        # VITE_API_URL=http://localhost:3000
npm install
npm run dev                 # http://localhost:5173
```

---

## Como rodar — Docker

**Pré-requisitos:** Docker, Docker Compose

```bash
git clone <repo-url>
cd cultura
docker-compose up --build
```

| Serviço  | URL                     |
|----------|-------------------------|
| Frontend | http://localhost        |
| Backend  | http://localhost:3000   |

---

## Deploy

> **Live:** https://tv-cultura-redesign.vercel.app
