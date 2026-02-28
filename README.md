# 🛒 E-commerce Fullstack - Démonstration POO

## 📋 Vue d'ensemble

Ce projet est une application e-commerce fullstack démontrant les concepts de **Programmation Orientée Objet (POO)** :

### ✨ Concepts POO implémentés

1. **🔒 ENCAPSULATION** - Produit avec propriétés privées et getters/setters validés
2. **🧬 HÉRITAGE** - Client et Admin héritent de User (Single Table Inheritance)
3. **🎭 POLYMORPHISME** - Stratégies de paiement interchangeables (Carte/PayPal)
4. **🧩 COMPOSITION** - Panier contient des CartItems
5. **🎯 STRATEGY PATTERN** - Sélection dynamique du mode de paiement

### 🏗️ Architecture

- **Backend**: NestJS + TypeScript + TypeORM + MySQL
- **Frontend**: React + Vite + React Router
- **Base de données**: MySQL 8.0
- **Authentification**: JWT + RBAC (Roles: CLIENT/ADMIN)
- **API**: REST + Swagger documentation
- **Tests**: Jest

---

## 📁 Structure du projet

```
E-commerce/
├── backend/               # API NestJS
│   ├── src/
│   │   ├── domain/       # Entités abstraites + Stratégies
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts (🧬 HÉRITAGE - Classe abstraite)
│   │   │   ├── enums/
│   │   │   └── strategies/
│   │   │       ├── payment-strategy.interface.ts (🎭 POLYMORPHISME)
│   │   │       ├── card-payment.strategy.ts
│   │   │       └── paypal-payment.strategy.ts
│   │   ├── modules/
│   │   │   ├── products/
│   │   │   │   └── entities/product.entity.ts (🔒 ENCAPSULATION)
│   │   │   ├── carts/
│   │   │   │   └── entities/
│   │   │   │       ├── cart.entity.ts (🧩 COMPOSITION)
│   │   │   │       └── cart-item.entity.ts
│   │   │   ├── orders/ (💾 TRANSACTIONS)
│   │   │   ├── payments/ (🎯 STRATEGY PATTERN)
│   │   │   └── users/
│   │   │       ├── client.entity.ts (🧬 HÉRITAGE)
│   │   │       └── admin.entity.ts (🧬 HÉRITAGE)
│   │   └── common/       # Guards, Decorators, Filters
│   ├── test/            # Tests Jest
│   └── package.json
├── frontend/            # Application React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
├── docker-compose.yml   # Orchestration Docker
├── CHECKLIST-CONFORMITE-OOP.md  # ✅ Validation des concepts
└── README.md

```

---

## 🚀 Installation et démarrage

### Prérequis

- Node.js 18+
- MySQL 8.0
- npm ou yarn

### Option 1 : Démarrage manuel

#### 1️⃣ Backend

```bash
cd backend

# Installation des dépendances
npm install

# Configuration de l'environnement
cp .env.example .env
# Éditer .env avec vos paramètres MySQL

# Démarrer MySQL (ou utiliser un serveur existant)
# La base de données sera créée automatiquement

# Lancer le backend (mode développement)
npm run start:dev

# Le backend sera disponible sur http://localhost:3000
# Documentation Swagger: http://localhost:3000/api/docs
```

#### 2️⃣ Frontend

```bash
cd frontend

# Installation des dépendances
npm install

# Lancer le frontend (mode développement)
npm run dev

# L'application sera disponible sur http://localhost:5173
```

### Option 2 : Avec Docker 🐳

```bash
# À la racine du projet
docker-compose up -d

# Backend: http://localhost:3000
# Frontend: http://localhost:5173
# MySQL: localhost:3306
```

---

## 🧪 Tests

```bash
cd backend

# Lancer tous les tests
npm test

# Tests avec couverture
npm run test:cov

# Tests en mode watch
npm run test:watch
```

### Tests inclus :
- ✅ Tests des stratégies de paiement (Card & PayPal)
- ✅ Validation du polymorphisme
- ✅ Tests d'intégrité des services

---

## 📚 API Endpoints

### 🔐 Authentication

- `POST /api/auth/register` - Inscription client
- `POST /api/auth/login` - Connexion

### 📦 Products (Public)

- `GET /api/products?page=1&limit=10` - Liste paginée
- `GET /api/products/:id` - Détail produit

### 📦 Products (Admin uniquement)

- `POST /api/products` - Créer un produit
- `PUT /api/products/:id` - Modifier un produit
- `PATCH /api/products/:id/stock` - Ajuster le stock
- `DELETE /api/products/:id` - Supprimer (soft delete)

### 🛒 Cart (Authentifié)

- `GET /api/cart` - Voir son panier
- `POST /api/cart/items` - Ajouter au panier
- `PUT /api/cart/items/:productId` - Modifier quantité
- `DELETE /api/cart/items/:productId` - Retirer du panier
- `POST /api/cart/clear` - Vider le panier

### 📋 Orders (Authentifié)

