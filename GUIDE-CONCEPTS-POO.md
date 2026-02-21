# 🎓 Guide des Concepts POO - E-commerce

Ce document explique en détail comment chaque concept de Programmation Orientée Objet est implémenté dans ce projet.

---

## 1. 🔒 ENCAPSULATION (Encapsulation)

### 📖 Définition
L'encapsulation consiste à regrouper les données (attributs) et les méthodes qui les manipulent au sein d'une même unité (classe), tout en **contrôlant l'accès** à ces données via des méthodes publiques (getters/setters).

### ✅ Avantages
- **Protection des données**: Les attributs ne peuvent pas être modifiés arbitrairement
- **Validation**: Chaque modification passe par une validation
- **Cohérence**: Les données restent dans un état valide
- **Maintenance**: Changement d'implémentation sans affecter le code client

### 💻 Implémentation dans le projet

**Fichier**: [`backend/src/modules/products/entities/product.entity.ts`](backend/src/modules/products/entities/product.entity.ts)

```typescript
export class Product {
  // ❌ Attributs PRIVÉS - Accès direct impossible de l'extérieur
  @Column()
  private name: string;
  
  @Column('decimal', { precision: 10, scale: 2 })
  private price: number;

  // ✅ GETTER public - Accès en LECTURE SEULE
  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price;
  }

  // ✅ SETTER avec VALIDATION - Modification CONTRÔLÉE
  public setName(name: string): void {
    // Validation 1: Non vide
    if (!name || name.trim().length === 0) {
      throw new Error('Le nom du produit ne peut pas être vide');
    }
    
    // Validation 2: Longueur maximale
    if (name.length > 255) {
      throw new Error('Le nom du produit est trop long (max 255 caractères)');
    }
    
    // ✅ Modification autorisée uniquement si validation OK
    this.name = name.trim();
  }

  public setPrice(price: number): void {
    // Validation 1: Strictement positif
    if (price <= 0) {
      throw new Error('Le prix doit être supérieur à 0');
    }
    
    // Validation 2: Limite maximale
    if (price > 1000000) {
      throw new Error('Le prix est trop élevé');
    }
    
    // ✅ Arrondi automatique à 2 décimales
    this.price = Number(price.toFixed(2));
  }

  // ✅ GETTER CALCULÉ - Propriété virtuelle sans stockage
  public isOutOfStock(): boolean {
    return this.stock ? this.stock.getQuantity() <= 0 : true;
  }

  // ✅ MÉTHODE MÉTIER encapsulant la logique
  public calculateDiscountedPrice(discountPercent: number): number {
    if (discountPercent < 0 || discountPercent > 100) {
      throw new Error('Le pourcentage de réduction doit être entre 0 et 100');
    }
    
    const discount = this.price * (discountPercent / 100);
    return Number((this.price - discount).toFixed(2));
  }
}
```

### 🎯 Utilisation dans le service

**Fichier**: [`backend/src/modules/products/services/product.service.ts`](backend/src/modules/products/services/product.service.ts)

```typescript
async create(createProductDto: CreateProductDto): Promise<Product> {
  const product = new Product();
  
  // ✅ Utilisation des SETTERS - Validation automatique
  product.setName(createProductDto.name);      // Validé
  product.setPrice(createProductDto.price);    // Validé
  
  // ❌ Impossible: product.name = "test"  → Erreur TypeScript: 'name' is private
  // ❌ Impossible: product.price = -10    → Erreur TypeScript: 'price' is private
  
  return this.productRepository.save(product);
}
```

### 🧪 Test

```bash
# ✅ Création valide
POST /api/products
{
  "name": "Laptop",
  "price": 999.99
}
→ Succès!

# ❌ Prix invalide
POST /api/products
{
  "name": "Laptop",
  "price": -10
}
→ Erreur: "Le prix doit être supérieur à 0"

# ❌ Nom vide
POST /api/products
{
  "name": "",
  "price": 999.99
}
→ Erreur: "Le nom du produit ne peut pas être vide"
```

---

## 2. 🧬 HÉRITAGE (Inheritance)

### 📖 Définition
L'héritage permet à une classe (enfant/sous-classe) d'hériter des propriétés et méthodes d'une autre classe (parent/super-classe). Cela favorise la **réutilisation du code** et établit une relation "est-un" (is-a).

### ✅ Avantages
- **Réutilisation du code**: Les propriétés communes sont définies une seule fois
- **Hiérarchie logique**: Modélise les relations naturelles (Client est-un Utilisateur)
- **Polymorphisme**: Permet de traiter les objets de manière uniforme
- **Extension**: Ajouter des fonctionnalités spécifiques sans dupliquer le code commun

### 💻 Implémentation dans le projet

**Architecture**:
```
User (abstract)
├── Client (extends User)
└── Admin (extends User)
```

#### Parent abstrait

**Fichier**: [`backend/src/domain/entities/user.entity.ts`](backend/src/domain/entities/user.entity.ts)

