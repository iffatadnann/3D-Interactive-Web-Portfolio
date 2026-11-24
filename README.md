# Lantern Portfolio

A Tangled-inspired, interactive 3D portfolio built around a magical night sky and floating lantern navigation.

## Project structure

- `frontend/` — React + Vite + Three.js / React Three Fiber
- `backend/` — Django REST API (contact form and RAG chatbot will be added here)
- `blender/` — original mascot and lantern source files, textures, and GLB exports
- `after-effects/` — promotional video project and assets
- `documentation/` — report, diagrams, screenshots, and testing evidence

## Requirements

- Node.js LTS and npm
- Python 3.11+
- Git
- Blender
- Adobe After Effects
- Antigravity (for AI-assisted development)

## 1. Frontend setup

Open a terminal in `frontend/` and run:

```bash
npm install
npm run dev
```

Vite will print the local development URL.

## 2. Backend setup (Windows PowerShell)

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
py manage.py migrate
py manage.py runserver
```

If PowerShell blocks activation, use Command Prompt:

```bat
.venv\Scripts\activate.bat
```

## 3. Environment variables

Copy `backend/.env.example` to `backend/.env` and fill in values when the email and RAG modules are implemented. Never commit `.env` files or API keys.

## 4. Creative assets

- Save the editable mascot project in `blender/mascot/`.
- Export optimized web models as `.glb` into `frontend/public/models/`.
- Save the editable After Effects project in `after-effects/`.
- Export the final promotional video as MP4 into `frontend/public/videos/`.

## Planned experience

1. Visitors arrive in a starry night sky.
2. Floating lanterns represent portfolio sections.
3. Selecting a lantern opens the corresponding section or project.
4. The mascot welcomes visitors with idle, wave, blink, and wink animations.
5. A small guide/chat interface answers questions using portfolio documents.
6. The contact form sends messages securely through the Django backend.

## Development principle

Build and test one module at a time. Keep the first version lightweight: one optimized mascot GLB, a small number of interactive lanterns, and a responsive HTML navigation fallback.
