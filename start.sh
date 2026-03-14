#!/bin/bash
# start.sh — Launch both backend and frontend with one command

set -e

echo ""
echo "🕉️  Vaidya — Ancient Ayurvedic Wisdom"
echo "======================================="
echo ""

# Check for API key
if [ -z "$DEEPSEEK_API_KEY" ]; then
  echo "⚠️  DEEPSEEK_API_KEY is not set."
  echo "    Run: export ANTHROPIC_API_KEY=sk-ant-your-key"
  echo ""
  exit 1
fi

# Start backend
echo "▶  Starting Python / FastAPI backend on port 8000…"
cd backend
if [ ! -d "venv" ]; then
  echo "   Creating virtual environment…"
  python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt -q
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 2

# Start frontend
echo "▶  Starting React / Vite frontend on port 5173…"
cd frontend
npm install --silent
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅  Both servers running!"
echo "   Frontend → http://localhost:5173"
echo "   Backend  → http://localhost:8000"
echo "   API Docs → http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers."
echo ""

# Wait and clean up on Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Servers stopped.'; exit 0" SIGINT SIGTERM
wait