```typescript
/**
 * Classe ABSTRAITE parente
 * TypeORM: Single Table Inheritance (STI)
 */
@Entity('users')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class User {
  // ✅ Propriétés COMMUNES à tous les utilisateurs
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // ✅ Méthode ABSTRAITE - Doit être implémentée par les enfants
  abstract getDisplayInfo(): string;
}
```

#### Classe enfant: Client

**Fichier**: [`backend/src/modules/users/entities/client.entity.ts`](backend/src/modules/users/entities/client.entity.ts)

```typescript
/**
 * Client HÉRITE de User
 */
@ChildEntity()  // ← TypeORM: Cette classe hérite de User
export class Client extends User {
  // ✅ Propriétés SPÉCIFIQUES au Client
  @Column({ name: 'loyalty_points', default: 0 })
  loyaltyPoints: number;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ name: 'default_shipping_address', type: 'text', nullable: true })
  defaultShippingAddress: string;

  constructor() {
    super();  // Appel du constructeur parent
    this.role = UserRole.CLIENT;
  }

  // ✅ Implémentation de la méthode abstraite
  getDisplayInfo(): string {
    return `Client: ${this.name} (${this.email}) - Points: ${this.loyaltyPoints}`;
  }

  // ✅ Méthodes SPÉCIFIQUES au Client
  addLoyaltyPoints(points: number): void {
    if (points > 0) {
      this.loyaltyPoints += points;
    }
  }

  calculateLoyaltyPoints(orderAmount: number): number {
    return Math.floor(orderAmount / 10);  // 1 point par 10€
  }
}
```

#### Classe enfant: Admin

**Fichier**: [`backend/src/modules/users/entities/admin.entity.ts`](backend/src/modules/users/entities/admin.entity.ts)

```typescript
/**
 * Admin HÉRITE de User
 */
@ChildEntity()
export class Admin extends User {
  // ✅ Propriétés SPÉCIFIQUES à l'Admin
  @Column({ nullable: true })
  department: string;

  @Column({ name: 'access_level', default: 5 })
  accessLevel: number;

  @Column({ type: 'simple-json', nullable: true })
  permissions: string[];

  constructor() {
    super();
    this.role = UserRole.ADMIN;
  }

  // ✅ Implémentation différente de la méthode abstraite
  getDisplayInfo(): string {
    return `Admin: ${this.name} (${this.department || 'General'}) - Level: ${this.accessLevel}`;
  }

  // ✅ Méthodes SPÉCIFIQUES à l'Admin
  hasPermission(permission: string): boolean {
    if (this.accessLevel >= 10) {
      return true;  // Super admin a toutes les permissions
    }
    return this.permissions?.includes(permission) || false;
  }

  grantPermission(permission: string): void {
    if (!this.permissions) {
      this.permissions = [];
    }
    if (!this.permissions.includes(permission)) {
      this.permissions.push(permission);
    }
  }
}
```

### 🗄️ Base de données (Single Table Inheritance)

TypeORM stocke tous les types d'utilisateurs dans **une seule table** `users` avec un **discriminateur** `type`:

```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  role ENUM('CLIENT', 'ADMIN'),
  type VARCHAR(255),               -- ← Discriminateur: 'client' ou 'admin'
  
  -- Colonnes spécifiques Client
  loyalty_points INT,
  phone_number VARCHAR(50),
  default_shipping_address TEXT,
  
  -- Colonnes spécifiques Admin
  department VARCHAR(100),
  access_level INT,
  permissions JSON,
  
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

**Exemple de données**:

| id | name | email | type | loyalty_points | department |
|----|------|-------|------|----------------|------------|
| 1 | John Doe | john@example.com | **client** | 150 | NULL |
| 2 | Admin User | admin@example.com | **admin** | NULL | IT |

### 🎯 Utilisation

```typescript
// ✅ Polymorphisme: Traiter tous les utilisateurs de manière uniforme
const users: User[] = await userRepository.find();

users.forEach(user => {
  // Méthode polymorphe: comportement différent selon le type
  console.log(user.getDisplayInfo());
});

// Résultat:
// "Client: John Doe (john@example.com) - Points: 150"
// "Admin: Admin User (IT) - Level: 10"
```

### 🧪 Test

```bash
# Créer un client
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
→ Crée un Client (type='client', role='CLIENT')

# En base de données:
SELECT * FROM users WHERE email='john@example.com';
→ type='client', loyalty_points=0, department=NULL
```

---

## 3. 🎭 POLYMORPHISME + 🎯 STRATEGY PATTERN

### 📖 Définition

**Polymorphisme**: Capacité d'objets de classes différentes à répondre à la même interface de manière spécifique.

**Strategy Pattern**: Pattern de conception permettant de définir une famille d'algorithmes, de les encapsuler et de les rendre interchangeables.

### ✅ Avantages
- **Flexibilité**: Changer de stratégie à l'exécution
- **Open/Closed Principle**: Ajouter de nouvelles stratégies sans modifier le code existant
- **Testabilité**: Chaque stratégie peut être testée indépendamment
- **Maintenabilité**: Logique séparée par stratégie

### 💻 Implémentation dans le projet

**Architecture**:
```
IPaymentStrategy (interface)
├── CardPaymentStrategy
└── PayPalPaymentStrategy

