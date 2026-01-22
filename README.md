📘 Full-Stack Blog Application (CRUD + Auth)

A full-stack blog application that allows authenticated users to create, read, update, and delete blog posts. The application implements JWT-based authentication, owner-based authorization, pagination, and search

Features
🔐 Authentication

User registration and login

Secure password hashing using bcrypt

JWT-based authentication

Protected routes for write operations

📝 Blog Posts (CRUD)

Create blog posts (auth required)

Read all posts with pagination & search

Read a single post by ID

Update post (only by post owner)

Delete post (only by post owner)

🔎 Search & Pagination

🧰 Tech Stack
Backend

Node.js

Express.js

MongoDB + Mongoose

JWT (jsonwebtoken)

bcryptjs

Tools

Postman (API testing)

dotenv (environment variables)

🔐 Auth APIs
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
Search posts by title or username

Paginated response for better performance
