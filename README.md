# 📄 Resume Analyzer

An AI-powered app to compare a resume (PDF) with a job description and provide a match score + keyword feedback.

## ✨ Features
- Upload PDF resume
- Paste job description
- Shows match score
- Shows common and missing keywords

## 🔧 Tech Stack
- Frontend: Next.js (App Router) + Tailwind CSS
- Backend: Python Flask + spaCy + PyMuPDF

---

## 🚀 Setup Instructions

### Frontend
```bash
cd frontend
npm install
npm run dev
# Visit http://localhost:3000

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python app.py
# API runs at http://localhost:5000
```