PaymentService (context) → Utilise IPaymentStrategy
```

#### Interface (Contrat)

**Fichier**: [`backend/src/domain/strategies/payment-strategy.interface.ts`](backend/src/domain/strategies/payment-strategy.interface.ts)

```typescript
/**
 * Interface définissant le CONTRAT pour toutes les stratégies de paiement
 */
export interface PaymentResult {
  success: boolean;
  transactionRef: string;
  message: string;
  timestamp: Date;
}

export interface IPaymentStrategy {
  /**
   * 🎭 Méthode POLYMORPHE: Même signature, implémentations différentes
   */
  processPayment(amount: number, details: any): Promise<PaymentResult>;
  
  validatePaymentInfo(details: any): boolean;
  
  generateReceipt(transaction: any): string;
  
  getPaymentMethodName(): string;
}
```

#### Stratégie 1: Paiement par Carte

**Fichier**: [`backend/src/domain/strategies/card-payment.strategy.ts`](backend/src/domain/strategies/card-payment.strategy.ts)

```typescript
export class CardPaymentStrategy implements IPaymentStrategy {
  /**
   * 🎭 Implémentation SPÉCIFIQUE pour les paiements par carte
   */
  async processPayment(
    amount: number,
    details: CardPaymentDetails,
  ): Promise<PaymentResult> {
    // Validation spécifique carte
    if (!this.validatePaymentInfo(details)) {
      return {
        success: false,
        transactionRef: '',
        message: 'Informations de carte invalides',
        timestamp: new Date(),
      };
    }

    try {
      // Logique spécifique: Vérification CVV, numéro carte, date expiration
      const maskedCard = this.maskCardNumber(details.cardNumber);
      
      await this.simulatePaymentProcessing();
      
      const hasEnoughFunds = await this.checkCardFunds(details, amount);
      
      if (!hasEnoughFunds) {
        return {
          success: false,
          transactionRef: '',
          message: 'Fonds insuffisants sur la carte',
          timestamp: new Date(),
        };
      }
      
      const transactionRef = this.generateTransactionRef('CARD');
      
      return {
        success: true,
        transactionRef,
        message: `Paiement par carte ${maskedCard} réussi`,
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        transactionRef: '',
        message: `Erreur lors du paiement: ${error.message}`,
        timestamp: new Date(),
      };
    }
  }

  /**
   * Validation SPÉCIFIQUE aux cartes bancaires
   */
  validatePaymentInfo(details: CardPaymentDetails): boolean {
    // Numéro de carte: 16 chiffres
    const cardNumberValid =
      details.cardNumber &&
      /^\d{16}$/.test(details.cardNumber.replace(/\s/g, ''));

    // Nom titulaire: minimum 3 caractères
    const nameValid =
      details.cardHolderName && details.cardHolderName.trim().length >= 3;

    // Date expiration: Format MM/YY et non expirée
    const expiryValid = this.validateExpiryDate(details.expiryDate);

    // CVV: 3 ou 4 chiffres
    const cvvValid = details.cvv && /^\d{3,4}$/.test(details.cvv);

    return cardNumberValid && nameValid && expiryValid && cvvValid;
  }

  /**
   * Génération de reçu FORMAT CARTE (différent de PayPal)
   */
  generateReceipt(transaction: any): string {
    const { amount, transactionRef, timestamp, cardNumber } = transaction;
    const maskedCard = this.maskCardNumber(cardNumber);

    return `
╔════════════════════════════════════════╗
║        REÇU DE PAIEMENT - CARTE        ║
╠════════════════════════════════════════╣
║ Référence: ${transactionRef.padEnd(24)} ║
║ Date: ${new Date(timestamp).toLocaleString('fr-FR').padEnd(29)} ║
║ Carte: ${maskedCard.padEnd(29)} ║
║ Montant: ${amount.toFixed(2).padStart(23)} € ║
╠════════════════════════════════════════╣
║         Paiement autorisé ✓            ║
║      Merci pour votre achat !          ║
╚════════════════════════════════════════╝
    `.trim();
  }

  getPaymentMethodName(): string {
    return 'Carte Bancaire';
  }

