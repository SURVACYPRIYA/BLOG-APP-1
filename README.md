# 🚀 BlogApp - Modern Full-Stack MERN Application

BlogApp is a premium, feature-rich blogging platform built with a modern **MERN Stack** (**MongoDB, Express.js, React, Node.js**). The platform features a stunning glassmorphic UI, secure role-based authentication, responsive layouts, and a scalable backend architecture optimized for performance and maintainability.

The application enables users to explore articles, authors to publish blogs, and administrators to manage platform activity through secure APIs and protected routes.

---

# 🌐 Live Deployment

| Service     | Status  | Link                                                                     |
| ----------- | ------- | ------------------------------------------------------------------------ |
| Frontend    | 🟢 Live | [https://blog-app-1-beta.vercel.app/](https://blog-app-1-beta.vercel.app/)   |
| Backend API | 🟢 Live | [https://blog-app-1-kny9.onrender.com](https://blog-app-1-kny9.onrender.com) |

---

# 📖 How We Started

The project began with a vision to create a blogging platform that doesn't just work well but also delivers a visually premium experience. We wanted to move away from generic UI designs and implement a **Vibrant Glassmorphic Design System** with smooth gradients, blur effects, and responsive layouts.

We chose the **MERN stack** because of its flexibility, scalability, and modern development workflow. By leveraging **Vite** for the frontend, we achieved lightning-fast development speed and optimized production builds.

The backend architecture follows a modular structure with separate APIs for:

* Authors
* Users
* Authentication
* Admin Controls

This separation keeps the codebase clean, scalable, and easy to maintain.

---

# ✨ Features

## 🔐 Authentication & Authorization

* User Registration & Login
* JWT Authentication
* Secure HttpOnly Cookie Sessions
* Protected Routes
* Role-Based Access Control
* Persistent Authentication

---

## 📝 Blogging Features

* Create Articles
* Edit Existing Articles
* Soft Delete / Restore Articles
* Read Articles
* Comment System
* Author Dashboard
* Category-Based Content

---

## 🎨 Modern UI/UX

* Fully Responsive Design
* Mobile-First Layout
* Glassmorphism Styling
* Gradient UI Components
* Smooth User Experience
* Toast Notifications

---

## ☁️ Cloudinary Integration

* Blog Image Uploads
* Cloud Media Storage
* Optimized Image Delivery

---

# 🛠️ Tools Required & Why We Need Them

# 🌐 Frontend

| Tool            | Why We Use It                           |
| --------------- | --------------------------------------- |
| React           | Component-based UI development          |
| Vite            | Faster development and optimized builds |
| Tailwind CSS    | Utility-first responsive styling        |
| Zustand         | Lightweight global state management     |
| Axios           | API communication                       |
| React Router    | Client-side routing                     |
| React Hook Form | Efficient form validation               |
| React Hot Toast | User notifications                      |

---

# 🖥️ Backend

| Tool       | Why We Use It                   |
| ---------- | ------------------------------- |
| Node.js    | JavaScript runtime              |
| Express.js | REST API framework              |
| MongoDB    | NoSQL database                  |
| Mongoose   | Schema-based database modeling  |
| JWT        | Secure stateless authentication |
| bcryptjs   | Password hashing                |
| Cloudinary | Media storage & optimization    |
| Multer     | File upload handling            |
| Dotenv     | Environment variable management |
| CORS       | Frontend-backend communication  |

---

# 🛠️ Tech Stack

# Frontend Technologies

| Technology      | Purpose             |
| --------------- | ------------------- |
| React 19        | UI Library          |
| Vite            | Frontend Build Tool |
| Tailwind CSS 4  | Styling Framework   |
| Zustand         | State Management    |
| Axios           | API Client          |
| React Router    | Navigation          |
| React Hook Form | Form Handling       |

---

# Backend Technologies

| Technology    | Purpose             |
| ------------- | ------------------- |
| Node.js       | Runtime Environment |
| Express.js    | Backend Framework   |
| MongoDB       | Database            |
| Mongoose      | ODM                 |
| JWT           | Authentication      |
| bcryptjs      | Password Security   |
| Cookie Parser | Cookie Handling     |
| Multer        | File Uploads        |
| Cloudinary    | Image Hosting       |

---

# 📁 Project Structure

```bash id="n2rzrr"
BLOG-APP/
├── BLOG-BACKEND/
│   ├── APIs/
│   │   ├── AuthorApi.js
│   │   ├── UserApi.js
│   │   ├── AdminApi.js
│   │   └── commonApi.js
│   │
│   ├── middlewares/
│   ├── models/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── BLOG-FRONTEND/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── store/
│   │   ├── styles/
│   │   └── assets/
│   │
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   └── index.html
│
└── README.md
```

---

# ⚙️ Environment Variables

# 🌐 Frontend `.env`

```env id="oq2qz4"
VITE_API_URL=http://localhost:10000
```

Production:

```env id="efyn3t"
VITE_API_URL=https://blog-app-5geq.onrender.com
```

---

# 🖥️ Backend `.env`

```env id="35c2p8"
PORT=10000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# ⚙️ Getting Started

# 📋 Prerequisites

Make sure you have:

* Node.js (v16 or higher)
* MongoDB Atlas Account
* Cloudinary Account
* Git Installed

---

# 🏃 Run Locally

| Component | Directory        | Install Command | Start Command |
| --------- | ---------------- | --------------- | ------------- |
| Backend   | `BLOG-BACKEND/`  | `npm install`   | `npm run dev` |
| Frontend  | `BLOG-FRONTEND/` | `npm install`   | `npm run dev` |

---

# 🚀 Backend Setup

## Install Dependencies

```bash id="7dnhj1"
cd BLOG-BACKEND
npm install
```

---

## Start Backend Server

```bash id="1nq2m6"
npm run dev
```

Runs internally:

```bash id="ex3slf"
nodemon server.js
```

---

# 🌐 Frontend Setup

## Install Dependencies

```bash id="4g8p34"
cd BLOG-FRONTEND
npm install
```

---

## Start Frontend Server

```bash id="0m3lj0"
npm run dev
```

Runs internally:

```bash id="vwt4i6"
vite
```

---

# 🔒 Authentication Flow

```text id="n7h1w6"
User Login
   ↓
JWT Token Generated
   ↓
Stored in HttpOnly Cookie
   ↓
verifyToken Middleware
   ↓
Protected Routes Access
```

### Why HttpOnly Cookies?

* Prevents XSS attacks
* Tokens inaccessible from frontend JavaScript
* More secure session handling

---

# 🌐 API Routes

# Common API

| Method | Endpoint                 | Description    |
| ------ | ------------------------ | -------------- |
| POST   | `/common-api/register`   | Register User  |
| POST   | `/common-api/login`      | Login User     |
| GET    | `/common-api/logout`     | Logout User    |
| GET    | `/common-api/check-auth` | Verify Session |

---

# User API

| Method | Endpoint                               | Description        |
| ------ | -------------------------------------- | ------------------ |
| GET    | `/user-api/articles`                   | Fetch All Articles |
| PATCH  | `/user-api/article/:articleId/comment` | Add Comment        |

---

# Author API

| Method | Endpoint                                 | Description           |
| ------ | ---------------------------------------- | --------------------- |
| POST   | `/author-api/article`                    | Create Article        |
| GET    | `/author-api/articles/:authorId`         | Fetch Author Articles |
| PUT    | `/author-api/article/:articleId`         | Update Article        |
| PATCH  | `/author-api/articles/:articleId/status` | Toggle Article Status |

---

# 📱 Mobile Friendly

The application is fully responsive across:

* Mobile Devices
* Tablets
* Laptops
* Desktop Screens

### Responsive Features

* Dynamic Hamburger Navigation
* Responsive Grid Layouts
* Adaptive Typography
* Touch-Friendly Buttons
* Flexible Containers

---

# 🧠 State Management

The frontend uses **Zustand** for lightweight and scalable state management.

Used for:

* Authentication State
* User Sessions
* Shared App Data

---

# 🛡️ Security Features

✅ JWT Authentication
✅ HttpOnly Cookies
✅ Password Hashing with bcryptjs
✅ Protected API Routes
✅ Role-Based Authorization
✅ Environment Variable Protection
✅ Centralized Error Handling
✅ CORS Security

---

# 📡 Deployment

# Frontend Deployment

* Platform: Vercel
* Auto Deployment from GitHub
* Optimized Vite Production Build

# Backend Deployment

* Platform: Render
* MongoDB Atlas Connected
* Environment Variables Configured Securely

---

# 🚧 Future Improvements

* Dark Mode
* Rich Text Editor
* Search & Filtering
* Bookmark System
* Like System
* Infinite Scrolling
* Admin Analytics Dashboard
* Email Verification
* Forgot Password Flow
* Markdown Support

---

# 🤝 Contribution

```bash id="q52gql"
# Fork repository

# Create feature branch
git checkout -b feature-name

# Commit changes
git commit -m "Added new feature"

# Push changes
git push origin feature-name
```

---

# 📜 License

This project is licensed under the ISC License.

---




## 📄 Documentation
Detailed information for each part of the app can be found here:
- [Frontend Documentation](./FRONTEND/README.md)
- [Backend Documentation](./BACKEND/README.md)