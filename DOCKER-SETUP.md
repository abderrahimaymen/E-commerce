# 🐳 Docker Setup Guide

## Prerequisites
- Docker Desktop installed and **RUNNING**
- PowerShell or Command Prompt

---

## 🚨 IMPORTANT: Start Docker Desktop First!

**Before running any Docker commands:**

1. Open **Docker Desktop** application
2. Wait for it to fully start (Docker icon in system tray should be green)
3. Verify Docker is running:
   ```bash
   docker --version
   docker ps
   ```

If you get pipe errors, Docker Desktop is **NOT running**!

---

## 📝 Step 1: Prepare Environment

### Update docker-compose.yml:

The docker-compose.yml is configured to use **MySQL 8.3**:

```yaml
mysql:
  image: mysql:8.3
  # ... with UTF-8 MB4 character set for full Unicode support
```

If you need a different MySQL version, edit the `image:` line in docker-compose.yml.

```bash
# Navigate to project root
cd C:\Users\user\Desktop\E-commerce
```

---

## 📝 Step 2: Build and Start with Docker

### Option A: Build and Run (First Time)

```bash
# Build images and start containers
docker-compose up --build -d
```

This will:
- Build backend image (can take 5-10 minutes)
- Build frontend image
- Pull MySQL 8.0 image
- Start all containers in detached mode

### Option B: Start Existing Containers

```bash
# If already built, just start
docker-compose up -d
```

---

## 📝 Step 3: Verify Containers

```bash
# Check running containers
docker-compose ps

# Should see:
# - ecommerce-mysql
# - ecommerce-backend
# - ecommerce-frontend
```

### View logs:
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f mysql
docker-compose logs -f frontend
```

---

## 📝 Step 4: Access Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **Swagger Docs:** http://localhost:3000/api/docs
- **MySQL:** localhost:3306 (from host machine)

---

## 🛑 Stop Containers

```bash
# Stop all containers
docker-compose down

# Stop and remove volumes (WARNING: deletes database data)
docker-compose down -v
```

---

## 🔄 Rebuild After Code Changes

### Backend changes:
```bash
docker-compose up --build -d backend
```

### Frontend changes:
```bash
docker-compose up --build -d frontend
```

### All services:
```bash
docker-compose up --build -d
```

---

## 🐛 Troubleshooting

### 1. "Cannot connect to pipe/dockerDesktopLinuxEngine"
**Solution:** Docker Desktop is NOT running. Start Docker Desktop first!

### 2. Backend container exits immediately
```bash
# Check logs
docker-compose logs backend

# Common issues:
# - MySQL not ready yet (backend tries to connect too early)
# - Database connection error
```

**Solution:** Increase wait time in docker-compose.yml or restart:
```bash
docker-compose restart backend
```

### 3. "Port already in use"
```bash
# Find what's using the port
netstat -ano | findstr :3000
netstat -ano | findstr :5173
netstat -ano | findstr :3306

# Kill process or change port in docker-compose.yml
```

### 4. MySQL connection errors
```bash
# Access MySQL container
docker exec -it ecommerce-mysql mysql -u root -p
# Password: root

# Check database exists
SHOW DATABASES;
USE ecommerce_db;
SHOW TABLES;
```

### 5. Need to reset everything
```bash
# Stop and remove everything
docker-compose down -v

# Remove images
docker rmi ecommerce-backend ecommerce-frontend

# Start fresh
docker-compose up --build -d
```

---

## 📊 Useful Docker Commands

### Container Management:
```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Start/Stop specific service
docker-compose start backend
docker-compose stop backend

# Restart service
docker-compose restart backend

# Remove containers
docker-compose rm -f
```

### Image Management:
```bash
# List images
docker images

# Remove unused images
docker image prune

# Remove specific image
docker rmi ecommerce-backend
```

### Logs and Debugging:
```bash
# View logs
docker-compose logs -f backend
docker-compose logs -f --tail=100 backend

# Execute command in container
docker exec -it ecommerce-backend sh
docker exec -it ecommerce-mysql mysql -u root -p

# Inspect container
docker inspect ecommerce-backend
```

### Volume Management:
```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect ecommerce_mysql_data

# Remove volumes (WARNING: deletes data)
docker volume rm ecommerce_mysql_data
```

---

## 🔥 Common Workflows

### Development with Hot Reload:
For development, it's better to run locally (see LOCAL-DEVELOPMENT.md) because:
- Faster rebuilds
- Direct file access
- Better debugging
- No container overhead

### Production Deployment:
```bash
# Build optimized images
docker-compose build --no-cache

# Start in production mode
docker-compose up -d

# View resource usage
docker stats
```

### Database Backup:
```bash
# Backup database
docker exec ecommerce-mysql mysqldump -u root -proot ecommerce_db > backup.sql

# Restore database
docker exec -i ecommerce-mysql mysql -u root -proot ecommerce_db < backup.sql
```

---

## 🎯 Quick Commands Cheat Sheet

```bash
# Start everything
docker-compose up -d

# Stop everything
docker-compose down

# Rebuild and restart
docker-compose up --build -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps

# Restart specific service
docker-compose restart backend

# Access MySQL
docker exec -it ecommerce-mysql mysql -u root -proot ecommerce_db

# Access backend container shell
docker exec -it ecommerce-backend sh

# Remove everything (including volumes)
docker-compose down -v
docker image prune -a
```

---

## ⚠️ Docker vs Local Development

| Aspect | Docker | Local |
|--------|--------|-------|
| **Setup Time** | Longer (5-10 min first build) | Faster (2-3 min) |
| **Hot Reload** | Not supported | ✅ Supported |
| **Debugging** | More complex | ✅ Easier |
| **Resource Usage** | Higher (containers) | Lower (native) |
| **Production Similarity** | ✅ Identical | Different |
| **Isolation** | ✅ Complete | Shared system |
| **Best For** | Testing, Production | Development, Debugging |

**Recommendation:** Use **local development** for coding, **Docker** for testing production setup.