  // Méthodes privées helper...
  private maskCardNumber(cardNumber: string): string {
    const cleaned = cardNumber.replace(/\s/g, '');
    return `**** **** **** ${cleaned.slice(-4)}`;
  }
}
```

#### Stratégie 2: Paiement PayPal

**Fichier**: [`backend/src/domain/strategies/paypal-payment.strategy.ts`](backend/src/domain/strategies/paypal-payment.strategy.ts)

```typescript
export class PayPalPaymentStrategy implements IPaymentStrategy {
  /**
   * 🎭 Implémentation DIFFÉRENTE pour PayPal
   * Même signature que CardPaymentStrategy mais logique différente!
   */
  async processPayment(
    amount: number,
    details: PayPalPaymentDetails,
  ): Promise<PaymentResult> {
    if (!this.validatePaymentInfo(details)) {
      return {
        success: false,
        transactionRef: '',
        message: 'Informations PayPal invalides',
        timestamp: new Date(),
      };
    }

    try {
      // Logique spécifique PayPal: Authentification OAuth, API PayPal, etc.
      const maskedEmail = this.maskEmail(details.email);
      
      const authenticated = await this.authenticatePayPal(details);
      
      if (!authenticated) {
        return {
          success: false,
          transactionRef: '',
          message: 'Authentification PayPal échouée',
          timestamp: new Date(),
        };
      }
      
      await this.simulatePaymentProcessing();
      
      const hasEnoughBalance = await this.checkPayPalBalance(details, amount);
      
      if (!hasEnoughBalance) {
        return {
          success: false,
          transactionRef: '',
          message: 'Solde PayPal insuffisant',
          timestamp: new Date(),
        };
      }
      
      const transactionRef = this.generateTransactionRef('PAYPAL');
      
      return {
        success: true,
        transactionRef,
        message: `Paiement PayPal (${maskedEmail}) réussi`,
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        transactionRef: '',
        message: `Erreur lors du paiement PayPal: ${error.message}`,
        timestamp: new Date(),
      };
    }
  }

  /**
   * Validation SPÉCIFIQUE à PayPal (différente de la carte!)
   */
  validatePaymentInfo(details: PayPalPaymentDetails): boolean {
    // PayPal requiert uniquement un email valide
    return this.validateEmail(details.email);
  }

  /**
   * Génération de reçu FORMAT PAYPAL (différent de la carte)
   */
  generateReceipt(transaction: any): string {
    const { amount, transactionRef, timestamp, email } = transaction;
    const maskedEmail = this.maskEmail(email);

    return `
╔════════════════════════════════════════╗
║       REÇU DE PAIEMENT - PAYPAL        ║
╠════════════════════════════════════════╣
║ Référence: ${transactionRef.padEnd(24)} ║
║ Date: ${new Date(timestamp).toLocaleString('fr-FR').padEnd(29)} ║
║ Compte: ${maskedEmail.padEnd(27)} ║
║ Montant: ${amount.toFixed(2).padStart(23)} € ║
╠════════════════════════════════════════╣
║    Transaction PayPal complétée ✓      ║
║      Protection acheteur active        ║
║      Merci pour votre achat !          ║
╚════════════════════════════════════════╝
    `.trim();
  }

  getPaymentMethodName(): string {
    return 'PayPal';
  }

  // Méthodes privées helper...
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    const maskedLocal =
      local.length > 2
        ? local[0] + '*'.repeat(local.length - 2) + local[local.length - 1]
        : local[0] + '*';
    return `${maskedLocal}@${domain}`;
  }
}
```

#### Context: Service utilisant les stratégies

**Fichier**: [`backend/src/modules/payments/services/payment.service.ts`](backend/src/modules/payments/services/payment.service.ts)

```typescript
@Injectable()
export class PaymentService {
  /**
   * 🎯 STRATEGY PATTERN: Registry des stratégies disponibles
   */
  private strategies: Map<PaymentMethod, IPaymentStrategy>;

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {
    this.initializeStrategies();
  }

  /**
   * 🎯 Initialisation des stratégies
   */
  private initializeStrategies(): void {
    this.strategies = new Map<PaymentMethod, IPaymentStrategy>();
    
    // Enregistrer les stratégies disponibles
    this.strategies.set(PaymentMethod.CARD, new CardPaymentStrategy());
    this.strategies.set(PaymentMethod.PAYPAL, new PayPalPaymentStrategy());
    
    // 💡 Ajouter une nouvelle stratégie est trivial:
    // this.strategies.set(PaymentMethod.CRYPTO, new CryptoPaymentStrategy());
  }

  /**
   * 🎯 FACTORY METHOD: Sélectionne la stratégie appropriée
   */
  private getPaymentStrategy(method: PaymentMethod): IPaymentStrategy {
    const strategy = this.strategies.get(method);
    
    if (!strategy) {
      throw new BadRequestException(
        `Méthode de paiement non supportée: ${method}`,
      );
    }
    
    return strategy;
  }

