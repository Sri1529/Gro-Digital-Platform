#  Gro Digital Platform

A full-stack authentication system with React frontend and Node.js backend, featuring JWT authentication, token refresh, and a modern toast notification system.

## 🛠️ Quick Start

### Prerequisites
- Docker Desktop (https://www.docker.com/products/docker-desktop/)
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd "Gro Digital Platform"
   ```

2. Run the setup script:
   ```bash
   ./setup.sh
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:9000

##  Docker Commands

### Start Services (Production)
```bash
docker-compose up --build
```

### Start Services (Development with Hot Reload)
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Start in Background
```bash
docker-compose up -d
```

### View Logs
```bash
docker-compose logs -f
```

### Stop Services
```bash
docker-compose down
```

### Restart Services
```bash
docker-compose restart
```

## 🐳 Individual Docker Run Commands

### Run Client Only
```bash
# Navigate to Client directory
cd Client

# Build client image
docker build -t gro-client .

# Run client container
docker run -d -p 3000:3000 --name gro-client-container gro-client
```

### Run Server Only
```bash
# Navigate to Server directory
cd Server

# Build server image
docker build -t gro-server .

# Run server container with environment variables
docker run -d -p 9000:9000 \
  -e DB_URL="postgresql://neondb_owner:npg_sJd6YrU9TIRe@ep-quiet-boat-adsoiwlh-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" \
  -e PORT=9000 \
  --name gro-server-container gro-server
```

### Run Both Separately
```bash
# Terminal 1 - Start Server
cd Server
docker build -t gro-server .
docker run -d -p 9000:9000 \
  -e DB_URL="postgresql://neondb_owner:npg_sJd6YrU9TIRe@ep-quiet-boat-adsoiwlh-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" \
  -e PORT=9000 \
  --name gro-server-container gro-server

# Terminal 2 - Start Client
cd Client
docker build -t gro-client .
docker run -d -p 3000:3000 --name gro-client-container gro-client
```

### Development Mode (Client with Hot Reload)
```bash
# Navigate to Client directory
cd Client

# Build development image
docker build -f Dockerfile.dev -t gro-client-dev .

# Run with volume mounting for live reload
docker run -d -p 3000:3000 \
  -v $(pwd):/app \
  --name gro-client-dev-container gro-client-dev
```

### Container Management
```bash
# View running containers
docker ps

# View logs
docker logs gro-client-container
docker logs gro-server-container

# Stop containers
docker stop gro-client-container gro-server-container

# Remove containers
docker rm gro-client-container gro-server-container

# Restart containers
docker restart gro-client-container gro-server-container
```

## 📁 Project Structure
```
Gro Digital Platform/
├── Client/                 # React frontend
│   ├── src/
│   │   ├── Components/     # React components
│   │   ├── store/         # Redux store & actions
│   │   └── styles/        # Styled-components
│   ├── Dockerfile         # Client Docker configuration
│   └── .dockerignore      # Client Docker exclusions
├── Server/                 # Node.js backend
│   ├── database/          # Database operations
│   ├── helpers/           # Authentication middleware
│   ├── Dockerfile         # Server Docker configuration
│   └── .dockerignore      # Server Docker exclusions
├── docker-compose.yml      # Docker orchestration
├── setup.sh               # Quick setup script
└── README.md              # This file
```

## 🔧 Features

### Frontend (React)
- **Modern UI**: Styled-components with responsive design
- **Authentication**: Login/Signup with JWT tokens
- **Toast Notifications**: Trendy notification system
- **Token Management**: Automatic token refresh
- **Dashboard**: Protected routes with user validation

### Backend (Node.js)
- **JWT Authentication**: Access & refresh tokens
- **Token Refresh**: Automatic token renewal
- **Database**: PostgreSQL with user management
- **Middleware**: Protected route validation
- **CORS**: Cross-origin resource sharing

##  Troubleshooting

### Port Already in Use
If ports 3000 or 9000 are busy:
```bash
# Stop existing services
docker-compose down

# Or change ports in docker-compose.yml
```

### Docker Not Running
Make sure Docker Desktop is running before executing commands.

### Build Errors
```bash
# Clean rebuild
docker-compose down
docker system prune -f
docker-compose up --build
```

### Database Connection Issues
Ensure your PostgreSQL database is running and accessible.

##  Authentication Flow

1. **Signup**: Create new user account
2. **Login**: Receive access token (1 min) + refresh token (7 days)
3. **API Calls**: Access token in Authorization header
4. **Token Expiry**: Automatic refresh using refresh token
5. **Dashboard**: Protected route with token validation

## UI Components

- **Toast System**: Success, error, info notifications
- **Styled Components**: CSS-in-JS styling
- **Responsive Design**: Mobile-friendly interface
- **Modern Icons**: Lucide React icons

##  API Endpoints

- `POST /api/v1/signup` - User registration
- `POST /api/v1/login` - User authentication
- `GET /api/v1/validate-token` - Token validation

##  Security Features

- **JWT Tokens**: Secure authentication
- **Password Hashing**: bcrypt encryption
- **Cookie Security**: HttpOnly refresh tokens
- **CORS Protection**: Cross-origin security
- **Token Refresh**: Automatic renewal

##  Deployment

### Production Build
```bash
# Build production images
docker-compose -f docker-compose.prod.yml up --build
```

### Environment Variables
Set these in your production environment:
- `JWT_SECRET`: Your JWT secret key
- `JWT_REFRESH_SECRET`: Your refresh token secret
- `DATABASE_URL`: PostgreSQL connection string

##  Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## License

This project is licensed under the MIT License.

##  Support

For issues, please check the troubleshooting section above or create an issue in the repository.

---

**Made with using React, Node.js, and Docker**
