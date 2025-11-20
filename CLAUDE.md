# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing/landing page for Codentis (formerly Dareway's/Audentis), an IT services company offering two distinct service tracks:
- **Lab Technique**: IT technical expertise (Data & IA, Development, Cybersecurity, Cloud)
- **Hub Stratégique**: Strategic/governance consulting (Product Management, Cloud Strategy, Cyber Governance)

## Development Commands

### 🚀 Démarrage Automatique (RECOMMANDÉ)

Un script automatise le démarrage complet (backend + frontend) :

```bash
# Depuis le dossier frontend
./start.sh
# OU
npm start
```

Le script:
- ✅ Lance le backend automatiquement
- ✅ Attend que le serveur soit prêt
- ✅ Ouvre le frontend dans le navigateur
- ✅ Gère l'arrêt propre avec Ctrl+C

### 🔧 Démarrage Manuel (Alternative)

#### Backend Setup (REQUIRED)

Le backend doit être démarré **EN PREMIER** :

```bash
cd "../Undefined backend"
npm install          # Première fois seulement
npm start            # Démarre le serveur sur http://localhost:3000
```

#### Frontend Setup

Le frontend est un simple fichier HTML :
- Ouvrir `index.html` avec **VS Code Live Server**, OU
- Ouvrir `index.html` avec le protocole `file://` directement dans le navigateur

**Important**: Le backend doit être en cours d'exécution pour que le chat fonctionne.

## Architecture

### Séparation Frontend/Backend

```
Frontend (index.html)
    ↓ HTTP Request
Backend (localhost:3000)
    ↓ API Call
Anthropic Claude API
```

**Frontend** (`Undefined site/`)
- Single-page application (index.html)
- Vanilla JavaScript, pas de framework
- Appelle le backend via `fetch()`

**Backend** (`Undefined backend/`)
- Express server Node.js
- Gère l'API Claude de manière sécurisée
- Clé API protégée dans `.env` (jamais exposée au frontend)

### Dual-Site Architecture
The entire application is a single HTML file (`index.html`) containing two distinct experiences:
- **IT Track**: Terracota/dark theme with orange accents, technical focus
- **Strategic Track**: Ivoire/light governmental theme, consulting focus

Theme switching is controlled via body classes (`theme-it`, `theme-gov`) which cascade to all components.

### Backend API
```
POST http://localhost:3000/api/chat
Content-Type: application/json

{
  "messages": [
    { "role": "user", "content": "Bonjour" }
  ],
  "system": "Tu es un assistant..."
}
```

Le backend:
- Bypasses CORS restrictions
- Protège la clé API Claude (stockée dans .env)
- Forwards requests to Anthropic's Messages API (claude-3-haiku-20240307)
- Gère les erreurs et la validation

### Chat Agent System
AI-powered conversational agent with:
- **Two distinct prompts**: `PROMPT_IT` and `PROMPT_GOV` (context-aware based on selected track)
- **Lead qualification workflow**: Collects prenom, nom, societe, email, telephone
- **Special collection tags**: Chat responses contain `[COLLECTE:prenom]` markers that trigger data collection UI
- **State management**: `chatState` object tracks conversation history, current site, and lead data
- **EmailJS integration**: Sends notifications when conversations begin

### Component Structure
- **Mini sidebar**: Permanent navigation (Expertises, Découvrir, Nous rejoindre, Contact)
- **Dynamic island header**: Site switcher and logo navigation
- **Welcome screen**: Initial site selection interface with IT/Gov choice bubbles
- **Landing pages**: Hidden/shown via JavaScript based on navigation
- **Modal chat interface**: Overlay with conversation UI
- **Mobile menu**: Full-screen menu for mobile devices

### No Build System (Frontend)
This project runs directly in the browser with:
- Vanilla JavaScript (no framework)
- Pure CSS (no preprocessor)
- No bundler (webpack/vite/parcel)
- No transpilation required

## Key Technical Details

