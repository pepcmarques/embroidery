# Embroidery E-commerce Store

A complete e-commerce platform built with modern technologies and following SOLID principles. This monorepo features a professional embroidery store with comprehensive product management, frontend-only shopping cart, authentication, and order processing.

## 🌟 Features

### 🛒 E-commerce Functionality

- **Product Catalog**: Browse products with search, filtering, and pagination
- **Shopping Cart**: Frontend-only cart with localStorage persistence (works for guests)
- **User Authentication**: Register, login, and user profile management with JWT tokens
- **Order Management**: Complete checkout process with order tracking
- **Admin Panel**: Product and order management for administrators
- **Stock Management**: Real-time inventory tracking and validation

### 🎨 User Experience

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Guest Shopping**: Shop without registration, cart persists across browser sessions
- **Theme Toggle**: Light/dark mode support with smooth transitions
- **Real-time Updates**: Dynamic cart count and stock validation
- **Professional UI**: Clean, modern interface with consistent embroidery-themed design system

### 🔧 Technical Features

- **Type Safety**: Full TypeScript implementation with shared types
- **SOLID Principles**: Clean architecture with dependency injection
- **Monorepo Structure**: Efficient workspace management with Turborepo
- **API Documentation**: Complete REST API with validation and error handling
- **Database Relations**: Proper relational design with Prisma ORM
- **Frontend Cart Storage**: localStorage-based cart with no database dependencies

## 🏗️ Project Architecture

```
embroidery/
├── apps/
│   ├── frontend/              # NextJS E-commerce Frontend
│   │   ├── src/
│   │   │   ├── components/    # React components
│   │   │   │   ├── auth/      # Authentication components
│   │   │   │   ├── Header.tsx # Main navigation with cart
│   │   │   │   ├── CartDrawer.tsx # Shopping cart sidebar
│   │   │   │   ├── ProductCard.tsx # Product display
│   │   │   │   └── ProductGrid.tsx
│   │   │   ├── contexts/      # React contexts
│   │   │   │   ├── AuthContext.tsx # User authentication
│   │   │   │   ├── CartContext.tsx # Frontend cart storage
│   │   │   │   └── ThemeContext.tsx # Light/dark mode
│   │   │   └── app/           # Next.js app directory
│   │   └── package.json
│   └── backend/               # NestJS API Backend
│       ├── src/
│       │   ├── auth/          # JWT authentication
│       │   ├── users/         # User management
│       │   ├── categories/    # Product categories
│       │   ├── products/      # Product CRUD
│       │   ├── orders/        # Order processing
│       │   ├── prisma/        # Database service
│       │   └── seed.ts        # Sample data
│       ├── prisma/
│       │   └── schema.prisma  # Database schema
│       └── package.json
├── packages/
│   ├── ui/                    # Shared UI Components
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ThemeToggle.tsx # Light/dark mode toggle
│   │   │   └── types.ts
│   │   └── package.json
│   └── types/                 # Shared TypeScript Types
│       ├── src/
│       │   ├── product.types.ts
│       │   └── index.ts
│       └── package.json
├── package.json               # Root workspace config
├── turbo.json                 # Build pipeline config
└── README.md
```

## 💻 Tech Stack

### Frontend

- **NextJS 15.5.4**: React framework with App Router
- **React 19**: Latest React with modern features
- **TailwindCSS 4**: Utility-first CSS with custom embroidery theme
- **TypeScript 5.9**: Type safety and developer experience
- **localStorage**: Frontend cart persistence (no backend cart storage)

### Backend

- **NestJS 10**: Enterprise-grade Node.js framework
- **Prisma 5.8**: Modern database toolkit and ORM
- **PostgreSQL**: Reliable relational database
- **JWT**: Secure authentication tokens
- **bcryptjs**: Password hashing

### Development

- **Turborepo 2.5**: Efficient monorepo build system
- **ESLint**: Code linting and formatting
- **TypeScript**: Full type safety across the stack

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm or yarn
- PostgreSQL database (local or hosted)

### Installation

1. **Clone and install dependencies:**

```bash
git clone <repository-url>
cd embroidery
npm install
```

2. **Set up the database:**

