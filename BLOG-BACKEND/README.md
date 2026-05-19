# ⚙️ The Codex | Backend API Documentation

This directory contains the robust, production-grade RESTful API server powering **The Codex**. Built with the modern MERN stack, the backend manages authentication via secure cookies, database interactions via Mongoose, and media file uploads to Cloudinary CDN.

---

## 🛠️ Tech Stack & Key Modules

*   **Runtime:** Node.js (v18+)
*   **Framework:** Express.js (v5)
*   **Database ODM:** Mongoose (MongoDB)
*   **Authentication:** JSON Web Tokens (JWT) & `cookie-parser`
*   **Security:** `bcryptjs` (password hashing) & `cors` (origin validation)
*   **Media Handling:** `multer` (multipart/form-data) & `cloudinary` (image hosting)

---

## 🔑 Environment Configuration

Create a `.env` file in the root of this folder (`/BLOG-BACKEND/.env`):

```env
PORT=4000
DB_URL=mongodb://localhost:27017/blog-backend-db
JWT_SECRET=your_super_secure_jwt_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

---

## 🗄️ Database Schemas & Models

### 1. User Model (`UserModel.js`)
Handles profiles for Readers (users), Authors, and Admins.
```javascript
{
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImageUrl: { type: String },
  role: { type: String, enum: ["user", "author", "admin"], required: true },
  isActive: { type: Boolean, default: true }
}
```

### 2. Article Model (`ArticleModel.js`)
Handles articles, author references, and embedded comments.
```javascript
{
  author: { type: Schema.Types.ObjectId, ref: "user", required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "user" },
      comment: { type: String },
      createdAt: { type: Date }
    }
  ],
  isArticleActive: { type: Boolean, default: true }
}
```

---

## 📡 API Endpoints

### 🟢 Common API (`/common-api`)
Public routes for account creation, sessions, and general authorization.

| Method | Endpoint | Description | Request Payload |
| :--- | :--- | :--- | :--- |
| **POST** | `/common-api/login` | Authenticate user/author/admin | `{ email, password }` |
| **GET** | `/common-api/logout` | Clear HTTP-Only session cookie | *None* |
| **GET** | `/common-api/check-auth` | Verify current cookie token session | *None (Cookie needed)* |

### 🔵 User (Reader) API (`/user-api`)
Actions accessible to registered Readers.

| Method | Endpoint | Description | Request Payload / Header |
| :--- | :--- | :--- | :--- |
| **POST** | `/user-api/users` | Register a new Reader account | `{ firstName, lastName, email, password }` |
| **GET** | `/user-api/articles` | Get all active, published articles | *None (JWT Cookie)* |
| **PUT** | `/user-api/articles` | Add a comment to an article | `{ user: userId, articleId, comment: "..." }` |

### 🟣 Author API (`/author-api`)
Actions accessible strictly to Authors.

| Method | Endpoint | Description | Request Payload / Header |
| :--- | :--- | :--- | :--- |
| **POST** | `/author-api/users` | Register a new Author account | `{ firstName, lastName, email, password }` |
| **POST** | `/author-api/articles` | Publish a new article | `{ author: authorId, title, category, content }` |
| **GET** | `/author-api/articles/:authorId` | Get all articles written by the author | *None (JWT Cookie)* |
| **PUT** | `/author-api/articles` | Update a published article | `{ author, articleId, title, category, content }` |
| **PUT** | `/author-api/articles/:articleId` | Soft-delete or Restore an article | `{ isArticleActive: boolean }` |

### 🔴 Admin API (`/admin-api`)
Administrative oversight actions.

| Method | Endpoint | Description | Request Payload / Header |
| :--- | :--- | :--- | :--- |
| **GET** | `/admin-api/articles` | View every article in the system | *None (JWT Cookie)* |
| **PUT** | `/admin-api/block/:authorId` | Suspend/Block an Author's account | *None (JWT Cookie)* |
| **PUT** | `/admin-api/unblock/:authorId`| Reactivate/Unblock an Author's account | *None (JWT Cookie)* |

---

## 🛡️ Middlewares

1.  **`verifyToken.js`:** Extracts the JWT from the `token` HTTP-Only cookie, verifies its signature, and attaches the decoded user payload to the request object (`req.user`).
2.  **`checkAuthor.js`:** Verifies if the authenticated requester has the role of `"author"` before granting database write access.
3.  **Global Error Handler (`server.js`):** Unified middleware catching:
    *   Mongoose Validation/Cast Errors (Status `400`)
    *   Mongo Duplicate Key Error `11000` (Status `409`)
    *   Custom defined operational exceptions.
    *   Fallback Internal Server Errors (Status `500`).

---

## 🚀 Running the API Locally

1.  Ensure local MongoDB is running:
    ```bash
    mongod
    ```
2.  Install packages:
    ```bash
    npm install
    ```
3.  Run startup script:
    ```bash
    npm start
    ```
4.  The server launches on the port specified in `.env` (default is `http://localhost:4000`).
