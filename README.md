# 🌿 LifeLens — AI-Powered Personal Journaling

LifeLens is a modern journaling experience built to help you capture your days, moods, and memories with ease — supported by AI reflections, highlights, and a beautiful writing heatmap.

---

## 🚀 Hosted Links

🔗 **Frontend:** https://lifelens-01.vercel.app/  
🔗 **Backend:** https://lifelens-01.onrender.com
(Note: Protected routes require authentication)

---

# ✨ Features

## 🧠 AI Assistance
- **Starter Prompts:** Get a warm, friendly question to begin writing.
- **AI Reflections:** Receive supportive, natural summaries of your journal entries.

## 📓 Journals
- Create, view, edit, and delete entries  
- Title, content, mood, tags, and date  
- Full-text search, filters, sorting, and pagination  
- Smooth, consistent UI/UX  

## 🏷️ Tags
- Create new tags  
- Rename or delete  
- Organize journal entries effortlessly  

## 👤 Profile
- Update username & email  
- Avatar initial  
- Account deletion  
- Yearly writing heatmap  
- Streak counter with activity visualization  

## 📸 Highlights
- Square Insta-like highlight cards  
- Upload + crop images  
- Add title & description  
- Select multiple journals to group into a highlight  
- Edit or delete anytime  

## 🔥 Writing Heatmap
- View past-year writing activity  
- Streak detection  
- Soft green intensity-based coloring  
- Helps build consistency  

---

# 🧩 Tech Stack

### **Frontend**
- React (Vite)
- TailwindCSS
- Axios
- react-easy-crop
- react-calendar-heatmap

### **Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Groq LLaMA 3.1 (AI)

### **Hosting**
- Frontend → Vercel  
- Backend → Render  
- Database → MongoDB Atlas  

---

# 📦 Project Structure

```
root
│
├── lifelens-frontend/     → React + Tailwind client
└── lifelens-backend/      → Node.js + Express REST API
```

---

# 🔗 API Routes (Backend)

## 🧍 Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

## 📓 Journals
- `POST /api/journal` — Create journal  
- `GET /api/journal` — List journals (search, sort, pagination)  
- `GET /api/journal/:id` — Get a journal  
- `PUT /api/journal/:id` — Update journal  
- `DELETE /api/journal/:id` — Delete journal  

## 🏷 Tags
- `POST /api/tags` — Create tag  
- `GET /api/tags` — List tags  
- `PUT /api/tags/:id` — Rename tag  
- `DELETE /api/tags/:id` — Delete tag  

## 👤 Profile
- `GET /api/profile/me`
- `PUT /api/profile/update`
- `DELETE /api/profile/delete`

## 🔥 Heatmap
- `GET /api/heatmap` — Writing activity + streak  

## 📸 Highlights
- `POST /api/highlights` — Create highlight  
- `GET /api/highlights` — List highlights  
- `PUT /api/highlights/:id` — Update highlight  
- `DELETE /api/highlights/:id` — Delete highlight  

## 🧠 AI
- `GET /api/ai/starter` — AI journaling starter  
- `POST /api/ai/analyze` — AI reflection  

---

# 🌟 Why LifeLens?

LifeLens blends emotional intelligence with structured journaling.  
It gives you:
- a place to express yourself  
- insights from AI  
- a timeline of your memories  
- a visual map of your habits  
- and a beautifully organized collection of your life’s moments  

A journaling companion that grows with you — gentle, personal, and powerful.

---