- `POST /api/orders` - Créer commande depuis panier
- `GET /api/orders` - Mes commandes
- `GET /api/orders/:id` - Détail commande
- `POST /api/orders/:id/cancel` - Annuler commande

### 💳 Payments (Authentifié)

**🎯 Démonstration du STRATEGY PATTERN**

- `POST /api/payments/:orderId` - Traiter paiement
  ```json
  {
    "method": "CARD",  // ou "PAYPAL"
    "cardInfo": {
      "cardNumber": "1234567812345678",
      "cardHolderName": "John Doe",
      "expiryDate": "12/25",
      "cvv": "123"
    }
  }
  ```

- `GET /api/payments/methods/available` - Méthodes disponibles

---

## 🎯 Démonstration des concepts POO

### 1. 🔒 ENCAPSULATION

**Fichier**: `backend/src/modules/products/entities/product.entity.ts`

```typescript
export class Product {
  // ❌ Propriété privée - Accès direct impossible
  @Column()
  private name: string;
  
  @Column('decimal')
  private price: number;

  // ✅ Getter public - Accès contrôlé en lecture
  public getName(): string {
    return this.name;
  }

  // ✅ Setter avec validation - Modification contrôlée
  public setName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Le nom ne peut pas être vide');
    }
    this.name = name.trim();
  }

  public setPrice(price: number): void {
    if (price <= 0) {
      throw new Error('Le prix doit être supérieur à 0');
    }
    this.price = Number(price.toFixed(2));
  }
}
```

**Test**:
```bash
# Créer un produit (Admin)
POST /api/products
{
  "name": "Laptop",
  "price": 999.99  // ✅ Validé par setPrice()
}

# Tentative de prix invalide
POST /api/products
{
  "name": "Laptop",
  "price": -10  // ❌ Rejeté: "Le prix doit être supérieur à 0"
}
```

---

### 2. 🧬 HÉRITAGE

**Fichiers**:
- `backend/src/domain/entities/user.entity.ts` (Classe abstraite)
- `backend/src/modules/users/entities/client.entity.ts`
- `backend/src/modules/users/entities/admin.entity.ts`

```typescript
// Classe abstraite parente
@Entity('users')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  name: string;
  
  abstract getDisplayInfo(): string;
}

// Classe enfant Client
@ChildEntity()
export class Client extends User {
  @Column({ default: 0 })
  loyaltyPoints: number;
  
  getDisplayInfo(): string {
    return `Client: ${this.name} - Points: ${this.loyaltyPoints}`;
  }
}

// Classe enfant Admin
@ChildEntity()
export class Admin extends User {
  @Column()
  accessLevel: number;
  
  getDisplayInfo(): string {
    return `Admin: ${this.name} - Level: ${this.accessLevel}`;
  }
}
```

**Base de données** (Single Table Inheritance):
```sql
-- Table unique 'users' pour tous les types
users
  id | name | email | type | loyaltyPoints | accessLevel
  1  | John | ...   | client | 150         | NULL
  2  | Admin| ...   | admin  | NULL        | 10
```

---

### 3. 🎭 POLYMORPHISME + 🎯 STRATEGY PATTERN

**Fichiers**:
- `backend/src/domain/strategies/payment-strategy.interface.ts`
- `backend/src/domain/strategies/card-payment.strategy.ts`
- `backend/src/domain/strategies/paypal-payment.strategy.ts`
- `backend/src/modules/payments/services/payment.service.ts`

```typescript
// Interface commune
export interface IPaymentStrategy {
  processPayment(amount: number, details: any): Promise<PaymentResult>;
  validatePaymentInfo(details: any): boolean;
  generateReceipt(transaction: any): string;
}

// Stratégie 1: Carte bancaire
export class CardPaymentStrategy implements IPaymentStrategy {
  async processPayment(amount: number, details: CardPaymentDetails) {
    // Logique spécifique carte
    // Validation CVV, numéro carte, etc.
  }
}

// Stratégie 2: PayPal
export class PayPalPaymentStrategy implements IPaymentStrategy {
  async processPayment(amount: number, details: PayPalPaymentDetails) {
    // Logique spécifique PayPal
    // Validation email, authentification OAuth, etc.
  }
}

// Service utilisant les stratégies (CONTEXT)
export class PaymentService {
  private strategies: Map<PaymentMethod, IPaymentStrategy>;
  
  // 🎯 Sélection dynamique de la stratégie
  private getPaymentStrategy(method: PaymentMethod): IPaymentStrategy {
    return this.strategies.get(method);
  }
  
  async processPayment(orderId: string, method: PaymentMethod, details: any) {
    // 🎯 Choix de la stratégie à l'exécution
    const strategy = this.getPaymentStrategy(method);
    
    // 🎭 Appel polymorphe - même méthode, comportement différent
    const result = await strategy.processPayment(amount, details);
  }
}
```

