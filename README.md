# 📚 Student Dashboard – Full Stack Challenge (Anyware Software)

This project is a **Full Stack Student Dashboard Application** built for the Anyware Software Challenge. It includes:

- A **Node.js + Express + MongoDB backend** for managing authentication, quizzes, and announcements
- A **React + Redux + MUI + TypeScript frontend** with protected routes, theming, and API integration

---

## 🧠 Features

### ✅ Backend (Express + MongoDB)

- 🔐 JWT-based user authentication (students only)
- 📄 CRUD operations for **quizzes** and **announcements**
- 🔒 Protected routes via middleware
- 🧾 Validation with `express-validator`
- 🌐 MongoDB Atlas database connection
- ♻️ Modular MVC folder structure

### ✅ Frontend (React + Redux + MUI + TypeScript)

- 🧑‍🎓 Sign In with form validation and Redux state
- 🎯 Protected dashboard view for authenticated users
- 🧠 View quizzes (title, course, topic, due date, link)
- 📢 View announcements (teacher, image, description, date)
- 🌓 Light/Dark mode toggle with theme support
- 🔁 Persistent login via Redux + localStorage
- ❌ 404 page for unknown routes

---

## 🚀 Tech Stack

- **Frontend:** React, TypeScript, Redux Toolkit, RTK Query, MUI, React Router v6
- **Backend:** Node.js, Express, MongoDB, JWT, dotenv, morgan, cors
- **Dev Tools:** Vite, Nodemon, VS Code, Postman

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/student-dashboard.git
cd student-dashboard
```

### 2. Install Dependencies

```bash
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install
```

### 3. Configure Environment Variables

Create `.env` in `/backend`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/anywaresoftware
JWT_SECRET=your-secure-jwt-secret
```

### 4. Run Both Projects

```bash
# In one terminal - start backend
cd backend
npm run dev

# In another terminal - start frontend
cd frontend
npm run dev
```

---

## 📬 Backend API Endpoints

> All protected routes require: `Authorization: Bearer <token>`

### Auth

| Method | Endpoint        | Description           |
| ------ | --------------- | --------------------- |
| POST   | /api/auth/login | Login user, get token |

### Quizzes

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | /api/quizzes     | List all quizzes        |
| POST   | /api/quizzes     | Create quiz (auth only) |
| GET    | /api/quizzes/:id | Get one quiz            |
| PUT    | /api/quizzes/:id | Update quiz             |
| DELETE | /api/quizzes/:id | Delete quiz             |

### Announcements

| Method | Endpoint               | Description            |
| ------ | ---------------------- | ---------------------- |
| GET    | /api/announcements     | List all announcements |
| POST   | /api/announcements     | Create announcement    |
| GET    | /api/announcements/:id | Get one announcement   |
| PUT    | /api/announcements/:id | Update announcement    |
| DELETE | /api/announcements/:id | Delete announcement    |

---

## 📱 Frontend Routes

| Path         | Page             | Description                |
| ------------ | ---------------- | -------------------------- |
| `/`          | Home             | Hero, nav, footer          |
| `/signin`    | Sign In          | Login form with validation |
| `/dashboard` | Dashboard (Auth) | Quizzes + Announcements    |
| `*`          | 404 Page         | Page not found             |

---

## 📦 Folder Structure

```
root/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── app.js, server.js, .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── store/
│   │   ├── services/
│   │   ├── routes/
│   │   └── App.tsx, main.tsx
```

---

## ✅ Challenge Criteria Met

- ✔️ Secure login + protected routes
- ✔️ Clean frontend dashboard UI with theme toggle
- ✔️ RESTful backend with full CRUD
- ✔️ Validation, token storage, and API integration
- ✔️ Complete folder structure and documentation

---

## 📜 License

Built as a take-home assessment for **Anyware Software**.
