# 📚 Student Dashboard Backend – Anyware Software Challenge

This is the **backend API** built with **Node.js, Express, and MongoDB** for the Anyware Software Full Stack Challenge. It supports a student dashboard with authentication, announcements, and quizzes functionality.

---

## 📁 Features

- 🔐 **JWT Authentication** (Login/Register for students)
- 📄 **CRUD operations for Quizzes and Announcements**
- 🧾 **Validation** with `express-validator`
- 🔒 **Protected API routes** (only accessible to authenticated users)
- 🌐 **MongoDB Atlas support**
- ♻️ Clean **MVC structure**

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- express-validator
- bcryptjs
- dotenv
- cors
- morgan
- nodemon

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/student-dashboard-backend.git
cd student-dashboard-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/anywaresoftware
JWT_SECRET=your-secure-jwt-secret
```

### 4. Run the Server (Dev Mode)

```bash
npm run dev
```

---

## 📬 API Endpoints

> All protected routes require the `Authorization: Bearer <token>` header.

### 🔐 Auth

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | /api/auth/register | Register new user     |
| POST   | /api/auth/login    | Login user, get token |

### 🧠 Quizzes

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | /api/quizzes     | List all quizzes        |
| GET    | /api/quizzes/:id | Get one quiz            |
| POST   | /api/quizzes     | Create quiz (auth only) |
| PUT    | /api/quizzes/:id | Update quiz             |
| DELETE | /api/quizzes/:id | Delete quiz             |

### 📢 Announcements

| Method | Endpoint               | Description            |
| ------ | ---------------------- | ---------------------- |
| GET    | /api/announcements     | List all announcements |
| GET    | /api/announcements/:id | Get one announcement   |
| POST   | /api/announcements     | Create announcement    |
| PUT    | /api/announcements/:id | Update announcement    |
| DELETE | /api/announcements/:id | Delete announcement    |

---

## 🔒 Authentication Flow

- Register using `/api/auth/register`
- Login with `/api/auth/login`
- Use returned token in `Authorization` header to access protected endpoints

---

## 🧪 Notes

- You can seed sample data using MongoDB Compass or create a `seed.js` script (optional).
- All responses follow standard JSON REST structure.
- Backend is ready to connect to a React frontend with token-based auth.

---

## 📦 Folder Structure

```
backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── config/
├── app.js
├── server.js
├── .env
└── .gitignore
```

---

## 🧠 Evaluation Criteria (Met)

- ✔️ Clean MVC architecture
- ✔️ Secure route protection and data access
- ✔️ Fulfills all required features from the PDF spec
- ✔️ Extensible and production-ready

---

## 📜 License

This project was built as a take-home challenge for Anyware Software.
