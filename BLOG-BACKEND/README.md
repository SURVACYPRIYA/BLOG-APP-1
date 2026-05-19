# 🖥️ BlogApp Backend

A scalable and secure backend server powering the **BlogApp MERN platform**.
Built using **Express.js**, **MongoDB**, and **JWT Authentication**, this backend provides APIs for authentication, article management, comments, and role-based access control.

---

# 🚀 Live Deployment

| Service     | Status  | Link                                                                           |
| ----------- | ------- | ------------------------------------------------------------------------------ |
| Backend API | 🟢 Live | [Render Deployment](https://blog-app-1-kny9.onrender.com) |

---

# 📌 Features

## 🔐 Authentication & Authorization

* JWT-based authentication
* Secure HttpOnly cookie storage
* Role-based authorization
* Protected routes middleware
* Persistent login session
* Logout functionality

---

## 📝 Article Management

* Create articles
* Edit existing articles
* Soft delete / restore articles
* Fetch all active articles
* Fetch author-specific articles
* Add comments to articles

---

## 👤 User Management

* Register as User or Author
* Secure password hashing using bcryptjs
* Profile image support
* Role handling:

  * `USER`
  * `AUTHOR`
  * `ADMIN`

---

## ☁️ Cloudinary Integration

* Image uploads for blog articles
* Cloud-based media storage
* Optimized image delivery

---

# 🛠️ Tech Stack

## Backend Framework

| Technology | Purpose            |
| ---------- | ------------------ |
| Node.js    | JavaScript Runtime |
| Express.js | REST API Framework |
| MongoDB    | NoSQL Database     |
| Mongoose   | ODM for MongoDB    |

---

## Security & Authentication

| Package       | Purpose                      |
| ------------- | ---------------------------- |
| jsonwebtoken  | JWT token generation         |
| bcryptjs      | Password hashing             |
| cookie-parser | Cookie handling              |
| cors          | Secure cross-origin requests |

---

## Media & File Uploads

| Package    | Purpose                |
| ---------- | ---------------------- |
| multer     | Multipart file uploads |
| cloudinary | Cloud image hosting    |

---

## Environment & Utilities

| Package | Purpose                   |
| ------- | ------------------------- |
| dotenv  | Environment configuration |

---

# 📂 Project Structure

```bash
BLOG-BACKEND/
│
├── APIs/
│   ├── AdminApi.js
│   ├── AuthorApi.js
│   ├── UserApi.js
│   └── commonApi.js
│
├── models/
│   ├── userModel.js
│   └── articleModel.js
│
├── middlewares/
│   └── verifyToken.js
│
├── server.js
├── package.json
└── .env
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=10000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# 🧠 Database Design

## 👤 User Schema

| Field           | Type    | Description           |
| --------------- | ------- | --------------------- |
| firstName       | String  | User first name       |
| lastName        | String  | User last name        |
| email           | String  | Unique email          |
| password        | String  | Hashed password       |
| profileImageUrl | String  | User profile image    |
| role            | Enum    | USER / AUTHOR / ADMIN |
| isActive        | Boolean | Account status        |

---

## 📝 Article Schema

| Field           | Type     | Description        |
| --------------- | -------- | ------------------ |
| author          | ObjectId | Reference to User  |
| title           | String   | Article title      |
| category        | String   | Article category   |
| content         | String   | Blog content       |
| comments        | Array    | User comments      |
| isArticleActive | Boolean  | Soft delete status |

---

# 🔒 Authentication Flow

```text
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

# Common Routes

| Method | Endpoint                 | Description           |
| ------ | ------------------------ | --------------------- |
| POST   | `/common-api/register`   | Register new account  |
| POST   | `/common-api/login`      | Login user            |
| GET    | `/common-api/logout`     | Logout user           |
| GET    | `/common-api/check-auth` | Verify authentication |

---

# User Routes

| Method | Endpoint                               | Description        |
| ------ | -------------------------------------- | ------------------ |
| GET    | `/user-api/articles`                   | Fetch all articles |
| PATCH  | `/user-api/article/:articleId/comment` | Add comment        |

---

# Author Routes

| Method | Endpoint                                 | Description             |
| ------ | ---------------------------------------- | ----------------------- |
| POST   | `/author-api/article`                    | Create article          |
| GET    | `/author-api/articles/:authorId`         | Fetch author's articles |
| PUT    | `/author-api/article/:articleId`         | Update article          |
| PATCH  | `/author-api/articles/:articleId/status` | Toggle article status   |

---

# 🧩 Middleware Used

## CORS Middleware

Configured to allow:

* Local frontend URLs
* Production Vercel deployments
* Preview deployments ending with `.vercel.app`

Your backend dynamically validates origins securely. 

---

## Error Handling Middleware

Centralized error handling for:

* Validation errors
* Duplicate key errors
* Cast errors
* Custom API errors
* Internal server errors



---

# 🚀 Running Locally

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

---

## Start Production Server

```bash
npm start
```

---

# 📡 Deployment

## Backend Deployment

* Platform: Render
* Auto deployment enabled from GitHub
* Environment variables configured securely

---

# 🔐 Security Best Practices

✅ Password hashing with bcryptjs
✅ JWT authentication
✅ HttpOnly cookies
✅ Protected routes middleware
✅ Environment variables using dotenv
✅ Centralized error handling
✅ CORS protection
✅ Soft delete strategy for articles

---

# 📈 Future Improvements

* Refresh token authentication
* Email verification
* Forgot password flow
* Article likes system
* Bookmark feature
* Rich text editor support
* Admin dashboard analytics
* Rate limiting
* API documentation with Swagger

---

# 🤝 Contribution

Contributions are welcome.

```bash
# Fork the repository
# Create a new branch
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

# 👨‍💻 Author

Developed by Survacy Priya 🚀