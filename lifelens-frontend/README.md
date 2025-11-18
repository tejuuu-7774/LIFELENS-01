LifeLens – AI Powered Personal Journal

LifeLens is a digital journaling platform that helps users record their daily experiences, reflect on emotions, and revisit meaningful moments with ease. It brings together clean UI, fast search, organized filtering, structured sorting, pagination, and an AI-powered writing assistant to make journaling simple and inspiring.

What LifeLens does

Secure user authentication (signup, login, logout)
Add, view, edit, and delete journal entries
Search entries by title or keywords
Filter by mood, category, and date range
Sort journals by newest, oldest, or emotional depth
Pagination for smooth browsing
One-click AI writing prompts when you don’t know what to write
Responsive, clean frontend UI with multiple pages and smooth routing

Tech Stack
Frontend:
React.js, React Router, TailwindCSS

Backend:
Node.js, Express.js

Database:
MongoDB

Authentication:
JWT 

AI Support:
OpenAI GPT for writing prompts


API Overview

POST /api/auth/signup — Register a new user
POST /api/auth/login — Login and receive JWT
GET /api/journal — Fetch all entries (supports search, filter, sort, pagination)
POST /api/journal — Add a journal entry
PUT /api/journal/:id — Update a specific entry
DELETE /api/journal/:id — Delete a specific entry
POST /api/ai/prompt — Generate an AI journaling prompt

Deployment
Frontend: Live on Vercel
Backend: Live on Render
Database: MongoDB (Cloud)