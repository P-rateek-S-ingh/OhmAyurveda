from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import anthropic
from openai import OpenAI
import json
import re
import os

app = FastAPI(title="Vaidya Ayurveda API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(
    api_key= os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com",
)  # reads DEEPSEEK_API_KEY from env


class ConsultRequest(BaseModel):
    query: str


class CategoryRequest(BaseModel):
    name: str


def clean_json(text: str) -> dict:
    text = re.sub(r"```json|```", "", text).strip()
    return json.loads(text)


@app.get("/")
def root():
    return {"message": "Vaidya Ayurveda API — Ancient Wisdom, Modern Interface"}


@app.post("/api/consult")
def consult(req: ConsultRequest):
    if not req.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    prompt = f"""You are a Vaidya (Ayurvedic physician) with mastery of Charaka Samhita, Sushruta Samhita, and Ashtanga Hridayam.
A patient presents with: "{req.query}"

Respond ONLY in valid JSON, no markdown, no preamble:
{{
  "title": "Condition name",
  "sanskrit": "Classical Sanskrit term",
  "dosha": "Primary Dosha imbalance (Vata/Pitta/Kapha/Tridoshic)",
  "overview": "2-3 sentence classical Ayurvedic pathology citing one of the three classical texts",
  "cures": {{
    "herbs": ["Herb — preparation/dose — classical source", "...4-5 herbs"],
    "formulas": ["Classical formula name (text ref) — indication", "...2-3 formulas"],
    "therapies": ["Panchakarma or external therapy with indication", "...2 therapies"],
    "diet": ["Specific dietary recommendation", "...3-4 recommendations"]
  }},
  "precautions": ["Specific precaution", "...4 precautions"],
  "avoid": {{
    "foods": ["Specific food to avoid and why", "...3-4 foods"],
    "habits": ["Specific habit to avoid", "...2-3 habits"],
    "substances": ["Substance to avoid", "...2 substances"]
  }},
  "travel": {{
    "avoid_climates": ["Climate type and why it aggravates this condition", "...2 climates"],
    "avoid_places": ["Specific environment/place type to avoid with reason", "...3 places"],
    "travel_tips": ["Practical Ayurvedic travel precaution", "...3 tips"]
  }},
  "disclaimer": "One sentence: consult a qualified Vaidya"
}}"""

    response = client.chat.completions.create(
        model="deepseek-chat",
        max_tokens=1600,
        messages=[{"role": "user", "content": prompt}],
    )

    return clean_json(response.choices[0].message.content)


@app.post("/api/category")
def category_info(req: CategoryRequest):
    if not req.name.strip():
        raise HTTPException(status_code=400, detail="Category name cannot be empty")

    prompt = f"""You are a Vaidya master of Charaka Samhita, Sushruta Samhita, Ashtanga Hridayam.
Explain "{req.name}" from classical Ayurvedic perspective.
JSON only, no markdown:
{{
  "title": "{req.name}",
  "intro": "2-sentence classical Ayurvedic perspective",
  "dosha_link": "Which Dosha governs this system and classical explanation",
  "key_herbs": [{{"name": "Herb", "sanskrit": "Sanskrit name", "use": "specific classical use"}}],
  "key_formulas": [{{"name": "Formula name", "source": "text source", "use": "indication"}}],
  "lifestyle": ["Dinacharya recommendation 1", "recommendation 2", "recommendation 3"],
  "diet": {{"favour": ["Food 1", "Food 2", "Food 3"], "avoid": ["Food 1", "Food 2"]}},
  "yoga": ["Asana/Pranayama with specific benefit", "practice 2", "practice 3"],
  "seasonal_tips": "Classical seasonal advice for this system"
}}"""

    response = client.chat.completions.create(
        model="deepseek-chat",
        max_tokens=1200,
        messages=[{"role": "user", "content": prompt}],
    )

    return clean_json(response.choices[0].message.content)
