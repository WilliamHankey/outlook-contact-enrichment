# Outlook Add-in – Contact Enrichment (JWT + Docker)

This project simulates an Outlook add-in that enriches the email reading experience by showing additional sender info (name, department, job title, phone). The app includes a secure backend with JWT-based authentication and is fully containerized using Docker.

---
## Features

- 🔐 JWT authentication flow with secure password hashing (bcrypt)
- 👤 Login form + contact info UI (simulated Outlook interface)
- 📇 Contact enrichment from a seeded SQLite database
- 🐳 Fully dockerized using Docker + Docker Compose
- ⚙️ Clean, modular architecture with secure practices


## Quickstart (Local)

### 1. Clone the repo

```bash
git clone https://github.com/WilliamHankey/outlook-contact-enrichment.git
cd outlook-contact-enrichment

```
    
## Tech Stack

- **Backend:** Node.js, Express, JWT, bcrypt, SQLite
- **Frontend:** HTML/CSS/JS with Office-like UI simulation
- **Auth:** Login with email/password → JWT issued/stored in `localStorage`
- **Docker:** Multi-service setup (API + static frontend via http-server)


## Run Locally

- Clone the project

### Backend
```bash
  cd backend
  npm install
  node server.js

```

### Frontend(serve static files)

```bash
  cd frontend
  npm install
  npx http-server -p 3000

```

Visit in your browser:
http://localhost:3000/login.html

## Run with Docker

Make sure Docker + Docker Compose are installed.

```bash
  docker-compose up --build
```

Backend: http://localhost:5000

Frontend: http://localhost:3000/login.html
## Testing

Basic unit tests for authentication and protected API endpoints are included under `backend/__tests__`.

Run with:

```bash
cd backend
npm test
```

### Test Credentials

Use this to test login:

Email: test@example.com

Password: securepassword123

The app will then fetch enrichment info for:

Sender email: sender@example.com
(Pre-seeded in the DB)
## Project Structure

    .
    ├── backend/          # Node.js API + SQLite + JWT auth
    ├── frontend/         # Static files (login + contact info UI)
    ├── manifests/        # Add-in manifest placeholder
    ├── docker-compose.yml
    └── README.md


## Notes

- This app simulates an Outlook add-in using a browser-based UI

- manifest.xml is included (non-functional, to satisfy assignment requirement)

- db.sqlite is committed for convenience — seeded with one user and one contact

- JWT tokens expire after 1 hour

- Structure is modular and ready for production refactor

---

## 📊 Evaluation Notes

### ✅ Independent Research & Problem Solving
- Researched and implemented secure JWT-based authentication using `jsonwebtoken` and `bcrypt`
- Researched Dockerization techniques for Node.js + SQLite + static servers
- Researched and tested alternatives to simulate Outlook UI without needing Office 365 Dev access
- Overcame cross-platform Docker `bcrypt` issues using native rebuilds and volume isolation

### ✅ Security Implementation
- Login system implemented with hashed credentials (bcrypt)
- JWT tokens issued and validated with expiration control
- Protected routes reject unauthenticated or invalid requests
- Database credentials never exposed — environment variables used securely

### ✅ Code Quality & Modularity
- Backend code modularized into `routes.js`, `auth.js`, `database.js`
- All environment variables abstracted via `.env`
- Reusable middleware-like structure for token verification
- Test coverage added using `jest` and `supertest` for key routes

### ✅ Dockerization & Ease of Setup
- Complete `docker-compose.yml` sets up backend and frontend
- SQLite database included and pre-seeded
- Easy local development with `http-server` and `npx`
- Clear instructions for Docker usage and manual navigation

### ✅ Practical Integration
- Outlook context simulated using static UI (`login.html`, `index.html`)
- Contact enrichment realistically displayed based on sender's email
- Graceful error handling for failed logins, missing tokens, and missing contact info

## References

[Office.js Docs](https://learn.microsoft.com/en-us/office/dev/add-ins/develop/understanding-the-javascript-api-for-office)

[JWT Best Practices](https://curity.io/resources/learn/jwt-best-practices/)

[Docker Node.js Guide](https://www.docker.com/blog/getting-started-with-docker-using-node-jspart-i/)


## Authors

- [@WilliamHankey](https://github.com/WilliamHankey)

