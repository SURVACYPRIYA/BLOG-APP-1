# 🎨 The Codex | Frontend Application Documentation

This directory contains the immersive, state-of-the-art client application for **The Codex**. Designed with a luxurious **Gothic Literary Editorial** aesthetic, this React 19 application incorporates beautiful glassmorphism, responsive editorial grids, elegant micro-animations, and unified state management.

---

## 🛠️ Technology Stack

*   **Core Library:** React 19 (SPA)
*   **Build Tool:** Vite (v7)
*   **State Management:** Zustand (v5)
*   **Routing:** React Router (v7)
*   **Styling & Aesthetics:**
    *   **Tailwind CSS (v4)**: Modern compile-time CSS framework using `@tailwindcss/vite`.
    *   **Framer Motion**: Smooth, high-fidelity responsive transitions and hover micro-animations.
    *   **Lucide React**: Clean, modern iconography aligned with classic layouts.
*   **Form Management:** `react-hook-form`
*   **Alerts & Notifications:** `react-hot-toast`

---

## 🖼️ Gothic Literary Design System

The Codex features a highly intentional dark editorial layout:
*   **Backgrounds:** Deep charcoal obsidian gradients combined with glassmorphic cards.
*   **Accents:** Crimson and gold velvet transitions mimicking classical library binding details.
*   **Card UI (`BlogCard.jsx`):** Soft parchment boundaries, glowing dark hover borders, and elegant serif typography.
*   **Micro-interactions:** Interactive scaling, layout-shifts, and soft opacity transitions powered by Framer Motion.

---

## 📁 Application Structure

```text
BLOG-FRONTEND/
├── src/
│   ├── assets/          # Gothic themed illustrations & media
│   ├── components/      # Key visual components & Layouts
│   │   ├── ui/          # Low-level premium UI elements (e.g., BlogCard)
│   │   ├── RootLayout   # Global template wrapper with headers & footers
│   │   ├── Header       # Responsive obsidian navigation header
│   │   ├── Home         # Multi-author home feed and search portal
│   │   ├── Login        # Animated secure login form
│   │   ├── Register     # Animated secure registration form
│   │   ├── Dashboards/  # Role-specific portals (User, Author, Admin)
│   │   └── WriteArticle # Article creation form with rich options
│   ├── lib/             # Utility helpers (e.g., cn tailwind merger)
│   ├── store/           # Zustand global state stores (e.g., authStore)
│   ├── axios.js         # Configured Axios instance with credentials
│   ├── App.jsx          # Route configuration & global setup
│   └── index.css        # Global CSS variables & Tailwind v4 layers
├── index.html           # Main HTML shell loading Google fonts (Inter, Playfair)
└── package.json         # Scripts and project dependencies
```

---

## 🔑 Environment Configuration

Create a `.env` file in the root of the `BLOG-FRONTEND` directory:

```env
VITE_API_URL=http://localhost:4000
```

*Note: In production (Vercel), this variable must point to your deployed Render backend (e.g., `https://blog-app-1-kny9.onrender.com`).*

---

## 🧠 State Management: Zustand (`authStore.js`)

The global authorization state is centralized using Zustand. It manages user roles, sessions, loading states, and error alerts:

```javascript
// useAuth Store Actions:
login(userCredentials) // authenticates user and sets currentUser
logout()               // terminates session cookie and resets client state
checkAuth()            // performs automatic background validation on mount/refresh
```

This configuration leverages secure HTTP-Only cookies. The Axios instance automatically transmits sessions securely by setting `withCredentials: true`.

---

## 🚀 Running the Client Locally

1.  Navigate to the frontend directory:
    ```bash
    cd BLOG-FRONTEND
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Launch the Vite development server:
    ```bash
    npm run dev
    ```
4.  Open the local address in your web browser: `http://localhost:5173`.

### 📦 Building for Production

To build the static application bundle optimized for production (Vercel deployment):
```bash
npm run build
```
This generates an optimized static deployment folder inside `dist/`.
