# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing/landing page for Dareway's (formerly Audentis), an IT services company offering two distinct service tracks:
- **Lab Technique**: IT technical expertise (Data & IA, Development, Cybersecurity, Cloud)
- **Hub Stratégique**: Strategic/governance consulting (Product Management, Cloud Strategy, Cyber Governance)

## Development Commands

### Setup
```bash
npm install          # Install dependencies
```

### Running the Application
```bash
npm start           # Starts Express proxy server on port 3000
```

Then open `audentis-site-v7 (8).html` in a browser using:
- VS Code Live Server extension, OR
- `file://` protocol directly

**Important**: The proxy server must be running for the chat interface to work.

## Architecture

### Dual-Site Architecture
The entire application is a single HTML file (`audentis-site-v7 (8).html`) containing two distinct experiences:
- **IT Track**: Dark theme with orange accents, technical focus
- **Strategic Track**: Light governmental theme, consulting focus

Theme switching is controlled via body classes (`theme-it`, `theme-gov`) which cascade to all components.

### Proxy Server Pattern
```
Browser → http://localhost:3000/api/chat → Anthropic Claude API
```

`proxy-server.js` is an Express server that:
- Bypasses CORS restrictions
- Hides Claude API key from browser exposure
- Forwards requests to Anthropic's Messages API (claude-3-haiku-20240307)

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
- **Welcome screen**: Initial site selection interface
- **Landing pages**: Hidden/shown via JavaScript based on navigation
- **Modal chat interface**: Overlay with conversation UI

### No Build System
This project runs directly in the browser with:
- Vanilla JavaScript (no framework)
- Pure CSS (no preprocessor)
- No bundler (webpack/vite/parcel)
- No transpilation required

## Key Technical Details

### File Structure
```
proxy-server.js                 # Express CORS proxy for Claude API
audentis-site-v7 (8).html      # Main single-page application
logo.png                        # Company logo
package.json                    # Node.js dependencies (express, cors, node-fetch)
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
- **Glassmorphism**: `backdrop-filter: blur()` effects throughout
- **Custom animations**: Circuit lines, grid movement, pulse effects
- **Radial gradients**: Ambient lighting effects
- **Smooth transitions**: All state changes animated

### API Integration
- **Model**: claude-3-haiku-20240307
- **Max tokens**: 1024
- **Endpoint**: POST /api/chat on proxy server
- **Authentication**: API key in proxy server (not exposed to browser)

## Security Considerations

### Current Issues
1. **API keys hardcoded** in both `proxy-server.js` and HTML file
2. **No rate limiting** on proxy server
3. **No authentication** - anyone who knows the URL can access the proxy
4. **EmailJS credentials** exposed in HTML

### Recommended Improvements
- Move API keys to `.env` file and use `dotenv` package
- Add rate limiting middleware (e.g., `express-rate-limit`)
- Consider adding basic authentication for proxy endpoints
- Implement CORS restrictions to only allow specific origins

## Theme Switching Mechanism

Themes are switched by:
1. Clicking site switcher button in header
2. Selecting a track in welcome screen
3. JavaScript toggles body classes: `theme-it` ↔ `theme-gov`
4. All CSS rules cascade from these body classes
5. Chat agent prompt switches to corresponding context

## Lead Collection Workflow

1. User asks question in chat
2. Claude responds with answer + `[COLLECTE:fieldname]` tag
3. JavaScript detects tag and shows input field
4. User submits data → stored in `chatState.leadData`
5. Field marked as collected in `chatState.collectedFields`
6. Process continues until all fields collected
7. EmailJS sends notification with lead data