```bash
# Copy environment file
cp apps/backend/.env.example apps/backend/.env

# Edit apps/backend/.env with your database credentials:
DATABASE_URL="postgresql://user:password@localhost:5432/embroidery"
DIRECT_URL="postgresql://user:password@localhost:5432/embroidery"
JWT_SECRET="your-jwt-secret-key"
```

3. **Initialize the database:**

```bash
# Generate Prisma client and run migrations
cd apps/backend
npx prisma migrate dev --name init

# Seed the database with sample data
npm run seed
```

4. **Start the development servers:**

```bash
# In the root directory, start both frontend and backend
npm run dev

# Or start them individually:
# Backend (port 3001): npm run dev --workspace=apps/backend
# Frontend (port 3002): npm run dev --workspace=apps/frontend
```

The application will be available at:

- Frontend: http://localhost:3002
- Backend API: http://localhost:3001

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint         | Description       | Auth Required |
| ------ | ---------------- | ----------------- | ------------- |
| POST   | `/auth/register` | Register new user | ❌            |
| POST   | `/auth/login`    | User login        | ❌            |
| GET    | `/auth/profile`  | Get current user  | ✅            |

### Product Endpoints

| Method | Endpoint        | Description                         | Auth Required |
| ------ | --------------- | ----------------------------------- | ------------- |
| GET    | `/products`     | Get all products with search/filter | ❌            |
| GET    | `/products/:id` | Get product by ID                   | ❌            |
| POST   | `/products`     | Create new product                  | ✅ (Admin)    |
| PUT    | `/products/:id` | Update product                      | ✅ (Admin)    |
| DELETE | `/products/:id` | Delete product                      | ✅ (Admin)    |

### Category Endpoints

| Method | Endpoint          | Description         | Auth Required |
| ------ | ----------------- | ------------------- | ------------- |
| GET    | `/categories`     | Get all categories  | ❌            |
| POST   | `/categories`     | Create new category | ✅ (Admin)    |
| PUT    | `/categories/:id` | Update category     | ✅ (Admin)    |
| DELETE | `/categories/:id` | Delete category     | ✅ (Admin)    |

### Order Endpoints

| Method | Endpoint      | Description                     | Auth Required |
| ------ | ------------- | ------------------------------- | ------------- |
| GET    | `/orders`     | Get user's orders               | ✅            |
| POST   | `/orders`     | Create order from frontend cart | ✅            |
| GET    | `/orders/:id` | Get order details               | ✅            |

> **Note**: Cart functionality is now frontend-only using localStorage. Orders are created by sending cart data directly to the `/orders` endpoint during checkout.

## 🗄️ Database Schema