### File Structure
```
Undefined site/              # Frontend
├── index.html              # Single-page application
├── CLAUDE.md               # This file
├── TODO.md                 # Development tasks
└── LOGOOFFremovebg.png    # Company logo

Undefined backend/          # Backend (separate directory)
├── server.js              # Express API server
├── .env                   # Environment variables (NOT committed)
├── .env.example           # Template for .env
├── package.json           # Node dependencies
├── .gitignore            # Protects .env
└── README.md             # Backend documentation
```

### State Management
Global `chatState` object:
```javascript
{
    conversationHistory: [],     // Claude API message history
    currentSite: 'it',           // Current theme ('it' or 'gov')
    initialQuestion: '',         // User's first question
    leadData: { prenom, nom, societe, email, telephone },
    collectedFields: []          // Tracks which fields have been collected
}
```

### Visual Design System
- **Glassmorphism**: `backdrop-filter: blur()` effects (desktop only, disabled on mobile for performance)
- **Custom animations**: Circuit lines, grid movement, pulse effects
- **Radial gradients**: Ambient lighting effects on desktop
- **Smooth transitions**: All state changes animated
- **Mobile optimization**: Solid colors (#A0522D terracota for IT, #F5F3ED ivoire for Gov)

### API Integration
- **Model**: claude-3-haiku-20240307
- **Max tokens**: 1024
- **Endpoint**: POST http://localhost:3000/api/chat
- **Authentication**: API key stored securely in backend `.env` file

## Security

### ✅ Current Security (FIXED)
1. ✅ **API key protected**: Stored in backend `.env`, never exposed to frontend
2. ✅ **Separation of concerns**: Frontend and backend are completely separate
3. ✅ **.gitignore**: Backend has `.env` in gitignore to prevent accidental commits
4. ✅ **Environment template**: `.env.example` provides setup guidance

### ⚠️ Recommended Future Improvements
- Add rate limiting middleware (e.g., `express-rate-limit`)
- Add authentication for backend endpoints
- Restrict CORS to specific frontend origins (not all origins)
- Move EmailJS credentials to backend environment variables

## Theme Switching Mechanism

Themes are switched by:
1. Clicking site switcher button in header/mobile menu
2. Selecting a track in welcome screen
3. JavaScript toggles body classes: `theme-it` ↔ `theme-gov`
4. All CSS rules cascade from these body classes
5. Chat agent prompt switches to corresponding context (PROMPT_IT or PROMPT_GOV)

## Mobile Optimization

### Responsive Design
- **Web/iPad (>768px)**: Full desktop experience with gradients, glassmorphism
- **Mobile (≤768px)**: Optimized solid colors, full-screen menu, centered content

### Mobile Menu
- Full-screen overlay (100vw × 100vh)
- All sections visible: Expertises, Découvrir, Rejoindre, Contact, Switcher
- Z-index: 10000 (appears above all content)
- Click handlers navigate via `showPage()` function

### Mobile Colors
- **IT Track**: #A0522D (Sienna terracota premium)
- **Gov Track**: #F5F3ED (Ivoire)
- Solid backgrounds for better performance on iOS/Android

## Lead Collection Workflow

1. User asks question in chat
2. Claude responds with answer + `[COLLECTE:fieldname]` tag
3. JavaScript detects tag and shows input field
4. User submits data → stored in `chatState.leadData`
5. Field marked as collected in `chatState.collectedFields`
6. Process continues until all fields collected
7. EmailJS sends notification with lead data

## Development Workflow

1. **Start backend** (terminal 1):
   ```bash
   cd "../Undefined backend"
   npm start
   ```

2. **Open frontend** (VS Code or browser):
   - Use Live Server extension, OR
   - Open `index.html` directly in browser

3. **Test chat**:
   - Click on "Contact" or use chat interface
   - Backend logs should show requests
   - Frontend should receive Claude responses

## Troubleshooting

### Chat not working?
1. ✅ Verify backend is running (`http://localhost:3000/health`)
2. ✅ Check browser console for errors
3. ✅ Check backend terminal for error logs
4. ✅ Verify `.env` file exists with valid `CLAUDE_API_KEY`

### Backend issues?
1. ✅ Run `npm install` in `Undefined backend/` directory
2. ✅ Copy `.env.example` to `.env` and add your Claude API key
3. ✅ Check that port 3000 is not already in use
4. ✅ Review backend logs in terminal
