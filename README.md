# 📝 Pastebin Lite

Pastebin Lite is a lightweight web application that allows users to create and share text pastes.
Each paste can optionally expire based on **time (TTL)** or **number of views**. Once expired, the paste becomes unavailable.

This project is implemented strictly according to the given assignment requirements.

---

## 🚀 Live Demo

👉 **Live Application:**  [Pastebin Lite – Live Demo](https://pastebin-lite-app-liard.vercel.app/)

---

## 🚀 How to Run the App Locally

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

---

### Backend Setup
```bash
cd backend
npm install
node server.js
```
Make sure MongoDB is running and environment variables are properly configured.


### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend communicates with the backend using HTTP APIs.

---

## 💾 Persistence Layer
- MongoDB is used as the persistence layer
- All pastes are stored permanently in the database
- No in-memory or temporary storage is used
- Data persists across server restarts, satisfying persistence requirements


## 🧠 Important Design Decisions
- Paste expiry starts at creation time, not when the paste is viewed
- ttl_seconds and max_views are optional
- If both TTL and view limit are provided, the paste expires when either condition is met
- View count is decremented only on successful fetch or browser view
- Expired or invalid pastes consistently return 404
- Deterministic time is supported for testing using request headers
- Backend validation is the single source of truth for all constraints


## 📌 Notes
- UI is intentionally minimal, as styling is not part of the evaluation


## ✅ Status
- All required endpoints implemented
- Persistent storage used
- Expiry logic correctly handled
- Assignment requirements fully satisfied
---

## 👨‍💻 Author
Shabnam Sakhre

GitHub: https://github.com/shabnamsakhre

LinkedIn: https://www.linkedin.com/in/shabnamsakhre/
