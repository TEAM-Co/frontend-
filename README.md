# Frontend Undefined (Codentis)

Site marketing/landing page pour Codentis avec deux parcours distincts :
- **Lab Technique** : Expertise IT (Data & IA, Dev, Cyber, Cloud)
- **Hub Stratégique** : Conseil stratégique (Product, Strategy, Gouvernance)

## 🚀 Démarrage Rapide

### Démarrage Automatique

```bash
./start.sh
```

Le script lance automatiquement :
- ✅ Backend sécurisé (Node.js + Express)
- ✅ Frontend dans le navigateur
- ✅ Arrêt propre avec Ctrl+C

### Démarrage Manuel (Alternative)

1. Démarrer le backend :
```bash
cd "../Undefined backend"
npm install  # Première fois seulement
npm start
```

2. Ouvrir `index.html` dans le navigateur

## 📁 Architecture

```
Frontend (ce dossier)
  ↓ HTTP Request
Backend (../Undefined backend)
  ↓ API Call (clé sécurisée)
Claude API
```

**Frontend** : Single-page application (HTML/CSS/JS vanilla)
**Backend** : Express server avec clé API protégée dans `.env`

## 🔒 Sécurité

- ✅ Clé API Claude stockée dans le backend (`.env`)
- ✅ Jamais exposée au frontend
- ✅ CORS configuré
- ✅ `.env` protégé par `.gitignore`

## 📝 Fichiers Principaux

- `index.html` : Application complète (IT + Gov tracks)
- `start.sh` : Script de démarrage automatique
- `CLAUDE.md` : Documentation détaillée pour développeurs

## 💬 Chat Agent

Le chat utilise Claude (Haiku) pour :
- Qualification de leads (prénom, nom, société, email, téléphone)
- Réponses contextuelles (IT ou Gov selon le parcours)
- Notifications EmailJS automatiques

## 🎨 Thèmes

Deux thèmes complets contrôlés par les classes body :
- `theme-it` : Terracota/dark avec accents orange
- `theme-gov` : Ivoire/light thème gouvernemental

## 📱 Responsive

Optimisé pour :
- Desktop (>768px)
- Tablet (768px)
- Mobile (≤480px)

## ⚠️ Important

Le backend **DOIT** être lancé avant d'utiliser le frontend pour que le chat fonctionne.

Utiliser `./start.sh` pour éviter les oublis !
