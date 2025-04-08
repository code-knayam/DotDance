# 🕺 DotDance – Dynamic QR Code Generator

**DotDance** is a dynamic QR code platform built with a modern monorepo architecture using Next.js (frontend), Express.js (backend), and PostgreSQL via Supabase. It allows users to create, manage, and analyze customizable and editable QR codes.

---

## 🧱 Monorepo Structure

```
apps/
  frontend/   → React + Next.js UI
  backend/    → Express API
packages/     → (optional) shared types, utils
```

---

## 🚀 Features

- 🎯 Create dynamic QR codes with editable destinations  
- 🎨 Customize QR appearance (colors, logos)  
- 📊 Track scan analytics (views, location, devices)  
- 🛠️ Dashboard for QR management and updates  
- 🔐 Google OAuth for secure login  

---

## 🧑‍💻 Tech Stack

| Area       | Tech                             |
|------------|----------------------------------|
| Frontend   | Next.js, TailwindCSS, ShadCN UI  |
| Backend    | Node.js, Express.js              |
| Database   | PostgreSQL (via Supabase)        |
| Auth       | Google OAuth                     |
| QR Gen     | `qrcode` npm package             |
| Styling    | TailwindCSS + Framer Motion      |
| Deploy     | Vercel (frontend), Railway (API) |

---

## 📦 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/dotdance.git
cd dotdance
```

### 2. Install dependencies

```bash
cd app/frontend
npm install
```


```bash
cd app/backend
npm install
```

### 3. Environment Variables

Create `.env` files in both `apps/frontend` and `apps/backend`:

#### `apps/frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

#### `apps/backend/.env`

```env
PORT=4000
DATABASE_URL=your-postgres-connection-url
```


---

### 4. Run the App

#### ⬆️ Backend

```bash
cd apps/backend
npm run dev
```

#### 🌐 Frontend

```bash
cd apps/frontend
npm run dev
```


## 🧹 Common Scripts

From the root:

```bash
npm run dev         # Start both frontend & backend (via concurrently)
```

---

## 📜 License


---

## 💬 Feedback & Contributions

Pull requests and ideas welcome.  
