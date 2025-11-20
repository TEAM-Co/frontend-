#!/bin/bash

# Script de démarrage automatique - Undefined Site
# Lance le backend + ouvre le frontend dans le navigateur

BACKEND_DIR="../Undefined backend"
FRONTEND_FILE="index.html"
PORT=3000

echo "🚀 Démarrage Undefined Site..."
echo ""

# Vérifier que le backend existe
if [ ! -d "$BACKEND_DIR" ]; then
    echo "❌ Erreur: Le dossier backend '$BACKEND_DIR' n'existe pas"
    exit 1
fi

# Vérifier que node_modules est installé dans le backend
if [ ! -d "$BACKEND_DIR/node_modules" ]; then
    echo "📦 Installation des dépendances backend..."
    cd "$BACKEND_DIR"
    npm install
    cd - > /dev/null
fi

# Fonction pour nettoyer à la fermeture
cleanup() {
    echo ""
    echo "🛑 Arrêt du serveur backend..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    exit 0
}

trap cleanup SIGINT SIGTERM

# Lancer le backend en arrière-plan
echo "🔧 Démarrage du backend..."
cd "$BACKEND_DIR"
node server.js &
BACKEND_PID=$!
cd - > /dev/null

# Attendre que le serveur soit prêt (max 10 secondes)
echo "⏳ Attente du serveur backend..."
for i in {1..20}; do
    if curl -s http://localhost:$PORT/health > /dev/null 2>&1; then
        echo "✅ Backend prêt sur http://localhost:$PORT"
        break
    fi
    if [ $i -eq 20 ]; then
        echo "❌ Erreur: Le backend n'a pas démarré après 10 secondes"
        kill $BACKEND_PID 2>/dev/null
        exit 1
    fi
    sleep 0.5
done

echo ""
echo "🌐 Ouverture du frontend dans le navigateur..."
open "$FRONTEND_FILE"

echo ""
echo "✨ Site Undefined lancé avec succès !"
echo ""
echo "📍 Backend: http://localhost:$PORT"
echo "📍 Frontend: $FRONTEND_FILE"
echo ""
echo "💡 Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""

# Garder le script actif et afficher les logs du backend
wait $BACKEND_PID
