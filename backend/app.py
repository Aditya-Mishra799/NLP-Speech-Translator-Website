from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from googletrans import Translator, LANGUAGES
from gtts import gTTS
from fastapi.responses import StreamingResponse
import io

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://172.17.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

translator = Translator()

class TranslationRequest(BaseModel):
    text: str
    source_lang: str
    dest_lang: str

class TextToSpeechRequest(BaseModel):
    text: str
    lang: str


@app.get('/')
def welcome():
    return {'msg': 'Welcome to translator API backend.'}

@app.get("/languages")
def get_supported_languages():
    return LANGUAGES

@app.post("/translate")
def translate_text(request: TranslationRequest):
    translated = translator.translate(request.text, src=request.source_lang, dest=request.dest_lang)
    return {"translated_text": translated.text}

@app.post("/text-to-speech")
def text_to_speech(request: TextToSpeechRequest):
    tts = gTTS(text=request.text, lang=request.lang)
    audio_file = io.BytesIO()
    tts.write_to_fp(audio_file)
    audio_file.seek(0)
    return StreamingResponse(audio_file, media_type="audio/mpeg")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
