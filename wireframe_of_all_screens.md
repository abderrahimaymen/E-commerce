# 📱 E-Commerce Platform - Complete Wireframes with Descriptions

## 🎨 Table des Matières
1. [Page d'Accueil (Homepage)](#1-page-daccueil-homepage)
2. [Page Liste de Produits](#2-page-liste-de-produits)
3. [Page Détails Produit](#3-page-détails-produit)
4. [Page Panier](#4-page-panier)
5. [Page Checkout](#5-page-checkout)
6. [Page Wishlist](#6-page-wishlist)
7. [Page Mon Compte](#7-page-mon-compte)
8. [Page Commandes](#8-page-commandes)
9. [Dashboard Admin](#9-dashboard-admin)
10. [Page Gestion Produits (Admin)](#10-page-gestion-produits-admin)
11. [Page Gestion Commandes (Admin)](#11-page-gestion-commandes-admin)
12. [Page Analytics (Admin)](#12-page-analytics-admin)

---

## 1. Page d'Accueil (Homepage)

```
┌────────────────────────────────────────────────────────────────────────┐
│  ┌─────┐                                    [Search Products...]  🔍   │
│  │LOGO │   Home  Products  Categories  Deals    [❤️ 3] [🛒 5] [👤]   │
│  └─────┘                                                                │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │                                                                   │ │
│  │              🎉 HERO BANNER / CAROUSEL                           │ │
│  │                                                                   │ │
│  │         "Summer Sale - Up to 70% Off"                            │ │
│  │                                                                   │ │
│  │         [Shop Now]  [View Deals]                                 │ │
│  │                                                                   │ │
│  │  ← ● ● ○ →                                                       │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  CATEGORIES                                                      │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  │  │
│  │  │ 📱   │  │ 💻   │  │ 👕   │  │ 📚   │  │ 🏠   │  │ ⚽   │  │  │
│  │  │Phone │  │Laptop│  │Fashion│ │Books │  │ Home │  │Sports│  │  │
│  │  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  │  │
│  │                                                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  FEATURED PRODUCTS                              [View All →]    │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │  │
│  │  │  [IMG]   │  │  [IMG]   │  │  [IMG]   │  │  [IMG]   │       │  │
│  │  │          │  │          │  │          │  │          │       │  │
│  │  │ Product 1│  │ Product 2│  │ Product 3│  │ Product 4│       │  │
│  │  │ $299.99  │  │ $149.99  │  │ $599.99  │  │ $89.99   │       │  │
│  │  │ ⭐⭐⭐⭐⭐  │  │ ⭐⭐⭐⭐☆  │  │ ⭐⭐⭐⭐⭐  │  │ ⭐⭐⭐☆☆  │       │  │
│  │  │ (245)    │  │ (89)     │  │ (512)    │  │ (34)     │       │  │
│  │  │ [❤️][🛒] │  │ [❤️][🛒] │  │ [❤️][🛒] │  │ [❤️][🛒] │       │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │  │
│  │                                                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  DEALS OF THE DAY                          ⏰ Ends in: 23:45:12 │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │  │
│  │  │  [IMG]   │  │  [IMG]   │  │  [IMG]   │  │  [IMG]   │       │  │
│  │  │ 🔥70% OFF│  │ 🔥50% OFF│  │ 🔥60% OFF│  │ 🔥40% OFF│       │  │
│  │  │ Laptop   │  │ Phone    │  │ Watch    │  │ Headset  │       │  │
│  │  │ $899.99  │  │ $499.99  │  │ $199.99  │  │ $79.99   │       │  │
│  │  │ Was:$2999│  │ Was:$999 │  │ Was:$499 │  │ Was:$129 │       │  │
│  │  │ [Add to Cart]│[Add to Cart]│[Add to Cart]│[Add to Cart]    │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │  │
│  │                                                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  WHY SHOP WITH US?                                               │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │  │
│  │  │  🚚         │  │  💳         │  │  🔒         │           │  │
│  │  │ Free Shipping│ │ Secure      │  │ Money Back  │           │  │
│  │  │ On orders   │  │ Payment     │  │ Guarantee   │           │  │
│  │  │ over $50    │  │             │  │ 30 days     │           │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘           │  │
│  │                                                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  CUSTOMER REVIEWS                                                │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  "Amazing products and fast delivery!" - John D. ⭐⭐⭐⭐⭐        │  │
│  │  "Best shopping experience ever." - Sarah M. ⭐⭐⭐⭐⭐            │  │
│  │  "Great customer service!" - Mike P. ⭐⭐⭐⭐⭐                    │  │
│  │                                                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
├────────────────────────────────────────────────────────────────────────┤
│  FOOTER                                                                │
│  About Us | Contact | Privacy Policy | Terms | FAQ                    │
│  Newsletter: [Enter email...] [Subscribe]                             │
│  © 2026 E-Commerce. All rights reserved.                              │
└────────────────────────────────────────────────────────────────────────┘
```

### 📝 Description des Éléments

#### **Header (En-tête)**
- **Logo**: Cliquable, ramène à l'accueil
- **Navigation**: Home, Products, Categories, Deals
- **Search Bar**: Recherche en temps réel avec autocomplétion
- **Icons**: 
  - ❤️ Wishlist avec badge (3 items)
  - 🛒 Cart avec badge (5 items)
  - 👤 User account/login

#### **Hero Banner**
- **Carrousel automatique**: Change toutes les 5 secondes
- **CTA Buttons**: "Shop Now" (orange), "View Deals" (outline)
- **Indicateurs**: Points pour navigation manuelle
- **Responsive**: Image adaptée mobile/desktop

#### **Categories Section**
- **6 icônes** principales de catégories
- **Hover effect**: Zoom léger + ombre
- **Click**: Redirige vers page catégorie filtrée

#### **Featured Products**
- **Grid 4 colonnes** (responsive: 2 colonnes mobile)
- **Product Card**:
  - Image produit (ratio 1:1)
  - Nom du produit (2 lignes max)
  - Prix (bold, couleur primaire)
  - Rating (étoiles) + nombre d'avis
  - Boutons: Wishlist + Add to Cart
- **View All**: Lien vers tous les produits

#### **Deals of the Day**
- **Timer**: Compte à rebours en temps réel
- **Badge discount**: Pourcentage en évidence
- **Prix barré**: Ancien prix pour comparaison
- **Urgence visuelle**: Couleurs vives, badge "🔥"

#### **Why Shop With Us**
- **Trust signals**: 3 avantages clés
- **Icons + Text**: Visual + description courte
- **Reassurance**: Shipping, Payment, Guarantee

#### **Customer Reviews**
- **Social proof**: 3 témoignages courts
- **Étoiles**: Notation visible
- **Noms**: Prénoms + initiale du nom

#### **Footer**
- **Links**: Pages importantes
- **Newsletter**: Email signup avec validation
- **Copyright**: Année dynamique

---

## 2. Page Liste de Produits

```
┌────────────────────────────────────────────────────────────────────────┐
│  ┌─────┐                                    [Search Products...]  🔍   │
│  │LOGO │   Home > Products > Electronics                               │
│  └─────┘                                    [❤️ 3] [🛒 5] [👤]         │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────────┐  ┌───────────────────────────────────────┐  │
│  │ FILTERS              │  │ PRODUCTS (Showing 1-12 of 156)       │  │
│  ├──────────────────────┤  ├───────────────────────────────────────┤  │
│  │                      │  │                                        │  │
│  │ 📂 Categories        │  │ Sort by: [Relevance ▼]   [Grid][List]│  │
│  │   □ Laptops (45)     │  │                                        │  │
│  │   □ Phones (32)      │  │ ┌─────────┐ ┌─────────┐ ┌─────────┐  │  │
│  │   □ Tablets (18)     │  │ │ [IMAGE] │ │ [IMAGE] │ │ [IMAGE] │  │  │
│  │   □ Cameras (23)     │  │ │         │ │         │ │         │  │  │
│  │                      │  │ │ Product │ │ Product │ │ Product │  │  │
│  │ 💰 Price Range       │  │ │ Name 1  │ │ Name 2  │ │ Name 3  │  │  │
│  │   Min [    ] Max [  ]│  │ │         │ │         │ │         │  │  │
│  │   ├────────┬─────┤   │  │ │ $299.99 │ │ $449.99 │ │ $199.99 │  │  │
│  │   $0      $50  $1000 │  │ │ ⭐⭐⭐⭐⭐│ │ ⭐⭐⭐⭐☆│ │ ⭐⭐⭐⭐⭐│  │  │
│  │                      │  │ │ (128)   │ │ (89)    │ │ (256)   │  │  │
│  │ ⭐ Rating            │  │ │         │ │ 🔥SALE  │ │         │  │  │
│  │   ☑ 5 Stars (23)     │  │ │ In Stock│ │ In Stock│ │ In Stock│  │  │
│  │   □ 4 Stars+ (45)    │  │ │         │ │         │ │         │  │  │
│  │   □ 3 Stars+ (89)    │  │ │ [❤️][🛒]│ │ [❤️][🛒]│ │ [❤️][🛒]│  │  │
│  │                      │  │ └─────────┘ └─────────┘ └─────────┘  │  │
│  │ 🏷️ Brands            │  │                                        │  │
│  │   □ Apple (12)       │  │ ┌─────────┐ ┌─────────┐ ┌─────────┐  │  │
│  │   □ Samsung (18)     │  │ │ [IMAGE] │ │ [IMAGE] │ │ [IMAGE] │  │  │
│  │   □ Dell (8)         │  │ │ Product │ │ Product │ │ Product │  │  │
│  │   □ HP (15)          │  │ │ Name 4  │ │ Name 5  │ │ Name 6  │  │  │
│  │                      │  │ │ $599.99 │ │ $799.99 │ │ $999.99 │  │  │
│  │ 🎨 Color             │  │ │ ⭐⭐⭐⭐☆│ │ ⭐⭐⭐⭐⭐│ │ ⭐⭐⭐⭐☆│  │  │
│  │   □ ⚫ Black (34)    │  │ │ [❤️][🛒]│ │ [❤️][🛒]│ │ [❤️][🛒]│  │  │
│  │   □ ⚪ White (23)    │  │ └─────────┘ └─────────┘ └─────────┘  │  │
│  │   □ 🔴 Red (12)      │  │                                        │  │
│  │   □ 🔵 Blue (18)     │  │ ┌─────────┐ ┌─────────┐ ┌─────────┐  │  │
│  │                      │  │ │ [IMAGE] │ │ [IMAGE] │ │ [IMAGE] │  │  │
│  │ 📦 Availability      │  │ │ Product │ │ Product │ │ Product │  │  │
│  │   ☑ In Stock (112)   │  │ │ Name 7  │ │ Name 8  │ │ Name 9  │  │  │
│  │   □ Out of Stock (44)│  │ │ $349.99 │ │ $899.99 │ │ $1299.99│  │  │
│  │                      │  │ │ ⭐⭐⭐⭐⭐│ │ ⭐⭐⭐⭐☆│ │ ⭐⭐⭐⭐⭐│  │  │
│  │ 🚚 Shipping          │  │ │ [❤️][🛒]│ │ [❤️][🛒]│ │ [❤️][🛒]│  │  │
│  │   □ Free Shipping    │  │ └─────────┘ └─────────┘ └─────────┘  │  │
│  │                      │  │                                        │  │
│  │ [Clear All Filters]  │  │ ┌─────────┐ ┌─────────┐ ┌─────────┐  │  │
│  │                      │  │ │ [IMAGE] │ │ [IMAGE] │ │ [IMAGE] │  │  │
│  └──────────────────────┘  │ │ Product │ │ Product │ │ Product │  │  │
│                             │ │ Name 10 │ │ Name 11 │ │ Name 12 │  │  │
│                             │ │ $499.99 │ │ $649.99 │ │ $729.99 │  │  │
│                             │ │ ⭐⭐⭐⭐☆│ │ ⭐⭐⭐⭐⭐│ │ ⭐⭐⭐⭐☆│  │  │
│                             │ │ [❤️][🛒]│ │ [❤️][🛒]│ │ [❤️][🛒]│  │  │
│                             │ └─────────┘ └─────────┘ └─────────┘  │  │
│                             │                                        │  │
│                             │ ┌──────────────────────────────────┐  │  │
│                             │ │ PAGINATION                       │  │  │
│                             │ │ [←] 1 [2] 3 4 5 ... 13 [→]       │  │  │
│                             │ └──────────────────────────────────┘  │  │
│                             └───────────────────────────────────────┘  │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

### 📝 Description des Éléments

#### **Breadcrumb Navigation**
- **Path**: Home > Products > Electronics
- **Cliquable**: Chaque niveau est un lien
- **Current page**: Dernier élément non cliquable

#### **Filters Sidebar (Gauche)**
- **Collapsible sections**: Chaque filtre peut se replier
- **Categories**: Checkbox avec nombre de produits
- **Price Range**: Slider double pour min/max
- **Rating**: Filtrage par note minimum
- **Brands**: Marques populaires avec count
- **Color**: Sélection visuelle de couleurs
- **Availability**: Stock disponible/épuisé
- **Shipping**: Options de livraison
- **Clear All**: Bouton pour réinitialiser tous les filtres

#### **Products Grid (Droite)**
- **Header**:
  - Total de résultats
  - Sort dropdown: Relevance, Price (low/high), Rating, Newest
  - View toggle: Grid/List view
- **Product Cards**: 
  - Grid 3 colonnes (responsive)
  - Hover: Zoom image + quick view button
  - Badge: "🔥SALE", "NEW", "LOW STOCK"
  - Stock status: In Stock / Out of Stock
- **Pagination**:
  - Previous/Next buttons
  - Page numbers (current highlighted)
  - Jump to specific page

---

## 3. Page Détails Produit

```
┌────────────────────────────────────────────────────────────────────────┐
│  ┌─────┐                    Home > Products > Laptops > Dell XPS 15    │
│  │LOGO │                                    [❤️ 3] [🛒  5] [👤]         │
└────────────────────────────────────────────────────────────────────────┘
│                                                                         │
│  ┌──────────────────────────┐  ┌────────────────────────────────────┐ │
│  │                          │  │ Dell XPS 15 Laptop                 │ │
│  │    [MAIN PRODUCT IMAGE]  │  │                                    │ │
│  │                          │  │ ⭐⭐⭐⭐⭐ 4.8 (245 reviews)         │ │
│  │                          │  │                                    │ │
│  │      1920 x 1080px       │  │ $1,299.99  [Was: $1,599.99]       │ │
│  │                          │  │ 🔥 19% OFF - Limited Time!         │ │
│  │                          │  │                                    │ │
│  │                          │  │ SKU: DELL-XPS15-2024              │ │
│  ├──────────────────────────┤  │                                    │ │
│  │ [IMG] [IMG] [IMG] [IMG]  │  │ ✅ In Stock - Only 12 left!       │ │
│  │ [IMG] [IMG] [IMG] [IMG]  │  │ 🚚 Free Shipping on orders $50+   │ │
│  └──────────────────────────┘  │ 📦 Estimated Delivery: 3-5 days   │ │
│                                 │                                    │ │
│                                 │ ┌────────────────────────────────┐ │ │
│                                 │ │ COLOR: Space Gray             │ │ │
│                                 │ │ ○ Space Gray  ○ Silver        │ │ │
│                                 │ └────────────────────────────────┘ │ │
│                                 │                                    │ │
│                                 │ ┌────────────────────────────────┐ │ │
│                                 │ │ STORAGE:                      │ │ │
│                                 │ │ ○ 256GB   ● 512GB   ○ 1TB    │ │ │
│                                 │ │ +$0       +$200      +$400    │ │ │
│                                 │ └────────────────────────────────┘ │ │
│                                 │                                    │ │
│                                 │ ┌────────────────────────────────┐ │ │
│                                 │ │ QUANTITY:  [-] [2] [+]        │ │ │
│                                 │ └────────────────────────────────┘ │ │
│                                 │                                    │ │
│                                 │ [🛒 Add to Cart]  [❤️ Add to Wishlist]│
│                                 │ [⚡ Buy Now]                       │ │
│                                 │                                    │ │
│                                 │ ┌────────────────────────────────┐ │ │
│                                 │ │ 💳 Payment Methods:           │ │ │
│                                 │ │ [VISA] [MC] [PayPal] [Crypto]│ │ │
│                                 │ └────────────────────────────────┘ │ │
│                                 │                                    │ │
│                                 │ ┌────────────────────────────────┐ │ │
│                                 │ │ 🔒 Secure Checkout            │ │ │
│                                 │ │ 🔄 30-Day Return Policy       │ │ │
│                                 │ │ ⚡ 2-Year Warranty             │ │ │
│                                 │ └────────────────────────────────┘ │ │
│                                 └────────────────────────────────────┘ │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ [Description] [Specifications] [Reviews] [Shipping]             │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │ DESCRIPTION                                                      │  │
│  │                                                                  │  │
│  │ The Dell XPS 15 is a powerful and portable laptop perfect for  │  │
│  │ professionals and content creators. With its stunning 15.6"    │  │
│  │ 4K OLED display, Intel Core i7 processor, and NVIDIA RTX      │  │
│  │ graphics, it handles demanding tasks with ease.                │  │
│  │                                                                  │  │
│  │ KEY FEATURES:                                                    │  │
│  │ • 15.6" 4K OLED Touch Display (3840 x 2160)                    │  │
│  │ • Intel Core i7-13700H Processor (14 cores, up to 5.0 GHz)    │  │
│  │ • NVIDIA GeForce RTX 4050 Graphics (6GB GDDR6)                │  │
│  │ • 16GB DDR5 RAM (expandable to 64GB)                          │  │
│  │ • 512GB PCIe NVMe SSD                                          │  │
│  │ • Thunderbolt 4 ports                                          │  │
│  │ • Backlit keyboard with precision touchpad                     │  │
│  │ • Windows 11 Pro                                                │  │
│  │ • Up to 10 hours battery life                                  │  │
│  │                                                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ CUSTOMER REVIEWS (245)                        [Write a Review]  │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │ Overall Rating: 4.8 / 5.0                                       │  │
│  │                                                                  │  │
│  │ ⭐⭐⭐⭐⭐ (189) ████████████████████████████░░░░░ 77%            │  │
│  │ ⭐⭐⭐⭐☆ (42)  ███████░░░░░░░░░░░░░░░░░░░░░░░ 17%            │  │
│  │ ⭐⭐⭐☆☆ (10)  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░  4%            │  │
│  │ ⭐⭐☆☆☆ (3)   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  1%            │  │
│  │ ⭐☆☆☆☆ (1)   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  1%            │  │
│  │                                                                  │  │
│  │ ┌──────────────────────────────────────────────────────────┐   │  │
│  │ │ Sort by: [Most Recent ▼]                                │   │  │
│  │ └──────────────────────────────────────────────────────────┘   │  │
│  │                                                                  │  │
│  │ ┌──────────────────────────────────────────────────────────┐   │  │
│  │ │ ⭐⭐⭐⭐⭐  John D.  [Verified Purchase]  2 days ago       │   │  │
│  │ │                                                          │   │  │
│  │ │ "Amazing laptop for work and gaming"                    │   │  │
│  │ │                                                          │   │  │
│  │ │ This laptop exceeded my expectations. The display is    │   │  │
│  │ │ stunning, performance is incredible, and build quality  │   │  │
│  │ │ is top-notch. Highly recommend!                         │   │  │
│  │ │                                                          │   │  │
│  │ │ [👍 Helpful (42)]  [👎 Not Helpful (2)]                │   │  │
│  │ └──────────────────────────────────────────────────────────┘   │  │
│  │                                                                  │  │
│  │ ┌──────────────────────────────────────────────────────────┐   │  │
│  │ │ ⭐⭐⭐⭐⭐  Sarah M. [Verified Purchase]  1 week ago       │   │  │
│  │ │                                                          │   │  │
│  │ │ "Perfect for video editing"                             │   │  │
│  │ │                                                          │   │  │
│  │ │ As a video editor, I needed something powerful yet      │   │  │
│  │ │ portable. This XPS 15 handles 4K editing smoothly.      │   │  │
│  │ │ Battery life is impressive too!                         │   │  │
│  │ │                                                          │   │  │
│  │ │ [👍 Helpful (38)]  [👎 Not Helpful (1)]                │   │  │
│  │ └──────────────────────────────────────────────────────────┘   │  │
│  │                                                                  │  │
│  │ [Load More Reviews]                                             │  │
│  │                                                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ YOU MAY ALSO LIKE                                               │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │  │
│  │  │ [IMAGE]  │  │ [IMAGE]  │  │ [IMAGE]  │  │ [IMAGE]  │       │  │
│  │  │ Dell     │  │ HP       │  │ Lenovo   │  │ MacBook  │       │  │
│  │  │ Laptop   │  │ Laptop   │  │ ThinkPad │  │ Pro      │       │  │
│  │  │ $899     │  │ $749     │  │ $1,099   │  │ $1,799   │       │  │
│  │  │ [View]   │  │ [View]   │  │ [View]   │  │ [View]   │       │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │  │
│  │                                                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

### 📝 Description des Éléments

#### **Product Images Section**
- **Main Image**: Grande image principale (1920x1080)
- **Zoom**: Click pour zoomer, hover pour preview
- **Thumbnail Gallery**: 8 miniatures pour changer l'image
- **360° View**: Option pour vue à 360 degrés (si disponible)

#### **Product Information**
- **Product Name**: H1, SEO-optimized
- **Rating**: Étoiles + score numérique + nombre d'avis
- **Price**: 
  - Prix actuel (grand, bold, couleur primaire)
  - Prix barré si en promotion
  - Badge pourcentage de réduction
- **SKU**: Numéro de référence produit
- **Stock Status**: 
  - ✅ In Stock (vert) + quantité restante si < 20
  - ❌ Out of Stock (rouge)
  - ⏳ Pre-order (si applicable)
- **Shipping Info**: Livraison gratuite + délai estimé

#### **Product Options**
- **Color Selector**: Radio buttons avec aperçu visuel
- **Storage/Memory**: Options avec prix supplémentaires
- **Quantity Selector**: - / + buttons avec input
- **Validation**: Max quantity based on stock

#### **Action Buttons**
- **Add to Cart**: Bouton primaire (orange)
- **Add to Wishlist**: Bouton secondaire avec icône cœur
- **Buy Now**: Direct checkout (rouge/urgent)

#### **Trust Signals**
- **Payment Methods**: Logos des moyens de paiement acceptés
- **Security**: SSL, secure checkout
- **Returns**: 30-day money-back guarantee
- **Warranty**: Garantie constructeur

#### **Tabs Section**
- **Description**: Texte descriptif + features clés
- **Specifications**: Tableau technique détaillé
- **Reviews**: Avis clients avec filtres
- **Shipping**: Infos de livraison et politique de retour

#### **Reviews Section**
- **Overall Rating**: Score + distribution visuelle
- **Sort Options**: Most recent, Most helpful, Highest/Lowest rating
- **Review Cards**:
  - Stars + Reviewer name + Verified badge
  - Review title
  - Review text
  - Helpful votes (thumbs up/down)
  - Date posted
- **Write Review**: CTA pour laisser un avis

#### **Related Products**
- **Recommendation algorithm**: Based on category + price range
- **4 products** similaires ou complémentaires
- **Quick view**: Hover pour voir détails sans quitter la page

---

## 4. Page Panier

```
┌────────────────────────────────────────────────────────────────────────┐
│  ┌─────┐                         SHOPPING CART                         │
│  │LOGO │                                    [❤️ 3] [🛒 5] [👤]         │
│  └─────┘                                                                │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────────────────────────────┐  ┌─────────────────────┐   │
│  │ CART ITEMS (5)                        │  │ ORDER SUMMARY       │   │
│  ├───────────────────────────────────────┤  ├─────────────────────┤   │
│  │                                       │  │                     │   │
│  │ ┌──────────────────────────────────┐ │  │ Subtotal: $2,548.95│   │
│  │ │ [IMG]  Dell XPS 15 Laptop        │ │  │ Shipping: Free     │   │
│  │ │        Space Gray, 512GB         │ │  │ Tax (8%): $203.92  │   │
│  │ │                                  │ │  │ ─────────────────  │   │
│  │ │        $1,299.99 each            │ │  │ Total:   $2,752.87│   │
│  │ │        Quantity: [-] [1] [+]     │ │  │                     │   │
│  │ │        Subtotal: $1,299.99       │ │  │ ┌─────────────────┐│   │
│  │ │                                  │ │  │ │ Have a coupon?  ││   │
│  │ │        [❤️ Move to Wishlist]     │ │  │ │ [Enter code...] ││   │
│  │ │        [🗑️ Remove]               │ │  │ │ [Apply]         ││   │
│  │ └──────────────────────────────────┘ │  │ └─────────────────┘│   │
│  │                                       │  │                     │   │
│  │ ┌──────────────────────────────────┐ │  │ [Proceed to      ]│   │
│  │ │ [IMG]  iPhone 15 Pro             │ │  │ [Checkout        ]│   │
│  │ │        256GB, Blue Titanium      │ │  │                     │   │
│  │ │                                  │ │  │ [Continue        ]│   │
│  │ │        $999.99 each              │ │  │ [Shopping        ]│   │
│  │ │        Quantity: [-] [1] [+]     │ │  │                     │   │
│  │ │        Subtotal: $999.99         │ │  │ ━━━━━━━━━━━━━━━━━│   │
│  │ │                                  │ │  │ WE ACCEPT:        │   │
│  │ │        [❤️ Move to Wishlist]     │ │  │ [VISA][MC]        │   │
│  │ │        [🗑️ Remove]               │ │  │ [PayPal][Crypto]  │   │
│  │ └──────────────────────────────────┘ │  │                     │   │
│  │                                       │  │ 🔒 Secure Checkout│   │
│  │ ┌──────────────────────────────────┐ │  │ 🚚 Free Shipping  │   │
│  │ │ [IMG]  Sony WH-1000XM5           │ │  │    on orders $50+ │   │
│  │ │        Wireless Headphones       │ │  │                     │   │
│  │ │                                  │ │  └─────────────────────┘   │
│  │ │        $348.99 each              │                              │
│  │ │        Quantity: [-] [2] [+]     │                              │
│  │ │        Subtotal: $697.98         │                              │
│  │ │                                  │                              │
│  │ │        [❤️ Move to Wishlist]     │                              │
│  │ │        [🗑️ Remove]               │                              │
│  │ └──────────────────────────────────┘                              │
│  │                                                                    │
│  │ ┌──────────────────────────────────────────────────────────────┐ │
│  │ │ ⚠️ ITEMS SAVED FOR LATER (2)                                │ │
│  │ ├──────────────────────────────────────────────────────────────┤ │
│  │ │                                                              │ │
│  │ │ [IMG] Apple Watch Series 9  $399.99  [Move to Cart] [Remove]│ │
│  │ │ [IMG] iPad Air M2           $599.99  [Move to Cart] [Remove]│ │
│  │ │                                                              │ │
│  │ └──────────────────────────────────────────────────────────────┘ │
│  │                                                                    │
│  └───────────────────────────────────────────────────────────────────┘
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ RECOMMENDED FOR YOU                                             │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │  │
│  │  │ [IMAGE]  │  │ [IMAGE]  │  │ [IMAGE]  │  │ [IMAGE]  │       │  │
│  │  │ Laptop   │  │ Mouse    │  │ Keyboard │  │ Webcam   │       │  │
│  │  │ Bag      │  │          │  │          │  │          │       │  │
│  │  │ $49.99   │  │ $29.99   │  │ $79.99   │  │ $89.99   │       │  │
│  │  │ [+ Add]  │  │ [+ Add]  │  │ [+ Add]  │  │ [+ Add]  │       │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │  │
│  │                                                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

### 📝 Description des Éléments

#### **Cart Items Section**
- **Item Count**: Nombre total d'articles dans le panier
- **Product Card**:
  - **Image**: Thumbnail cliquable (vers page produit)
  - **Product Name**: Nom + variante sélectionnée
  - **Price**: Prix unitaire
  - **Quantity Selector**: 
    - Boutons -/+ pour ajuster
    - Input pour saisie directe
    - Validation: Min 1, Max = stock disponible
    - Update automatique du subtotal
  - **Subtotal**: Prix unitaire × quantité
  - **Actions**:
    - Move to Wishlist (save for later)
    - Remove (supprimer de panier)
- **Stock Warning**: Si quantité > stock, afficher message d'erreur

#### **Order Summary (Sidebar)**
- **Subtotal**: Somme de tous les subtotals
- **Shipping**: 
  - Free si > $50
  - Sinon calculé selon adresse (ajouté au checkout)
- **Tax**: Calculé selon location (8% exemple)
- **Total**: Grand total en bold
- **Coupon Section**:
  - Input pour code promo
  - Bouton "Apply"
  - Validation en temps réel
  - Message succès/erreur
  - Affichage du discount appliqué
- **CTA Buttons**:
  - **Proceed to Checkout** (primaire, orange)
  - **Continue Shopping** (secondaire, outline)
- **Trust Badges**:
  - Payment methods accepted
  - Secure checkout icon
  - Free shipping threshold

#### **Saved for Later**
- **Collapsible section**: Peut se replier
- **Mini product cards**: Image + nom + prix
- **Actions**:
  - Move to Cart
  - Remove permanently

#### **Recommended Products**
- **Cross-sell**: Produits complémentaires
- **Algorithm**: Based on cart content
- **Quick Add**: Bouton pour ajouter au panier sans quitter la page

#### **Empty Cart State**
Si panier vide:
```
┌────────────────────────────────┐
│  🛒                            │
│  Your cart is empty            │
│                                │
│  [Start Shopping]              │
└────────────────────────────────┘
```

---

## 5. Page Checkout

```
┌────────────────────────────────────────────────────────────────────────┐
│  ┌─────┐                         CHECKOUT                              │
│  │LOGO │   [1. Cart] → [2. Shipping] → [3. Payment] → [4. Review]     │
│  └─────┘                                                                │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────────────────────────────┐  ┌─────────────────────┐   │
│  │ STEP 2: SHIPPING INFORMATION          │  │ ORDER SUMMARY       │   │
│  ├───────────────────────────────────────┤  ├─────────────────────┤   │
│  │                                       │  │                     │   │
│  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │ Items (5): $2,548.95│   │
│  │                                       │  │ Shipping: $15.00   │   │
│  │ 📧 Contact Information                │  │ Tax (8%): $203.92  │   │
│  │ ┌───────────────────────────────────┐ │  │ Discount: -$50.00  │   │
│  │ │ Email: [john.doe@email.com      ] │ │  │ ─────────────────  │   │
│  │ └───────────────────────────────────┘ │  │ Total:   $2,717.87│   │
│  │ ☑ Email me with news and offers      │  │                     │   │
│  │                                       │  │ ━━━━━━━━━━━━━━━━━│   │
│  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │                     │   │
│  │                                       │  │ 📦 ITEMS (5)       │   │
│  │ 🏠 Shipping Address                   │  │ ┌─────────────────┐│   │
│  │                                       │  │ │ [IMG] Dell XPS  ││   │
│  │ ┌───────────────────────────────────┐ │  │ │ 1x $1,299.99    ││   │
│  │ │ First Name: [John              ] │ │  │ └─────────────────┘│   │
│  │ └───────────────────────────────────┘ │  │ ┌─────────────────┐│   │
│  │ ┌───────────────────────────────────┐ │  │ │ [IMG] iPhone 15 ││   │
│  │ │ Last Name:  [Doe               ] │ │  │ │ 1x $999.99      ││   │
│  │ └───────────────────────────────────┘ │  │ └─────────────────┘│   │
│  │ ┌───────────────────────────────────┐ │  │ ┌─────────────────┐│   │
│  │ │ Address:    [123 Main Street   ] │ │  │ │ [IMG] Sony      ││   │
│  │ └───────────────────────────────────┘ │  │ │ Headphones      ││   │
│  │ ┌───────────────────────────────────┐ │  │ │ 2x $348.99      ││   │
│  │ │ Apartment:  [Apt 4B (optional) ] │ │  │ └─────────────────┘│   │
│  │ └───────────────────────────────────┘ │  │                     │   │
│  │ ┌────────────────┐ ┌────────────────┐ │  │ [Edit Cart]        │   │
│  │ │ City: [SF    ] │ │State: [CA ▼] │ │  │                     │   │
│  │ └────────────────┘ └────────────────┘ │  └─────────────────────┘   │
│  │ ┌────────────────┐ ┌────────────────┐                              │
│  │ │ ZIP: [94102  ] │ │Country: [US▼]│                              │
│  │ └────────────────┘ └────────────────┘                              │
│  │ ┌───────────────────────────────────┐                              │
│  │ │ Phone:      [(415) 555-0123    ] │                              │
│  │ └───────────────────────────────────┘                              │
│  │                                                                     │
│  │ ☑ Save this address for next time                                  │
│  │                                                                     │
│  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  │                                                                     │
│  │ 🚚 Shipping Method                                                  │
│  │                                                                     │
│  │ ● Standard Shipping (5-7 business days)        $15.00             │
│  │ ○ Express Shipping (2-3 business days)         $29.99             │
│  │ ○ Overnight Shipping (1 business day)          $49.99             │
│  │                                                                     │
│  │ Estimated Delivery: Dec 15-17, 2026                                │
│  │                                                                     │
│  │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  │                                                                     │
│  │ [← Return to Cart]              [Continue to Payment →]           │
│  │                                                                     │
│  └───────────────────────────────────────────────────────────────────┘
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ 🔒 SECURE CHECKOUT                                               │  │
│  │ Your information is encrypted and secure                         │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

### 📝 Description des Éléments

#### **Progress Indicator**
- **Step 1**: Cart (complété, ✓)
- **Step 2**: Shipping (actif, en cours)
- **Step 3**: Payment (à venir)
- **Step 4**: Review (à venir)
- **Visual**: Timeline avec numéros et barres de progression

#### **Contact Information**
- **Email Field**: 
  - Pré-rempli si utilisateur connecté
  - Validation en temps réel (format email)
  - Message d'erreur si invalide
- **Newsletter Checkbox**: Opt-in pour recevoir des offres

#### **Shipping Address Form**
- **Fields**:
  - First Name (required)
  - Last Name (required)
  - Address Line 1 (required)
  - Address Line 2 (optional)
  - City (required)
  - State/Province (dropdown, required)
  - ZIP/Postal Code (required, format validation)
  - Country (dropdown, required)
  - Phone (required, format validation)
- **Validation**:
  - Real-time validation sur blur
  - Messages d'erreur en rouge sous champs
  - Form submit désactivé si erreurs
- **Save Address**: Checkbox pour sauvegarder pour futurs achats
- **Address Book**: Si connecté, dropdown pour choisir adresse enregistrée

#### **Shipping Method**
- **Radio buttons**: Sélection unique
- **Options**:
  - Standard (économique, 5-7 jours)
  - Express (rapide, 2-3 jours)
  - Overnight (urgent, 1 jour)
- **Prix**: Clairement affiché à droite
- **Delivery Date**: Estimation mise à jour selon méthode choisie
- **Free Shipping**: Si commande > threshold, afficher "FREE" au lieu du prix

#### **Order Summary (Sidebar)**
- **Sticky**: Reste visible en scrollant
- **Items Breakdown**:
  - Subtotal
  - Shipping (mis à jour selon méthode choisie)
  - Tax (calculé selon adresse)
  - Discount (si coupon appliqué)
  - **Total** (grand, bold)
- **Items Preview**:
  - Thumbnails des produits
  - Quantité × prix
  - Link "Edit Cart" pour retourner au panier
- **Collapsed on Mobile**: Affichable via toggle

#### **Navigation Buttons**
- **Return to Cart**: Secondaire, à gauche
- **Continue to Payment**: Primaire (orange), à droite
- **Validation**: Bouton "Continue" disabled si formulaire incomplet

#### **Security Badge**
- **SSL Icon**: Cadenas pour rassurer
- **Text**: "Your information is encrypted and secure"

---

## 6. Page Wishlist

```
┌────────────────────────────────────────────────────────────────────────┐
│  ┌─────┐                       MY WISHLIST                             │
│  │LOGO │   Home > Account > Wishlist              [❤️ 12] [🛒 5] [👤] │
│  └─────┘                                                                │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  MY WISHLIST (12 items)                     [Share Wishlist 🔗] │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  ┌──────────────────────────────────────────────────────────┐   │  │
│  │  │ [IMG]  Dell XPS 15 Laptop                               │   │  │
│  │  │                                                          │   │  │
│  │  │        Space Gray, 512GB                                │   │  │
│  │  │        ⭐⭐⭐⭐⭐ 4.8 (245 reviews)                        │   │  │
│  │  │                                                          │   │  │
│  │  │        Current Price: $1,299.99                         │   │  │
│  │  │        🔽 Price dropped by $200! (was $1,499.99)        │   │  │
│  │  │                                                          │   │  │
│  │  │        ✅ In Stock                                      │   │  │
│  │  │        Added: 2 weeks ago                               │   │  │
│  │  │                                                          │   │  │
│  │  │        [🛒 Add to Cart]  [❌ Remove from Wishlist]     │   │  │
│  │  │        [🔔 ON] Price drop alerts                        │   │  │
│  │  └──────────────────────────────────────────────────────────┘   │  │
│  │                                                                  │  │
│  │  ┌──────────────────────────────────────────────────────────┐   │  │
│  │  │ [IMG]  iPhone 15 Pro                                    │   │  │
│  │  │                                                          │   │  │
│  │  │        256GB, Blue Titanium                             │   │  │
│  │  │        ⭐⭐⭐⭐⭐ 4.9 (512 reviews)                        │   │  │
│  │  │                                                          │   │  │
│  │  │        Current Price: $999.99                           │   │  │
│  │  │        💰 Price stable since you added it               │   │  │
│  │  │                                                          │   │  │
│  │  │        ✅ In Stock                                      │   │  │
│  │  │        Added: 5 days ago                                │   │  │
│  │  │                                                          │   │  │
│  │  │        [🛒 Add to Cart]  [❌ Remove from Wishlist]     │   │  │
│  │  │        [🔔 OFF] Price drop alerts                       │   │  │
│  │  └──────────────────────────────────────────────────────────┘   │  │
│  │                                                                  │  │
│  │  ┌──────────────────────────────────────────────────────────┐   │  │
│  │  │ [IMG]  Sony WH-1000XM5 Headphones                       │   │  │
│  │  │                                                          │   │  │
│  │  │        Black, Wireless Noise Cancelling                 │   │  │
│  │  │        ⭐⭐⭐⭐⭐ 4.7 (89 reviews)                         │   │  │
│  │  │                                                          │   │  │
│  │  │        Current Price: $348.99                           │   │  │
│  │  │                                                          │   │  │
│  │  │        ❌ Out of Stock                                  │   │  │
│  │  │        [🔔 Notify when available]                       │   │  │
│  │  │        Added: 1 month ago                               │   │  │
│  │  │                                                          │   │  │
│  │  │        [❌ Remove from Wishlist]                        │   │  │
│  │  │        [🔔 ON] Back in stock alerts                     │   │  │
│  │  └──────────────────────────────────────────────────────────┘   │  │
│  │                                                                  │  │
│  │  ┌──────────────────────────────────────────────────────────┐   │  │
│  │  │ [IMG]  MacBook Pro 16" M3 Max                           │   │  │
│  │  │                                                          │   │  │
│  │  │        Space Black, 1TB SSD, 32GB RAM                   │   │  │
│  │  │        ⭐⭐⭐⭐⭐ 5.0 (156 reviews)                        │   │  │
│  │  │                                                          │   │  │
│  │  │        Current Price: $3,499.99                         │   │  │
│  │  │        🔼 Price increased by $200 (was $3,299.99)       │   │  │
│  │  │                                                          │   │  │
│  │  │        ✅ In Stock (Limited)                            │   │  │
│  │  │        Added: 3 days ago                                │   │  │
│  │  │                                                          │   │  │
│  │  │        [🛒 Add to Cart]  [❌ Remove from Wishlist]     │   │  │
│  │  │        [🔔 ON] Price drop alerts                        │   │  │
│  │  └──────────────────────────────────────────────────────────┘   │  │
│  │                                                                  │  │
│  │  [Load More Items...]                                           │  │
│  │                                                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ ACTIONS                                                          │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  [🛒 Add All to Cart]  [📧 Email Wishlist]  [🗑️ Clear All]    │  │
│  │                                                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ SHARE YOUR WISHLIST                                              │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  Link: https://ecommerce.com/wishlist/john-doe-12345            │  │
│  │  [📋 Copy Link]                                                  │  │
│  │                                                                  │  │
│  │  Share via: [Facebook] [Twitter] [WhatsApp] [Email]             │  │
│  │                                                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

### 📝 Description des Éléments

#### **Wishlist Header**
- **Item Count**: Nombre total d'items dans la wishlist
- **Share Button**: Génère un lien public partageable
- **Sort Options**: Par date ajoutée, prix, nom (dropdown)

#### **Wishlist Item Card**
- **Product Image**: Cliquable vers page produit
- **Product Info**:
  - Nom du produit
  - Variante sélectionnée (couleur, taille, etc.)
  - Rating + nombre d'avis
- **Price Tracking**:
  - **Current Price**: Prix actuel (bold)
  - **Price History**:
    - 🔽 Price Drop (vert): "Dropped by $X"
    - 🔼 Price Increase (rouge): "Increased by $X"
    - 💰 Stable: "Price stable since you added it"
  - **Original Price**: Prix au moment de l'ajout
- **Stock Status**:
  - ✅ In Stock (vert)
  - ❌ Out of Stock (rouge)
  - ⏳ Limited Stock (orange)
  - 📅 Pre-order available
- **Date Added**: "Added X days/weeks ago"
- **Actions**:
  - **Add to Cart**: Si en stock
  - **Notify when available**: Si rupture
  - **Remove**: Supprimer de la wishlist
  - **Price Alert Toggle**: ON/OFF pour notifications

#### **Price Drop Alert System**
- **Toggle Button**: 🔔 ON/OFF
- **Email Notification**: Envoyé quand prix baisse
- **Settings**: Seuil minimum de baisse (ex: 10%)
- **Frequency**: Maximum 1 email par jour par produit

#### **Bulk Actions**
- **Add All to Cart**: Ajoute tous les items disponibles
- **Email Wishlist**: Envoie liste par email
- **Clear All**: Vide la wishlist (avec confirmation)

#### **Share Wishlist**
- **Public Link**: URL unique pour partager
- **Privacy**: Option pour rendre publique ou privée
- **Social Sharing**: Boutons pour Facebook, Twitter, WhatsApp
- **Use Cases**: 
  - Registry (mariage, baby shower)
  - Gift ideas pour amis/famille

#### **Empty Wishlist State**
```
┌────────────────────────────────┐
│  ❤️                            │
│  Your wishlist is empty        │
│  Save items you love!          │
│                                │
│  [Browse Products]             │
└────────────────────────────────┘
```

---

## 7. Page Mon Compte

```
┌────────────────────────────────────────────────────────────────────────┐
│  ┌─────┐                      MY ACCOUNT                               │
│  │LOGO │   Home > Account                      [❤️ 3] [🛒 5] [👤]     │
│  └─────┘                                                                │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────┐  ┌───────────────────────────────────────────┐  │
│  │ NAVIGATION       │  │ DASHBOARD                                 │  │
│  ├──────────────────┤  ├───────────────────────────────────────────┤  │
│  │                  │  │                                           │  │
│  │ ● Dashboard      │  │ Welcome back, John! 👋                   │  │
│  │ ○ Orders         │  │                                           │  │
│  │ ○ Wishlist       │  │ ┌─────────────────────────────────────┐ │  │
│  │ ○ Addresses      │  │ │ 📊 QUICK STATS                      │ │  │
│  │ ○ Payment Methods│  │ ├─────────────────────────────────────┤ │  │
│  │ ○ Profile        │  │ │                                     │ │  │
│  │ ○ Security       │  │ │  ┌─────────┐  ┌─────────┐  ┌──────┐│ │  │
│  │ ○ Notifications  │  │ │  │ 15      │  │ 12      │  │ $2.5K││ │  │
│  │ ○ Rewards        │  │ │  │ Orders  │  │ Wishlist│  │ Spent││ │  │
│  │ ○ Support        │  │ │  └─────────┘  └─────────┘  └──────┘│ │  │
│  │                  │  │ │                                     │ │  │
│  │ [Logout]         │  │ └─────────────────────────────────────┘ │  │
│  │                  │  │                                           │  │
│  └──────────────────┘  │ ┌─────────────────────────────────────┐ │  │
│                        │ │ 📦 RECENT ORDERS                    │ │  │
│                        │ ├─────────────────────────────────────┤ │  │
│                        │ │                                     │ │  │
│                        │ │ Order #1234  |  Dec 10, 2026       │ │  │
│                        │ │ Dell XPS 15 + 2 more items         │ │  │
│                        │ │ Status: ✅ Delivered                │ │  │
│                        │ │ [View Details] [Track] [Review]    │ │  │
│                        │ │                                     │ │  │
│                        │ │ ──────────────────────────────────  │ │  │
│                        │ │                                     │ │  │
│                        │ │ Order #1233  |  Dec 8, 2026        │ │  │
│                        │ │ iPhone 15 Pro                      │ │  │
│                        │ │ Status: 🚚 In Transit              │ │  │
│                        │ │ [View Details] [Track]             │ │  │
│                        │ │                                     │ │  │
│                        │ │ ──────────────────────────────────  │ │  │
│                        │ │                                     │ │  │
│                        │ │ Order #1232  |  Dec 5, 2026        │ │  │
│                        │ │ Sony Headphones                    │ │  │
│                        │ │ Status: 📦 Processing              │ │  │
│                        │ │ [View Details]                     │ │  │
│                        │ │                                     │ │  │
│                        │ │ [View All Orders →]                │ │  │
│                        │ │                                     │ │  │
│                        │ └─────────────────────────────────────┘ │  │
│                        │                                           │  │
│                        │ ┌─────────────────────────────────────┐ │  │
│                        │ │ ❤️ WISHLIST UPDATES                 │ │  │
│                        │ ├─────────────────────────────────────┤ │  │
│                        │ │                                     │ │  │
│                        │ │ 🔽 Dell XPS 15 - Price drop $200!  │ │  │
│                        │ │    Now: $1,299.99  [View]          │ │  │
│                        │ │                                     │ │  │
│                        │ │ ✅ Sony Headphones back in stock!  │ │  │
│                        │ │    [Add to Cart]                   │ │  │
│                        │ │                                     │ │  │
│                        │ │ [View Full Wishlist →]             │ │  │
│                        │ │                                     │ │  │
│                        │ └─────────────────────────────────────┘ │  │
│                        │                                           │  │
│                        │ ┌─────────────────────────────────────┐ │  │
│                        │ │ 🎁 REWARDS & LOYALTY                │ │  │
│                        │ ├─────────────────────────────────────┤ │  │
│                        │ │                                     │ │  │
│                        │ │ You have 1,250 points!             │ │  │
│                        │ │ ████████████░░░░░░░░ 62%           │ │  │
│                        │ │ 750 points to next reward          │ │  │
│                        │ │                                     │ │  │
│                        │ │ [View Rewards →]                   │ │  │
│                        │ │                                     │ │  │
│                        │ └─────────────────────────────────────┘ │  │
│                        │                                           │  │
│                        │ ┌─────────────────────────────────────┐ │  │
│                        │ │ 📍 SAVED ADDRESSES (2)              │ │  │
│                        │ ├─────────────────────────────────────┤ │  │
│                        │ │                                     │ │  │
│                        │ │ 🏠 Home                            │ │  │
│                        │ │ 123 Main St, San Francisco, CA     │ │  │
│                        │ │ [Edit] [Delete]                    │ │  │
│                        │ │                                     │ │  │
│                        │ │ 🏢 Work                            │ │  │
│                        │ │ 456 Business Ave, SF, CA           │ │  │
│                        │ │ [Edit] [Delete]                    │ │  │
│                        │ │                                     │ │  │
│                        │ │ [+ Add New Address]                │ │  │
│                        │ │                                     │ │  │
│                        │ └─────────────────────────────────────┘ │  │
│                        │                                           │  │
│                        │ ┌─────────────────────────────────────┐ │  │
│                        │ │ 💳 PAYMENT METHODS (1)              │ │  │
│                        │ ├─────────────────────────────────────┤ │  │
│                        │ │                                     │ │  │
│                        │ │ 💳 Visa ending in 4242             │ │  │
│                        │ │ Expires: 12/2027                   │ │  │
│                        │ │ [Edit] [Delete]                    │ │  │
│                        │ │                                     │ │  │
│                        │ │ [+ Add New Card]                   │ │  │
│                        │ │                                     │ │  │
│                        │ └─────────────────────────────────────┘ │  │
│                        │                                           │  │
│                        └───────────────────────────────────────────┘  │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

### 📝 Description des Éléments

#### **Sidebar Navigation**
- **Active State**: Indicateur visuel sur page actuelle
- **Sections**:
  - **Dashboard**: Vue d'ensemble
  - **Orders**: Historique complet des commandes
  - **Wishlist**: Liste de souhaits
  - **Addresses**: Adresses de livraison enregistrées
  - **Payment Methods**: Cartes enregistrées
  - **Profile**: Informations personnelles
  - **Security**: Mot de passe, 2FA
  - **Notifications**: Préférences emails/SMS
  - **Rewards**: Programme de fidélité
  - **Support**: Centre d'aide
- **Logout**: En bas de sidebar

#### **Quick Stats**
- **Cards with metrics**:
  - Total Orders (lifetime)
  - Wishlist Items count
  - Total Spent (lifetime)
- **Visual**: Icons + large numbers

#### **Recent Orders**
- **3 dernières commandes**
- **Order Info**:
  - Order number (cliquable)
  - Date
  - Items (aperçu)
  - Status badge avec icon
- **Actions**:
  - View Details
  - Track (si expédié)
  - Review Products (si livré)
- **View All**: Lien vers page Orders complète

#### **Wishlist Updates**
- **Notifications**:
  - Price drops (avec ancien/nouveau prix)
  - Back in stock alerts
- **Quick Actions**: View, Add to Cart
- **Link**: View Full Wishlist

#### **Rewards & Loyalty**
- **Points Balance**: Grand nombre
- **Progress Bar**: Vers prochain palier
- **Next Reward**: Points manquants
- **CTA**: View Rewards program

#### **Saved Addresses**
- **Address Cards**:
  - Label (Home, Work, etc.)
  - Full address
  - Edit/Delete buttons
- **Add New**: CTA pour ajouter adresse
- **Default**: Star icon sur adresse par défaut

#### **Payment Methods**
- **Card Display**:
  - Card type icon (Visa, Mastercard, etc.)
  - Last 4 digits
  - Expiry date
  - Edit/Delete actions
- **Add New**: CTA pour ajouter carte
- **Security**: "Your cards are encrypted" badge

---

## 8. Page Commandes

```
┌────────────────────────────────────────────────────────────────────────┐
│  ┌─────┐                      ORDER HISTORY                            │
│  │LOGO │   Home > Account > Orders              [❤️ 3] [🛒 5] [👤]    │
│  └─────┘                                                                │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ FILTERS & SEARCH                                                 │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  Search orders: [Order #, Product name...]  [🔍]               │  │
│  │                                                                  │  │
│  │  Status: [All Orders ▼]  Date: [Last 6 months ▼]  [Export CSV]│  │
│  │                                                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ YOUR ORDERS (Showing 1-10 of 15)                                 │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │ ┌────────────────────────────────────────────────────────────┐ │  │
│  │ │ Order #1234                          Dec 10, 2026          │ │  │
│  │ │ ✅ Delivered on Dec 12, 2026                              │ │  │
│  │ ├────────────────────────────────────────────────────────────┤ │  │
│  │ │                                                            │ │  │
│  │ │  [IMG]  Dell XPS 15 Laptop                                │ │  │
│  │ │         Space Gray, 512GB                                 │ │  │
│  │ │         Qty: 1  |  $1,299.99                              │ │  │
│  │ │         [Write Review] [Buy Again]                        │ │  │
│  │ │                                                            │ │  │
│  │ │  [IMG]  iPhone 15 Pro                                     │ │  │
│  │ │         Blue Titanium, 256GB                              │ │  │
│  │ │         Qty: 1  |  $999.99                                │ │  │
│  │ │         [Write Review] [Buy Again]                        │ │  │
│  │ │                                                            │ │  │
│  │ │  + 1 more item                                            │ │  │
│  │ │                                                            │ │  │
│  │ │  Total: $2,752.87                                         │ │  │
│  │ │                                                            │ │  │
│  │ │  [View Order Details] [Download Invoice] [Get Support]   │ │  │
│  │ │                                                            │ │  │
│  │ └────────────────────────────────────────────────────────────┘ │  │
│  │                                                                  │  │
│  │ ┌────────────────────────────────────────────────────────────┐ │  │
│  │ │ Order #1233                          Dec 8, 2026           │ │  │
│  │ │ 🚚 In Transit - Arriving Dec 15, 2026                     │ │  │
│  │ │ Tracking: TRK-987654321                                   │ │  │
│  │ ├────────────────────────────────────────────────────────────┤ │  │
│  │ │                                                            │ │  │
│  │ │  📦 Package is with delivery partner                      │ │  │
│  │ │  ━━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━ 35%             │ │  │
│  │ │                                                            │ │  │
│  │ │  ✅ Order Placed       Dec 8, 10:30 AM                    │ │  │
│  │ │  ✅ Processing         Dec 8, 2:15 PM                     │ │  │
│  │ │  ✅ Shipped            Dec 9, 11:00 AM                    │ │  │
│  │ │  ● In Transit          Now                                │ │  │
│  │ │  ○ Delivered           Expected Dec 15                    │ │  │
│  │ │                                                            │ │  │
│  │ │  [IMG]  Sony WH-1000XM5 Headphones                        │ │  │
│  │ │         Black, Wireless                                   │ │  │
│  │ │         Qty: 2  |  $697.98                                │ │  │
│  │ │                                                            │ │  │
│  │ │  Total: $712.98 (includes shipping)                       │ │  │
│  │ │                                                            │ │  │
│  │ │  [Track Package] [View Details] [Cancel Order]            │ │  │
│  │ │                                                            │ │  │
│  │ └────────────────────────────────────────────────────────────┘ │  │
│  │                                                                  │  │
│  │ ┌────────────────────────────────────────────────────────────┐ │  │
│  │ │ Order #1232                          Dec 5, 2026           │ │  │
│  │ │ 📦 Processing - Preparing for shipment                    │ │  │
│  │ ├────────────────────────────────────────────────────────────┤ │  │
│  │ │                                                            │ │  │
│  │ │  [IMG]  MacBook Pro 16" M3 Max                            │ │  │
│  │ │         Space Black, 1TB SSD                              │ │  │
│  │ │         Qty: 1  |  $3,499.99                              │ │  │
│  │ │                                                            │ │  │
│  │ │  Total: $3,499.99                                         │ │  │
│  │ │                                                            │ │  │
│  │ │  Estimated shipping: Dec 14, 2026                         │ │  │
│  │ │                                                            │ │  │
│  │ │  [View Details] [Cancel Order]                            │ │  │
│  │ │                                                            │ │  │
│  │ └────────────────────────────────────────────────────────────┘ │  │
│  │                                                                  │  │
│  │ ┌────────────────────────────────────────────────────────────┐ │  │
│  │ │ Order #1231                          Dec 1, 2026           │ │  │
│  │ │ ❌ Cancelled by customer                                  │ │  │
│  │ ├────────────────────────────────────────────────────────────┤ │  │
│  │ │                                                            │ │  │
│  │ │  [IMG]  iPad Air M2                                       │ │  │
│  │ │         256GB, Space Gray                                 │ │  │
│  │ │         Qty: 1  |  $599.99                                │ │  │
│  │ │                                                            │ │  │
│  │ │  Refund: $599.99 processed to Visa ****4242              │ │  │
│  │ │  Refund date: Dec 3, 2026                                 │ │  │
│  │ │                                                            │ │  │
│  │ │  [View Details] [Buy Again]                               │ │  │
│  │ │                                                            │ │  │
│  │ └────────────────────────────────────────────────────────────┘ │  │
│  │                                                                  │  │
│  │  [Load More Orders...]                                          │  │
│  │                                                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

### 📝 Description des Éléments

#### **Filters & Search**
- **Search Bar**: Recherche par numéro de commande ou nom de produit
- **Status Filter**: 
  - All Orders
  - Delivered
  - In Transit
  - Processing
  - Cancelled
  - Returned
- **Date Filter**:
  - Last 30 days
  - Last 3 months
  - Last 6 months
  - Last year
  - Custom date range
- **Export**: CSV download de toutes les commandes

#### **Order Card**
- **Header**:
  - Order number (cliquable)
  - Order date
  - Status badge avec icon:
    - ✅ Delivered (vert)
    - 🚚 In Transit (bleu)
    - 📦 Processing (jaune)
    - ❌ Cancelled (rouge)
    - 🔄 Returned (orange)
- **Status Timeline** (si en transit):
  - Progress bar
  - Timeline avec checkpoints:
    - Order Placed (timestamp)
    - Processing (timestamp)
    - Shipped (timestamp)
    - In Transit (current)
    - Delivered (estimated)
  - Tracking number (cliquable vers courier site)

#### **Order Items**
- **Product Row**:
  - Thumbnail image (cliquable)
  - Product name + variant
  - Quantity × Price
  - **Actions** (selon status):
    - **Delivered**: Write Review, Buy Again
    - **In Transit**: Track Package
    - **Processing**: Cancel Order
    - **Cancelled**: Buy Again

#### **Order Total**
- **Breakdown**:
  - Subtotal
  - Shipping
  - Tax
  - Discount (si applicable)
  - **Total** (bold)

#### **Order Actions**
- **View Order Details**: Modal ou nouvelle page avec:
  - Full order information
  - Shipping address
  - Billing address
  - Payment method
  - Detailed timeline
- **Download Invoice**: PDF download
- **Track Package**: Lien vers tracking externe
- **Cancel Order**: 
  - Disponible si status = Processing
  - Modal de confirmation
  - Raison de l'annulation
  - Refund processing info
- **Get Support**: Contact customer service

#### **Empty State**
```
┌────────────────────────────────┐
│  📦                            │
│  No orders yet                 │
│  Start shopping to see your    │
│  order history here            │
│                                │
│  [Start Shopping]              │
└────────────────────────────────┘
```

---

## 9. Dashboard Admin

```
┌────────────────────────────────────────────────────────────────────────┐
│  ┌─────┐  ADMIN PANEL                              🔔 (3)  [👤 Admin] │
│  │LOGO │                                                                │
│  └─────┘                                                                │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────┐  ┌─────────────────────────────────────────────┐   │
│  │ SIDEBAR      │  │ DASHBOARD OVERVIEW                          │   │
│  ├──────────────┤  ├─────────────────────────────────────────────┤   │
│  │              │  │                                             │   │
│  │ ● Dashboard  │  │ ┌──────────────────────────────────────┐   │   │
│  │ ○ Products   │  │ │ KEY METRICS                          │   │   │
│  │ ○ Orders     │  │ ├──────────────────────────────────────┤   │   │
│  │ ○ Customers  │  │ │                                      │   │   │
│  │ ○ Inventory  │  │ │ ┌──────────┐ ┌──────────┐ ┌────────┐│   │   │
│  │ ○ Analytics  │  │ │ │ 💰       │ │ 📦       │ │ 👥     ││   │   │
│  │ ○ Reviews    │  │ │ │ $45,287  │ │ 156      │ │ 1,234  ││   │   │
│  │ ○ Coupons    │  │ │ │ Revenue  │ │ Orders   │ │ Customers││  │
│  │ ○ Reports    │  │ │ │ ↑ 12.5%  │ │ ↑ 8.3%   │ │ ↑ 15.2%││   │   │
│  │ ○ Settings   │  │ │ └──────────┘ └──────────┘ └────────┘│   │   │
│  │              │  │ │                                      │   │   │
│  │ [Logout]     │  │ │ ┌──────────┐ ┌──────────┐ ┌────────┐│   │   │
│  │              │  │ │ │ ⭐       │ │ 🔄       │ │ ⚠️     ││   │   │
│  │              │  │ │ │ 4.7      │ │ 23       │ │ 12     ││   │   │
│  │              │  │ │ │ Avg Rating│ │ Returns  │ │ Low Stock││  │
│  │              │  │ │ │ ↑ 0.2    │ │ ↓ 3.1%   │ │        ││   │   │
│  │              │  │ │ └──────────┘ └──────────┘ └────────┘│   │   │
│  │              │  │ │                                      │   │   │
│  │              │  │ └──────────────────────────────────────┘   │   │
│  │              │  │                                             │   │
│  │              │  │ ┌──────────────────────────────────────┐   │   │
│  │              │  │ │ SALES CHART                          │   │   │
│  │              │  │ ├──────────────────────────────────────┤   │   │
│  │              │  │ │ Period: [This Month ▼]              │   │   │
│  │              │  │ │                                      │   │   │
│  │              │  │ │     ┌───────────────────────┐       │   │   │
│  │              │  │ │  5K │        ╱╲    ╱╲       │       │   │   │
│  │              │  │ │     │       ╱  ╲  ╱  ╲      │       │   │   │
│  │              │  │ │  4K │      ╱    ╲╱    ╲     │       │   │   │
│  │              │  │ │     │     ╱            ╲    │       │   │   │
│  │              │  │ │  3K │    ╱              ╲   │       │   │   │
│  │              │  │ │     │   ╱                ╲  │       │   │   │
│  │              │  │ │  2K │  ╱                  ╲ │       │   │   │
│  │              │  │ │     └────────────────────────       │   │   │
│  │              │  │ │      Mon Tue Wed Thu Fri Sat Sun    │   │   │
│  │              │  │ │                                      │   │   │
│  │              │  │ └──────────────────────────────────────┘   │   │
│  │              │  │                                             │   │
│  │              │  │ ┌──────────────────────────────────────┐   │   │
│  │              │  │ │ TOP SELLING PRODUCTS                 │   │   │
│  │              │  │ ├──────────────────────────────────────┤   │   │
│  │              │  │ │                                      │   │   │
│  │              │  │ │ 1. Dell XPS 15 Laptop                │   │   │
│  │              │  │ │    45 units  |  $58,499.55          │   │   │
│  │              │  │ │    ████████████████████░░░░░ 82%    │   │   │
│  │              │  │ │                                      │   │   │
│  │              │  │ │ 2. iPhone 15 Pro                     │   │   │
│  │              │  │ │    38 units  |  $37,999.62          │   │   │
│  │              │  │ │    ██████████████████░░░░░░░ 69%    │   │   │
│  │              │  │ │                                      │   │   │
│  │              │  │ │ 3. Sony Headphones                   │   │   │
│  │              │  │ │    72 units  |  $25,127.28          │   │   │
│  │              │  │ │    ████████████████░░░░░░░░░ 58%    │   │   │
│  │              │  │ │                                      │   │   │
│  │              │  │ │ [View Full Report →]                │   │   │
│  │              │  │ │                                      │   │   │
│  │              │  │ └──────────────────────────────────────┘   │   │
│  │              │  │                                             │   │
│  └──────────────┘  │ ┌──────────────────────────────────────┐   │   │
│                    │ │ RECENT ORDERS                        │   │   │
│                    │ ├──────────────────────────────────────┤   │   │
│                    │ │                                      │   │   │
│                    │ │ #1234 | John D.    | $2,752 | ✅    │   │   │
│                    │ │ #1233 | Sarah M.   | $712   | 🚚    │   │   │
│                    │ │ #1232 | Mike P.    | $3,499 | 📦    │   │   │
│                    │ │ #1231 | Emma W.    | $599   | ❌    │   │   │
│                    │ │ #1230 | Alex B.    | $1,299 | ✅    │   │   │
│                    │ │                                      │   │   │
│                    │ │ [View All Orders →]                 │   │   │
│                    │ │                                      │   │   │
│                    │ └──────────────────────────────────────┘   │   │
│                    │                                             │   │
│                    │ ┌──────────────────────────────────────┐   │   │
│                    │ │ LOW STOCK ALERTS (12)                │   │   │
│                    │ ├──────────────────────────────────────┤   │   │
│                    │ │                                      │   │   │
│                    │ │ ⚠️ Dell XPS 15 - Only 5 left         │   │   │
│                    │ │ ⚠️ iPhone 15 Pro - Only 3 left       │   │   │
│                    │ │ 🔴 Sony Headphones - Out of stock    │   │   │
│                    │ │                                      │   │   │
│                    │ │ [Manage Inventory →]                │   │   │
│                    │ │                                      │   │   │
│                    │ └──────────────────────────────────────┘   │   │
│                    │                                             │   │
│                    │ ┌──────────────────────────────────────┐   │   │
│                    │ │ PENDING REVIEWS (8)                  │   │   │
│                    │ ├──────────────────────────────────────┤   │   │
│                    │ │                                      │   │   │
│                    │ │ ⭐⭐⭐⭐⭐ Dell XPS 15 - John D.      │   │   │
│                    │ │ "Amazing laptop!" - 2 days ago       │   │   │
│                    │ │ [Approve] [Reject]                   │   │   │
│                    │ │                                      │   │   │
│                    │ │ [Moderate All Reviews →]            │   │   │
│                    │ │                                      │   │   │
│                    │ └──────────────────────────────────────┘   │   │
│                    │                                             │   │
│                    └─────────────────────────────────────────────┘   │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

### 📝 Description des Éléments

#### **Admin Header**
- **Logo**: Retour au dashboard
- **Notifications**: Bell icon avec badge count
- **Admin Profile**: Dropdown menu:
  - View Site (frontend)
  - Settings
  - Logout

#### **Sidebar Navigation**
- **Active Section**: Highlighted
- **Sections**:
  - Dashboard (overview)
  - Products (manage catalog)
  - Orders (order management)
  - Customers (user management)
  - Inventory (stock management)
  - Analytics (reports & charts)
  - Reviews (moderation)
  - Coupons (promo codes)
  - Reports (export data)
  - Settings (system config)

#### **Key Metrics Cards**
- **6 main KPIs**:
  - **Revenue**: Total sales + % change
  - **Orders**: Count + % change
  - **Customers**: Total users + % change
  - **Avg Rating**: Product ratings
  - **Returns**: Return rate + % change
  - **Low Stock**: Number of products
- **Color coding**:
  - Green arrow ↑ = increase (positive)
  - Red arrow ↓ = decrease (negative for revenue, positive for returns)
- **Time period**: Today, This week, This month, This year

#### **Sales Chart**
- **Interactive line chart**: Revenue over time
- **Period selector**: Today, Week, Month, Year, Custom
- **Metrics**: 
  - Daily/weekly/monthly sales
  - Tooltips on hover
  - Zoom functionality
- **Export**: Download as PNG/PDF

#### **Top Selling Products**
- **Ranked list**: Top 5 products
- **Metrics per product**:
  - Units sold
  - Revenue generated
  - Progress bar (relative to #1)
- **Link**: View full report

#### **Recent Orders**
- **Table format**: Last 5 orders
- **Columns**:
  - Order ID (cliquable)
  - Customer name
  - Total amount
  - Status icon
- **Quick actions**: View, Process, Cancel
- **Link**: View all orders

#### **Low Stock Alerts**
- **Warning list**: Products below threshold
- **Icons**:
  - ⚠️ Low stock (< 10)
  - 🔴 Out of stock (= 0)
- **Action**: Manage Inventory
- **Count badge**: Number of alerts

#### **Pending Reviews**
- **Moderation queue**: Reviews awaiting approval
- **Preview**:
  - Rating stars
  - Product name
  - Reviewer name
  - Comment excerpt
  - Time ago
- **Actions**: Approve/Reject buttons
- **Link**: Moderate all reviews

---

## 10. Page Gestion Produits (Admin)

```
┌────────────────────────────────────────────────────────────────────────┐
│  ┌─────┐  ADMIN PANEL > PRODUCTS                  🔔 (3)  [👤 Admin]  │
│  │LOGO │                                                                │
│  └─────┘                                                                │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ PRODUCTS MANAGEMENT                      [+ Add New Product]    │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  Search: [Search products...] 🔍  Category: [All ▼]  [Export]  │  │
│  │                                                                  │  │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │
│  │                                                                  │  │
│  │  ┌──────────────────────────────────────────────────────────┐  │  │
│  │  │ IMAGE   │ PRODUCT         │ STOCK │ PRICE   │ STATUS │ │  │  │
│  │  ├──────────────────────────────────────────────────────────┤  │  │
│  │  │         │                 │       │         │        │ │  │  │
│  │  │ [IMG]   │ Dell XPS 15     │ 12    │ $1,299  │ ✅ On  │ │  │  │
│  │  │         │ SKU: DELL-XPS15 │ ⚠️    │         │        │✏️│  │  │
│  │  │         │ Electronics     │       │         │        │🗑️│  │  │
│  │  │         │                 │       │         │        │ │  │  │
│  │  ├──────────────────────────────────────────────────────────┤  │  │
│  │  │         │                 │       │         │        │ │  │  │
│  │  │ [IMG]   │ iPhone 15 Pro   │ 45    │ $999    │ ✅ On  │ │  │  │
│  │  │         │ SKU: APPL-IP15P │ ✅    │         │        │✏️│  │  │
│  │  │         │ Electronics     │       │         │        │🗑️│  │  │
│  │  │         │                 │       │         │        │ │  │  │
│  │  ├──────────────────────────────────────────────────────────┤  │  │
│  │  │         │                 │       │         │        │ │  │  │
│  │  │ [IMG]   │ Sony WH-1000XM5 │ 0     │ $348    │ ❌ Off │ │  │  │
│  │  │         │ SKU: SONY-WH1K5 │ 🔴    │         │        │✏️│  │  │
│  │  │         │ Electronics     │       │         │        │🗑️│  │  │
│  │  │         │                 │       │         │        │ │  │  │
│  │  ├──────────────────────────────────────────────────────────┤  │  │
│  │  │         │                 │       │         │        │ │  │  │
│  │  │ [IMG]   │ MacBook Pro 16" │ 23    │ $3,499  │ ✅ On  │ │  │  │
│  │  │         │ SKU: APPL-MBP16 │ ✅    │         │        │✏️│  │  │
│  │  │         │ Electronics     │       │         │        │🗑️│  │  │
│  │  │         │                 │       │         │        │ │  │  │
│  │  └──────────────────────────────────────────────────────────┘  │  │
│  │                                                                  │  │
│  │  Showing 1-10 of 156 products                                   │  │
│  │  [←] 1 [2] 3 4 5 ... 16 [→]                                     │  │
│  │                                                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ BULK ACTIONS                                                     │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  ☑ Select All (10)    [Delete Selected]  [Export Selected]     │  │
│  │                       [Update Stock]  [Change Status]           │  │
│  │                                                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


MODAL: ADD/EDIT PRODUCT

┌────────────────────────────────────────────────────────────────────────┐
│  ADD NEW PRODUCT                                              [✕]      │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────────┐  ┌────────────────────────────────────────┐ │
│  │ PRODUCT IMAGES       │  │ PRODUCT INFORMATION                    │ │
│  ├──────────────────────┤  ├────────────────────────────────────────┤ │
│  │                      │  │                                        │ │
│  │  ┌────────────────┐  │  │  Product Name: *                       │ │
│  │  │                │  │  │  [Dell XPS 15 Laptop              ]   │ │
│  │  │  [MAIN IMAGE]  │  │  │                                        │ │
│  │  │  1920x1080px   │  │  │  SKU: *                                │ │
│  │  │                │  │  │  [DELL-XPS15                      ]   │ │
│  │  └────────────────┘  │  │                                        │ │
│  │                      │  │  Category: *                           │ │
│  │  [Upload Main Image] │  │  [Electronics                     ▼]  │ │
│  │                      │  │                                        │ │
│  │  Additional Images:  │  │  Brand:                                │ │
│  │  ┌───┐ ┌───┐ ┌───┐  │  │  [Dell                            ]   │ │
│  │  │[+]│ │[+]│ │[+]│  │  │                                        │ │
│  │  └───┘ └───┘ └───┘  │  │  Description: *                        │ │
│  │                      │  │  ┌──────────────────────────────────┐ │ │
│  │  Max 8 images        │  │  │ [Rich text editor]               │ │ │
│  │  JPG, PNG, WebP      │  │  │ Powerful laptop for work and     │ │ │
│  │  Max 5MB each        │  │  │ gaming...                        │ │ │
│  │                      │  │  │                                  │ │ │
│  │                      │  │  └──────────────────────────────────┘ │ │
│  └──────────────────────┘  │                                        │ │
│                            │  Specifications:                       │ │
│                            │  [+ Add Specification]                 │ │
│                            │  • Processor: Intel Core i7-13700H    │ │
│                            │  • RAM: 16GB DDR5                     │ │
│                            │  • Storage: 512GB SSD                 │ │
│                            │                                        │ │
│                            └────────────────────────────────────────┘ │
│                                                                         │
│  ┌──────────────────────┐  ┌────────────────────────────────────────┐ │
│  │ PRICING & INVENTORY  │  │ VARIANTS (Optional)                    │ │
│  ├──────────────────────┤  ├────────────────────────────────────────┤ │
│  │                      │  │                                        │ │
│  │  Price: *            │  │  [+ Add Variant]                       │ │
│  │  $[1299.99       ]   │  │                                        │ │
│  │                      │  │  Color: Space Gray                     │ │
│  │  Compare at Price:   │  │  [✕] [Edit]                            │ │
│  │  $[1499.99       ]   │  │                                        │ │
│  │                      │  │  Storage: 512GB     +$0                │ │
│  │  Cost per item:      │  │  [✕] [Edit]                            │ │
│  │  $[899.00        ]   │  │                                        │ │
│  │  Margin: 44.5%       │  │  Storage: 1TB       +$200              │ │
│  │                      │  │  [✕] [Edit]                            │ │
│  │  ━━━━━━━━━━━━━━━━━━ │  │                                        │ │
│  │                      │  └────────────────────────────────────────┘ │
│  │  Stock Quantity: *   │                                             │
│  │  [12             ]   │                                             │
│  │                      │                                             │
│  │  Low stock alert at: │                                             │
│  │  [10             ]   │                                             │
│  │                      │                                             │
│  │  ☑ Track inventory   │                                             │
│  │  ☑ Allow backorders  │                                             │
│  │                      │                                             │
│  └──────────────────────┘                                             │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ SEO & METADATA                                                   │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  Page Title:                                                     │  │
│  │  [Dell XPS 15 Laptop - High Performance Computing            ]  │  │
│  │                                                                  │  │
│  │  Meta Description:                                               │  │
│  │  [Shop the Dell XPS 15 laptop with Intel i7, 16GB RAM...    ]  │  │
│  │  42/160 characters                                               │  │
│  │                                                                  │  │
│  │  URL Handle:                                                     │  │
│  │  /products/[dell-xps-15-laptop                               ]  │  │
│  │                                                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ ORGANIZATION                                                     │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  Product Status:  ● Active  ○ Draft  ○ Archived                 │  │
│  │                                                                  │  │
│  │  Tags: [laptop, dell, xps, high-performance               ]     │  │
│  │                                                                  │  │
│  │  Collections:                                                    │  │
│  │  [✓] Featured Products                                           │  │
│  │  [✓] New Arrivals                                                │  │
│  │  [ ] Best Sellers                                                │  │
│  │                                                                  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  [Cancel]                                      [Save as Draft] [Publish]│
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

### 📝 Description des Éléments

#### **Products List Table**
- **Search**: Real-time filtering par nom, SKU, catégorie
- **Filters**: Category dropdown, Status filter
- **Table Columns**:
  - **Image**: Thumbnail (100x100px)
  - **Product**: Name, SKU, Category
  - **Stock**: 
    - Quantity number
    - Icon: ✅ In stock, ⚠️ Low stock, 🔴 Out of stock
  - **Price**: Formatted currency
  - **Status**: Toggle Active/Inactive
  - **Actions**: Edit (✏️), Delete (🗑️)
- **Sorting**: Click headers to sort
- **Pagination**: Page numbers + prev/next

#### **Bulk Actions**
- **Select All**: Checkbox to select all visible
- **Actions**:
  - Delete Selected (with confirmation)
  - Export Selected (CSV)
  - Update Stock (bulk quantity update)
  - Change Status (bulk activate/deactivate)

#### **Add/Edit Product Modal**

**Section 1: Product Images**
- **Main Image**:
  - Required
  - Preview display
  - Drag & drop upload
  - Connects to Cloudinary
  - Auto-optimization
- **Additional Images**: 
  - Up to 8 images
  - Thumbnails in gallery
  - Reorder by drag & drop
- **Validation**:
  - Format: JPG, PNG, WebP
  - Size: Max 5MB per image
  - Resolution: Min 800x800px recommended

**Section 2: Product Information**
- **Product Name**: Required, max 255 chars
- **SKU**: Required, unique, auto-suggest
- **Category**: Dropdown with hierarchical categories
- **Brand**: Text input with autocomplete
- **Description**: 
  - Rich text editor (bold, italic, lists, links)
  - Character counter
  - Preview mode
- **Specifications**:
  - Key-value pairs
  - Add/remove rows
  - Example: "Processor: Intel Core i7"

**Section 3: Pricing & Inventory**
- **Price**: Required, decimal input
- **Compare at Price**: Original price (for sales)
- **Cost per Item**: Your cost (for margin calculation)
- **Margin**: Auto-calculated percentage
- **Stock Quantity**: Integer input
- **Low Stock Alert**: Threshold for notifications
- **Checkboxes**:
  - Track inventory (enable/disable stock management)
  - Allow backorders (sell when out of stock)

**Section 4: Variants**
- **Add Variant**: Button to create options
- **Variant Types**:
  - Color (with color picker)
  - Size (text input)
  - Storage/Memory (with price modifier)
- **Variant Management**:
  - Each variant can have:
    - Own price
    - Own SKU
    - Own stock
    - Own image
- **Example**: 
  - Space Gray, 512GB → +$0
  - Space Gray, 1TB → +$200

**Section 5: SEO & Metadata**
- **Page Title**: For search engines, 60 chars max
- **Meta Description**: 160 chars max, with counter
- **URL Handle**: Auto-generated slug, editable
- **Preview**: How it appears in search results

**Section 6: Organization**
- **Product Status**:
  - Active (visible to customers)
  - Draft (hidden, work in progress)
  - Archived (hidden, keep for records)
- **Tags**: Comma-separated, for search/filtering
- **Collections**: Assign to featured groups
  - Featured Products
  - New Arrivals
  - Best Sellers
  - etc.

**Action Buttons**
- **Cancel**: Close without saving
- **Save as Draft**: Save but keep hidden
- **Publish**: Save and make active

---

## 11. Page Gestion Commandes (Admin)

```
┌────────────────────────────────────────────────────────────────────────┐
│  ┌─────┐  ADMIN PANEL > ORDERS                    🔔 (3)  [👤 Admin]  │
│  │LOGO │                                                                │
│  └─────┘                                                                │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ ORDERS MANAGEMENT                                                │  │
│  ├─────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  Search: [Order #, Customer name...] 🔍                          │  │
│  │                                                                  │  │
│  │  Status: [All ▼]  Date: [Last 30 days ▼]  [Export to CSV]      │  │
│  │                                                                  │  │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │  │
│  │                                                                  │  │
│  │  ┌──────────────────────────────────────────────────────────┐  │  │
│  │  │ ORDER # │ CUSTOMER  │ DATE    │ TOTAL   │ STATUS   │ │  │  │
│  │  ├──────────────────────────────────────────────────────────┤  │  │
│  │  │         │           │         │         │          │ │  │  │
│  │  │ #1234   │ John D.   │ Dec 10  │ $2,752  │ ✅       │📄│  │  │
│  │  │         │ john@...  │ 10:30am │         │ Delivered│✏️│  │  │
│  │  │         │           │         │         │          │ │  │  │
│  │  ├──────────────────────────────────────────────────────────┤  │  │
│  │  │         │           │         │         │          │ │  │  │
│  │  │ #1233   │ Sarah M.  │ Dec 8   │ $712    │ 🚚       │📄│  │  │
│  │  │         │ sarah@... │ 2:15pm  │         │ In Transit│