**Test**:
```bash
# Paiement par carte
POST /api/payments/order-123
{
  "method": "CARD",
  "cardInfo": {
    "cardNumber": "1234567812345678",
    "cardHolderName": "John Doe",
    "expiryDate": "12/25",
    "cvv": "123"
  }
}

# Paiement par PayPal (même endpoint, stratégie différente!)
POST /api/payments/order-123
{
  "method": "PAYPAL",
  "paypalInfo": {
    "email": "user@example.com"
  }
}
```

---

### 4. 🧩 COMPOSITION

**Fichiers**:
- `backend/src/modules/carts/entities/cart.entity.ts`
- `backend/src/modules/carts/entities/cart-item.entity.ts`

```typescript
// Conteneur (Cart)
@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 🧩 COMPOSITION: Cart "possède" des CartItems
  @OneToMany(() => CartItem, (item) => item.cart, { cascade: true })
  items: CartItem[];

  // Méthode utilisant la composition
  public calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.getLineTotal(), 0);
  }
}

// Élément composé (CartItem)
@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;

  @Column()
  quantity: number;

  public getLineTotal(): number {
    return this.quantity * this.unitPriceSnapshot;
  }
}
```

---

### 5. 💾 TRANSACTIONS

**Fichier**: `backend/src/modules/orders/services/order.service.ts`

```typescript
async createOrder(userId: string, promoCode?: string): Promise<Order> {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // 1. Charger le panier
    const cart = await queryRunner.manager.findOne(Cart, ...);
    
    // 2. Vérifier le stock
    for (const item of cart.items) {
      const stock = await queryRunner.manager.findOne(Stock, ...);
      if (!stock.hasEnoughStock(item.quantity)) {
        throw new BadRequestException('Stock insuffisant');
      }
    }
    
    // 3. Créer la commande
    const order = await queryRunner.manager.save(Order, ...);
    
    // 4. Décrémenter le stock
    stock.decreaseStock(quantity);
    await queryRunner.manager.save(stock);
    
    // 5. Vider le panier
    cart.clear();
    await queryRunner.manager.save(cart);
    
    // ✅ Tout s'est bien passé: COMMIT
    await queryRunner.commitTransaction();
    return order;
  } catch (error) {
    // ❌ Erreur: ROLLBACK (tout est annulé)
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}
```

---

## 📊 Diagramme de classes

Voir le fichier `UML/diagram.png` ou consultez le diagramme fourni dans le projet.

---

## ✅ Checklist de conformité

Voir `CHECKLIST-CONFORMITE-OOP.md` pour la validation détaillée de chaque concept.

---

## 🔑 Comptes de test

Après le premier démarrage, vous pouvez créer des comptes:

**Client**:
- Inscription via `/api/auth/register`

**Admin** (à créer manuellement en base):
- Créer un utilisateur et modifier le champ `type='admin'` et `role='ADMIN'`

---

## 📖 Documentation Swagger

Une fois le backend démarré, accédez à la documentation interactive:

🌐 **http://localhost:3000/api/docs**

Vous pourrez tester tous les endpoints directement depuis l'interface Swagger.

---

## 🎓 Points pédagogiques

### Pourquoi TypeORM pour l'héritage?

✅ **TypeORM** supporte nativement le **Single Table Inheritance** avec `@TableInheritance` et `@ChildEntity`, ce qui rend l'implémentation de User → Client/Admin très propre.

### Pourquoi le Strategy Pattern pour le paiement?

✅ Le **Strategy Pattern** permet d'ajouter facilement de nouvelles méthodes de paiement (Crypto, Virement, etc.) sans modifier le code existant (**Principe Open/Closed**).

### Pourquoi les transactions?

✅ Les **transactions** garantissent l'**intégrité des données** lors d'opérations complexes (commande = vérifier stock + créer ordre + décrémenter stock + vider panier). Si une étape échoue, tout est annulé.

---

## 🐛 Dépannage

### Erreur de connexion MySQL

```bash
# Vérifier que MySQL est démarré
# Vérifier les credentials dans .env
# Vérifier que le port 3306 n'est pas utilisé
```

### Port déjà utilisé

```bash
# Backend (3000)
netstat -ano | findstr :3000

# Frontend (5173)
netstat -ano | findstr :5173

# Modifier les ports dans les fichiers de config si nécessaire
```

---

## 📝 Licence

MIT

---

## 👨‍💻 Auteur

Projet académique - Démonstration des concepts POO en TypeScript/NestJS/React

---

## 🎉 Conclusion

Ce projet démontre de manière complète et fonctionnelle les **5 concepts POO** demandés :

1. ✅ **Encapsulation** - Product avec validation
2. ✅ **Héritage** - Client/Admin extends User (STI)
3. ✅ **Polymorphisme** - Payment Strategies
4. ✅ **Composition** - Cart contains CartItems
5. ✅ **Strategy Pattern** - Dynamic payment method selection

Tous les concepts sont **commentés dans le code** et **testés** avec Jest.

**Bon apprentissage! 🚀**

┌─────────────────────────────────────────────────────────────────────┐
│  [LOGO]      tabs  /    /     Search Box  [Cart] [Wishlist] [Login] │
├─────────────────────────────────────────────────────────────────────┤
