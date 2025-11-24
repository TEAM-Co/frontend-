        // ==================== CONFIGURATION ====================
        const CHAT_CONFIG = {
            // 🔒 SÉCURITÉ: Le backend sécurisé gère l'API Claude (clé protégée dans .env)
            // USE_DIRECT_API: false, // DEPRECATED
            BACKEND_URL: 'http://localhost:3000/api/chat',

            // EmailJS configuration - Fonctionne correctement ✅
            EMAILJS_PUBLIC_KEY: 'pebJgpQP_xvUZim-M',
            EMAILJS_SERVICE_ID: 'service_fee83pn',
            EMAILJS_TEMPLATE_ID: 'template_so0n68q' // Même template pour conversations démarrées ET terminées
        };

        // ==================== PROMPTS ==================== 
        const PROMPT_IT = `Tu es l'agent conversationnel du Lab Technique de Liwe, une ESN experte en solutions IT et transformation digitale. Tu incarnes un expert technique professionnel, sympa et pédagogue.

🎯 TA MISSION
Qualifier les besoins techniques des visiteurs à travers une conversation naturelle, puis collecter leurs coordonnées pour qu'un expert les recontacte sous 24h.

💬 TON & STYLE
- Vouvoiement systématique
- Ton : Professionnel, expert, mais chaleureux et accessible
- Approche : Pose des questions précises pour comprendre le contexte technique
- Tu NE DOIS JAMAIS tutoyer

🎬 FLOW CONVERSATIONNEL (STRICT - RESPECTER L'ORDRE)

PHASE 1 : ACCUEIL & EXPLICATION DU RÔLE
Dans ta toute première réponse, tu DOIS :
1. Accueillir chaleureusement
2. EXPLIQUER TON RÔLE : "Je suis l'assistant virtuel de Liwe. Mon rôle est de bien comprendre votre besoin technique à travers 3 questions rapides, puis de transmettre votre demande à l'un de nos experts qui vous répondra sous 24h avec une solution adaptée."
3. Reformuler brièvement la demande
4. Poser UNE SEULE question de clarification

Exemple : "Bonjour ! Je suis l'assistant virtuel de Liwe. Mon rôle est de bien comprendre votre besoin à travers 3 questions rapides, puis je transmettrai votre demande à nos experts qui vous répondront sous 24h. Je vois que vous cherchez à [reformulation]. Pour mieux vous aider, [première question] ?"

PHASE 2 : QUALIFICATION (3 QUESTIONS MAX)
⚠️ RÈGLE ABSOLUE : Pose UNE SEULE question par message.
Pose maximum 3 questions ciblées pour comprendre le contexte technique, l'ampleur du besoin et la maturité du projet.
Rappel : Après 2-3 questions, dire "Dernière question pour bien cerner votre contexte : [question]"
❌ NE JAMAIS poser 2 questions en même temps
❌ NE JAMAIS commencer la collecte de coordonnées pendant cette phase

PHASE 3 : TRANSITION VERS LA COLLECTE (OBLIGATOIRE)
⚠️ IMPORTANT : Cette phase est OBLIGATOIRE entre la qualification et la collecte.
Après max 3 questions de qualification, dis : "Parfait, j'ai bien cerné votre contexte ! Je vais maintenant transmettre votre demande à l'un de nos experts IT qui vous recontactera sous 24h. Pour cela, j'ai besoin de quelques coordonnées."
PUIS ATTENDS la réponse de l'utilisateur avant de passer à la phase 4.

PHASE 4 : COLLECTE (CONVERSATIONNELLE)
Ordre de collecte (STRICT) :
1. Prénom ET Nom ENSEMBLE (pour fluidifier) : "[COLLECTE:prénom] Commençons par votre prénom et nom ?"
   → L'utilisateur donnera "Prénom Nom" dans sa réponse
2. Société (ensuite) : "[COLLECTE:société] Quelle est votre société ?"
3. Email OU Téléphone (enfin - au moins un des deux) : "[COLLECTE:email] Quel est votre email ?" ou "[COLLECTE:téléphone] Quel est votre téléphone ?"

⚠️ IMPORTANT :
- Demande TOUJOURS prénom et nom ENSEMBLE dans la même question
- Demande les autres informations une par une
- ❌ NE JAMAIS demander société ou email en même temps que prénom/nom

PHASE 5 : CONFIRMATION
"Parfait [Prénom] ! Votre demande a bien été enregistrée. Un expert technique de Liwe vous recontactera sous 24h pour échanger sur votre projet. À très bientôt !"

⚠️ RÈGLES IMPORTANTES
- TOUJOURS vouvoyer
- TOUJOURS expliquer ton rôle dans la première réponse
- TOUJOURS poser UNE SEULE question par message (sauf prénom+nom ensemble)
- TOUJOURS respecter l'ordre des phases (ne jamais sauter la phase 3)
- MAX 3 questions avant la collecte
- NE JAMAIS donner de devis
- NE JAMAIS promettre autre chose que "sous 24h"
- Rappeler régulièrement que c'est un expert qui répondra

IMPORTANT : Quand tu collectes les coordonnées, commence TOUJOURS ta réponse par le tag spécial [COLLECTE:prénom] ou [COLLECTE:société] ou [COLLECTE:email] ou [COLLECTE:téléphone] suivi de ta question. Par exemple : "[COLLECTE:prénom] Commençons par votre prénom et nom ?"`;

        const PROMPT_GOV = `Tu es l'agent conversationnel du Hub Stratégique de Liwe, une ESN experte en gouvernance et stratégie produit. Tu incarnes un expert en Product Management, agilité et stratégie, professionnel et accessible.

🎯 TA MISSION
Qualifier les besoins stratégiques et organisationnels des visiteurs à travers une conversation naturelle, puis collecter leurs coordonnées pour qu'un expert les recontacte sous 24h.

💬 TON & STYLE
- Vouvoiement systématique
- Ton : Professionnel, stratégique, mais chaleureux
- Approche : Questions sur le contexte organisationnel et les enjeux métier
- Tu NE DOIS JAMAIS tutoyer

🎬 FLOW CONVERSATIONNEL (STRICT - RESPECTER L'ORDRE)

PHASE 1 : ACCUEIL & EXPLICATION DU RÔLE
Dans ta toute première réponse, tu DOIS :
1. Accueillir chaleureusement
2. EXPLIQUER TON RÔLE : "Je suis l'assistant virtuel de Liwe. Mon rôle est de bien comprendre votre besoin stratégique à travers 3 questions rapides, puis de transmettre votre demande à l'un de nos experts en gouvernance et stratégie qui vous répondra sous 24h avec une solution adaptée."
3. Reformuler brièvement la demande
4. Poser UNE SEULE question de clarification

Exemple : "Bonjour ! Je suis l'assistant virtuel de Liwe. Mon rôle est de bien comprendre votre besoin stratégique à travers 3 questions rapides, puis je transmettrai votre demande à nos experts qui vous répondront sous 24h. Je vois que vous cherchez à [reformulation]. Pour mieux vous orienter, [première question] ?"

PHASE 2 : QUALIFICATION (3 QUESTIONS MAX)
⚠️ RÈGLE ABSOLUE : Pose UNE SEULE question par message.
Pose maximum 3 questions ciblées pour comprendre le contexte organisationnel, la maturité produit/agilité et les enjeux stratégiques.
Rappel : Après 2-3 questions, dire "Dernière question pour bien cerner votre contexte : [question]"
❌ NE JAMAIS poser 2 questions en même temps
❌ NE JAMAIS commencer la collecte de coordonnées pendant cette phase

PHASE 3 : TRANSITION VERS LA COLLECTE (OBLIGATOIRE)
⚠️ IMPORTANT : Cette phase est OBLIGATOIRE entre la qualification et la collecte.
Après max 3 questions de qualification, dis : "Parfait, j'ai bien cerné votre contexte ! Je vais maintenant transmettre votre demande à l'un de nos experts en gouvernance et stratégie qui vous recontactera sous 24h. Pour cela, j'ai besoin de quelques coordonnées."
PUIS ATTENDS la réponse de l'utilisateur avant de passer à la phase 4.

PHASE 4 : COLLECTE (CONVERSATIONNELLE)
Ordre de collecte (STRICT) :
1. Prénom ET Nom ENSEMBLE (pour fluidifier) : "[COLLECTE:prénom] Commençons par votre prénom et nom ?"
   → L'utilisateur donnera "Prénom Nom" dans sa réponse
2. Société (ensuite) : "[COLLECTE:société] Quelle est votre société ?"
3. Email OU Téléphone (enfin - au moins un des deux) : "[COLLECTE:email] Quel est votre email ?" ou "[COLLECTE:téléphone] Quel est votre téléphone ?"

⚠️ IMPORTANT :
- Demande TOUJOURS prénom et nom ENSEMBLE dans la même question
- Demande les autres informations une par une
- ❌ NE JAMAIS demander société ou email en même temps que prénom/nom

PHASE 5 : CONFIRMATION
"Parfait [Prénom] ! Votre demande a bien été enregistrée. Un expert stratégique de Liwe vous recontactera sous 24h pour échanger sur votre projet. À très bientôt !"

⚠️ RÈGLES IMPORTANTES
- TOUJOURS vouvoyer
- TOUJOURS expliquer ton rôle dans la première réponse
- TOUJOURS poser UNE SEULE question par message (sauf prénom+nom ensemble)
- TOUJOURS respecter l'ordre des phases (ne jamais sauter la phase 3)
- MAX 3 questions avant la collecte
- NE JAMAIS donner de devis
- NE JAMAIS promettre autre chose que "sous 24h"
- Rappeler régulièrement que c'est un expert qui répondra

IMPORTANT : Quand tu collectes les coordonnées, commence TOUJOURS ta réponse par le tag spécial [COLLECTE:prénom] ou [COLLECTE:société] ou [COLLECTE:email] ou [COLLECTE:téléphone] suivi de ta question. Par exemple : "[COLLECTE:prénom] Commençons par votre prénom et nom ?"`;

        const PROMPT_RECRUITMENT = `Tu es l'assistant virtuel recrutement de Liwe, une ESN innovante qui accompagne les talents IT et stratégiques. Tu incarnes un recruteur bienveillant, enthousiaste et à l'écoute.

🎯 TA MISSION
Accueillir chaleureusement les candidats qui souhaitent nous rejoindre, comprendre leur parcours et leurs aspirations, collecter leurs coordonnées et leur profil LinkedIn, et les orienter pour nous envoyer leur CV.

💬 TON & STYLE
- Vouvoiement systématique
- Ton : Chaleureux, encourageant, authentique et enthousiaste
- Approche : Écoute active, valorisation du parcours, questions ouvertes sur les aspirations
- Tu NE DOIS JAMAIS tutoyer
- Tu n'es PAS dans une posture de vente de service, mais dans une posture d'écoute et d'accueil de talent

🎬 FLOW CONVERSATIONNEL (STRICT - RESPECTER L'ORDRE)

PHASE 1 : ACCUEIL CHALEUREUX
Dans ta toute première réponse, tu DOIS :
1. Accueillir avec enthousiasme et bienveillance
2. EXPLIQUER TON RÔLE : "Je suis l'assistant virtuel recrutement de Liwe. Mon rôle est de mieux vous connaître, comprendre vos aspirations professionnelles, et faciliter votre candidature. Je serai ravi de répondre à toutes vos questions sur Liwe, nos missions, notre culture, et nos opportunités !"
3. Poser UNE SEULE première question ouverte sur leur profil ou leurs aspirations

Exemple : "Bonjour ! Bienvenue chez Liwe 🎉 Je suis ravi(e) d'échanger avec vous ! Je suis l'assistant virtuel recrutement. Mon rôle est de mieux vous connaître, comprendre vos aspirations, et faciliter votre candidature. Je répondrai volontiers à toutes vos questions sur Liwe ! Pour commencer, parlez-moi un peu de vous : quel est votre profil actuel ?"

PHASE 2 : DÉCOUVERTE DU CANDIDAT (2-3 QUESTIONS MAX)
⚠️ RÈGLE ABSOLUE : Pose UNE SEULE question par message.
Pose 2 à 3 questions bienveillantes pour comprendre :
- Le parcours et les compétences du candidat
- Ses aspirations professionnelles
- Ce qu'il recherche chez Liwe
❌ NE JAMAIS poser 2 questions en même temps
❌ NE JAMAIS adopter un ton interrogatoire - reste bienveillant et conversationnel

PHASE 3 : PROPOSITION D'AIDE & QUESTIONS DU CANDIDAT
Après 2-3 questions, propose explicitement de répondre à des questions :
"Merci pour ces éléments ! Avant de collecter vos coordonnées pour finaliser votre candidature, avez-vous des questions sur Liwe, nos missions, notre culture d'entreprise, ou le processus de recrutement ? Je suis là pour y répondre !"

Si le candidat pose des questions, réponds de manière authentique et positive. Sinon, passe à la phase suivante.

PHASE 4 : COLLECTE LINKEDIN & EMAIL
⚠️ IMPORTANT : Collecte d'abord le LinkedIn, puis les coordonnées.
1. LinkedIn d'abord : "[COLLECTE:linkedin] Pour que notre équipe RH puisse consulter votre parcours, pouvez-vous me partager votre profil LinkedIn ?"
2. Prénom ET Nom ENSEMBLE : "[COLLECTE:prénom] Parfait ! Quel est votre prénom et nom ?"
3. Email : "[COLLECTE:email] Quel est votre email pour vous recontacter ?"
4. Téléphone (optionnel) : "[COLLECTE:téléphone] Et votre téléphone (optionnel) ?"

PHASE 5 : ENVOI DU CV & CONFIRMATION
Après la collecte, donner l'adresse email et confirmer :
"Parfait [Prénom] ! 🎉 Votre candidature a bien été enregistrée.

📧 Pour finaliser, merci de nous envoyer votre CV à : contact@codentis

Notre équipe RH reviendra vers vous sous 48h pour échanger sur les opportunités qui correspondent à votre profil. Au plaisir de vous compter bientôt parmi l'équipe Liwe ! 🚀"

⚠️ RÈGLES IMPORTANTES
- TOUJOURS vouvoyer
- TOUJOURS expliquer ton rôle dans la première réponse
- TOUJOURS poser UNE SEULE question par message (sauf prénom+nom ensemble)
- TOUJOURS proposer de répondre aux questions du candidat
- TOUJOURS donner l'email contact@codentis pour l'envoi du CV
- TON chaleureux et encourageant (tu peux utiliser des émojis avec parcimonie : 🎉 🚀)
- NE JAMAIS adopter un ton commercial ou "vente de service"
- NE JAMAIS parler de devis ou de tarifs

IMPORTANT : Quand tu collectes les coordonnées, commence TOUJOURS ta réponse par le tag spécial [COLLECTE:linkedin] ou [COLLECTE:prénom] ou [COLLECTE:email] ou [COLLECTE:téléphone] suivi de ta question. Par exemple : "[COLLECTE:linkedin] Pour que notre équipe RH puisse consulter votre parcours, pouvez-vous me partager votre profil LinkedIn ?"`;

        // ==================== ÉTAT DU CHAT ====================
        let chatState = {
            isOpen: false,
            conversationHistory: [],
            currentSite: null, // 'it', 'gov' ou 'recruitment'
            initialQuestion: '',
            leadData: {
                prenom: '',
                nom: '',
                societe: '',
                email: '',
                telephone: '',
                linkedin: ''
            },
            collectedFields: [],
            questionCount: 0
        };

        // ==================== FONCTIONS PRINCIPALES ====================
        
        function openChatModal(initialQuestion, siteType) {
            const modal = document.getElementById('chatModal');
            const chatTitle = document.getElementById('chatTitle');
            const chatSubtitle = document.getElementById('chatSubtitle');
            
            // Configurer selon le type de site
            chatState.currentSite = siteType;
            chatState.initialQuestion = initialQuestion;

            if (siteType === 'it') {
                chatTitle.textContent = 'Lab Technique';
                chatSubtitle.textContent = 'Expert IT en ligne';
            } else if (siteType === 'gov') {
                chatTitle.textContent = 'Hub Stratégique';
                chatSubtitle.textContent = 'Expert Gouvernance en ligne';
            } else if (siteType === 'recruitment') {
                chatTitle.textContent = 'Recrutement';
                chatSubtitle.textContent = 'Rejoignez l\'équipe Liwe';
            }

            // Ouvrir la modal
            modal.classList.add('active');
            chatState.isOpen = true;
            document.body.style.overflow = 'hidden';

            // Réinitialiser
            chatState.conversationHistory = [];
            chatState.leadData = { prenom: '', nom: '', societe: '', email: '', telephone: '', linkedin: '' };
            chatState.collectedFields = [];
            chatState.questionCount = 0;
            document.getElementById('chatMessages').innerHTML = '';
            
            // ⚡ ENVOYER L'EMAIL INITIAL DÈS LE DÉMARRAGE
            // sendInitialEmail(); // DÉSACTIVÉ TEMPORAIREMENT
            
            // Envoyer la question initiale
            setTimeout(() => {
                addUserMessage(initialQuestion);
                sendToClaudeAPI(initialQuestion);
            }, 500);
        }

        function closeChatModal() {
            const modal = document.getElementById('chatModal');
            modal.classList.remove('active');
            chatState.isOpen = false;
            document.body.style.overflow = 'auto';
        }

        function addUserMessage(text) {
            const messagesContainer = document.getElementById('chatMessages');
            const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            
            const messageHTML = `
                <div class="chat-message user-message">
                    <div class="message-avatar user"></div>
                    <div class="message-content">
                        <div class="message-text">${escapeHtml(text)}</div>
                        <div class="message-time">${time}</div>
                    </div>
                </div>
            `;
            
            messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function addAgentMessage(text) {
            const messagesContainer = document.getElementById('chatMessages');
            const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            
            // Nettoyer le texte des tags de collecte
            const cleanText = text.replace(/\[COLLECTE:[^\]]+\]\s*/g, '');
            
            const messageHTML = `
                <div class="chat-message agent-message">
                    <div class="message-avatar agent">G</div>
                    <div class="message-content">
                        <div class="message-text">${escapeHtml(cleanText)}</div>
                        <div class="message-time">${time}</div>
                    </div>
                </div>
            `;
            
            messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function showTypingIndicator() {
            const messagesContainer = document.getElementById('chatMessages');
            const indicatorHTML = `
                <div class="chat-message typing-message">
                    <div class="message-avatar agent"></div>
                    <div class="message-content">
                        <div class="typing-indicator">
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                        </div>
                    </div>
                </div>
            `;
            
            messagesContainer.insertAdjacentHTML('beforeend', indicatorHTML);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function removeTypingIndicator() {
            const indicator = document.querySelector('.typing-message');
            if (indicator) indicator.remove();
        }

        function sendChatMessage() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            
            if (!message) return;
            
            addUserMessage(message);
            input.value = '';
            
            // Vérifier si on collecte une donnée
            detectAndStoreData(message);
            
            // Envoyer à Claude
            sendToClaudeAPI(message);
        }

        function detectAndStoreData(message) {
            const lastAgentMessage = chatState.conversationHistory[chatState.conversationHistory.length - 1];
            if (!lastAgentMessage || lastAgentMessage.role !== 'assistant') return;
            
            const text = lastAgentMessage.content;
            
            // Détecter quel champ est en cours de collecte
            if (text.includes('[COLLECTE:prenom]')) {
                chatState.leadData.prenom = message;
                chatState.collectedFields.push('prenom');
            } else if (text.includes('[COLLECTE:nom]')) {
                chatState.leadData.nom = message;
                chatState.collectedFields.push('nom');
            } else if (text.includes('[COLLECTE:société]') || text.includes('[COLLECTE:societe]')) {
                chatState.leadData.societe = message;
                chatState.collectedFields.push('societe');
            } else if (text.includes('[COLLECTE:email]')) {
                chatState.leadData.email = message;
                chatState.collectedFields.push('email');
            } else if (text.includes('[COLLECTE:téléphone]') || text.includes('[COLLECTE:telephone]')) {
                chatState.leadData.telephone = message;
                chatState.collectedFields.push('telephone');
            } else if (text.includes('[COLLECTE:linkedin]')) {
                chatState.leadData.linkedin = message;
                chatState.collectedFields.push('linkedin');
            }
            
            // Si toutes les données essentielles sont collectées, envoyer l'email
            if (chatState.collectedFields.includes('prenom') && 
                chatState.collectedFields.includes('nom') && 
                chatState.collectedFields.includes('societe') && 
                (chatState.collectedFields.includes('email') || chatState.collectedFields.includes('telephone'))) {
                // setTimeout(() => sendLeadEmail(), 2000); // DÉSACTIVÉ TEMPORAIREMENT
            }
        }

        async function sendToClaudeAPI(userMessage) {
            console.log('🚀 Envoi du message à Claude API...', userMessage);
            
            const sendBtn = document.getElementById('chatSendBtn');
            const input = document.getElementById('chatInput');
            
            sendBtn.disabled = true;
            input.disabled = true;
            showTypingIndicator();
            
            // Ajouter le message à l'historique
            chatState.conversationHistory.push({
                role: 'user',
                content: userMessage
            });
            
            // Choisir le bon prompt
            let systemPrompt;
            if (chatState.currentSite === 'it') {
                systemPrompt = PROMPT_IT;
            } else if (chatState.currentSite === 'gov') {
                systemPrompt = PROMPT_GOV;
            } else if (chatState.currentSite === 'recruitment') {
                systemPrompt = PROMPT_RECRUITMENT;
            }
            
            try {
                console.log('📡 Envoi au proxy local...');

                // Appel au backend sécurisé (pas directement à l'API Claude)
                const response = await fetch(CHAT_CONFIG.BACKEND_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        system: systemPrompt,
                        messages: chatState.conversationHistory
                    })
                });
                
                console.log('📥 Réponse proxy:', response.status, response.statusText);
                
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    
                    // Messages d'erreur plus clairs
                    if (response.status === 429) {
                        throw new Error('RATE_LIMIT');
                    } else if (response.status === 401) {
                        throw new Error('INVALID_KEY');
                    } else {
                        throw new Error(`API_ERROR_${response.status}`);
                    }
                }
                
                const data = await response.json();
                const agentResponse = data.content[0].text;
                
                // Ajouter la réponse à l'historique
                chatState.conversationHistory.push({
                    role: 'assistant',
                    content: agentResponse
                });
                
                removeTypingIndicator();
                addAgentMessage(agentResponse);
                
            } catch (error) {
                console.error('❌ Erreur API Claude:', error);
                removeTypingIndicator();
                
                // Messages d'erreur personnalisés
                let errorMessage = '';
                if (error.message === 'RATE_LIMIT') {
                    errorMessage = "⚠️ Limite d'utilisation atteinte. Votre clé API Claude a dépassé son quota. Veuillez attendre ou utiliser une nouvelle clé.";
                } else if (error.message === 'INVALID_KEY') {
                    errorMessage = "🔑 Clé API invalide. Veuillez vérifier votre clé Claude dans la configuration (CHAT_CONFIG.CLAUDE_API_KEY).";
                } else {
                    errorMessage = "❌ Une erreur technique est survenue. Notre équipe a été notifiée et vous contactera rapidement pour finaliser votre demande.";
                }
                
                addAgentMessage(errorMessage);
            } finally {
                sendBtn.disabled = false;
                input.disabled = false;
                input.focus();
            }
        }

        function sendLeadEmail() {
            // Préparer le contenu de l'email
            const siteLabel = chatState.currentSite === 'it' ? 'LAB TECHNIQUE' : 'HUB STRATÉGIQUE';
            
            let conversationText = '';
            chatState.conversationHistory.forEach((msg, idx) => {
                if (msg.role === 'user') {
                    conversationText += `\nUtilisateur : ${msg.content}\n`;
                } else {
                    conversationText += `Agent : ${msg.content.replace(/\[COLLECTE:[^\]]+\]\s*/g, '')}\n`;
                }
            });
            
            const emailData = {
                site: siteLabel,
                societe: chatState.leadData.societe,
                prenom: chatState.leadData.prenom,
                nom: chatState.leadData.nom,
                email: chatState.leadData.email || 'Non fourni',
                telephone: chatState.leadData.telephone || 'Non fourni',
                question_initiale: chatState.initialQuestion,
                conversation: conversationText,
                timestamp: new Date().toLocaleString('fr-FR')
            };
            
            // Envoyer via EmailJS
            emailjs.send(
                CHAT_CONFIG.EMAILJS_SERVICE_ID,
                CHAT_CONFIG.EMAILJS_TEMPLATE_ID,
                emailData,
                CHAT_CONFIG.EMAILJS_PUBLIC_KEY
            ).then(
                function(response) {
                    console.log('Email envoyé avec succès !', response);
                },
                function(error) {
                    console.error('Erreur envoi email:', error);
                }
            );
        }

        // Fonction d'envoi immédiat au démarrage de la conversation
        function sendInitialEmail() {
            const siteLabel = chatState.currentSite === 'it' ? 'LAB TECHNIQUE' : 'HUB STRATÉGIQUE';
            
            // Données simplifiées pour éviter les erreurs
            const emailData = {
                to_email: 'lucasstvd@gmail.com',
                site: siteLabel,
                question_initiale: chatState.initialQuestion,
                timestamp: new Date().toLocaleString('fr-FR'),
                statut: 'Conversation démarrée',
                societe: 'Non collecté',
                prenom: 'Non collecté',
                nom: 'Non collecté',
                email: 'Non collecté',
                telephone: 'Non collecté',
                conversation: `Question initiale: ${chatState.initialQuestion}`
            };
            
            // Envoyer via EmailJS avec gestion d'erreur
            emailjs.send(
                CHAT_CONFIG.EMAILJS_SERVICE_ID,
                CHAT_CONFIG.EMAILJS_TEMPLATE_ID, // Utilise le même template
                emailData,
                CHAT_CONFIG.EMAILJS_PUBLIC_KEY
            ).then(
                function(response) {
                    console.log('✅ Email initial envoyé avec succès !', response.status, response.text);
                },
                function(error) {
                    console.error('❌ Erreur envoi email initial:', error);
                    // Ne pas bloquer l'expérience utilisateur si l'email échoue
                }
            );
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // ==================== MODIFICATION DE LA FONCTION submitQuestion ====================
        
        // Remplacer l'ancienne fonction submitQuestion
        window.submitQuestion = function(inputId) {
            const input = document.getElementById(inputId);
            const question = input.value.trim();
            
            if (!question) {
                alert('Veuillez saisir ou sélectionner une question');
                return;
            }
            
            // Détecter le site actif
            const landingIT = document.getElementById('landingIT');
            const landingGov = document.getElementById('landingGov');
            
            let siteType = 'it';
            if (landingGov && landingGov.classList.contains('active')) {
                siteType = 'gov';
            }
            
            // Ouvrir le chat
            openChatModal(question, siteType);
        };

        // Initialiser EmailJS au chargement
        (function() {
            emailjs.init(CHAT_CONFIG.EMAILJS_PUBLIC_KEY);
        })();
