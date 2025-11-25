# AlienSoft Product Management Application

A modern, responsive product management application built with Vue 3 for the AlienSoft Technologies internship assessment. This application provides full CRUD operations for products with authentication and centralized state management.

##  Project Overview

This project demonstrates a complete product management system built with Vue 3, featuring:

- **User authentication** with token-based login
- **Product CRUD operations** (Create, Read, Update, Delete)
- **Responsive UI** using the primary color #000080
- **Centralized state** with Pinia
- **Clean and intuitive UI/UX**

##  Features

### Core Functionality

- **User Authentication** – Token-based login with session persistence
- **Product Management** – Complete CRUD operations for products
- **Search & Filter** – Real-time search and category-based filtering
- **State Management** – Centralized global state with Pinia
- **Responsive Design** – Mobile-first layout optimized for all devices

### Pages Implemented

- `/login` – User login page
- `/products` – Product listing with search and filters
- `/products/:id` – Product details view
- `/products/new` – Add new product
- `/products/:id/edit` – Edit existing product

## 🛠 Technology Stack

- **Vue 3** (Composition API)
- **Vue Router** – Client-side routing
- **Pinia** – State management
- **Tailwind CSS** – Utility-first styling
- **Axios** – HTTP client
- **Heroicons Vue** – Icon library
- **DummyJSON API** – Backend API

##  Project Structure
```
aliensoft-product-app/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── main.css
│   ├── components/
│   │   ├── Sidebar.vue
│   │   └── AppHeader.vue
│   ├── router/
│   │   └── index.js
│   ├── stores/
│   │   ├── auth.js
│   │   └── products.js
│   ├── views/
│   │   ├── Login.vue
│   │   ├── Products.vue
│   │   ├── ViewProduct.vue
│   │   └── AddProduct.vue
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

##  Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
   git clone <repository-url>
   cd aliensoft-product-app
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Start development server:**
```bash
   npm run dev
```

4. **Build for production:**
```bash
   npm run build
```

5. **Preview production build:**
```bash
   npm run preview
```

##  Environment Configuration

No environment variables are required. The project uses public DummyJSON API endpoints.

##  API Endpoints Used

### Authentication
- `POST https://dummyjson.com/auth/login`

### Products
- `GET https://dummyjson.com/products` – Get all products
- `GET https://dummyjson.com/products/:id` – Get single product
- `POST https://dummyjson.com/products/add` – Add new product
- `PUT https://dummyjson.com/products/:id` – Update product
- `DELETE https://dummyjson.com/products/:id` – Delete product

##  Test Credentials

Use these credentials when logging in:

- **Username:** `emilys`
- **Password:** `emilyspass`

##  Design System

- **Primary Color:** #000080 (Navy Blue)
- **Font:** Inter
- **Icons:** Heroicons
- **Styling:** Tailwind CSS utility classes

##  Key Components

### Stores (Pinia)

- **Auth Store** – Manages authentication state and token
- **Products Store** – Handles product state and API operations

### Views

- **Login Page** – User authentication
- **Product List** – Browse and search products
- **Product Details** – View detailed product information
- **Add/Edit Product** – Create and update products

##  Route Protection

- Redirects unauthenticated users to `/login`
- Authenticated users accessing `/login` are redirected to `/products`
- Authentication token persists via localStorage

##  Responsive Design

- Mobile-first layout approach
- Tailwind breakpoints: `sm`, `md`, `lg`, `xl`
- Fully optimized for mobile, tablet, and desktop devices

##  State Management

### Auth State
- User token
- User data
- Login status

### Products State
- Product list
- Selected product
- Loading states

### Persistence
- Authentication token stored in localStorage
- Automatic session restoration on page reload

## Feature Implementations

### Product Listing
- Real-time search functionality
- Category-based filters
- Color-coded category badges
- Stock level indicators
- Responsive grid layout

### Product Details
- Image gallery
- Customer reviews
- Stock availability display
- Quick edit/delete actions
- Breadcrumb navigation

### Authentication
- JWT token handling
- Protected routes
- Session persistence
- Automatic logout on token expiration

##  Error Handling

- API failure handling
- Network error management
- Form validation errors
- User-friendly error messages
- Loading states

##  Build Configuration

- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **PostCSS** for CSS processing

## Development Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

##  License

This project was created for the AlienSoft Technologies Frontend Developer Internship Assessment.

##  Author

**@odokclement**

Built for AlienSoft Technologies Frontend Developer Internship.

---

**Note:** This is a demonstration project using mock API endpoints from DummyJSON. All product data and operations are simulated.