  /**
   * 🎯🎭 STRATEGY PATTERN + POLYMORPHISME en action!
   * 
   * Cette méthode utilise le polymorphisme pour traiter n'importe quelle stratégie
   * de manière uniforme, sans connaître l'implémentation concrète.
   */
  async processPayment(
    orderId: string,
    method: PaymentMethod,
    paymentDetails: any,
  ): Promise<Payment> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Commande introuvable');
    }

    // 🎯 Sélection DYNAMIQUE de la stratégie selon 'method'
    const strategy = this.getPaymentStrategy(method);
    
    console.log(`💳 Utilisation de la stratégie: ${strategy.getPaymentMethodName()}`);

    // 🎭 POLYMORPHISME: Validation
    // L'appel est identique, mais le comportement change selon la stratégie!
    const isValid = strategy.validatePaymentInfo(paymentDetails);
    
    if (!isValid) {
      throw new BadRequestException('Informations de paiement invalides');
    }

    // 🎭 POLYMORPHISME: Traitement du paiement
    // Même méthode, algorithmes différents!
    const result = await strategy.processPayment(order.total, paymentDetails);

    if (!result.success) {
      const failedPayment = this.paymentRepository.create({
        orderId: order.id,
        method,
        status: PaymentStatus.FAILED,
        amount: order.total,
        detailsJson: { error: result.message },
      });

      await this.paymentRepository.save(failedPayment);
      throw new BadRequestException(result.message);
    }

    const payment = this.paymentRepository.create({
      orderId: order.id,
      method,
      status: PaymentStatus.COMPLETED,
      amount: order.total,
      transactionRef: result.transactionRef,
      paidAt: result.timestamp,
      detailsJson: paymentDetails,
    });

    await this.paymentRepository.save(payment);

    // 🎭 POLYMORPHISME: Génération du reçu
    // Chaque stratégie génère son propre format!
    const receipt = strategy.generateReceipt({
      amount: order.total,
      transactionRef: result.transactionRef,
      timestamp: result.timestamp,
      ...paymentDetails,
    });

    console.log('📄 Reçu généré:');
    console.log(receipt);

    return payment;
  }
}
```

### 🧪 Test du polymorphisme

```bash
# Test 1: Paiement par CARTE
curl -X POST http://localhost:3000/api/payments/order-123 \
  -H "Authorization: Bearer TOKEN" \
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

# Console backend:
# → 💳 Utilisation de la stratégie: Carte Bancaire
# → ✓ Validation numéro carte + CVV + date expiration
# → ✓ Vérification fonds carte
# → 📄 Reçu FORMAT CARTE généré

# Test 2: Paiement par PAYPAL (même endpoint!)
curl -X POST http://localhost:3000/api/payments/order-123 \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "method": "PAYPAL",
    "paypalInfo": {
      "email": "user@example.com"
    }
  }'

# Console backend:
# → 💳 Utilisation de la stratégie: PayPal
# → ✓ Validation email PayPal
# → ✓ Authentification OAuth PayPal
# → 📄 Reçu FORMAT PAYPAL généré

# 🎭 Même méthode processPayment() appelée,
#    mais COMPORTEMENT COMPLÈTEMENT DIFFÉRENT selon la stratégie!
#    C'est ça le POLYMORPHISME!
```

---

## 4. 🧩 COMPOSITION (Composition)

### 📖 Définition
La composition est une relation "a-un" (has-a) où un objet complexe est construit en combinant plusieurs objets plus simples. Contrairement à l'héritage, la composition est plus flexible et favorise la réutilisation.

### ✅ Avantages
- **Flexibilité**: Changer les composants sans affecter le conteneur
- **Encapsulation**: Chaque composant gère sa propre logique
- **Réutilisation**: Les composants peuvent être utilisés dans différents contextes
- **Couplage faible**: Moins de dépendances qu'avec l'héritage

### 💻 Implémentation dans le projet

**Architecture**:
```
Cart (conteneur)
  └── contains → CartItem[] (composants)
        └── references → Product
