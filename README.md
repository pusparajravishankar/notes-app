# 📝 Notes App

A simple and responsive Note-Taking Web Application built with **React** for the frontend and **Node.js + Express** for the backend, connected to a **Postgres** database. The app allows users to create, read, update, and delete (CRUD) their notes efficiently with real-time updates and clean UI.

WebApp Link - https://notes-app-8y9g.onrender.com
---

## 🚀 Features

- ✅ Create new notes with title and content
- 🧾 View all notes in a card-based layout
- ✏️ Edit/update existing notes
- 🗑️ Delete notes with confirmation
- 🔄 Instant frontend refresh after any action
- ⚡ Uses `Zustand` for lightweight state management
- 📦 REST API built with Express
- 🌐 Fully responsive design using Tailwind CSS

---

## 🛠️ Tech Stack

**Frontend:**
- React
- Zustand (state management)
- Axios (for API calls)
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- Postgres (via Neon)

---  

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/notes`     | Get all notes     |
| GET    | `/api/notes/:id` | Edit single note   |
| POST   | `/api/notes`     | Create a new note |
| PUT    | `/api/notes/:id` | Update a note     |
| DELETE | `/api/notes/:id` | Delete a note     |


