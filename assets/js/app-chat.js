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

        // ==================== BROWSER FINGERPRINTING ====================

        function generateBrowserFingerprint() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillText('fingerprint', 2, 2);
            const canvasHash = canvas.toDataURL().slice(-50);

            const fingerprint = {
                userAgent: navigator.userAgent,
                language: navigator.language,
                platform: navigator.platform,
                screenResolution: `${screen.width}x${screen.height}`,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                canvasHash: canvasHash,
                colorDepth: screen.colorDepth,
                deviceMemory: navigator.deviceMemory || 'unknown'
            };

            // Créer un hash simple à partir des données
            const fingerprintString = JSON.stringify(fingerprint);
            let hash = 0;
            for (let i = 0; i < fingerprintString.length; i++) {
                const char = fingerprintString.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }

            return 'fp_' + Math.abs(hash).toString(36);
        }

        function getUserFingerprint() {
            let fingerprint = localStorage.getItem('liwe_user_fingerprint');
            if (!fingerprint) {
                fingerprint = generateBrowserFingerprint();
                localStorage.setItem('liwe_user_fingerprint', fingerprint);
            }
            return fingerprint;
        }

        // ==================== QUOTA MANAGEMENT ====================

        function checkLocalQuota() {
            const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
            const quotaKey = 'liwe_daily_quota';

            let quotaData = localStorage.getItem(quotaKey);
            if (!quotaData) {
                quotaData = { date: today, count: 0 };
            } else {
                quotaData = JSON.parse(quotaData);

                // Reset si nouvelle journée
                if (quotaData.date !== today) {
                    quotaData = { date: today, count: 0 };
                }
            }

            const allowed = quotaData.count < 10;

            return {
                allowed: allowed,
                used: quotaData.count,
                limit: 10,
                remaining: Math.max(0, 10 - quotaData.count)
            };
        }

        function incrementLocalQuota() {
            const today = new Date().toISOString().split('T')[0];
            const quotaKey = 'liwe_daily_quota';

            let quotaData = localStorage.getItem(quotaKey);
            if (!quotaData) {
                quotaData = { date: today, count: 1 };
            } else {
                quotaData = JSON.parse(quotaData);

                if (quotaData.date !== today) {
                    quotaData = { date: today, count: 1 };
                } else {
                    quotaData.count += 1;
                }
            }

            localStorage.setItem(quotaKey, JSON.stringify(quotaData));
            console.log(`📊 Quota utilisé: ${quotaData.count}/10 aujourd'hui`);
        }

        // ==================== PROMPTS ==================== 
        const PROMPT_IT = `Tu es l'Assistant du Lab Technique de Liwe, une ESN experte en solutions IT et transformation digitale. Tu incarnes un chargé d'affaires IT professionnel qui qualifie les projets techniques pour dimensionner la réponse d'experts.

🎯 TA MISSION
Qualifier intelligemment les besoins techniques des prospects comme un commercial ESN : comprendre le contexte, les enjeux business, l'urgence et le budget pour permettre à nos experts de préparer une réponse sur-mesure.

💬 TON & STYLE
- Vouvoiement systématique
- Ton : Assistant professionnel, direct mais chaleureux
- Approche : Questions stratégiques et business-oriented (pas juste techniques)
- Tu NE DOIS JAMAIS tutoyer
- Tu es un COMMERCIAL qui qualifie un lead, pas un assistant pédagogue

🎬 FLOW CONVERSATIONNEL (STRICT - 3 QUESTIONS OBLIGATOIRES)

PHASE 1 : ACCUEIL & PREMIÈRE QUESTION (CONTEXTE/AMPLEUR)
Dans ta toute première réponse, tu DOIS :
1. Accueillir professionnellement
2. EXPLIQUER TON RÔLE : "Je suis l'Assistant du Lab Technique de Liwe. Mon rôle est de qualifier votre besoin à travers 3 questions ciblées pour que nos experts techniques puissent vous préparer une réponse adaptée sous 24h."
3. Reformuler brièvement la demande
4. Poser la QUESTION 1 : Focus CONTEXTE/AMPLEUR

⚠️ RÈGLE CRITIQUE : ADAPTE ta question au CONTEXTE PRÉCIS de la demande initiale.
- Audit cybersécurité → Taille de l'entreprise, secteur d'activité, périmètre de l'audit
- Sécurité cloud → Infrastructure actuelle, données sensibles, équipe IT
- Développement app → Plateforme cible, fonctionnalités clés, équipe dev existante
- Migration → Volume à migrer, systèmes actuels, criticité
- Data/IA → Volume de données, objectifs métier, compétences internes

PRINCIPES pour Q1 (NE PAS copier ces exemples mot pour mot) :
- Identifier le périmètre technique ou organisationnel
- Comprendre l'ampleur du besoin (taille, volume, complexité)
- Poser 2 sous-questions complémentaires maximum dans la même phrase

Exemple générique d'approche : "Pour dimensionner notre réponse, [question sur l'ampleur adaptée] ? Et [question sur le contexte technique adapté] ?"

PHASE 2 : QUESTION 2 (PROBLÈME/ENJEU BUSINESS)
⚠️ RÈGLE ABSOLUE : Pose UNE SEULE question par message.
Après la réponse à Q1, pose la QUESTION 2 : Focus PROBLÈME/ENJEU BUSINESS (défis actuels, impact métier, urgence)

⚠️ RÈGLE CRITIQUE : ADAPTE ta question au CONTEXTE et à la réponse précédente.
PRINCIPES pour Q2 :
- Identifier les problèmes ou blocages actuels
- Comprendre l'urgence ou l'impact business
- Découvrir ce qui déclenche le besoin MAINTENANT

Approche générique : "Parfait/Compris. [Question sur les défis/problèmes adaptés] ? [Question sur l'urgence/impact business] ?"

PHASE 3 : QUESTION 3 (BUDGET/TIMELINE)
Après la réponse à Q2, pose la QUESTION 3 : Focus BUDGET/TIMELINE (échéance, contraintes, budget indicatif)

⚠️ RÈGLE CRITIQUE : Question directe mais professionnelle sur timing ET budget.
PRINCIPES pour Q3 :
- Comprendre les contraintes temporelles (deadline, urgence, préavis)
- Identifier l'enveloppe budgétaire (ordre de grandeur acceptable)
- Rester professionnel : "enveloppe budgétaire" pas "combien vous voulez payer"

Approche générique : "Dernière question pour préparer notre recommandation : [question timing adapté] ? Et [question budget adapté avec tact] ?"

PHASE 4 : TRANSITION VERS LA COLLECTE (OBLIGATOIRE)
⚠️ APRÈS LES 3 QUESTIONS, cette phase est OBLIGATOIRE.
Dis : "Parfait, j'ai tous les éléments pour briefer nos experts IT ! Ils vous recontacteront sous 24h avec une proposition adaptée. Pour finaliser, j'ai besoin de vos coordonnées."
PUIS ATTENDS la réponse de l'utilisateur avant de passer à la phase 5.

PHASE 5 : COLLECTE (2 QUESTIONS SEULEMENT)
Ordre de collecte (STRICT) :
1. IDENTITÉ COMPLÈTE : "[COLLECTE:identite] Pouvez-vous me donner votre nom, prénom et société ?"
   → L'utilisateur donnera "Prénom Nom Société" dans sa réponse
2. COORDONNÉES DE CONTACT : "[COLLECTE:contact] Quel est votre email et téléphone ? Le téléphone est facultatif mais permet un rappel plus rapide."
   → L'utilisateur donnera son email et éventuellement son téléphone

⚠️ IMPORTANT :
- TOUJOURS demander les 3 infos d'identité ensemble (nom, prénom, société)
- TOUJOURS demander email et téléphone ensemble
- Ces 2 questions sont TOUT ce dont tu as besoin pour la collecte

PHASE 6 : CONFIRMATION
"Parfait [Prénom] ! Votre demande a bien été transmise à nos experts IT. Vous serez recontacté sous 24h avec une proposition concrète. À très bientôt !"

⚠️ RÈGLES CRITIQUES
- TOUJOURS vouvoyer
- TOUJOURS poser EXACTEMENT 3 questions de qualification (pas moins, pas plus)
- TOUJOURS poser UNE SEULE question par message
- TOUJOURS respecter l'ordre : Q1 (Contexte) → Q2 (Problème) → Q3 (Budget/Timeline) → Transition → Collecte
- NE JAMAIS passer à la collecte avant d'avoir posé les 3 questions
- NE JAMAIS donner de devis ou tarifs précis
- NE JAMAIS promettre autre chose que "sous 24h"
- Ton assistant professionnel, pas assistant pédagogue

IMPORTANT : Quand tu collectes les coordonnées, commence TOUJOURS ta réponse par le tag spécial [COLLECTE:identite] pour l'identité complète ou [COLLECTE:contact] pour les coordonnées de contact. Par exemple : "[COLLECTE:identite] Pouvez-vous me donner votre nom, prénom et société ?"`;

        const PROMPT_GOV = `Tu es l'Assistant du Hub Stratégique de Liwe, une ESN experte en gouvernance et stratégie produit. Tu incarnes un chargé d'affaires spécialisé en Product Management et transformation organisationnelle qui qualifie les projets stratégiques.

🎯 TA MISSION
Qualifier intelligemment les besoins stratégiques et organisationnels des prospects comme un commercial ESN : comprendre le contexte organisationnel, les enjeux de gouvernance, la maturité et le budget pour permettre à nos experts de préparer une réponse sur-mesure.

💬 TON & STYLE
- Vouvoiement systématique
- Ton : Assistant stratégique, direct mais chaleureux
- Approche : Questions business et organisationnelles (vision, maturité, gouvernance)
- Tu NE DOIS JAMAIS tutoyer
- Tu es un COMMERCIAL qui qualifie un lead stratégique, pas un assistant pédagogue

🎬 FLOW CONVERSATIONNEL (STRICT - 3 QUESTIONS OBLIGATOIRES)

PHASE 1 : ACCUEIL & PREMIÈRE QUESTION (CONTEXTE ORGANISATIONNEL)
Dans ta toute première réponse, tu DOIS :
1. Accueillir professionnellement
2. EXPLIQUER TON RÔLE : "Je suis l'Assistant du Hub Stratégique de Liwe. Mon rôle est de qualifier votre besoin à travers 3 questions ciblées pour que nos experts en stratégie et gouvernance puissent vous préparer une réponse adaptée sous 24h."
3. Reformuler brièvement la demande
4. Poser la QUESTION 1 : Focus CONTEXTE ORGANISATIONNEL

⚠️ RÈGLE CRITIQUE : ADAPTE ta question au CONTEXTE PRÉCIS de la demande initiale.
- Roadmap produit → Nombre de produits, équipe produit, maturité agile
- Gouvernance IT → Structure organisationnelle, instances existantes, processus actuels
- Transformation agile → Nombre d'équipes, maturité actuelle, organisation
- Strategy/Vision → Taille organisation, marchés, ambitions croissance

PRINCIPES pour Q1 (NE PAS copier ces exemples mot pour mot) :
- Identifier la taille et structure de l'organisation concernée
- Comprendre la maturité actuelle (processus, outils, pratiques)
- Poser 2 sous-questions complémentaires maximum dans la même phrase

Approche générique : "Pour dimensionner notre approche, [question sur l'organisation adaptée] ? Et [question sur la maturité/contexte adapté] ?"

PHASE 2 : QUESTION 2 (ENJEUX/BLOCAGES STRATÉGIQUES)
⚠️ RÈGLE ABSOLUE : Pose UNE SEULE question par message.
Après la réponse à Q1, pose la QUESTION 2 : Focus ENJEUX/BLOCAGES STRATÉGIQUES (problèmes de vision, d'alignement, de gouvernance)

⚠️ RÈGLE CRITIQUE : ADAPTE ta question au CONTEXTE et à la réponse précédente.
PRINCIPES pour Q2 :
- Identifier les blocages organisationnels ou stratégiques actuels
- Comprendre les tensions, problèmes d'alignement, ou freins décisionnels
- Découvrir ce qui motive le besoin de changement

Approche générique : "Parfait/Compris. [Question sur les défis/blocages stratégiques adaptés] ? [Question sur l'alignement ou les tensions] ?"

PHASE 3 : QUESTION 3 (OBJECTIFS/BUDGET/TIMELINE)
Après la réponse à Q2, pose la QUESTION 3 : Focus OBJECTIFS/BUDGET/TIMELINE (vision cible, échéance, budget)

⚠️ RÈGLE CRITIQUE : Question directe mais professionnelle sur vision ET budget.
PRINCIPES pour Q3 :
- Comprendre la vision cible ou objectifs stratégiques (6-12 mois)
- Identifier le timing souhaité pour voir des résultats
- Découvrir l'enveloppe budgétaire avec tact

Approche générique : "Dernière question : [question sur objectifs/vision adaptée] ? Et [question budget/timeline adaptée avec tact] ?"

PHASE 4 : TRANSITION VERS LA COLLECTE (OBLIGATOIRE)
⚠️ APRÈS LES 3 QUESTIONS, cette phase est OBLIGATOIRE.
Dis : "Parfait, j'ai tous les éléments pour briefer nos experts en stratégie ! Ils vous recontacteront sous 24h avec une proposition adaptée. Pour finaliser, j'ai besoin de vos coordonnées."
PUIS ATTENDS la réponse de l'utilisateur avant de passer à la phase 5.

PHASE 5 : COLLECTE (2 QUESTIONS SEULEMENT)
Ordre de collecte (STRICT) :
1. IDENTITÉ COMPLÈTE : "[COLLECTE:identite] Pouvez-vous me donner votre nom, prénom et société ?"
   → L'utilisateur donnera "Prénom Nom Société" dans sa réponse
2. COORDONNÉES DE CONTACT : "[COLLECTE:contact] Quel est votre email et téléphone ? Le téléphone est facultatif mais permet un rappel plus rapide."
   → L'utilisateur donnera son email et éventuellement son téléphone

⚠️ IMPORTANT :
- TOUJOURS demander les 3 infos d'identité ensemble (nom, prénom, société)
- TOUJOURS demander email et téléphone ensemble
- Ces 2 questions sont TOUT ce dont tu as besoin pour la collecte

PHASE 6 : CONFIRMATION
"Parfait [Prénom] ! Votre demande a bien été transmise à nos experts stratégiques. Vous serez recontacté sous 24h avec une proposition concrète. À très bientôt !"

⚠️ RÈGLES CRITIQUES
- TOUJOURS vouvoyer
- TOUJOURS poser EXACTEMENT 3 questions de qualification (pas moins, pas plus)
- TOUJOURS poser UNE SEULE question par message
- TOUJOURS respecter l'ordre : Q1 (Organisation) → Q2 (Enjeux) → Q3 (Objectifs/Budget) → Transition → Collecte
- NE JAMAIS passer à la collecte avant d'avoir posé les 3 questions
- NE JAMAIS donner de devis ou tarifs précis
- NE JAMAIS promettre autre chose que "sous 24h"
- Ton assistant stratégique professionnel, pas assistant pédagogue

IMPORTANT : Quand tu collectes les coordonnées, commence TOUJOURS ta réponse par le tag spécial [COLLECTE:identite] pour l'identité complète ou [COLLECTE:contact] pour les coordonnées de contact. Par exemple : "[COLLECTE:identite] Pouvez-vous me donner votre nom, prénom et société ?"`;

        const PROMPT_RECRUITMENT = `Tu es l'Assistant Recrutement de Liwe, une ESN innovante qui accompagne les talents IT et stratégiques. Tu incarnes un recruteur business-oriented, bienveillant et professionnel qui qualifie les candidats.

🎯 TA MISSION
Qualifier intelligemment les candidats qui souhaitent rejoindre Liwe : comprendre leur parcours, leurs compétences clés, leurs aspirations, et leur disponibilité pour permettre à nos RH de préparer un entretien ciblé.

💬 TON & STYLE
- Vouvoiement systématique
- Ton : Recruteur professionnel, chaleureux mais business-oriented
- Approche : Questions RH stratégiques (compétences, aspirations, disponibilité)
- Tu NE DOIS JAMAIS tutoyer
- Tu es un TALENT MANAGER qui qualifie un candidat, pas un assistant pédagogue
- Tu n'es PAS dans une posture de vente de service, mais dans une posture de qualification RH

🎬 FLOW CONVERSATIONNEL (STRICT - 3 QUESTIONS OBLIGATOIRES)

PHASE 1 : ACCUEIL & PREMIÈRE QUESTION (PROFIL/PARCOURS)
Dans ta toute première réponse, tu DOIS :
1. Accueillir chaleureusement avec enthousiasme
2. EXPLIQUER TON RÔLE : "Je suis l'Assistant Recrutement de Liwe. Mon rôle est de qualifier votre profil à travers 3 questions ciblées pour que notre équipe RH puisse vous proposer les opportunités les plus adaptées. Je répondrai volontiers à toutes vos questions sur Liwe !"
3. Poser la QUESTION 1 : Focus PROFIL/PARCOURS

PRINCIPES pour Q1 :
- Comprendre le parcours et l'expérience (années, poste actuel)
- Identifier les compétences clés techniques ou métier
- Ton chaleureux mais professionnel

Approche : "Pour commencer, parlez-moi de votre parcours : [question expérience adaptée] ? Et [question compétences adaptée] ?"

PHASE 2 : QUESTION 2 (ASPIRATIONS/MOTIVATIONS)
⚠️ RÈGLE ABSOLUE : Pose UNE SEULE question par message.
Après la réponse à Q1, pose la QUESTION 2 : Focus ASPIRATIONS/MOTIVATIONS

PRINCIPES pour Q2 :
- Comprendre ce qui attire le candidat chez Liwe
- Identifier le type de missions ou projets recherchés
- Découvrir les motivations professionnelles

Approche : "Parfait/Super ! [Question sur ce qui les attire] ? Et [question sur type de missions recherchées] ?"

PHASE 3 : QUESTION 3 (DISPONIBILITÉ/MOBILITÉ)
Après la réponse à Q2, pose la QUESTION 3 : Focus DISPONIBILITÉ/MOBILITÉ

PRINCIPES pour Q3 :
- Identifier la disponibilité (préavis, timing)
- Comprendre les contraintes géographiques ou préférences télétravail
- Rester pragmatique et bienveillant

Approche : "Dernière question : [question disponibilité/préavis adaptée] ? Et [question localisation/télétravail adaptée] ?"

PHASE 4 : PROPOSITION D'AIDE & COLLECTE
⚠️ APRÈS LES 3 QUESTIONS, propose d'abord de répondre aux questions du candidat.
"Merci pour ces éléments précieux ! Avant de collecter vos coordonnées, avez-vous des questions sur Liwe, nos missions, notre culture, ou le processus de recrutement ?"

Si le candidat pose des questions, réponds de manière authentique et positive. Sinon, passe directement à la collecte.

PHASE 5 : COLLECTE LINKEDIN & COORDONNÉES
⚠️ IMPORTANT : Collecte d'abord le LinkedIn, puis les coordonnées.
1. LinkedIn d'abord : "[COLLECTE:linkedin] Pour que notre équipe RH puisse consulter votre parcours, pouvez-vous me partager votre profil LinkedIn ?"
2. Prénom ET Nom ENSEMBLE : "[COLLECTE:prénom] Parfait ! Quel est votre prénom et nom ?"
3. Email : "[COLLECTE:email] Quel est votre email pour vous recontacter ?"
4. Téléphone (optionnel) : "[COLLECTE:téléphone] Et votre téléphone (optionnel) ?"

PHASE 6 : ENVOI DU CV & CONFIRMATION
Après la collecte, donner l'adresse email et confirmer :
"Parfait [Prénom] ! 🎉 Votre candidature a bien été enregistrée.

📧 Pour finaliser, merci de nous envoyer votre CV à : contact@codentis

Notre équipe RH reviendra vers vous sous 48h pour échanger sur les opportunités qui correspondent à votre profil. Au plaisir de vous compter bientôt parmi l'équipe Liwe ! 🚀"

⚠️ RÈGLES CRITIQUES
- TOUJOURS vouvoyer
- TOUJOURS poser EXACTEMENT 3 questions de qualification (pas moins, pas plus)
- TOUJOURS poser UNE SEULE question par message
- TOUJOURS respecter l'ordre : Q1 (Profil) → Q2 (Aspirations) → Q3 (Disponibilité) → Proposition aide → Collecte
- NE JAMAIS passer à la collecte avant d'avoir posé les 3 questions
- TON chaleureux et encourageant (émojis avec parcimonie : 🎉 🚀)
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
                chatSubtitle.textContent = 'Qualification intelligente • Réponse sous 24h';
            } else if (siteType === 'gov') {
                chatTitle.textContent = 'Hub Stratégique';
                chatSubtitle.textContent = 'Qualification intelligente • Réponse sous 24h';
            } else if (siteType === 'recruitment') {
                chatTitle.textContent = 'Recrutement';
                chatSubtitle.textContent = 'Rejoignez l\'équipe Liwe';
            }

            // Ouvrir la modal
            modal.classList.add('active');
            chatState.isOpen = true;
            document.body.style.overflow = 'hidden';

            // Track chat opened in Google Analytics
            if (typeof trackChatOpened === 'function') {
                trackChatOpened(siteType);
            }

            // Réinitialiser
            chatState.conversationHistory = [];
            chatState.leadData = { prenom: '', nom: '', societe: '', email: '', telephone: '', linkedin: '' };
            chatState.collectedFields = [];
            chatState.questionCount = 0;
            document.getElementById('chatMessages').innerHTML = '';

            // ⚡ EMAIL DÉSACTIVÉ ICI - Envoi uniquement à la fin avec données collectées
            // sendInitialEmail();

            // Envoyer la question initiale
            setTimeout(() => {
                addUserMessage(initialQuestion);
                sendToClaudeAPI(initialQuestion);
            }, 500);
        }

        function closeChatModal() {
            const modal = document.getElementById('chatModal');

            // ⚡ NOUVEAU : Envoyer email partiel si conversation en cours ET pas terminée
            if (chatState.conversationHistory.length > 0 && !chatState.collectedFields.includes('email')) {
                console.log('📧 Conversation partielle détectée, envoi email...');
                sendPartialEmail();
            }

            modal.classList.remove('active');
            chatState.isOpen = false;
            document.body.style.overflow = 'auto';
        }

        function addUserMessage(text) {
            const messagesContainer = document.getElementById('chatMessages');
            const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            
            const messageHTML = `
                <div class="chat-message user-message">
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
            if (text.includes('[COLLECTE:identite]')) {
                // Parser "Prénom Nom Société" (ex: "Jean Dupont Acme Corp")
                const parts = message.trim().split(/\s+/);
                if (parts.length >= 3) {
                    chatState.leadData.prenom = parts[0];
                    chatState.leadData.nom = parts[1];
                    chatState.leadData.societe = parts.slice(2).join(' ');
                } else if (parts.length === 2) {
                    chatState.leadData.prenom = parts[0];
                    chatState.leadData.nom = parts[1];
                    chatState.leadData.societe = '';
                } else {
                    chatState.leadData.prenom = parts[0] || '';
                    chatState.leadData.nom = '';
                    chatState.leadData.societe = '';
                }
                chatState.collectedFields.push('prenom', 'nom', 'societe');
                console.log('✅ Identité collectée:', chatState.leadData.prenom, chatState.leadData.nom, chatState.leadData.societe);
            } else if (text.includes('[COLLECTE:contact]')) {
                // Parser "email@example.com 0612345678" ou juste "email@example.com"
                const parts = message.trim().split(/\s+/);
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const phoneRegex = /^[\d\s\+\(\)\-\.]{8,}$/;

                parts.forEach(part => {
                    if (emailRegex.test(part)) {
                        chatState.leadData.email = part;
                        chatState.collectedFields.push('email');
                        console.log('✅ Email collecté:', chatState.leadData.email);
                    } else if (phoneRegex.test(part)) {
                        chatState.leadData.telephone = part;
                        chatState.collectedFields.push('telephone');
                        console.log('✅ Téléphone collecté:', chatState.leadData.telephone);
                    }
                });
            }

            // Si toutes les données essentielles sont collectées, envoyer l'email
            if (chatState.collectedFields.includes('prenom') &&
                chatState.collectedFields.includes('nom') &&
                chatState.collectedFields.includes('societe') &&
                chatState.collectedFields.includes('email')) {
                console.log('🎯 Toutes les données collectées ! Envoi email dans 2s...');
                setTimeout(() => sendLeadEmail(), 2000);
            }
        }

        async function sendToClaudeAPI(userMessage) {
            console.log('🚀 Envoi du message à Claude API...', userMessage);

            const sendBtn = document.getElementById('chatSendBtn');
            const input = document.getElementById('chatInput');

            sendBtn.disabled = true;
            input.disabled = true;
            showTypingIndicator();

            // ⚡ NOUVEAU : Vérifier quota local avant envoi
            const localQuota = checkLocalQuota();
            if (!localQuota.allowed) {
                console.warn('⚠️ Quota local dépassé:', localQuota.used, '/', localQuota.limit);
                removeTypingIndicator();
                showFallbackForm('QUOTA_EXCEEDED');
                sendBtn.disabled = false;
                input.disabled = false;
                return;
            }

            // Ajouter le message à l'historique
            chatState.conversationHistory.push({
                role: 'user',
                content: userMessage
            });

            // Track question submission in Google Analytics
            if (typeof trackQuestionSubmitted === 'function') {
                trackQuestionSubmitted(userMessage, chatState.currentSite);
            }

            // Choisir le bon prompt
            let systemPrompt;
            if (chatState.currentSite === 'it') {
                systemPrompt = PROMPT_IT;
            } else if (chatState.currentSite === 'gov') {
                systemPrompt = PROMPT_GOV;
            } else if (chatState.currentSite === 'recruitment') {
                systemPrompt = PROMPT_RECRUITMENT;
            }

            // ⚡ COMPTEUR DE QUESTIONS : Compter combien de messages assistant ont déjà été envoyés
            const assistantMessageCount = chatState.conversationHistory.filter(msg => msg.role === 'assistant').length;
            console.log(`📊 Compteur: ${assistantMessageCount} messages assistant déjà envoyés`);

            // ⚡ SÉCURITÉ : Si moins de 3 questions posées, ajouter un rappel strict au système
            if (assistantMessageCount < 3) {
                systemPrompt += `\n\n⚠️ RAPPEL CRITIQUE : Tu es actuellement à la question ${assistantMessageCount + 1} sur 3. Tu DOIS poser EXACTEMENT 3 questions de qualification avant de passer à la phase de collecte des coordonnées. NE PAS utiliser [COLLECTE:identite] ou [COLLECTE:contact] tant que tu n'as pas posé les 3 questions complètes.`;
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
                        messages: chatState.conversationHistory,
                        fingerprint: getUserFingerprint() // ⚡ NOUVEAU : Envoyer le fingerprint
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

                // ⚡ NOUVEAU : Incrémenter le quota local après succès
                incrementLocalQuota();

            } catch (error) {
                console.error('❌ Erreur API Claude:', error);
                removeTypingIndicator();

                // ⚡ NOUVEAU : Afficher formulaire de repli au lieu d'un message d'erreur
                let fallbackReason = 'API_ERROR';

                if (error.message === 'RATE_LIMIT') {
                    fallbackReason = 'RATE_LIMIT';
                } else if (error.message === 'INVALID_KEY') {
                    fallbackReason = 'API_ERROR';
                }

                // Afficher le formulaire de repli
                showFallbackForm(fallbackReason);

            } finally {
                sendBtn.disabled = false;
                input.disabled = false;
            }
        }

        function sendLeadEmail() {
            // Préparer le contenu de l'email - FORMAT COMPTE RENDU COMPLET
            const siteLabel = chatState.currentSite === 'it' ? 'LAB TECHNIQUE' : 'HUB STRATÉGIQUE';
            const timestamp = new Date().toLocaleString('fr-FR', {
                dateStyle: 'full',
                timeStyle: 'short'
            });

            // Format conversation comme impression d'écran
            let conversationFormatted = '═══════════════════════════════════════════════════════\n';
            conversationFormatted += `📋 COMPTE RENDU DE CONVERSATION - ${siteLabel}\n`;
            conversationFormatted += `🕒 ${timestamp}\n`;
            conversationFormatted += '═══════════════════════════════════════════════════════\n\n';

            // Coordonnées du lead
            conversationFormatted += '👤 COORDONNÉES DU PROSPECT\n';
            conversationFormatted += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
            conversationFormatted += `   Nom complet    : ${chatState.leadData.prenom} ${chatState.leadData.nom}\n`;
            conversationFormatted += `   Société        : ${chatState.leadData.societe || 'Non communiqué'}\n`;
            conversationFormatted += `   Email          : ${chatState.leadData.email || 'Non fourni'}\n`;
            conversationFormatted += `   Téléphone      : ${chatState.leadData.telephone || 'Non fourni'}\n`;
            conversationFormatted += '\n\n';

            // Conversation complète
            conversationFormatted += '💬 TRANSCRIPTION INTÉGRALE DE LA CONVERSATION\n';
            conversationFormatted += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

            chatState.conversationHistory.forEach((msg, idx) => {
                const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                if (msg.role === 'user') {
                    conversationFormatted += `[${time}] 👤 CLIENT :\n`;
                    conversationFormatted += `   ${msg.content}\n\n`;
                } else {
                    const cleanContent = msg.content.replace(/\[COLLECTE:[^\]]+\]\s*/g, '');
                    conversationFormatted += `[${time}] 🤖 AGENT LIWE :\n`;
                    conversationFormatted += `   ${cleanContent}\n\n`;
                }
            });

            conversationFormatted += '═══════════════════════════════════════════════════════\n';
            conversationFormatted += 'Fin du compte rendu\n';
            conversationFormatted += '═══════════════════════════════════════════════════════\n';

            const emailData = {
                to_email: 'contact@audentis.fr',
                site: siteLabel,
                prenom: chatState.leadData.prenom,
                nom: chatState.leadData.nom,
                societe: chatState.leadData.societe || 'Non communiqué',
                email: chatState.leadData.email || 'Non fourni',
                telephone: chatState.leadData.telephone || 'Non fourni',
                conversation: conversationFormatted,
                timestamp: timestamp
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
                to_email: 'contact@audentis.fr',
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

        // ⚡ Fonction pour envoyer email partiel si conversation abandonnée
        function sendPartialEmail() {
            const siteLabel = chatState.currentSite === 'it' ? 'LAB TECHNIQUE'
                : chatState.currentSite === 'gov' ? 'HUB STRATÉGIQUE'
                : 'RECRUTEMENT';

            const timestamp = new Date().toLocaleString('fr-FR', {
                dateStyle: 'full',
                timeStyle: 'short'
            });

            // Format conversation partielle
            let conversationFormatted = '═══════════════════════════════════════════════════════\n';
            conversationFormatted += `📋 CONVERSATION PARTIELLE (ABANDONNÉE) - ${siteLabel}\n`;
            conversationFormatted += `🕒 ${timestamp}\n`;
            conversationFormatted += '═══════════════════════════════════════════════════════\n\n';

            // Coordonnées collectées (peut être vide)
            conversationFormatted += '👤 COORDONNÉES COLLECTÉES\n';
            conversationFormatted += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
            conversationFormatted += `   Nom complet    : ${chatState.leadData.prenom || 'Non collecté'} ${chatState.leadData.nom || 'Non collecté'}\n`;
            conversationFormatted += `   Société        : ${chatState.leadData.societe || 'Non collecté'}\n`;
            conversationFormatted += `   Email          : ${chatState.leadData.email || 'Non collecté'}\n`;
            conversationFormatted += `   Téléphone      : ${chatState.leadData.telephone || 'Non collecté'}\n`;
            conversationFormatted += '\n\n';

            // Transcription partielle
            conversationFormatted += '💬 TRANSCRIPTION PARTIELLE DE LA CONVERSATION\n';
            conversationFormatted += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

            chatState.conversationHistory.forEach((msg) => {
                const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                if (msg.role === 'user') {
                    conversationFormatted += `[${time}] 👤 CLIENT :\n`;
                    conversationFormatted += `   ${msg.content}\n\n`;
                } else {
                    const cleanContent = msg.content.replace(/\[COLLECTE:[^\]]+\]\s*/g, '');
                    conversationFormatted += `[${time}] 🤖 AGENT LIWE :\n`;
                    conversationFormatted += `   ${cleanContent}\n\n`;
                }
            });

            conversationFormatted += '\n⚠️ Cette conversation a été abandonnée avant la collecte complète des coordonnées.\n';
            conversationFormatted += '═══════════════════════════════════════════════════════\n';

            const emailData = {
                to_email: 'contact@audentis.fr',
                site: siteLabel,
                prenom: chatState.leadData.prenom || 'Non collecté',
                nom: chatState.leadData.nom || 'Non collecté',
                societe: chatState.leadData.societe || 'Non collecté',
                email: chatState.leadData.email || 'Non collecté',
                telephone: chatState.leadData.telephone || 'Non collecté',
                conversation: conversationFormatted,
                timestamp: timestamp
            };

            // Envoyer via EmailJS
            emailjs.send(
                CHAT_CONFIG.EMAILJS_SERVICE_ID,
                CHAT_CONFIG.EMAILJS_TEMPLATE_ID,
                emailData,
                CHAT_CONFIG.EMAILJS_PUBLIC_KEY
            ).then(
                function(response) {
                    console.log('📧 Email partiel envoyé avec succès !', response);
                },
                function(error) {
                    console.error('❌ Erreur envoi email partiel:', error);
                }
            );
        }

        // ==================== FORMULAIRE DE REPLI (FALLBACK) ====================

        function showFallbackForm(reason) {
            console.log('📋 Affichage formulaire de repli, raison:', reason);

            // Fermer le chat modal
            const chatModal = document.getElementById('chatModal');
            chatModal.classList.remove('active');

            // Construire le message selon la raison
            let errorTitle = '';
            let errorMessage = '';

            if (reason === 'QUOTA_EXCEEDED') {
                errorTitle = 'Limite quotidienne atteinte';
                errorMessage = 'Vous avez atteint votre limite de 10 conversations par jour. Pour que nos experts puissent vous répondre rapidement, veuillez remplir ce formulaire. Nous vous contacterons sous 24h.';
            } else if (reason === 'API_ERROR') {
                errorTitle = 'Service temporairement indisponible';
                errorMessage = 'Notre assistant IA est momentanément indisponible. Pour que nos experts puissent vous répondre rapidement, veuillez remplir ce formulaire. Nous vous contacterons sous 24h.';
            } else if (reason === 'RATE_LIMIT') {
                errorTitle = 'Trop de requêtes';
                errorMessage = 'Notre service reçoit actuellement un nombre élevé de demandes. Pour que nos experts puissent vous répondre rapidement, veuillez remplir ce formulaire. Nous vous contacterons sous 24h.';
            } else {
                errorTitle = 'Assistant IA indisponible';
                errorMessage = 'Pour que nos experts puissent vous répondre rapidement, veuillez remplir ce formulaire. Nous vous contacterons sous 24h.';
            }

            // Créer et afficher le formulaire de repli
            const fallbackHTML = `
                <div id="fallbackModal" style="display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 10001; justify-content: center; align-items: center; backdrop-filter: blur(10px);">
                    <div style="background: linear-gradient(135deg, rgba(20, 20, 20, 0.98) 0%, rgba(30, 30, 30, 0.98) 100%); border-radius: 20px; padding: 40px; max-width: 600px; width: 90%; border: 1px solid rgba(255, 127, 92, 0.3); box-shadow: 0 20px 60px rgba(26, 15, 10, 0.55);">

                        <div style="margin-bottom: 30px; text-align: center;">
                            <h2 style="font-size: 1.8rem; color: #f5f5f7; margin-bottom: 10px; font-weight: 900;">${errorTitle}</h2>
                            <p style="color: rgba(245, 245, 247, 0.7); font-size: 0.95rem; line-height: 1.6;">${errorMessage}</p>
                        </div>

                        <form id="fallbackForm" onsubmit="return handleFallbackSubmit(event)">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                                <div>
                                    <label style="display: block; margin-bottom: 8px; color: #f5f5f7; font-weight: 600; font-size: 0.9rem;">Prénom *</label>
                                    <input type="text" name="prenom" required style="width: 100%; padding: 12px; background: rgba(245, 245, 247, 0.05); border: 1px solid rgba(255, 127, 92, 0.3); border-radius: 8px; color: #f5f5f7; font-family: 'Inter', sans-serif; font-size: 1rem;">
                                </div>
                                <div>
                                    <label style="display: block; margin-bottom: 8px; color: #f5f5f7; font-weight: 600; font-size: 0.9rem;">Nom *</label>
                                    <input type="text" name="nom" required style="width: 100%; padding: 12px; background: rgba(245, 245, 247, 0.05); border: 1px solid rgba(255, 127, 92, 0.3); border-radius: 8px; color: #f5f5f7; font-family: 'Inter', sans-serif; font-size: 1rem;">
                                </div>
                            </div>

                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; color: #f5f5f7; font-weight: 600; font-size: 0.9rem;">Société</label>
                                <input type="text" name="societe" style="width: 100%; padding: 12px; background: rgba(245, 245, 247, 0.05); border: 1px solid rgba(255, 127, 92, 0.3); border-radius: 8px; color: #f5f5f7; font-family: 'Inter', sans-serif; font-size: 1rem;">
                            </div>

                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; color: #f5f5f7; font-weight: 600; font-size: 0.9rem;">Email *</label>
                                <input type="email" name="email" required style="width: 100%; padding: 12px; background: rgba(245, 245, 247, 0.05); border: 1px solid rgba(255, 127, 92, 0.3); border-radius: 8px; color: #f5f5f7; font-family: 'Inter', sans-serif; font-size: 1rem;">
                            </div>

                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; color: #f5f5f7; font-weight: 600; font-size: 0.9rem;">Téléphone</label>
                                <input type="tel" name="telephone" style="width: 100%; padding: 12px; background: rgba(245, 245, 247, 0.05); border: 1px solid rgba(255, 127, 92, 0.3); border-radius: 8px; color: #f5f5f7; font-family: 'Inter', sans-serif; font-size: 1rem;">
                            </div>

                            <div style="margin-bottom: 25px;">
                                <label style="display: block; margin-bottom: 8px; color: #f5f5f7; font-weight: 600; font-size: 0.9rem;">Votre question *</label>
                                <textarea name="question" rows="5" required style="width: 100%; padding: 12px; background: rgba(245, 245, 247, 0.05); border: 1px solid rgba(255, 127, 92, 0.3); border-radius: 8px; color: #f5f5f7; font-family: 'Inter', sans-serif; font-size: 1rem; resize: vertical;">${chatState.initialQuestion || ''}</textarea>
                            </div>

                            <div style="display: flex; gap: 15px; justify-content: flex-end;">
                                <button type="button" onclick="closeFallbackForm()" style="padding: 12px 24px; background: transparent; border: 1px solid rgba(245, 245, 247, 0.3); color: #f5f5f7; border-radius: 8px; cursor: pointer; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.95rem;">Annuler</button>
                                <button type="submit" style="padding: 12px 30px; background: linear-gradient(135deg, #FF7F5C 0%, #c43d20 100%); border: none; color: #f5f5f7; border-radius: 8px; cursor: pointer; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.95rem; box-shadow: 0 4px 15px rgba(255, 127, 92, 0.3);">Envoyer</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;

            // Injecter le formulaire dans le DOM
            document.body.insertAdjacentHTML('beforeend', fallbackHTML);
            document.body.style.overflow = 'hidden';
        }

        function closeFallbackForm() {
            const modal = document.getElementById('fallbackModal');
            if (modal) {
                modal.remove();
                document.body.style.overflow = 'auto';
            }
        }

        function handleFallbackSubmit(event) {
            event.preventDefault();

            const form = event.target;
            const formData = new FormData(form);

            const data = {
                prenom: formData.get('prenom'),
                nom: formData.get('nom'),
                societe: formData.get('societe') || 'Non communiqué',
                email: formData.get('email'),
                telephone: formData.get('telephone') || 'Non fourni',
                question: formData.get('question')
            };

            // Envoyer via EmailJS
            const siteLabel = chatState.currentSite === 'it' ? 'LAB TECHNIQUE'
                : chatState.currentSite === 'gov' ? 'HUB STRATÉGIQUE'
                : 'RECRUTEMENT';

            const timestamp = new Date().toLocaleString('fr-FR', {
                dateStyle: 'full',
                timeStyle: 'short'
            });

            const conversationFormatted = `═══════════════════════════════════════════════════════
📋 DEMANDE VIA FORMULAIRE DE REPLI - ${siteLabel}
🕒 ${timestamp}
═══════════════════════════════════════════════════════

👤 COORDONNÉES DU PROSPECT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Nom complet    : ${data.prenom} ${data.nom}
   Société        : ${data.societe}
   Email          : ${data.email}
   Téléphone      : ${data.telephone}

❓ QUESTION INITIALE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ${data.question}

⚠️ Cette demande a été soumise via le formulaire de repli (agent IA indisponible).
═══════════════════════════════════════════════════════`;

            const emailData = {
                to_email: 'contact@audentis.fr',
                site: siteLabel,
                prenom: data.prenom,
                nom: data.nom,
                societe: data.societe,
                email: data.email,
                telephone: data.telephone,
                conversation: conversationFormatted,
                timestamp: timestamp
            };

            // Envoyer l'email
            emailjs.send(
                CHAT_CONFIG.EMAILJS_SERVICE_ID,
                CHAT_CONFIG.EMAILJS_TEMPLATE_ID,
                emailData,
                CHAT_CONFIG.EMAILJS_PUBLIC_KEY
            ).then(
                function(response) {
                    console.log('📧 Email formulaire repli envoyé !', response);

                    // Afficher confirmation
                    const modal = document.getElementById('fallbackModal');
                    modal.innerHTML = `
                        <div style="background: linear-gradient(135deg, rgba(20, 20, 20, 0.98) 0%, rgba(30, 30, 30, 0.98) 100%); border-radius: 20px; padding: 60px 40px; max-width: 500px; text-align: center; border: 1px solid rgba(255, 127, 92, 0.3);">
                            <div style="font-size: 4rem; margin-bottom: 20px;">✅</div>
                            <h2 style="font-size: 1.8rem; color: #f5f5f7; margin-bottom: 15px; font-weight: 900;">Demande envoyée !</h2>
                            <p style="color: rgba(245, 245, 247, 0.7); font-size: 1rem; line-height: 1.6; margin-bottom: 30px;">Nos experts vont traiter votre demande et vous contacteront sous 24h.</p>
                            <button onclick="closeFallbackForm()" style="padding: 12px 30px; background: linear-gradient(135deg, #FF7F5C 0%, #c43d20 100%); border: none; color: #f5f5f7; border-radius: 8px; cursor: pointer; font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.95rem;">Fermer</button>
                        </div>
                    `;

                    setTimeout(() => closeFallbackForm(), 3000);
                },
                function(error) {
                    console.error('❌ Erreur envoi email:', error);
                    alert('Une erreur est survenue. Veuillez nous contacter directement à contact@audentis.fr');
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
