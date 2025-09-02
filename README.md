# 🌐 Gro Digital Platform

A **full-stack authentication system** with a **React frontend** and **Node.js backend**, featuring **JWT authentication**, **token refresh**, and a **modern toast notification system**.  
The project is fully containerized with **Docker** for easy setup and deployment.  

---

## 📦 Features

### 🔹 Frontend (React)
- Responsive **modern UI** with styled-components  
- **Authentication system**: Login/Signup with JWT  
- **Toast notifications** for success, error, and info states  
- **Automatic token refresh** for seamless user experience  
- **Protected routes** with user validation  

### 🔹 Backend (Node.js + PostgreSQL)
- **JWT authentication** (access & refresh tokens)  
- **Automatic token renewal**  
- **Database support** with PostgreSQL  
- **Middleware for protected routes**  
- **CORS enabled** for security  

---

## ⚡ Quick Start

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)  
- [Git](https://git-scm.com/)  

### Installation
```bash
# Clone repository
git clone <your-repo-url>
cd "Gro Digital Platform"

# Run setup script
./setup.sh
```

### Access Application
- **Frontend** → http://localhost:3000  
- **Backend** → http://localhost:9000  

---

## 🐳 Docker Usage

### Run Services (Production)
```bash
docker-compose up --build
```

### Run Services (Development with Hot Reload)
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Background Mode
```bash
docker-compose up -d
```

### Logs
```bash
docker-compose logs -f
```

### Stop / Restart
```bash
docker-compose down
docker-compose restart
```

---

## 🔧 Individual Docker Commands

### Run **Client Only**
```bash
cd Client
docker build -t gro-client .
docker run -d -p 3000:3000 --name gro-client-container gro-client
```

### Run **Server Only**
```bash
cd Server
docker build -t gro-server .
docker run -d -p 9000:9000 \
  -e DB_URL="postgresql://<username>:<password>@<host>/<db>?sslmode=require&channel_binding=require" \
  -e PORT=9000 \
  --name gro-server-container gro-server
```

### Run Both Separately
```bash
# Server (Terminal 1)
cd Server
docker build -t gro-server .
docker run -d -p 9000:9000 -e DB_URL="<connection-string>" -e PORT=9000 --name gro-server-container gro-server

# Client (Terminal 2)
cd Client
docker build -t gro-client .
docker run -d -p 3000:3000 --name gro-client-container gro-client
```

### Development Mode (Hot Reload for Client)
```bash
cd Client
docker build -f Dockerfile.dev -t gro-client-dev .
docker run -d -p 3000:3000 -v $(pwd):/app --name gro-client-dev-container gro-client-dev
```

---

## 📁 Project Structure
```
Gro Digital Platform/
├── Client/                 # React frontend
│   ├── src/
│   │   ├── Components/     # React components
│   │   ├── store/          # Redux store & actions
│   │   └── styles/         # Styled-components
│   ├── Dockerfile          # Client Docker configuration
│   └── .dockerignore
├── Server/                 # Node.js backend
│   ├── database/           # Database operations
│   ├── helpers/            # Authentication middleware
│   ├── Dockerfile          # Server Docker configuration
│   └── .dockerignore
├── docker-compose.yml      # Docker orchestration
├── setup.sh                # Setup script
└── README.md               # Documentation
```

---

## 🔑 Authentication Flow

1. **Signup** → Create new user account  
2. **Login** → Receive access token (15 min) + refresh token (7 days)  
3. **API Calls** → Use access token in Authorization header  
4. **Token Expiry** → Refresh using refresh token  
5. **Dashboard** → Access protected routes with validation  

---

## 📡 API Endpoints

- `POST /api/v1/signup` → User registration  
- `POST /api/v1/login` → User authentication  
- `GET /api/v1/validate-token` → Validate access token  

---

## 🛡️ Security Features

- **JWT tokens** for authentication  
- **bcrypt** password hashing  
- **HttpOnly refresh tokens** for cookie security  
- **CORS protection**  
- **Token refresh** for smooth user sessions  

---

## 🚀 Deployment

### Production Build
```bash
docker-compose -f docker-compose.prod.yml up --build
```

### Required Environment Variables
- `JWT_SECRET` → Access token secret  
- `JWT_REFRESH_SECRET` → Refresh token secret  
- `DATABASE_URL` → PostgreSQL connection string  

---

## 🛠️ Troubleshooting

### Port Already in Use
```bash
docker-compose down
# Or update ports in docker-compose.yml
```

### Docker Not Running
Start Docker Desktop before running commands.  

### Build Errors
```bash
docker-compose down
docker system prune -f
docker-compose up --build
```

### Database Connection Issues
Ensure PostgreSQL instance is running and accessible.  

---

## 🤝 Contributing

1. Fork the repo  
2. Create a feature branch  
3. Make changes and test with Docker  
4. Submit a pull request  

---

## 📜 License
This project is licensed under the **MIT License**.  

---

## 💬 Support
For issues, check the troubleshooting section or open a GitHub issue.  

---


## 🚧 Improvements & Future Work

This project is a **minimal setup** to demonstrate a full-stack authentication flow with Dockerized services.  
Some areas for improvement include:

- **Folder Structure** → Can be organized better for scalability (e.g., separating routes, controllers, and services).  
- **API Coverage** → Currently only limited auth-related APIs are included; more endpoints (user profile, role management, etc.) can be added.  
- **Environment Variables** → `.env` files will not be pushed for security, but additional secrets/configs should be managed properly (e.g., `.gitignore` should include more sensitive files).  
- **Testing** → Add unit tests and integration tests for both frontend and backend.  
- **CI/CD** → Automate builds and deployments using GitHub Actions or similar pipelines.  
- **Production Setup** → Add reverse proxy (NGINX) and SSL/TLS support for secure deployments.  
- **Error Handling & Logging** → Improve structured error responses and centralized logging.  

---


✨ **Made with React, Node.js, PostgreSQL, and Docker** ✨  
