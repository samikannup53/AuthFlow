# 🔐 AuthFlow

### ✨ A Simple and Clean ⚙️ Server-Rendered Authentication App

**AuthFlow** is a secure, server-rendered Node.js application that handles user authentication and authorization using Bearer tokens (JWT). Built with the MVC architecture and EJS templating, it supports user registration, login, logout, and protected pages with personalized content. Ideal for learning or demonstrating token-based authentication in server-side rendered apps using Express, Mongoose, and JWT.

---

## Why AuthFlow? 💡

**AuthFlow** combines server-side rendering with JWT-based authentication to deliver a secure, SEO-friendly, and smooth user experience without relying on heavy frontend frameworks. Its clear MVC structure and Tailwind CSS styling make it an ideal foundation for developers looking to build scalable and maintainable authentication systems.

---

## Key Highlights 🌟

- 🔄 **Server-Side Rendering (SSR) with EJS:** Full HTML pages rendered on the server for faster load times and better SEO.  
- 🔒 **Security Best Practices:** Password hashing with bcrypt, JWT stored securely (e.g., HTTP-only cookies), and protected routes via middleware.  
- 🎨 **Modern UI with Tailwind CSS:** Clean, responsive design with easy customization using utility-first CSS.  
- 📚 **Complete Documentation & Postman Collection:** Streamlined onboarding for users and contributors with ready-to-use API tests.  
- 🚀 **Cloud Deployment Ready:** Configured for hassle-free deployment on platforms like Render, supporting environment variables and build scripts.

---

## 🚀 Features

- 🔐 **User Registration** – Secure signup with hashed password storage.  
- 🔑 **User Login** – JWT generation upon successful authentication.  
- 🛡️ **Bearer Token Authorization** – Protect routes using JWT-based tokens.  
- 🚪 **Protected Routes** – Access user profile and dashboard securely.  
- 🧩 **Token Verification Middleware** – Validates tokens and attaches user info to requests.  
- 🍃 **MongoDB Integration** – Efficient data handling with Mongoose ODM.  
- 🏗️ **MVC Architecture** – Clean separation of concerns for scalable code.
- 🖼️ **EJS Templating** - Dynamic and reusable UI with Embedded JavaScript templates.
- 🗂️ **Modular Project Structure** - Scalable and organized codebase ready for expansion.
- 🚨 **Error Handling** - Displays Messages for API Errors and No-Results Scenarios.  
- 📋 **Postman Documentation** – Well-documented endpoints for easy testing.  

---

## Built With 🛠️

- 🧠 **Node.js** – Backend JavaScript runtime environment.  
- 🔀 **Express.js** – Web framework for routing and middleware.  
- 🍃 **Mongoose (MongoDB)** – ODM for interacting with MongoDB database.  
- 🎨 **Tailwind CSS** – Utility-first CSS framework for crafting modern UI.  
- 📬 **Postman** – Tool for API testing and documentation.  
- ♻️ **nodemon** – Development tool for auto-restarting server on file changes.  
- 🧩 **EJS** – Templating engine for rendering dynamic server-side views.  
- 🌱 **dotenv** – Loads environment variables from `.env` files.  
- 🔒 **bcrypt** – Library to hash and secure user passwords.  
- 🍪 **cookie-parser** – Middleware to parse cookies for handling sessions/auth.
- 🔐 **jsonwebtoken** – Library to create and verify JWT tokens for authentication.


---

## API Endpoints 📮

| Method | Endpoint         | Description                  | Access       | Response                       |
|--------|------------------|------------------------------|--------------|--------------------------------|
| GET    | `/`              | Landing Page                 | 🌐 Public    | 🏠 Renders Landing Page       |
| GET    | `/user/login`    | User Login Page              | 🌐 Public    | 🔐 Renders Login Page         |
| POST   | `/user/login`    | Authenticate & Generate JWT  | 🌐 Public    | ✅ JWT token / ❌ Error       |
| GET    | `/user/register` | User Registration Page       | 🌐 Public    | 📝 Renders Registration Page   |
| POST   | `/user/register` | Register New User            | 🌐 Public    | ✅ Success / ❌ Error         |
| GET    | `/user/dashboard`| User Dashboard               | 🔒 Protected | 📋 User Data / 🔄 Redirect    |
| GET    | `/user/logout`   | Logout User                  | 🔒 Protected | 🚪 Logout & Redirect           |


---

## Deployed App 🚀

#### For Live Demo Click the Below Link ⬇️ <br/>

🌐 Live URL : https://myauthflow.onrender.com/

---

## API Documentation 📬

#### Explore the AuthFlow endpoints using Postman ⬇️ <br/>

1. 🛠️ Open Postman.
2. 📂 Import the `postmanAPI.json` Postman collection from the `docs/` folder.
3. 🔀 Test the available API endpoints directly from Postman.

---

