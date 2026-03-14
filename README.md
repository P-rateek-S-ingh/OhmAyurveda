# 🕉️ Vaidya — Ancient Ayurvedic Wisdom

A full-stack Ayurveda portal built with **React (Vite)** + **Python (FastAPI)**, powered by the Anthropic Claude API. Every detail is designed to evoke ancient palm-leaf manuscripts and copper-plate inscriptions.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **AI Symptom Consult** | Describe any ailment — get herbs, formulas, diet, precautions & travel advisory from classical Ayurvedic texts |
| 📚 **12 Knowledge Categories** | Click any category for deep AI-generated knowledge (herbs, formulas, Dinacharya, Yoga) |
| 🌿 **Herb Encyclopedia** | 24 classical herbs with Sanskrit names, Rasa/Virya/Vipaka, Dosha actions, classical uses & cautions |
| 🧘 **Prakriti Quiz** | 10-question Dosha self-assessment — discover your constitution with personalised balance advice |
| ⚗️ **Tridosha System** | Vata, Pitta, Kapha — detailed classical descriptions |
| 📜 **Ashtanga Branches** | All eight classical branches of Ayurveda |
| 📱 **Fully Responsive** | Mobile hamburger menu, fluid grid layouts |
| 🐳 **Docker Support** | Single `docker-compose up` for production deployment |

---

## 🏗️ Project Structure

```
vaidya/
├── backend/
│   ├── main.py              # FastAPI — /api/consult & /api/category
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── hooks/
│   │   │   └── useApi.js            # Custom hook — centralised fetch with loading/error
│   │   ├── pages/
│   │   │   └── Home.jsx             # Main page — assembles all sections
│   │   └── components/
│   │       ├── Navbar.jsx           # Responsive nav with mobile hamburger
│   │       ├── Hero.jsx             # Hero + AI search
│   │       ├── ConsultResult.jsx    # 4-panel result card
│   │       ├── Categories.jsx       # 12-card grid
│   │       ├── CategoryModal.jsx    # Per-category detail modal
│   │       ├── HerbEncyclopedia.jsx # 24-herb searchable encyclopedia
│   │       ├── DoshaQuiz.jsx        # 10-question Prakriti quiz
│   │       ├── Doshas.jsx           # Tridosha section
│   │       ├── Principles.jsx       # Ashtanga branches
│   │       ├── QuoteBand.jsx        # Parchment quote divider
│   │       ├── Mandala.jsx          # Dual-rotating SVG mandala
│   │       └── Footer.jsx
│   ├── nginx.conf           # Production nginx with API proxy
│   └── Dockerfile
├── docker-compose.yml       # One-command production deploy
├── start.sh                 # One-command local dev startup
└── README.md
```

---

## ⚙️ Prerequisites

- **Python 3.10+** and **Node.js 18+** for local dev
- **Docker & Docker Compose** for containerised deployment
- An **Anthropic API key** → https://console.anthropic.com

---

## 🚀 Option A — Local Development (Recommended)

### 1. Backend
```bash
cd vaidya/backend
python3 -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
export ANTHROPIC_API_KEY=sk-ant-your-key-here
uvicorn main:app --reload --port 8000
```
API running at → **http://localhost:8000**
Swagger docs → **http://localhost:8000/docs**

### 2. Frontend (new terminal)
```bash
cd vaidya/frontend
npm install
npm run dev
```
App running at → **http://localhost:5173**

> The Vite dev server automatically proxies `/api/*` to `http://localhost:8000`.

---

## 🐳 Option B — Docker (Production)

```bash
cd vaidya

# Set your API key
export ANTHROPIC_API_KEY=sk-ant-your-key-here

# Build and start both containers
docker-compose up --build
```

App running at → **http://localhost**
Backend API → **http://localhost:8000**

---

## ⚡ Option C — One-Line Startup Script

```bash
cd vaidya
export ANTHROPIC_API_KEY=sk-ant-your-key-here
chmod +x start.sh && ./start.sh
```

---

## 🌐 API Reference

| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| GET | `/` | — | Health check |
| POST | `/api/consult` | `{ "query": "string" }` | Full Ayurvedic consultation JSON |
| POST | `/api/category` | `{ "name": "string" }` | Category deep-dive JSON |

### Sample — Consult
```bash
curl -X POST http://localhost:8000/api/consult \
  -H "Content-Type: application/json" \
  -d '{"query": "chronic indigestion and bloating"}'
```

### Sample — Category
```bash
curl -X POST http://localhost:8000/api/category \
  -H "Content-Type: application/json" \
  -d '{"name": "Koshtha — Digestive System"}'
```

---

## 📚 Classical Sources

All AI content is strictly sourced from:
- **Charaka Samhita** (600 BCE) — Foundational text of internal medicine
- **Sushruta Samhita** (600 BCE) — Surgery, pharmacology, and toxicology
- **Ashtanga Hridayam** (700 CE) — Concise synthesis by Vagbhata

---

## ⚕️ Disclaimer

Educational purposes only. Consult a qualified Vaidya before any treatment.