```

#### Conteneur: Cart

**Fichier**: [`backend/src/modules/carts/entities/cart.entity.ts`](backend/src/modules/carts/entities/cart.entity.ts)

```typescript
@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 🧩 COMPOSITION: Cart "possède" des CartItems
   * 
   * Relation: OneToMany (Un panier a plusieurs items)
   * Cascade: Les opérations sur Cart affectent automatiquement les CartItems
   * Eager: Les items sont chargés automatiquement avec le panier
   */
  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    cascade: true,  // DELETE Cart → DELETE CartItems
    eager: true,    // Chargement automatique
  })
  items: CartItem[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id', unique: true })
  userId: string;

  constructor() {
    this.items = [];  // Initialisation de la collection
  }

  // ==========================================
  // 🧩 MÉTHODES utilisant la COMPOSITION
  // ==========================================

  /**
   * 🧩 Calcule le total en utilisant les composants CartItem
   */
  public calculateTotal(): number {
    if (!this.items || this.items.length === 0) {
      return 0;
    }

    // Délègue le calcul à chaque CartItem composé
    const total = this.items.reduce((sum, item) => {
      return sum + item.getLineTotal();  // Appel polymorphe sur le composant
    }, 0);

    return Number(total.toFixed(2));
  }

  /**
   * 🧩 Recherche un item dans la collection composée
   */
  public findItemByProductId(productId: string): CartItem | undefined {
    return this.items.find(item => item.productId === productId);
  }

  /**
   * 🧩 Vérifie si un produit existe dans les composants
   */
  public hasProduct(productId: string): boolean {
    return this.items.some(item => item.productId === productId);
  }

  /**
   * 🧩 Compte total des quantités dans tous les composants
   */
  public getTotalItems(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  /**
   * 🧩 Vérifie si la collection de composants est vide
   */
  public isEmpty(): boolean {
    return !this.items || this.items.length === 0;
  }

  /**
   * 🧩 Ajoute un composant à la collection
   * Si le produit existe déjà, on modifie le composant existant
   */
  public addItem(cartItem: CartItem): void {
    const existingItem = this.findItemByProductId(cartItem.productId);
    
    if (existingItem) {
      // Modifier le composant existant
      existingItem.increaseQuantity(cartItem.quantity);
    } else {
      // Ajouter un nouveau composant
      this.items.push(cartItem);
    }
  }

  /**
   * 🧩 Supprime un composant de la collection
   */
  public removeItem(productId: string): boolean {
    const index = this.items.findIndex(item => item.productId === productId);
    
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * 🧩 Vide tous les composants
   */
  public clear(): void {
    this.items = [];
  }

  /**
   * 🧩 Retourne un résumé utilisant les données des composants
   */
  public getSummary() {
    return {
      totalItems: this.getTotalItems(),
      itemCount: this.items.length,
      subtotal: this.calculateTotal(),
      isEmpty: this.isEmpty(),
      items: this.items.map(item => ({
        productId: item.productId,
        productName: item.product?.getName() || 'Unknown',
        quantity: item.quantity,
        unitPrice: item.unitPriceSnapshot,
        lineTotal: item.getLineTotal(),  // Données du composant
      })),
    };
  }
}
```

#### Composant: CartItem

**Fichier**: [`backend/src/modules/carts/entities/cart-item.entity.ts`](backend/src/modules/carts/entities/cart-item.entity.ts)

```typescript
@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 🧩 COMPOSITION: CartItem "appartient à" Cart
   * ManyToOne: Plusieurs items peuvent appartenir à un même panier
   * onDelete CASCADE: Si le panier est supprimé, l'item l'est aussi
   */
  @ManyToOne(() => Cart, (cart) => cart.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column({ name: 'cart_id' })
  cartId: string;

  /**
   * Référence vers le produit
   */
  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'product_id' })
  productId: string;

  @Column({ default: 1 })
  quantity: number;

  /**
   * Snapshot du prix au moment de l'ajout
   */
  @Column('decimal', { precision: 10, scale: 2, name: 'unit_price_snapshot' })
  unitPriceSnapshot: number;

  // ==========================================
  // 🧩 MÉTHODES du COMPOSANT
  // ==========================================

  /**
   * 🧩 Le composant calcule son propre total
   */
  public getLineTotal(): number {
    return Number((this.quantity * this.unitPriceSnapshot).toFixed(2));
  }

  /**
   * 🧩 Le composant gère sa propre quantité
   */
  public setQuantity(quantity: number): void {
    if (quantity <= 0) {
      throw new Error('La quantité doit être supérieure à 0');
    }
    if (quantity > 999) {
      throw new Error('La quantité maximale est 999');
    }
    this.quantity = Math.floor(quantity);
  }

  public increaseQuantity(amount: number = 1): void {
    if (amount <= 0) {
      throw new Error('Le montant doit être positif');
    }
    this.quantity += amount;
    
    if (this.quantity > 999) {
      this.quantity = 999;
    }
  }

  public decreaseQuantity(amount: number = 1): void {
    if (amount <= 0) {
      throw new Error('Le montant doit être positif');
    }
    
    this.quantity -= amount;
    
    if (this.quantity < 1) {
      this.quantity = 1;
    }
  }

  /**
   * Capture le prix actuel du produit comme snapshot
   */
  public snapshotPrice(): void {
    if (this.product) {
      this.unitPriceSnapshot = this.product.getPrice();
    }
  }
}
```

### 🎯 Utilisation dans le service

**Fichier**: [`backend/src/modules/carts/services/cart.service.ts`](backend/src/modules/carts/services/cart.service.ts)

```typescript
async addItem(userId: string, productId: string, quantity: number): Promise<Cart> {
  const product = await this.productRepository.findOne({
    where: { id: productId },
    relations: ['stock'],
  });

  if (!product || !product.getIsActive()) {
    throw new NotFoundException('Produit introuvable ou inactif');
  }

  const cart = await this.getOrCreateCart(userId);

  // 🧩 Utilisation de la méthode du conteneur
  const existingItem = cart.findItemByProductId(productId);

  if (existingItem) {
    // 🧩 Modification du composant existant
    existingItem.increaseQuantity(quantity);
    await this.cartItemRepository.save(existingItem);
  } else {
    // 🧩 Création d'un nouveau composant
    const cartItem = this.cartItemRepository.create({
      cartId: cart.id,
      productId,
      quantity,
      unitPriceSnapshot: product.getPrice(),  // Snapshot du prix
    });
    await this.cartItemRepository.save(cartItem);
  }

  // 🧩 Rechargement du conteneur avec ses composants
  return this.getOrCreateCart(userId);
}
```

### 🧪 Test

```bash
# 1. Créer un panier vide
GET /api/cart
→ { items: [], totalItems 0, subtotal: 0 }

# 2. Ajouter un produit (création d'un composant)
POST /api/cart/items
{
  "productId": "prod-123",
  "quantity": 2
}
→ Cart contient maintenant 1 CartItem

# 3. Ajouter le même produit (modification du composant existant)
POST /api/cart/items
{
  "productId": "prod-123",
  "quantity": 3
}
→ Le CartItem existant passe de quantité 2 à 5

