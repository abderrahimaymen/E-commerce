# 🚀 Guide de démarrage rapide E-commerce POO

## ⚡ Démarrage en 3 minutes

### Option 1: Avec Docker (Recommandé) 🐳

```bash
# 1. À la racine du projet
docker-compose up -d

# 2. Attendre 30 secondes que tout démarre

# 3. Accéder à l'application
# Frontend: http://localhost:5173
# Backend API: http://localhost:3000
# Swagger Doc: http://localhost:3000/api/docs
```

### Option 2: Manuel (Développement)

#### Étape 1: MySQL

```bash
# Installer et démarrer MySQL 8.0
# Créer la base de données:
mysql -u root -p
CREATE DATABASE ecommerce_db;
exit;
```

#### Étape 2: Backend

```bash
cd backend

# Installer les dépendances
npm install

# La base sera auto-configurée au démarrage (synchronize: true)

# Démarrer en mode dev
npm run start:dev

# ✅ Backend prêt sur http://localhost:3000
```

#### Étape 3: Frontend

```bash
cd frontend

# Installer les dépendances
npm install

# Démarrer
npm run dev

# ✅ Frontend prêt sur http://localhost:5173
```

---

## 📱 Test de l'application

### 1. Créer un compte

```bash
# Via l'interface: http://localhost:5173/register
# Ou via curl:
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Se connecter

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Sauvegarder le token retourné
```

### 3. Créer un produit (Admin)

D'abord, créer un admin:

```sql
-- Se connecter à MySQL
mysql -u root -p ecommerce_db

-- Créer un admin
INSERT INTO users (id, name, email, password_hash, role, type, created_at, updated_at)
VALUES (
  UUID(),
  'Admin User',
  'admin@example.com',
  '$2b$10$YourHashedPasswordHere',
  'ADMIN',
  'admin',
  NOW(),
  NOW()
);
```

Puis créer un produit:

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop HP",
    "price": 899.99,
    "description": "Laptop performant",
    "category": "Informatique",
    "initialStock": 50
  }'
```

### 4. Ajouter au panier

```bash
curl -X POST http://localhost:3000/api/cart/items \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "PRODUCT_ID",
    "quantity": 2
  }'
```

### 5. Créer une commande

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "promoCode": "PROMO10"
  }'
```

### 6. Payer avec Strategy Pattern 🎯

**Option A: Carte bancaire**

```bash
curl -X POST http://localhost:3000/api/payments/ORDER_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "method": "CARD",
    "cardInfo": {
      "cardNumber": "1234567812345678",
      "cardHolderName": "John Doe",
      "expiryDate": "12/25",
      "cvv": "123"
    }
  }'
```

**Option B: PayPal**

```bash
curl -X POST http://localhost:3000/api/payments/ORDER_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "method": "PAYPAL",
    "paypalInfo": {
      "email": "john@example.com"
    }
  }'
```

---

## 🧪 Lancer les tests

```bash
cd backend
npm test

# Tests spécifiques aux stratégies
npm test -- payment-strategies.spec
```

---

## 📚 Accès Swagger

Documentation interactive de l'API:
👉 **http://localhost:3000/api/docs**

Vous pouvez tester tous les endpoints directement depuis Swagger.

---

## 🎯 Points clés à tester

### ✅ Encapsulation
Essayer de créer un produit avec un prix négatif → devrait être rejeté

### ✅ Héritage
Créer un Client et un Admin → même table 'users', discriminateur 'type'

### ✅ Polymorphisme
Payer avec CARD puis PAYPAL → même interface, comportements différents

### ✅ Composition
Ajouter des produits au panier → Cart contient CartItems

### ✅ Transactions
Créer une commande → tout doit réussir ou tout échoue (rollback)

---

## 🐛 Problèmes courants

### Port déjà utilisé

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### MySQL connection refused

- Vérifier que MySQL est démarré
- Vérifier les credentials dans `.env`
- Attendre 10-15 secondes après le démarrage de MySQL

### Frontend ne se connecte pas au backend

- Vérifier que le backend est démarré
- Vérifier CORS dans `main.ts`
- Vérifier l'URL dans `frontend/src/services/api.js`

---

## 📖 Documentation complète

Voir [README.md](README.md) pour la documentation complète.

---

## ✨ Prêt à tester!

Tout est configuré avec des commentaires explicites dans le code montrant où chaque concept POO est appliqué. Bon apprentissage! 🚀
