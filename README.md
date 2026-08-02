# Storepilot REST API

A robust RESTful API built with **Express** and **TypeScript**, managing Authentication, Categories, and Products for the Storepilot platform. It uses **Prisma** as the ORM, **Zod** for data validation, and features full **Swagger/OpenAPI** documentation.

## Features

- **Authentication**: JWT-based login, registration, logout, and token refreshing.
- **Store Module**: Manage Product Categories and Products.
- **Security**: Almost all endpoints are protected by Bearer Token Authentication middleware (except login and register).
- **Validation**: Strict request validation using Zod schemas.
- **API Documentation**: Interactive Swagger UI auto-generated from JSDoc comments.

## Tech Stack

- **Node.js** & **Express**
- **TypeScript**
- **Prisma** (ORM)
- **Zod** (Validation)
- **JSON Web Tokens (JWT)** (Authentication)
- **Swagger / OpenAPI** (Documentation via `swagger-jsdoc`)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A running Database instance (configured for Prisma, e.g., PostgreSQL/MySQL)

### Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables. Create a `.env` file in the root directory (you can use a `.env.example` if available) and configure your database connection string and JWT secrets:
   ```env
   DATABASE_URL="your_database_url_here"
   PORT=3000
   # Add other required variables (JWT secret, etc.)
   ```

3. Run Prisma migrations to set up your database schema:
   ```bash
   npx prisma migrate dev
   ```

### Running the Server

Start the development server (uses `tsx` for hot-reloading):
```bash
npm run dev
```

Build the project for production:
```bash
npm run build
```

Start the production server:
```bash
npm run start
```

## API Documentation

Once the server is running, you can explore the interactive API documentation and test endpoints directly from your browser.

Navigate to:
👉 **[http://localhost:3000/docs](http://localhost:3000/docs)**

*(Note: Adjust the port if your server is configured to run on a port other than 3000).*

The raw OpenAPI JSON specification is also available at:
`http://localhost:3000/docs/openapi.json`

## API Endpoints Overview

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Authenticate a user and receive an access token
- `POST /auth/refresh` - Refresh an expired access token (Protected)
- `POST /auth/logout` - Invalidate the current session (Protected)

### Categories (Protected)
- `GET /store/categories` - Fetch all categories (paginated)
- `POST /store/categories` - Create a new category
- `GET /store/categories/:id` - Fetch a category by ID
- `PATCH /store/categories/:id` - Update a category
- `DELETE /store/categories/:id` - Delete a category

### Products (Protected)
- `GET /store/products` - Fetch all products (paginated)
- `POST /store/products` - Create a new product
- `GET /store/products/:id` - Fetch a product by ID
- `GET /store/categories/:id/products` - Fetch products by category ID (paginated)
- `PATCH /store/products/:id` - Update a product
- `DELETE /store/products/:id` - Delete a product