# 4. Ajouter un autre produit (nouveau composant)
POST /api/cart/items
{
  "productId": "prod-456",
  "quantity": 1
}
→ Cart contient maintenant 2 CartItems

# 5. Calculer le total (utilise la composition)
GET /api/cart
→ {
  items: [
    { productId: "prod-123", quantity: 5, unitPrice: 99.99, lineTotal: 499.95 },
    { productId: "prod-456", quantity: 1, unitPrice: 49.99, lineTotal: 49.99 }
  ],
  totalItems: 6,
  subtotal: 549.94
}

# 6. Supprimer un composant
DELETE /api/cart/items/prod-123
→ Cart contient 1 CartItem (prod-456)

# 7. Vider le panier (supprime tous les composants)
POST /api/cart/clear
→ Cart vide: { items: [], totalItems: 0, subtotal: 0 }
```

### 🗄️ Base de données (Composition visible)

```sql
-- Table Cart (conteneur)
carts
  id | user_id | updated_at
  c1 | u1      | 2024-01-15

-- Table CartItem (composants)
cart_items
  id | cart_id | product_id | quantity | unit_price_snapshot
  i1 | c1      | prod-123   | 5        | 99.99
  i2 | c1      | prod-456   | 1        | 49.99

-- 🧩 La composition est visible: cart_id lie les composants au conteneur
-- Si on supprime Cart c1, les CartItems i1 et i2 sont supprimés (CASCADE)
```

---

## 5. 💾 TRANSACTIONS (Bonus)

### 📖 Définition
Une transaction est une séquence d'opérations qui doivent toutes réussir ou toutes échouer ensemble. Cela garantit l'**intégrité des données** dans les opérations complexes.

### ✅ Propriétés ACID
- **Atomicity**: Tout ou rien
- **Consistency**: État cohérent avant/après
- **Isolation**: Les transactions ne s'interfèrent pas
- **Durability**: Les changements sont permanents

### 💻 Implémentation

**Fichier**: [`backend/src/modules/orders/services/order.service.ts`](backend/src/modules/orders/services/order.service.ts)

```typescript
async createOrder(userId: string, promoCode?: string): Promise<Order> {
  // 💾 Créer un QueryRunner pour gérer la transaction manuellement
  const queryRunner = this.dataSource.createQueryRunner();
  
  // Connexion et début de transaction
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // ===== ÉTAPE 1: Charger le panier =====
    const cart = await queryRunner.manager.findOne(Cart, {
      where: { userId },
      relations: ['items', 'items.product', 'items.product.stock'],
    });

    if (!cart || cart.isEmpty()) {
      throw new BadRequestException('Le panier est vide');
    }

    // ===== ÉTAPE 2: Vérifier le stock pour TOUS les produits =====
    for (const item of cart.items) {
      const stock = await queryRunner.manager.findOne(Stock, {
        where: { productId: item.productId },
      });

      if (!stock || !stock.hasEnoughStock(item.quantity)) {
        // ❌ Stock insuffisant → Transaction sera annulée (ROLLBACK)
        throw new BadRequestException(
          `Stock insuffisant pour le produit ${item.product.getName()}`,
        );
      }
    }

    // ===== ÉTAPE 3: Calculer les montants =====
    const subtotal = cart.calculateTotal();

    let discountAmount = 0;
    if (promoCode) {
      const promo = await queryRunner.manager.findOne(Promo, {
        where: { code: promoCode },
      });

      if (!promo || !promo.isValid()) {
        throw new BadRequestException('Code promo invalide');
      }

      discountAmount = promo.calculateDiscount(subtotal);
      promo.use();
      await queryRunner.manager.save(promo);
    }

    const total = subtotal - discountAmount;

    // ===== ÉTAPE 4: Créer la commande =====
    const order = queryRunner.manager.create(Order, {
      userId,
      status: OrderStatus.EN_ATTENTE,
      subtotal,
      discountAmount,
      total,
      promoCode: promoCode || null,
    });

    await queryRunner.manager.save(order);

    // ===== ÉTAPE 5: Créer les items de commande + Décrémenter stock =====
    for (const cartItem of cart.items) {
      // Créer l'OrderItem avec snapshot de prix
      const orderItem = queryRunner.manager.create(OrderItem, {
        orderId: order.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        unitPriceSnapshot: cartItem.unitPriceSnapshot,
        lineTotal: cartItem.getLineTotal(),
      });

      await queryRunner.manager.save(orderItem);

      // Décrémenter le stock
      const stock = await queryRunner.manager.findOne(Stock, {
        where: { productId: cartItem.productId },
      });

      stock.decreaseStock(cartItem.quantity);
      await queryRunner.manager.save(stock);
    }

    // ===== ÉTAPE 6: Vider le panier =====
    cart.clear();
    await queryRunner.manager.save(cart);

    // ✅ TOUT S'EST BIEN PASSÉ → COMMIT
    // Toutes les modifications sont validées en une seule fois
    await queryRunner.commitTransaction();

    // Charger la commande complète
    return this.orderRepository.findOne({
      where: { id: order.id },
      relations: ['items', 'items.product'],
    });

  } catch (error) {
    // ❌ UNE ERREUR S'EST PRODUITE → ROLLBACK
    // TOUTES les modifications sont annulées
    // - La commande n'est pas créée
    // - Le stock n'est pas décrémenté
    // - Le panier n'est pas vidé
    // - La promo n'est pas utilisée
    // = État de la base identique à avant la transaction
    await queryRunner.rollbackTransaction();
    
    throw error;  // Re-throw l'erreur pour information
  } finally {
    // Libérer les ressources
    await queryRunner.release();
  }
}
```

### 🧪 Scénario de test

#### Scénario 1: Tout réussit (COMMIT)

```bash
# État initial:
# - Panier: 2 produits (Laptop: 2x, Mouse: 1x)
# - Stock Laptop: 10
# - Stock Mouse: 5