### Core Models

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  is_admin  Boolean  @default(false)
  orders    Order[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Category {
  id          String    @id @default(cuid())
  name        String    @unique
  description String?
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Product {
  id          String      @id @default(cuid())
  name        String
  description String?
  price       Decimal     @db.Decimal(10, 2)
  imageUrl    String?
  stock       Int         @default(0)
  isActive    Boolean     @default(true)
  category    Category    @relation(fields: [categoryId], references: [id])
  categoryId  String
  orderItems  OrderItem[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model Order {
  id          String      @id @default(cuid())
  orderNumber String      @unique @default(cuid())
  userId      String
  user        User        @relation(fields: [userId], references: [id])
  status      OrderStatus @default(PENDING)
  totalAmount Decimal     @db.Decimal(10, 2)
  items       OrderItem[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model OrderItem {
  id        String   @id @default(cuid())
  orderId   String
  order     Order    @relation(fields: [orderId], references: [id])
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  quantity  Int
  price     Decimal  @db.Decimal(10, 2) // Price at time of order
  createdAt DateTime @default(now())
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}
```

> **Architecture Note**: Cart and CartItem models have been removed. Shopping cart functionality is now handled entirely in the frontend using localStorage, with orders created directly from frontend cart data during checkout.

## 🎨 Design System

### Embroidery Color Theme

The application uses a professional embroidery-themed color palette:

**Light Mode:**

- **Primary**: `#ca8a04` (warm gold) → `#a16207` (hover)
- **Secondary**: `#475569` (slate) → `#334155` (hover)
- **Accent**: `#f1f5f9` (light blue-gray) → `#e2e8f0` (hover)
- **Background**: `#f8fafc` (very light blue-gray)
- **Surface**: `#ffffff` (pure white)
- **Text**: `#1e293b` (dark slate)

**Dark Mode:**

- **Primary**: `#fbbf24` (bright gold) → `#fde047` (hover)
- **Secondary**: `#cbd5e1` (light slate) → `#f1f5f9` (hover)
- **Accent**: `#1e293b` (dark slate) → `#334155` (hover)
- **Background**: `#0f172a` (very dark blue)
- **Surface**: `#1e293b` (dark slate)
- **Text**: `#f1f5f9` (light blue-gray)

### Theme Features

- **Automatic Theme Toggle**: Light/dark mode switcher in header
- **System Preference Support**: Respects user's OS theme preference
- **Smooth Transitions**: CSS transitions between theme changes
- **Consistent Colors**: All components use embroidery color variables

### Components

All UI components are built with:

- Consistent spacing and typography
- Responsive design patterns
- Accessibility considerations
- Dark/light mode support

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start all apps in development mode
npm run build            # Build all apps for production
npm run start            # Start production servers

# Database
npm run db:push          # Push schema changes to database
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed database with sample data

# Code Quality
npm run lint             # Lint all packages
npm run type-check       # Type check all packages
```

### Environment Variables

#### Backend (.env)

```env
DATABASE_URL="postgresql://user:password@host:port/database"
DIRECT_URL="postgresql://user:password@host:port/database"
JWT_SECRET="your-secret-key"
PORT=3001
```

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

## 🛍️ Sample Data

The application comes with pre-seeded data including:

### Categories

- **Cross Stitch** - Traditional counted thread embroidery
- **Crewel Work** - Wool embroidery with decorative stitches
- **Goldwork** - Luxurious metallic thread embroidery
- **Surface Embroidery** - Decorative stitching on fabric surface

### Products

12 carefully curated embroidery products across all categories, including:

- Kits for beginners and advanced crafters
- Tools and accessories
- Premium materials and threads
- Complete project sets with patterns

### Users

- **Admin User**: Full management access
- **Test Users**: For development and testing

## 🚀 Deployment

### Backend Deployment

1. Set up PostgreSQL database (recommend Supabase/Railway/Neon)
2. Configure environment variables
3. Run migrations: `npx prisma migrate deploy`
4. Deploy to platform of choice (Vercel, Railway, Heroku)

### Frontend Deployment

1. Build the application: `npm run build`
2. Configure API URL environment variable
3. Deploy to Vercel/Netlify/similar platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the project structure
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

Having issues? Check out:

- Database connection problems: Verify DATABASE_URL in .env
- CORS issues: Check NEXT_PUBLIC_API_URL configuration
- Port conflicts: Modify ports in package.json scripts
- Build errors: Clear node_modules and reinstall dependencies

For additional help, please open an issue in the repository.

# DATABASE_URL="postgresql://username:password@localhost:5432/embroidery_db?schema=public"

````

3. Generate Prisma client and push database schema:

```bash
cd apps/backend
npm run db:generate
npm run db:push
````

### Development

Start all apps in development mode:

```bash
npm run dev
```

This will start:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### Individual App Commands

**Frontend (NextJS)**:

```bash
cd apps/frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

**Backend (NestJS)**:

```bash
cd apps/backend
npm run dev      # Start development server
npm run build    # Build for production
npm run start:prod # Start production server
```

### Database Commands

```bash
cd apps/backend
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Prisma Studio
```

## API Documentation

The backend provides RESTful APIs with the following endpoints:

### Health Check Endpoints

| Method | Endpoint  | Description            | Response                                                            |
| ------ | --------- | ---------------------- | ------------------------------------------------------------------- |
| GET    | `/ping`   | Simple health check    | `"pong"`                                                            |
| GET    | `/health` | Detailed health status | `{ "status": "ok", "message": "Backend is running successfully!" }` |

### User Management (CRUD)

Base URL: `http://localhost:3001`

#### User Model

```typescript
interface User {
  id: string; // Auto-generated CUID
  email: string; // Unique email address
  name?: string; // Optional display name
  password: string; // Bcrypt hashed password (excluded from responses)
  is_admin: boolean; // Always false for user-created accounts
  createdAt: Date; // Auto-generated creation timestamp
  updatedAt: Date; // Auto-updated modification timestamp
}
```

#### Endpoints

| Method     | Endpoint     | Description     | Request Body    | Response                   |
| ---------- | ------------ | --------------- | --------------- | -------------------------- |
| **POST**   | `/users`     | Create new user | `CreateUserDto` | User (without password)    |
| **GET**    | `/users`     | Get all users   | -               | User[] (without passwords) |
| **GET**    | `/users/:id` | Get user by ID  | -               | User (without password)    |
| **PATCH**  | `/users/:id` | Update user     | `UpdateUserDto` | User (without password)    |
| **DELETE** | `/users/:id` | Delete user     | -               | `204 No Content`           |

#### Request/Response Examples

**Create User (POST /users)**

```json
// Request
{
  "email": "john.doe@example.com",
  "name": "John Doe",           // Optional
  "password": "securepass123"   // Min 6 characters
}

// Response (201 Created)
{
  "id": "clxxx12345",
  "email": "john.doe@example.com",
  "name": "John Doe",
  "is_admin": false,
  "createdAt": "2025-09-27T18:00:00Z",
  "updatedAt": "2025-09-27T18:00:00Z"
}
```

**Update User (PATCH /users/:id)**

```json
// Request (all fields optional)
{
  "email": "newemail@example.com",
  "name": "Updated Name",
  "password": "newpassword123"
}

// Response (200 OK)
{
  "id": "clxxx12345",
  "email": "newemail@example.com",
  "name": "Updated Name",
  "is_admin": false,
  "createdAt": "2025-09-27T18:00:00Z",
  "updatedAt": "2025-09-27T18:15:00Z"
}
```

#### Validation Rules

- **Email**: Must be valid email format and unique
- **Password**: Minimum 6 characters (automatically hashed with bcryptjs)
- **Name**: Optional string field
- **is_admin**: Always `false` - cannot be set or modified by users

#### Error Responses

**400 Bad Request** - Validation errors

```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "Bad Request"
}
```

**404 Not Found** - User not found

```json
{
  "statusCode": 404,
  "message": "User with ID clxxx12345 not found",
  "error": "Not Found"
}
```

**409 Conflict** - Email already exists

```json
{
  "statusCode": 409,
  "message": "User with this email already exists",
  "error": "Conflict"
}
```

### Authentication System

The API uses JWT (JSON Web Token) for authentication with role-based access control.

#### Authentication Endpoints

| Method   | Endpoint      | Description | Request Body | Response              |
| -------- | ------------- | ----------- | ------------ | --------------------- |
| **POST** | `/auth/login` | User login  | `LoginDto`   | JWT token + user info |

#### Login Request/Response

**Login (POST /auth/login)**

```json
// Request
{
  "email": "user@example.com",
  "password": "userpassword123"
}

// Response (200 OK)
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clxxx12345",
    "email": "user@example.com",
    "name": "User Name",
    "is_admin": false
  }
}
```

**Login Error (401 Unauthorized)**

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

#### Protected Endpoints

Authentication is required for most user operations. Include the JWT token in the Authorization header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Endpoint Protection Levels

| Endpoint            | Auth Required | Admin Only | Description                           |
| ------------------- | ------------- | ---------- | ------------------------------------- |
| `POST /users`       | ❌            | ❌         | Public user registration              |
| `POST /auth/login`  | ❌            | ❌         | Public login endpoint                 |
| `GET /users`        | ✅            | ✅         | List all users (admin only)           |
| `GET /users/:id`    | ✅            | ❌         | Get user profile (logged in users)    |
| `PATCH /users/:id`  | ✅            | ❌         | Update user profile (logged in users) |
| `DELETE /users/:id` | ✅            | ✅         | Delete user (admin only)              |

#### Authentication Flow

1. **Register**: Create account via `POST /users` (public)
2. **Login**: Get JWT token via `POST /auth/login`
3. **Authenticate**: Include token in `Authorization: Bearer {token}` header
4. **Access**: Use protected endpoints based on user role

#### JWT Token Details

- **Algorithm**: HS256
- **Expiration**: 24 hours
- **Payload**: Contains user ID, email, and admin status
- **Secret**: Configured via `JWT_SECRET` environment variable

#### Role-Based Access Control

- **Regular Users** (`is_admin: false`):
  - Can view and update their own profile
  - Cannot access admin-only endpoints

- **Admin Users** (`is_admin: true`):
  - Full access to all endpoints
  - Can view all users and delete accounts
  - Admin status cannot be set via API (database-level control)

### Security Features

- **JWT Authentication**: Secure token-based authentication with HS256 algorithm
- **Role-Based Access Control**: Separate permissions for regular users and admins
- **Token Expiration**: JWT tokens expire after 24 hours for security
- **Password Hashing**: All passwords are hashed using bcryptjs with salt rounds of 10
- **Admin Protection**: `is_admin` field is always `false` for user-created accounts and cannot be modified via API
- **Input Validation**: All inputs are validated using class-validator decorators
- **Password Exclusion**: Passwords are never returned in API responses
- **Email Uniqueness**: Duplicate email addresses are prevented
- **Authorization Guards**: JwtAuthGuard for authentication, AdminGuard for admin-only endpoints
- **Frontend Cart Security**: Cart data stored locally, no sensitive information exposed through APIs

### Architecture Decisions

#### Frontend-Only Cart Storage

- **Why**: Simplified architecture, better performance, reduced database load
- **Implementation**: localStorage with automatic serialization/deserialization
- **Benefits**: Works offline, instant cart updates, no API calls for cart operations
- **Trade-offs**: Cart doesn't sync across devices (intentional for privacy)

### Testing the API

HTTP test files are provided in `apps/backend/http/`:

- **`api.http`** - Basic endpoint tests including users and authentication
- **`users.http`** - Comprehensive User CRUD operations with validation tests
- **`auth.http`** - Authentication endpoints and protected route tests
- **`complete-flow.http`** - Step-by-step authentication flow demonstration
- **`ping.http`** - Simple ping/pong health check

To use with VS Code:

1. Install the "REST Client" extension
2. Open any `.http` file
3. Click "Send Request" above any HTTP request
4. Or use `Cmd/Ctrl + Alt + R`

Example:

```http
@baseUrl = http://localhost:3001

### Create a new user
POST {{baseUrl}}/users
Content-Type: application/json

{
  "email": "test@example.com",
  "name": "Test User",
  "password": "testpassword123"
}
```

### Build

Build all apps for production:

```bash
npm run build
```

### Lint

Lint all apps:

```bash
npm run lint
```

### Clean

Clean all build artifacts:

```bash
npm run clean
```

## Package Scripts

The root `package.json` includes scripts that run across all apps using Turborepo:

- `npm run dev` - Start all apps in development mode
- `npm run build` - Build all apps
- `npm run lint` - Lint all apps
- `npm run test` - Run tests for all apps
- `npm run clean` - Clean all build artifacts

## Shared Packages

### @repo/ui

Shared UI components built with React and TailwindCSS. Used by the frontend app.

### @repo/types

Shared TypeScript types used across frontend and backend for type safety.

## Environment Variables

### Backend (.env)

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/embroidery_db?schema=public"
DIRECT_URL="postgresql://username:password@localhost:5432/embroidery_db"

# JWT Authentication
JWT_SECRET="your-super-secret-jwt-key-change-in-production-at-least-32-characters"

# Application Settings
NODE_ENV=development
PORT=3001
```

**Important Security Notes:**

- **JWT_SECRET**: Must be at least 32 characters long and kept secure in production
- **DATABASE_URL**: Use connection pooling URL for better performance
- **DIRECT_URL**: Required for Prisma migrations and schema operations

## Contributing

1. Install dependencies: `npm install`
2. Make your changes
3. Run tests: `npm run test`
4. Run linting: `npm run lint`
5. Build: `npm run build`

## License

This project is private and not licensed for public use.