## Project Structure 🗂️

```bash
AuthFlow/
├── 📂 config/           # ⚙️ Configuration files (e.g., DB connection)
├── 📂 controllers/      # 🧠 Business logic
├── 📂 middlewares/      # 🛡️ Middleware (auth, errors)
├── 📂 models/           # 🛢️ Mongoose Schemas and Data Models
├── 📂 routes/           # 🛣️ Express route Definitions
├── 📂 utils/            # 🔧 Helper functions
├── 📂 views/            # 🎨 EJS templates for Rendering Views
│   ├── 📂 partials/     # 🧩 Components (header, footer)
│   └── 📂 pages/        # 📄 Full pPges
├── 📂 public/           # 🌐  Public assets (e.g., CSS, images)
│   ├── 📂 css/          # 🎨 Compiled CSS and Tailwind files
│   ├── 📂 images/       # 🖼️ Static image assets
│   └── 📂 js/           # ⚙️ Client-side JavaScript files
├── 📂 docs/             # 📚  Postman collection and documentation
├── 📄 app.js            # 🚀 App Setup
├── 📄 main.js           # 🧩 App Entry Point & Server Setup
├── 📄 package.json      # 📦 Project Dependencies
├── 📄 package-lock.json # 🔒 Exact versions of Installed Dependencies
├── 📄 README.md         # 📝 Project Overview and Setup Instructions
├── 📄 .gitignore        # 🚫 Specifies Files and Directories to Ignore in Git
└── 📄 .env              # 🌱 Environment Variables (e.g., DB URL, PORT, Secrets)

```

---

## Project Configurations ⚙️

### 📦 1. Initialize Node Project

```bash
 npm init
```

🛠️ Sets up your Project with Default Settings.

### 🚀 2. Install Core Dependencies

```bash
npm install express
npm install mongoose
npm install bcrypt 
npm install jsonwebtoken
npm install cookie-parser
npm install dotenv
npm install ejs
```

- `express` – 🔀 Web Framework for routing and middleware.
- `mongoose` – 🍃 ODM for interacting with MongoDB Database.
- `bcrypt` – 🔒 Library for hashing passwords securely.
- `jsonwebtoken` – 🔐 Library to create and verify JWT tokens.
- `cookie-parser` – 🍪 Middleware to parse cookies for session/auth handling.
- `dotenv` – 🌱 Load environment variables from `.env`
- `ejs` – 🧩 Template engine for dynamic HTML rendering

### 🔄 3. Install Dev Dependency

```bash
 npm install nodemon
```

- `nodemon` – ♻️Automatically restarts server on file changes

### 🎨 4. Setup Tailwind CSS

#### 📥 Step-1. Install Tailwind CSS

```bash
 npm install tailwindcss @tailwindcss/cli
```

- `tailwindcss` – 🎨 Utility-first CSS framework for styling.
- `@tailwindcss/cli` – 🛠️ CLI tool for compiling Tailwind styles.

#### 📄 Step-2. Create and Import Tailwind in Input File

Inside `config/tailwindConfig.css`, add the following:

```bash
@import "tailwindcss";
```

- 🧩 This file acts as the input source for Tailwind to generate final CSS.

#### 🛠️ Step-3. Update the Build Script in `package.json`

```bash
"scripts": {
    "start": "nodemon main.js",
    "build": "npx @tailwindcss/cli -i ./config/tailwindConfig.css -o ./public/css/style.css --watch"
  }
```

- 🔄 This script will watch for changes and regenerate final `style.css`.

#### 🎨 Step-4. Build Tailwind CSS

```bash
  npm run build
```

- 🔧 Compiles Tailwind CSS into a single `style.css` inside the `public/css folder`.

### 🧩 5. Start the Server

```bash
  npm start
```

▶️ Runs the server using your defined start script in package.json.

---

## Getting Started 🚀

### 📋 1. Requirments

- ✅ Node.js Installed
- ✅ MongoDB installed (Local or Cloud - MongoDB Atlas)

### 📦 2. Installation

Clone the repository

```bash
git clone https://github.com/samikannup53/AuthFlow.git
```

Move into the project directory

```bash
cd AuthFlow
```

Install all dependencies

```bash
npm install
```

### 🔐 3. Environment Setup

Create a `.env` file in the root directory with the following content:

```bash
PORT=9000
MONGODB_URI=mongodb://localhost:27017/AuthFlow (Your MongoDB URL)
```

### 🎨 4. Build Tailwind CSS

```bash
  npm run build
```

- 🧵 Compiles Tailwind styles into `public/css/style.css`. Run this after installing dependencies.

### ▶️ 5. Run the Application

```bash
npm start
```

🌐 The server will start at: http://localhost:9000

---

<h3 align= 'center' style="color: fuchsia"><b>👀 Thanks for Exploring My Repository! 💖</b></h3>
