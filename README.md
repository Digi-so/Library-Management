# Library Management System API

## Project Overview

A Library Management System REST API built using NestJS, TypeScript, Prisma ORM, and PostgreSQL.

The system supports user authentication, role-based access control, genre management, and book management.

## Technologies Used

- Node.js
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- JWT Authentication
- bcrypt password hashing
- class-validator

## Features

### Authentication
- User registration
- User login
- Password hashing with bcrypt
- JWT-based authentication

### Authorization
- Two user roles: PATRON and LIBRARIAN
- Role-based access control
- Only librarians can create, update, and delete books.

### Genre Management
- Create genres
- Retrieve all genres
- Retrieve a genre by ID
- Update genres
- Delete genres

### Book Management
- Create books (librarian only)
- Retrieve all books
- Retrieve a book by ID
- Update books (librarian only)
- Delete books (librarian only)
- Filter books by genre
- Search books
- Paginate book results

## Database Design

The database contains four main models:

- User
- Genre
- Book
- Review

The Book model references Genre through a `genreId` foreign key instead of storing the genre name directly.

This design:

1. Avoids data duplication.
2. Maintains data consistency.
3. Ensures referential integrity.
4. Supports one-to-many relationships between genres and books.

Prisma defines the relationships between models, while PostgreSQL enforces the foreign-key constraints.

A relational database is suitable because genres are shared by multiple books.

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Digi-so/Library-Management.git
cd Library-Management/api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `api` directory.

Configure the following variables:

```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_private_jwt_secret"
```

Never commit your actual `.env` file or expose your database credentials.

### 4. Set up the database

Generate the Prisma client:

```bash
npx prisma generate
```

Apply database migrations:

```bash
npx prisma migrate deploy
```

For local development when creating new migrations, use:

```bash
npx prisma migrate dev
```

### 5. Seed the database

```bash
npx prisma db seed
```

The seed script creates sample genres and books.

### 6. Start the application

Development mode:

```bash
npm run start:dev
```

The API runs at:

`http://localhost:3000`

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a user |
| POST | `/auth/login` | Log in a user |

### Genres

| Method | Endpoint | Description |
|---|---|---|
| POST | `/genres` | Create a genre |
| GET | `/genres` | Retrieve all genres |
| GET | `/genres/:id` | Retrieve a genre |
| PATCH | `/genres/:id` | Update a genre |
| DELETE | `/genres/:id` | Delete a genre |

### Books

| Method | Endpoint | Description |
|---|---|---|
| POST | `/books` | Create a book (Librarian) |
| GET | `/books` | Retrieve books |
| GET | `/books/:id` | Retrieve a book |
| PATCH | `/books/:id` | Update a book (Librarian) |
| DELETE | `/books/:id` | Delete a book (Librarian) |

### Book Search, Filtering and Pagination

The GET `/books` endpoint supports:

| Query parameter | Description |
|---|---|
| `genreId` | Filter books by genre |
| `search` | Search books |
| `page` | Select the result page |
| `limit` | Set the number of results per page |

Example:

```http
GET /books?genreId=2&search=Adventure&page=1&limit=10
```

## Authentication and Authorization

Users register and log in using their email and password.

Passwords are hashed using bcrypt.

After successful login, the API returns a JWT access token.

Protected book-management requests require the following header:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

Only users with the LIBRARIAN role can create, update, or delete books.

Newly registered users receive the PATRON role by default.

## Validation and Error Handling

The application uses NestJS ValidationPipe and class-validator DTOs to validate incoming requests.

Validation includes:

- Required fields
- String validation
- Minimum string lengths
- Integer validation
- Numeric minimum values

Invalid requests return HTTP 400 Bad Request.

Unauthorized requests return HTTP 401 Unauthorized, while users without the required role receive HTTP 403 Forbidden.

## Postman Collection

A Postman collection is included at:

`docs/postman_collection.json`

Import this file into Postman to test authentication, genre endpoints, book endpoints, search, filtering, and pagination.

## Build

To compile the project:

```bash
npm run build
```

## Database Seeding

To populate the database with sample data:

```bash
npx prisma db seed
```

## License

This project was developed as a Library Management System assignment.