POST /api/orders
{}

# Transaction:
# 1. ✓ Charger panier: OK
# 2. ✓ Vérifier stock: OK (10 ≥ 2 et 5 ≥ 1)
# 3. ✓ Créer Order: OK
# 4. ✓ Créer OrderItems: OK
# 5. ✓ Décrémenter stock: OK
# 6. ✓ Vider panier: OK
# → COMMIT

# État final:
# - Order créée ✓
# - Stock Laptop: 8 ✓
# - Stock Mouse: 4 ✓
# - Panier vide ✓
```

#### Scénario 2: Stock insuffisant (ROLLBACK)

```bash
# État initial:
# - Panier: 2 produits (Laptop: 10x, Mouse: 1x)
# - Stock Laptop: 5 (insuffisant!)
# - Stock Mouse: 5

POST /api/orders
{}

# Transaction:
# 1. ✓ Charger panier: OK
# 2. ❌ Vérifier stock: ERREUR (5 < 10 pour Laptop)
# → ROLLBACK automatique

# État final (identique à l'état initial):
# - Order NON créée ✓
# - Stock Laptop: 5 (inchangé) ✓
# - Stock Mouse: 5 (inchangé) ✓
# - Panier intact ✓

# Erreur retournée: "Stock insuffisant pour le produit Laptop"
```

### 🎯 Avantages des transactions

1. **Intégrité**: Impossible d'avoir une commande sans décrémentation du stock
2. **Cohérence**: Soit tout réussit, soit rien ne change
3. **Fiabilité**: Pas d'état incohérent en cas d'erreur réseau, crash, etc.
4. **Rollback automatique**: En cas d'erreur, retour automatique à l'état initial

---

## 📚 Résumé des fichiers clés

| Concept | Fichier principal | Description |
|---------|-------------------|-------------|
| **🔒 Encapsulation** | `backend/src/modules/products/entities/product.entity.ts` | Propriétés privées, getters/setters validés |
| **🧬 Héritage** | `backend/src/domain/entities/user.entity.ts`<br>`backend/src/modules/users/entities/client.entity.ts`<br>`backend/src/modules/users/entities/admin.entity.ts` | User (abstraite) → Client/Admin (enfants) |
| **🎭 Polymorphisme** | `backend/src/domain/strategies/payment-strategy.interface.ts`<br>`backend/src/domain/strategies/card-payment.strategy.ts`<br>`backend/src/domain/strategies/paypal-payment.strategy.ts` | Interface commune, implémentations différentes |
| **🎯 Strategy Pattern** | `backend/src/modules/payments/services/payment.service.ts` | Sélection dynamique de la stratégie de paiement |
| **🧩 Composition** | `backend/src/modules/carts/entities/cart.entity.ts`<br>`backend/src/modules/carts/entities/cart-item.entity.ts` | Cart contient CartItems |
| **💾 Transactions** | `backend/src/modules/orders/services/order.service.ts` | Transaction atomique pour créer une commande |

---

## ✅ Checklist de validation

- [x] **Encapsulation**: Product avec propriétés privées et validation
- [x] **Héritage**: Client et Admin héritent de User (Single Table Inheritance)
- [x] **Polymorphisme**: Stratégies de paiement interchangeables
- [x] **Composition**: Cart contient CartItems
- [x] **Strategy Pattern**: Sélection dynamique Carte/PayPal
- [x] **Transactions**: Création de commande atomique
- [x] **Tests**: Jest avec tests des stratégies
- [x] **Documentation**: Commentaires dans le code
- [x] **Swagger**: Documentation API interactive

---

## 🎉 Conclusion

Ce projet démontre de manière **complète et fonctionnelle** tous les concepts POO demandés :

1. ✅ **Encapsulation** → Product
2. ✅ **Héritage** → User → Client/Admin
3. ✅ **Polymorphisme** → Payment Strategies
4. ✅ **Composition** → Cart → CartItems
5. ✅ **Strategy Pattern** → Dynamic payment selection

**Chaque concept est:**
- ✅ Implémenté dans du code réel et fonctionnel
- ✅ Commenté en détail dans les fichiers sources
- ✅ Testé (Jest)
- ✅ Documenté (ce guide + README + Swagger)
- ✅ Prêt à l'emploi

**Bon apprentissage! 🚀**
