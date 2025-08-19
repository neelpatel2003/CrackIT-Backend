
---

# ✅ CrackIT Backend – README.md

# CrackIT - Backend

## Overview

CrackIT Backend provides the **RESTful APIs** required for user authentication, problem management, and submission handling.  
It is built with **Node.js**, **Express.js**, and **MongoDB**, ensuring scalability and security.

---

## Technologies Used

### Backend

- **Node.js + Express.js**: Backend framework for building REST APIs.
- **MongoDB + Mongoose**: NoSQL database for data storage and modeling.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **bcrypt.js**: For password hashing.
- **Nodemon**: For hot reloading during development.

### Tools

- **Postman**: For API testing.
- **MongoDB Compass**: For database management.

---

## Project Aim

The backend provides a robust API layer to support:

- User authentication and authorization.
- CRUD operations for coding problems.
- Storing and retrieving user submissions.
- Chatbot API integration.

---

## Key Features

- **Authentication APIs**: Register, login, logout.
- **Problem APIs**: Add, fetch, update, and delete problems.
- **Submission APIs**: Track and evaluate user submissions.
- **Secure Storage**: Passwords encrypted with bcrypt.
- **Role-based Access**: Admins can manage problems.

---

## Demonstration

### Example API Endpoints:

- `POST /api/auth/register` → Register a new user
- `POST /api/auth/login` → Login with credentials
- `GET /api/problems` → Fetch all coding problems
- `POST /api/submissions` → Submit a solution

---

## Getting Started

### Prerequisites

- **Node.js (v16+)**
- **npm**
- **MongoDB**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/neelpatel2003/CrackIT-Backend.git
   cd CrackIT-Backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the Backend Server:**
   ```bash
   npm start
   ```
