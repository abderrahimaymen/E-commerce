# 🚀 Quick Start Guide - Local Development

## Prerequisites
- Node.js 18+ installed
- **MySQL 8.3** (or 8.0+) installed and running locally
- npm or yarn

---

## 📝 Step 1: Setup MySQL Database

### Start MySQL (if not running):
```bash
# Windows - Start MySQL83 service
net start MySQL83

# Or use MySQL Workbench to start the service
# Services: mysql83
```

### Create Database:
```sql
-- Connect to MySQL as root
mysql -u root -p

-- Create database
CREATE DATABASE ecommerce_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user (optional, or use root)
CREATE USER 'ecommerce_user'@'localhost' IDENTIFIED BY 'ecommerce_password';
GRANT ALL PRIVILEGES ON ecommerce_db.* TO 'ecommerce_user'@'localhost';
FLUSH PRIVILEGES;

-- Exit
EXIT;
```

---

## 📝 Step 2: Configure Backend

### Navigate to backend:
```bash
cd backend
```

### Update .env file:
```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=your_mysql_password
DATABASE_NAME=ecommerce_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Server Configuration
NODE_ENV=development
PORT=3000
```

### Install dependencies (if not done):
```bash
npm install
```

### Run migrations (TypeORM will auto-create tables):
```bash
# Development mode with auto-reload
npm run start:dev
```

**Backend will be available at:** http://localhost:3000
**Swagger API docs at:** http://localhost:3000/api/docs

---

## 📝 Step 3: Configure Frontend

Open a **NEW terminal** and:

```bash
cd frontend
npm install
```

### Update API endpoint (if needed):
Check `frontend/src/services/api.js` - should point to:
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

### Start frontend:
```bash
npm run dev
```

**Frontend will be available at:** http://localhost:5173

---

## ✅ Verify Everything Works

### Test Backend:
```bash
# Health check
curl http://localhost:3000

# Swagger docs
# Open browser: http://localhost:3000/api/docs
```

### Test Full Flow:
1. Open http://localhost:5173
2. Register a new user
3. Login
4. Browse products
5. Add to cart
6. Create order
7. Process payment

---

## 🛑 Stop Services

```bash
# Stop backend: Ctrl+C in backend terminal
# Stop frontend: Ctrl+C in frontend terminal
# Stop MySQL: net stop MySQL83 (if needed)
```

---

## 🐛 Troubleshooting

### "Cannot connect to MySQL"
- Verify MySQL is running: `mysql -u root -p`
- Check credentials in `.env` file
- Verify port 3306 is not blocked

### "Port 3000 already in use"
- Find and kill the process: `netstat -ano | findstr :3000`
- Or change PORT in `.env` to 3001, 3002, etc.

### "Module not found" errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### TypeORM errors
- Delete database and recreate: `DROP DATABASE ecommerce_db; CREATE DATABASE ecommerce_db;`
- Restart backend with `npm run start:dev`

---

## 📊 Database Management

### View tables:
```bash
mysql -u root -p ecommerce_db
SHOW TABLES;
SELECT * FROM users;
```

### Reset database:
```bash
mysql -u root -p -e "DROP DATABASE ecommerce_db; CREATE DATABASE ecommerce_db;"
npm run start:dev  # Will recreate tables
```

---

## 🎯 Development Workflow

1. **Backend changes**: Auto-reload with `npm run start:dev`
2. **Frontend changes**: Auto-reload with `npm run dev`
3. **Database changes**: Modify entities, restart backend (TypeORM syncs)
4. **Test changes**: Use Swagger UI or Postman for API testing

---

## 🔥 Quick Commands Cheat Sheet

```bash
# Backend
cd backend
npm install                  # Install dependencies
npm run start:dev           # Development mode (auto-reload)
npm run build               # Build for production
npm run start:prod          # Run production build
npm test                    # Run tests

# Frontend
cd frontend
npm install                  # Install dependencies
npm run dev                 # Development mode
npm run build               # Build for production
npm run preview             # Preview production build

# MySQL
mysql -u root -p            # Connect to MySQL
SHOW DATABASES;             # List databases
USE ecommerce_db;           # Select database
SHOW TABLES;                # List tables
```
