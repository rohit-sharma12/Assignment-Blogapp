<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
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
>>>>>>> b19b1af8bc70f64cb28eda7a7f10b363bdc1997a
