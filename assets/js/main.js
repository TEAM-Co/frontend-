        let currentSite = null;
        let currentPage = 'welcome';
        let islandAnimating = false;
        let islandTimeout = null;

        // Experts pour la Dynamic Island
        const expertsIT = [
            { name: 'Lucas', role: 'Dev Backend' },
            { name: 'Emma', role: 'Data Engineer' },
            { name: 'Maxime', role: 'Expert Cloud' },
            { name: 'Léa', role: 'DevSecOps' },
            { name: 'Thomas', role: 'Architecte IA' },
            { name: 'Chloé', role: 'Dev Frontend' },
            { name: 'Hugo', role: 'SRE Engineer' },
            { name: 'Sarah', role: 'Data Scientist' },
            { name: 'Antoine', role: 'Tech Lead' },
            { name: 'Camille', role: 'Expert Cyber' }
        ];

        const expertsGov = [
            { name: 'Julie', role: 'Product Owner' },
            { name: 'Mathieu', role: 'Scrum Master' },
            { name: 'Clara', role: 'UX Designer' },
            { name: 'Pierre', role: 'Coach Agile' },
            { name: 'Sophie', role: 'Product Manager' },
            { name: 'Alexandre', role: 'Business Analyst' },
            { name: 'Marion', role: 'Chief Product' },
            { name: 'Nicolas', role: 'Program Manager' },
            { name: 'Laura', role: 'UX Researcher' },
            { name: 'David', role: 'Transformation Lead' }
        ];

        // Menus
        const menuIT = {
            expertises: [
                { id: 'pageDataIA', title: 'Data & IA', desc: 'Analytics, ML, IA Générative' },
                { id: 'pageDigital', title: 'Développement', desc: 'Web, Mobile, APIs' },
                { id: 'pageInfrastructure', title: 'Infrastructure Cloud & DevOps', desc: 'AWS, Azure, GCP' },
                { id: 'pageCybersecurity', title: 'Cybersécurité', desc: 'Audits, Pentests' },
                { id: 'pageWorkshops', title: 'Workshops & Conférences', desc: 'Formations' }
            ],
            decouvrir: [
                { id: 'pageHistoire', title: 'Notre Histoire', desc: 'Qui sommes-nous ?' },
                { id: 'pageVeille', title: 'Veille & Actualités', desc: 'Innovation' }
            ],
            rejoindre: [
                { id: 'pageRejoindre', title: 'Nous Rejoindre', desc: 'Carrières' },
                { id: 'pagePartenariat', title: 'Partenariat', desc: 'Abonnements' }
            ],
            contact: [
                { id: 'pageReseaux', title: 'Nos Réseaux', desc: 'Spotify, WhatsApp, LinkedIn...' },
                { id: 'pagePlaquette', title: 'Plaquette Commerciale', desc: 'Télécharger notre plaquette' }
            ]
        };

        const menuGov = {
            expertises: [
                { id: 'pageDataIAGov', title: 'Data & IA', desc: 'Stratégie data' },
                { id: 'pageDigitalGov', title: 'Développement', desc: 'Vision produit & UX' },
                { id: 'pageInfrastructureGov', title: 'Infrastructure Cloud & DevOps', desc: 'Transformation' },
                { id: 'pageCybersecurityGov', title: 'Cybersécurité', desc: 'SMSI, Conformité' },
                { id: 'pageGouvernance', title: 'Gouvernance Opérationnelle', desc: 'Agilité, PMO' },
                { id: 'pageRHTech', title: 'Transformation RH Tech', desc: 'Recrutement IT' },
                { id: 'pageWorkshopsGov', title: 'Workshops & Conférences', desc: 'Formations stratégiques' }
            ],
            decouvrir: [
                { id: 'pageHistoire', title: 'Notre Histoire', desc: 'Qui sommes-nous ?' },
                { id: 'pageVeille', title: 'Veille & Actualités', desc: 'Innovation' }
            ],
            rejoindre: [
                { id: 'pageRejoindre', title: 'Nous Rejoindre', desc: 'Carrières' },
                { id: 'pagePartenariat', title: 'Partenariat', desc: 'Abonnements' }
            ],
            contact: [
                { id: 'pageReseaux', title: 'Nos Réseaux', desc: 'Spotify, WhatsApp, LinkedIn...' },
                { id: 'pagePlaquette', title: 'Plaquette Commerciale', desc: 'Télécharger notre plaquette' }
            ]
        };

        // Fonction pour basculer entre les thèmes IT et GOV
        function toggleTheme() {
            const body = document.body;
            const landingIT = document.getElementById('landingIT');
            const landingGov = document.getElementById('landingGov');
            const switcherText = document.querySelector('.sidebar-switcher-text');
            const miniSidebar = document.getElementById('miniSidebar');

            // Basculer entre les thèmes
            if (body.classList.contains('theme-gov')) {
                // Passer de GOV à IT
                body.classList.remove('theme-gov');
                body.classList.add('theme-it');
                currentSite = 'it';

                // Afficher landing IT
                if (landingIT) landingIT.classList.add('active');
                if (landingGov) landingGov.classList.remove('active');

                // Changer le texte du bouton: afficher "Gouv" (car on est maintenant sur IT)
                if (switcherText) switcherText.textContent = 'Gouv';

                // Mettre à jour la sidebar
                if (miniSidebar) miniSidebar.classList.add('visible');
            } else {
                // Passer de IT à GOV
                body.classList.remove('theme-it');
                body.classList.add('theme-gov');
                currentSite = 'gov';

                // Afficher landing GOV
                if (landingGov) landingGov.classList.add('active');
                if (landingIT) landingIT.classList.remove('active');

                // Changer le texte du bouton: afficher "IT" (car on est maintenant sur GOV)
                if (switcherText) switcherText.textContent = 'IT';

                // Mettre à jour la sidebar
                if (miniSidebar) miniSidebar.classList.add('visible');
            }

            // Scroll en haut
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Init
        function init() {
            // Ajouter le mode welcome
            document.body.classList.add('welcome-mode');
            
            // Attendre la fin de l'animation d'intro
            setTimeout(() => {
                createContentPages();
                setupDropdowns();
                setupScrollEffects();
            }, 3000);
        }

        // Gérer les dropdowns de questions
        function setupDropdowns() {
            // Fermer les dropdowns quand on clique en dehors
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-bar')) {
                    document.querySelectorAll('.questions-dropdown').forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            });
        }

        function toggleDropdown(dropdownId) {
            const dropdown = document.getElementById(dropdownId);
            const allDropdowns = document.querySelectorAll('.questions-dropdown');
            
            // Fermer tous les autres dropdowns
            allDropdowns.forEach(d => {
                if (d.id !== dropdownId) {
                    d.classList.remove('active');
                }
            });
            
            // Toggle le dropdown cliqué
            dropdown.classList.toggle('active');
        }
        
        function scrollTopAndOpenSearch() {
            // Scroll smooth vers le haut de la page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Focus sur l'input de recherche après le scroll
            setTimeout(() => {
                const landingIT = document.getElementById('landingIT');
                const landingGov = document.getElementById('landingGov');
                
                // Déterminer quel input focus
                if (landingIT && landingIT.style.display !== 'none') {
                    const inputIT = document.getElementById('questionInputIT');
                    if (inputIT) inputIT.focus();
                } else if (landingGov && landingGov.style.display !== 'none') {
                    const inputGov = document.getElementById('questionInputGov');
                    if (inputGov) inputGov.focus();
                }
            }, 600);
        }

        function selectQuestion(element, dropdownId) {
            const question = element.textContent;
            const dropdown = document.getElementById(dropdownId);
            const input = dropdown.previousElementSibling.previousElementSibling; // Le bouton est maintenant entre l'input et le dropdown
            
            // Remettre l'input en mode éditable et remplir avec la question
            input.removeAttribute('readonly');
            input.value = question;
            input.focus();
            
            // Fermer le dropdown
            dropdown.classList.remove('active');
        }
        
        // Fonction pour soumettre la question
        function submitQuestion(inputId) {
            const input = document.getElementById(inputId);
            const question = input.value.trim();
            
            if (!question) {
                alert('Veuillez saisir ou sélectionner une question');
                return;
            }
            
            // Ouvrir la modal de contact avec la question pré-remplie
            openContactModal();
            
            // Pré-remplir le champ question dans la modal
            setTimeout(() => {
                const questionField = document.getElementById('question');
                if (questionField) {
                    questionField.value = question;
                }
            }, 100);
        }
        
        // Event listeners pour la touche Entrée
        document.addEventListener('DOMContentLoaded', function() {
            const questionInputIT = document.getElementById('questionInput');
            const questionInputGov = document.getElementById('questionInputGov');
            
            if (questionInputIT) {
                questionInputIT.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter' && !this.hasAttribute('readonly')) {
                        submitQuestion('questionInput');
                    }
                });
            }
            
            if (questionInputGov) {
                questionInputGov.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter' && !this.hasAttribute('readonly')) {
                        submitQuestion('questionInputGov');
                    }
                });
            }

            // ==================== MOBILE MENU FULL-SCREEN ====================
            const hamburgerButton = document.getElementById('hamburgerButton');
            const mobileMenu = document.getElementById('mobileMenu');
            const fullscreenMenuContent = document.getElementById('fullscreenMenuContent');

            // Build full menu with all sections
            function buildFullscreenMenu() {
                const site = currentSite || 'it';
                const menuData = site === 'it' ? menuIT : menuGov;

                let html = '';

                // EXPERTISES
                html += '<div class="menu-section-title">Expertises</div>';
                menuData.expertises.forEach(item => {
                    html += `
                        <div class="menu-item" data-page="${item.id}">
                            <div class="menu-item-title">${item.title}</div>
                            <div class="menu-item-desc">${item.desc}</div>
                        </div>
                    `;
                });

                html += '<div class="menu-separator"></div>';

                // DÉCOUVRIR
                html += '<div class="menu-section-title">Découvrir</div>';
                menuData.decouvrir.forEach(item => {
                    html += `
                        <div class="menu-item" data-page="${item.id}">
                            <div class="menu-item-title">${item.title}</div>
                            <div class="menu-item-desc">${item.desc}</div>
                        </div>
                    `;
                });

                html += '<div class="menu-separator"></div>';

                // NOUS REJOINDRE
                html += '<div class="menu-section-title">Nous Rejoindre</div>';
                menuData.rejoindre.forEach(item => {
                    html += `
                        <div class="menu-item" data-page="${item.id}">
                            <div class="menu-item-title">${item.title}</div>
                            <div class="menu-item-desc">${item.desc}</div>
                        </div>
                    `;
                });

                html += '<div class="menu-separator"></div>';

                // CONTACT
                html += '<div class="menu-action" data-action="contact">CONTACT</div>';

                // SWITCHER
                const switchText = site === 'it' ? 'Passer à Gouvernance' : 'Passer à IT';
                html += `<div class="menu-action" data-action="switch">${switchText}</div>`;

                fullscreenMenuContent.innerHTML = html;

                // Add click handlers
                fullscreenMenuContent.querySelectorAll('.menu-item').forEach(item => {
                    item.addEventListener('click', function() {
                        const pageId = this.getAttribute('data-page');
                        hamburgerButton.classList.remove('active');
                        mobileMenu.classList.remove('open');

                        setTimeout(() => {
                            if (typeof showPage === 'function') {
                                showPage(pageId);
                            }
                        }, 100);
                    });
                });

                fullscreenMenuContent.querySelectorAll('.menu-action').forEach(action => {
                    action.addEventListener('click', function() {
                        const actionType = this.getAttribute('data-action');
                        hamburgerButton.classList.remove('active');
                        mobileMenu.classList.remove('open');

                        setTimeout(() => {
                            if (actionType === 'contact') {
                                if (typeof openChatInterface === 'function') {
                                    openChatInterface();
                                }
                            } else if (actionType === 'switch') {
                                if (typeof switchSite === 'function') {
                                    switchSite();
                                }
                                // Rebuild menu with new site data
                                setTimeout(() => {
                                    if (mobileMenu.classList.contains('open')) {
                                        buildFullscreenMenu();
                                    }
                                }, 300);
                            }
                        }, 100);
                    });
                });
            }

            // Toggle menu
            if (hamburgerButton && mobileMenu) {
                hamburgerButton.addEventListener('click', function() {
                    this.classList.toggle('active');
                    mobileMenu.classList.toggle('open');

                    if (mobileMenu.classList.contains('open')) {
                        buildFullscreenMenu();
                    }
                });

                // Close when clicking outside content
                mobileMenu.addEventListener('click', function(e) {
                    if (e.target === mobileMenu) {
                        hamburgerButton.classList.remove('active');
                        mobileMenu.classList.remove('open');
                    }
                });
            }
        });

        // Gestion du scroll pour les sections et l'indicateur
        function setupScrollEffects() {
            const scrollIndicator = document.getElementById('scrollIndicator');
            let hasScrolled = false;

            // Observer pour les sections qui apparaissent au scroll
            const observerOptions = {
                threshold: 0.05,
                rootMargin: '50px 0px 0px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            // Observer toutes les sections
            document.querySelectorAll('.landing-section').forEach(section => {
                observer.observe(section);
            });

            // Gestion de l'indicateur de scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100 && !hasScrolled) {
                    hasScrolled = true;
                    scrollIndicator.classList.add('hidden-on-scroll');
                } else if (window.scrollY <= 100 && hasScrolled) {
                    hasScrolled = false;
                    scrollIndicator.classList.remove('hidden-on-scroll');
                }
            });
        }

        // Afficher/masquer l'indicateur selon la page
        function updateScrollIndicator() {
            const scrollIndicator = document.getElementById('scrollIndicator');
            const landingIT = document.getElementById('landingIT');
            const landingGov = document.getElementById('landingGov');
            
            if ((landingIT && landingIT.classList.contains('active')) || 
                (landingGov && landingGov.classList.contains('active'))) {
                scrollIndicator.classList.add('visible');
            } else {
                scrollIndicator.classList.remove('visible');
            }
        }

        // Sélection du site
        function selectSite(site) {
            currentSite = site;
            document.body.classList.remove('welcome-mode');
            document.getElementById('welcomeScreen').classList.add('hidden');
            document.getElementById('logoBtn').classList.add('visible');
            document.getElementById('miniSidebar').classList.add('visible');
            document.getElementById('dynamicIsland').classList.add('visible');
            document.body.classList.add('has-mini-sidebar');

            const switcherText = document.querySelector('.sidebar-switcher-text');

            if (site === 'it') {
                document.body.classList.add('theme-it');
                document.body.classList.remove('theme-gov');
                document.getElementById('landingIT').classList.add('active');
                document.getElementById('siteSwitcher').textContent = 'Stratégie Gouvernance';
                // Mettre à jour le bouton sidebar: sur IT, afficher "Gouv"
                if (switcherText) switcherText.textContent = 'Gouv';
            } else {
                document.body.classList.add('theme-gov');
                document.body.classList.remove('theme-it');
                document.getElementById('landingGov').classList.add('active');
                document.getElementById('siteSwitcher').textContent = 'Expertise IT';
                // Mettre à jour le bouton sidebar: sur GOV, afficher "IT"
                if (switcherText) switcherText.textContent = 'IT';
            }

            document.getElementById('siteSwitcher').classList.add('visible');
            updateMenu();
            updateScrollIndicator();
            currentPage = 'landing';
            
            // Ouvrir le Dynamic Island automatiquement après 5 sec
            setTimeout(() => {
                if (currentPage === 'landing') {
                    showExperts();
                }
            }, 5000);
        }

        // Switch site
        function switchSite() {
            document.querySelectorAll('.work-in-progress, .main-container').forEach(p => p.classList.remove('active'));

            if (currentSite === 'it') {
                currentSite = 'gov';
                document.body.classList.remove('theme-it');
                document.body.classList.add('theme-gov');
                document.getElementById('landingGov').classList.add('active');
                document.getElementById('siteSwitcher').textContent = 'Expertise IT';
                // Update mobile switcher text
                const mobileSwitcher = document.getElementById('mobileSwitcherText');
                if (mobileSwitcher) mobileSwitcher.textContent = 'Expertise IT';
            } else {
                currentSite = 'it';
                document.body.classList.remove('theme-gov');
                document.body.classList.add('theme-it');
                document.getElementById('landingIT').classList.add('active');
                document.getElementById('siteSwitcher').textContent = 'Stratégie Gouvernance';
                // Update mobile switcher text
                const mobileSwitcher = document.getElementById('mobileSwitcherText');
                if (mobileSwitcher) mobileSwitcher.textContent = 'Gouvernance';
            }

            updateMenu();
            updateScrollIndicator();
            currentPage = 'landing';
            window.scrollTo(0, 0);

            // Ouvrir le Dynamic Island automatiquement après 5 sec
            setTimeout(() => {
                if (currentPage === 'landing') {
                    showExperts();
                }
            }, 5000);
        }

        // Update mobile switcher text based on current site
        function updateMobileSwitcherText() {
            const mobileSwitcher = document.getElementById('mobileSwitcherText');
            if (mobileSwitcher) {
                if (currentSite === 'it') {
                    mobileSwitcher.textContent = 'Gouvernance';
                } else {
                    mobileSwitcher.textContent = 'Expertise IT';
                }
            }
        }

        // Retour home avec animation
        function goHome() {
            // Si on est sur une page de contenu (pas sur landing), retourner au landing IT/Gov
            const isOnLanding = currentPage === 'landing';
            
            if (!isOnLanding && currentSite) {
                // Retour au landing du site actuel
                document.querySelectorAll('.work-in-progress').forEach(p => p.classList.remove('active'));
                
                if (currentSite === 'it') {
                    document.getElementById('landingIT').classList.add('active');
                } else {
                    document.getElementById('landingGov').classList.add('active');
                }
                
                updateScrollIndicator();
                currentPage = 'landing';
                window.scrollTo(0, 0);
                return;
            }
            
            // Si on est déjà sur landing, retour au welcome screen avec animation
            const introAnimation = document.getElementById('introAnimation');
            introAnimation.classList.remove('active');
            void introAnimation.offsetWidth;
            introAnimation.classList.add('active');

            setTimeout(() => {
                document.querySelectorAll('.work-in-progress, .main-container').forEach(p => p.classList.remove('active'));

                const sidebar = document.getElementById('sidebar');
                const backdrop = document.getElementById('sidebarBackdrop');
                sidebar.classList.remove('open');
                backdrop.classList.remove('active');

                document.getElementById('welcomeScreen').classList.remove('hidden');
                document.getElementById('logoBtn').classList.remove('visible');
                document.getElementById('miniSidebar').classList.remove('visible');
                document.getElementById('dynamicIsland').classList.remove('visible');
                document.getElementById('siteSwitcher').classList.remove('visible');
                document.getElementById('scrollIndicator').classList.remove('visible');

                document.body.classList.remove('theme-it', 'theme-gov', 'has-mini-sidebar');
                document.body.classList.add('welcome-mode');
                
                currentSite = null;
                currentPage = 'welcome';
                window.scrollTo(0, 0);
            }, 3000);
        }

        // Toggle sidebar
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const backdrop = document.getElementById('sidebarBackdrop');
            sidebar.classList.toggle('open');
            backdrop.classList.toggle('active');
            
            // Si on ouvre la sidebar, afficher le menu complet
            if (sidebar.classList.contains('open')) {
                updateMenu();
            }
        }
        
        // Ouvrir la sidebar avec uniquement une section spécifique
        function openSidebarSection(section, siteType) {
            const sidebar = document.getElementById('sidebar');
            const backdrop = document.getElementById('sidebarBackdrop');

            // Sur welcome page, gérer différemment les sections non-expertises
            if (currentPage === 'welcome' && section !== 'expertises') {
                if (section === 'contact') {
                    // Ouvrir directement le chat
                    openChatInterface();
                    return;
                } else {
                    // Pour Découvrir et Rejoindre, afficher un message de sélection de track
                    const content = document.getElementById('sidebarMenu');
                    let sectionTitle = section === 'decouvrir' ? 'Découvrir' : 'Nous Rejoindre';

                    content.innerHTML = `
                        <div class="sidebar-section">
                            <h3>${sectionTitle}</h3>
                            <p style="color: rgba(245, 245, 247, 0.7); margin-bottom: 20px; font-size: 0.9rem;">
                                Sélectionnez d'abord votre parcours :
                            </p>
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                <div class="expertise-track-button" onclick="selectTrackAndNavigate('it', '${section}')">
                                    <span>Expertise Technique IT</span>
                                </div>
                                <div class="expertise-track-button" onclick="selectTrackAndNavigate('gov', '${section}')">
                                    <span>Gouvernance & Stratégie</span>
                                </div>
                            </div>
                        </div>
                    `;
                    sidebar.classList.add('open');
                    backdrop.classList.add('active');
                    return;
                }
            }

            // Si siteType n'est pas fourni, utiliser currentSite
            const site = siteType || currentSite;

            // S'assurer que currentSite est défini
            if (!currentSite && siteType) {
                currentSite = siteType;
            }

            const menuData = site === 'it' ? menuIT : menuGov;
            const content = document.getElementById('sidebarMenu');

            let html = '';

            // Afficher uniquement la section demandée
            if (section === 'expertises') {
                // Sur la welcome page, afficher un menu hiérarchique avec choix IT/Gov
                if (currentPage === 'welcome') {
                    html += '<div class="sidebar-section"><h3>Expertises</h3>';

                    // Bouton Expertise Technique IT
                    html += `
                        <div class="expertise-track-selector">
                            <div class="expertise-track-button" onclick="toggleExpertiseTrack('it')">
                                <span>Expertise Technique IT</span>
                                <svg class="track-arrow" id="arrow-it" viewBox="0 0 24 24" width="20" height="20">
                                    <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="2" fill="none"/>
                                </svg>
                            </div>
                            <div class="expertise-track-dropdown" id="dropdown-it" style="display: none;">
                                <div class="expertise-tags">
                    `;
                    menuIT.expertises.forEach(item => {
                        html += `<div class="expertise-tag" onclick="selectTrackAndPage('it', '${item.id}')">${item.title}</div>`;
                    });
                    html += `
                                </div>
                            </div>
                        </div>
                    `;

                    // Bouton Gouvernance & Stratégie
                    html += `
                        <div class="expertise-track-selector">
                            <div class="expertise-track-button" onclick="toggleExpertiseTrack('gov')">
                                <span>Gouvernance & Stratégie</span>
                                <svg class="track-arrow" id="arrow-gov" viewBox="0 0 24 24" width="20" height="20">
                                    <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="2" fill="none"/>
                                </svg>
                            </div>
                            <div class="expertise-track-dropdown" id="dropdown-gov" style="display: none;">
                                <div class="expertise-tags">
                    `;
                    menuGov.expertises.forEach(item => {
                        html += `<div class="expertise-tag" onclick="selectTrackAndPage('gov', '${item.id}')">${item.title}</div>`;
                    });
                    html += `
                                </div>
                            </div>
                        </div>
                    `;

                    html += '</div>';
                } else {
                    // Comportement normal quand on n'est pas sur la welcome page
                    html += '<div class="sidebar-section"><h3>Expertises</h3><div class="expertise-tags">';
                    menuData.expertises.forEach(item => {
                        html += `<div class="expertise-tag" onclick="showPage('${item.id}')">${item.title}</div>`;
                    });
                    html += '</div></div>';
                }
            } else if (section === 'decouvrir') {
                html += '<div class="sidebar-section"><h3>Découvrir</h3>';
                menuData.decouvrir.forEach(item => {
                    html += `<div class="sidebar-item" onclick="showPage('${item.id}')">${item.title}</div>`;
                });
                html += '</div>';
            } else if (section === 'rejoindre') {
                html += '<div class="sidebar-section"><h3>Nous Rejoindre & Partenariat</h3>';
                menuData.rejoindre.forEach(item => {
                    html += `<div class="sidebar-item" onclick="showPage('${item.id}')">${item.title}</div>`;
                });
                html += '</div>';
            } else if (section === 'contact') {
                html += '<div class="sidebar-section"><h3>Informations & Contacts</h3>';
                menuData.contact.forEach(item => {
                    html += `<div class="sidebar-item" onclick="showPage('${item.id}')">${item.title}</div>`;
                });
                html += '</div>';
            }
            
            content.innerHTML = html;
            sidebar.classList.add('open');
            backdrop.classList.add('active');
        }

        // Fermer le sidebar en cliquant n'importe où sur l'écran
        document.addEventListener('click', function(e) {
            const sidebar = document.getElementById('sidebar');
            const miniSidebar = document.getElementById('miniSidebar');
            const backdrop = document.getElementById('sidebarBackdrop');
            
            if (sidebar.classList.contains('open') && 
                !sidebar.contains(e.target) && 
                !miniSidebar.contains(e.target)) {
                sidebar.classList.remove('open');
                backdrop.classList.remove('active');
            }
        });

        // Update menu
        function updateMenu() {
            const menuData = currentSite === 'it' ? menuIT : menuGov;
            const content = document.getElementById('sidebarMenu');
            
            let html = '';
            
            // Expertises
            html += '<div class="sidebar-section"><h3>Expertises</h3><div class="expertise-tags">';
            menuData.expertises.forEach(item => {
                html += `<div class="expertise-tag" onclick="showPage('${item.id}')">${item.title}</div>`;
            });
            html += '</div></div>';
            
            // Découvrir
            html += '<div class="sidebar-section"><h3>Découvrir</h3>';
            menuData.decouvrir.forEach(item => {
                html += `<div class="sidebar-item" onclick="showPage('${item.id}')">${item.title}</div>`;
            });
            html += '</div>';
            
            // Nous rejoindre
            html += '<div class="sidebar-section"><h3>Nous Rejoindre & Partenariat</h3>';
            menuData.rejoindre.forEach(item => {
                html += `<div class="sidebar-item" onclick="showPage('${item.id}')">${item.title}</div>`;
            });
            html += '</div>';
            
            // Contact
            html += '<div class="sidebar-section"><h3>Informations & Contacts</h3>';
            menuData.contact.forEach(item => {
                html += `<div class="sidebar-item" onclick="showPage('${item.id}')">${item.title}</div>`;
            });
            html += '</div>';
            
            content.innerHTML = html;
        }

        // Toggle dropdown d'expertise track (welcome page uniquement)
        function toggleExpertiseTrack(track) {
            const dropdown = document.getElementById(`dropdown-${track}`);
            const arrow = document.getElementById(`arrow-${track}`);
            const otherTrack = track === 'it' ? 'gov' : 'it';
            const otherDropdown = document.getElementById(`dropdown-${otherTrack}`);
            const otherArrow = document.getElementById(`arrow-${otherTrack}`);

            // Toggle le dropdown cliqué
            if (dropdown.style.display === 'none') {
                dropdown.style.display = 'block';
                arrow.style.transform = 'rotate(180deg)';
            } else {
                dropdown.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            }

            // Fermer l'autre dropdown
            if (otherDropdown && otherDropdown.style.display === 'block') {
                otherDropdown.style.display = 'none';
                otherArrow.style.transform = 'rotate(0deg)';
            }
        }

        // Sélectionner un track et naviguer vers une page
        function selectTrackAndPage(track, pageId) {
            // Définir le site actuel
            currentSite = track;

            // Appliquer le thème
            document.body.classList.remove('theme-it', 'theme-gov', 'welcome-mode');
            document.body.classList.add(`theme-${track}`, 'has-mini-sidebar');

            // Afficher la page
            showPage(pageId);

            // Fermer la sidebar
            const sidebar = document.getElementById('sidebar');
            const backdrop = document.getElementById('sidebarBackdrop');
            sidebar.classList.remove('open');
            backdrop.classList.remove('active');

            // Afficher les éléments du site
            document.getElementById('welcomeScreen').classList.add('hidden');
            document.getElementById('logoBtn').classList.add('visible');
            document.getElementById('miniSidebar').classList.add('visible');
            document.getElementById('dynamicIsland').classList.add('visible');
            document.getElementById('siteSwitcher').classList.add('visible');

            currentPage = pageId;
        }

        // Sélectionner un track et naviguer vers une section (welcome page)
        function selectTrackAndNavigate(track, section) {
            // Définir le site actuel
            currentSite = track;

            // Appliquer le thème
            document.body.classList.remove('theme-it', 'theme-gov', 'welcome-mode');
            document.body.classList.add(`theme-${track}`, 'has-mini-sidebar');

            // Afficher les éléments du site
            document.getElementById('welcomeScreen').classList.add('hidden');
            document.getElementById('logoBtn').classList.add('visible');
            document.getElementById('miniSidebar').classList.add('visible');
            document.getElementById('dynamicIsland').classList.add('visible');
            document.getElementById('siteSwitcher').classList.add('visible');

            currentPage = 'landing';

            // Ouvrir la sidebar avec la section demandée
            openSidebarSection(section);
        }

        // Show page
        function showPage(pageId) {
            toggleSidebar();
            
            document.querySelectorAll('.main-container, .work-in-progress').forEach(p => p.classList.remove('active'));
            
            const page = document.getElementById(pageId);
            if (page) {
                page.classList.add('active');
                currentPage = pageId;
                window.scrollTo(0, 0);
            }
            
            // Cacher l'indicateur de scroll sur les pages internes
            document.getElementById('scrollIndicator').classList.remove('visible');
        }

        // Show experts in Dynamic Island - EXACTE V15
        function showExperts() {
            const content = document.getElementById('islandContent');

            // Si on est en train d'afficher les experts, on ferme
            if (islandAnimating) {
                if (islandTimeout) clearTimeout(islandTimeout);
                content.innerHTML = 'EXPERTS & STRATÈGES';
                islandAnimating = false;
                return;
            }

            // Sinon on ouvre
            islandAnimating = true;

            // Sur la page d'accueil, afficher tous les experts (IT + Gov)
            let experts;
            if (!currentSite || currentPage === 'welcome') {
                experts = [...expertsIT, ...expertsGov];
            } else {
                experts = currentSite === 'it' ? expertsIT : expertsGov;
            }

            let html = '<div class="experts-scroll-island">';
            experts.forEach(expert => {
                html += `<div class="expert-item-island"><span class="expert-name-island">${expert.name}</span>${expert.role}</div>`;
            });
            html += '</div>';

            content.innerHTML = html;

            // Fermer automatiquement après 24 secondes (temps pour voir défiler tous les experts)
            islandTimeout = setTimeout(() => {
                content.innerHTML = 'EXPERTS & STRATÈGES';
                islandAnimating = false;
            }, 24000);
        }

        // Créer les pages de contenu
        function createContentPages() {
            const container = document.getElementById('contentPages');
            container.innerHTML = `
                <!-- DATA & IA - IT -->
                <div class="work-in-progress" id="pageDataIA">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Data & IA</h1>
                            <p class="story-subtitle">EXPLOITEZ LA PUISSANCE DE VOS DONNÉES</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Codentis excelle dans la <span class="highlight">transformation de vos données brutes en leviers stratégiques</span>. Nous concevons et mettons en œuvre des <span class="highlight">pipelines ETL robustes</span>, des <span class="highlight">entrepôts de données optimisés</span>, et développons des <span class="highlight">modèles de Machine Learning et NLP</span> pour des prévisions précises. Notre expertise s'étend à la mise en place de <span class="highlight">catalogues de données</span> pour un référentiel centralisé, ainsi qu'au développement de modèles IA performants pour <span class="highlight">automatiser vos processus (AIOps, SRE)</span> et optimiser vos opérations (Predictive AI, Causal AI, Generative AI).
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Typiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Mettre en place une <span class="highlight">architecture data moderne</span> (Data Lake, Data Warehouse, lakehouse) avec des pipelines ETL automatisés.</div></div>
                                    <div class="case-item"><div class="case-text">Développer un <span class="highlight">modèle de prédiction</span> pour optimiser production, logistique ou anticiper les pannes (maintenance prédictive).</div></div>
                                    <div class="case-item"><div class="case-text">Établir une <span class="highlight">gouvernance des données rigoureuse</span> garantissant qualité, conformité réglementaire (RGPD) et sécurité de vos actifs informationnels.</div></div>
                                    <div class="case-item"><div class="case-text">Mettre en place des <span class="highlight">dashboards métiers interactifs</span> (PowerBI, Tableau, Qlik) pour des visualisations claires et une prise de décision éclairée.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Atypiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Déployer un projet de <span class="highlight">SRE & AIOps</span> avec modèles IA pour automatiser vos processus, anticiper les pannes et fiabiliser vos infrastructures (Self-Healing, Error Budget).</div></div>
                                    <div class="case-item"><div class="case-text">Construire un <span class="highlight">jumeau numérique de production</span> ou mettre en place des pratiques DataOps pour optimiser le cycle de vie de vos données.</div></div>
                                    <div class="case-item"><div class="case-text">Lancer une offre interne de <span class="highlight">Data-as-a-Service</span> avec catalogue de données centralisé permettant aux équipes métiers d'accéder à des données fiables et référencées.</div></div>
                                    <div class="case-item"><div class="case-text">Développer des modèles de <span class="highlight">Generative AI, Causal AI ou Predictive AI</span> pour créer de la valeur business à partir de vos données.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Besoin d'aide sur la <span class="cta-highlight">Data & IA</span> ?</h3>
                            <p class="cta-subtitle">Un expert répond sous 24h !</p>
                            <button class="cta-button" onclick="openContactModal()">Poser ma question →</button>
                        </div>
                    </div>
                </div>

                <!-- DÉVELOPPEMENT - IT -->
                <div class="work-in-progress" id="pageDigital">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Développement</h1>
                            <p class="story-subtitle">SOLUTIONS DIGITALES ROBUSTES ET ERGONOMIQUES</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Nous créons des <span class="highlight">applications web et mobiles innovantes, sur mesure</span>, qui répondent précisément à vos besoins fonctionnels et esthétiques. De l'<span class="highlight">audit UX/UI à la conception d'interfaces intuitives</span>, nous assurons une expérience utilisateur fluide et engageante. Notre expertise couvre le <span class="highlight">développement full-stack</span>, l'<span class="highlight">intégration API & microservices</span> pour une flexibilité maximale, ainsi que la mise en place de <span class="highlight">solutions e-commerce performantes et sécurisées</span>.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Typiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Développer un <span class="highlight">portail client B2B</span> en Symfony / .NET C# pour la gestion documentaire.</div></div>
                                    <div class="case-item"><div class="case-text">Créer une <span class="highlight">interface front-end réactive</span> en React/Vue.js avec des parcours fluides.</div></div>
                                    <div class="case-item"><div class="case-text">Repenser l'<span class="highlight">UX d'un outil interne</span> pour réduire les temps de formation.</div></div>
                                    <div class="case-item"><div class="case-text">Développer une <span class="highlight">application mobile iOS/Android</span> pour donner accès aux collaborateurs terrain.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Atypiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Intégrer une application mobile avec un <span class="highlight">système legacy via API</span>, en maintenant la cohérence des parcours.</div></div>
                                    <div class="case-item"><div class="case-text">Refonte UX d'un <span class="highlight">tableau de bord complexe</span> pour le rendre lisible par des non-techniciens.</div></div>
                                    <div class="case-item"><div class="case-text">Créer une <span class="highlight">mini-app événementielle temporaire</span>, hautement performante et intuitive.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Besoin d'aide sur le <span class="cta-highlight">Développement</span> ?</h3>
                            <p class="cta-subtitle">Un expert répond sous 24h !</p>
                            <button class="cta-button" onclick="openContactModal()">Poser ma question →</button>
                        </div>
                    </div>
                </div>

                <!-- INFRASTRUCTURE & CLOUD - IT -->
                <div class="work-in-progress" id="pageInfrastructure">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Infrastructure Cloud & DevOps</h1>
                            <p class="story-subtitle">MODERNISEZ ET OPTIMISEZ VOS INFRASTRUCTURES</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Nos experts interviennent sur <span class="highlight">toutes les couches des infrastructures</span> (systèmes, réseaux, stockage, sauvegarde, middlewares) en environnement <span class="highlight">on-premise et cloud</span>. Nous accompagnons la <span class="highlight">migration stratégique vers le cloud</span> (public, hybride, multi-cloud) et l'implémentation de <span class="highlight">pratiques DevOps et DevSecOps</span>. Notre expertise couvre le conseil, le design, le build et le maintien en condition opérationnelle, ainsi que la mise en place de <span class="highlight">pipelines CI/CD robustes et sécurisées</span> pour l'intégration, le testing et le déploiement continus.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Typiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Migrer un SI vers le <span class="highlight">cloud hybride ou multi-cloud</span> (AWS, Azure, GCP) avec Infrastructure as Code (Terraform, Pulumi).</div></div>
                                    <div class="case-item"><div class="case-text">Mettre en place un plan de <span class="highlight">haute disponibilité</span>, DRP et optimisation des infrastructures on-premise (systèmes, réseaux, stockage).</div></div>
                                    <div class="case-item"><div class="case-text">Automatiser les déploiements via <span class="highlight">CI/CD (GitLab, Jenkins, ArgoCD)</span>, conteneurisation (Kubernetes, Docker) et monitoring avancé.</div></div>
                                    <div class="case-item"><div class="case-text">Accompagner la transformation vers l'<span class="highlight">Ingénierie DevOps</span> et la mise en place des services continus (DevSecOps).</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Atypiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Déployer une architecture <span class="highlight">edge computing</span> pour traiter des données locales en temps réel.</div></div>
                                    <div class="case-item"><div class="case-text">Réduire les <span class="highlight">coûts cloud</span> en refactorisant une architecture trop consommatrice.</div></div>
                                    <div class="case-item"><div class="case-text">Mettre en place une infrastructure <span class="highlight">hyperconvergée</span> pour un site isolé avec bascule cloud.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Besoin d'aide sur le <span class="cta-highlight">Cloud</span> ?</h3>
                            <p class="cta-subtitle">Un expert répond sous 24h !</p>
                            <button class="cta-button" onclick="openContactModal()">Poser ma question →</button>
                        </div>
                    </div>
                </div>

                <!-- CYBERSÉCURITÉ - IT -->
                <div class="work-in-progress" id="pageCybersecurity">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Cybersécurité</h1>
                            <p class="story-subtitle">SÉCURITÉ COMME AVANTAGE COMPÉTITIF</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Nous sécurisons les systèmes critiques face aux menaces croissantes. De l'audit préventif à la réponse à incident, nos experts transforment la cybersécurité en <span class="highlight">avantage compétitif</span>.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Typiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Réaliser un <span class="highlight">audit de sécurité</span> et corriger les vulnérabilités détectées.</div></div>
                                    <div class="case-item"><div class="case-text">Mettre en place une politique d'<span class="highlight">accès et d'identité robuste</span> (MFA, Zero Trust).</div></div>
                                    <div class="case-item"><div class="case-text">Former et sensibiliser les équipes avec des <span class="highlight">ateliers pratiques</span> et des simulations.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Atypiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Gérer une <span class="highlight">crise cyber</span> : détection, confinement, restauration, post-mortem.</div></div>
                                    <div class="case-item"><div class="case-text">Sécuriser une application <span class="highlight">mobile/IoT avec cryptographie embarquée</span>.</div></div>
                                    <div class="case-item"><div class="case-text">Déployer une sécurité <span class="highlight">multi-pays</span> conforme à plusieurs réglementations (RGPD, NIS2, etc.).</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Besoin d'aide sur la <span class="cta-highlight">Cybersécurité</span> ?</h3>
                            <p class="cta-subtitle">Un expert répond sous 24h !</p>
                            <button class="cta-button" onclick="openContactModal()">Poser ma question →</button>
                        </div>
                    </div>
                </div>

                <!-- CYBERSÉCURITÉ - IT -->
                <div class="work-in-progress" id="pageCybersecurity">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Cybersécurité</h1>
                            <p class="story-subtitle">SÉCURITÉ COMME AVANTAGE COMPÉTITIF</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Nous sécurisons les systèmes critiques face aux menaces croissantes. De l'audit préventif à la réponse à incident, nos experts transforment la cybersécurité en <span class="highlight">avantage compétitif</span>.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Typiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Réaliser un <span class="highlight">audit de sécurité</span> et corriger les vulnérabilités détectées.</div></div>
                                    <div class="case-item"><div class="case-text">Mettre en place une politique d'<span class="highlight">accès et d'identité robuste</span> (MFA, Zero Trust).</div></div>
                                    <div class="case-item"><div class="case-text">Former et sensibiliser les équipes avec des <span class="highlight">ateliers pratiques</span> et des simulations.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Atypiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Gérer une <span class="highlight">crise cyber</span> : détection, confinement, restauration, post-mortem.</div></div>
                                    <div class="case-item"><div class="case-text">Sécuriser une application <span class="highlight">mobile/IoT avec cryptographie embarquée</span>.</div></div>
                                    <div class="case-item"><div class="case-text">Déployer une sécurité <span class="highlight">multi-pays</span> conforme à plusieurs réglementations (RGPD, NIS2, etc.).</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Besoin d'aide sur la <span class="cta-highlight">Cybersécurité</span> ?</h3>
                            <p class="cta-subtitle">Un expert répond sous 24h !</p>
                            <button class="cta-button" onclick="openContactModal()">Poser ma question →</button>
                        </div>
                    </div>
                </div>

                <!-- WORKSHOPS - IT -->
                <div class="work-in-progress" id="pageWorkshops">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Workshops & Conférences</h1>
                            <p class="story-subtitle">MONTÉE EN COMPÉTENCE TECHNIQUE</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Nous animons des <span class="highlight">workshops techniques sur-mesure</span> pour vos équipes : architecture cloud, sécurité applicative, data engineering, pratiques DevOps. Des formats interactifs pour accélérer la montée en compétence.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Thématiques Populaires</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text"><span class="highlight">Architecture microservices</span> : patterns, communication inter-services, gestion des données distribuées.</div></div>
                                    <div class="case-item"><div class="case-text"><span class="highlight">Sécurité applicative</span> : OWASP Top 10, secure coding, DevSecOps.</div></div>
                                    <div class="case-item"><div class="case-text"><span class="highlight">Data Engineering</span> : pipelines ETL/ELT, orchestration avec Airflow, streaming avec Kafka.</div></div>
                                    <div class="case-item"><div class="case-text"><span class="highlight">Cloud-native development</span> : containers, Kubernetes, serverless.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Organiser un <span class="cta-highlight">Workshop</span> ?</h3>
                            <p class="cta-subtitle">Nos experts créent un format sur-mesure !</p>
                            <button class="cta-button" onclick="openContactModal()">Nous contacter →</button>
                        </div>
                    </div>
                </div>

                <!-- WORKSHOPS - GOUVERNANCE -->
                <div class="work-in-progress" id="pageWorkshopsGov">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Workshops & Conférences</h1>
                            <p class="story-subtitle">FORMATION & ACCOMPAGNEMENT PRODUIT</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Nous animons des <span class="highlight">workshops stratégiques et produit</span> pour vos équipes : product discovery, priorisation, OKRs, design thinking, agilité. Des formats interactifs pour transformer les pratiques.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Thématiques Populaires</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text"><span class="highlight">Product Discovery</span> : user research, définition de personas, jobs-to-be-done, prototypage.</div></div>
                                    <div class="case-item"><div class="case-text"><span class="highlight">Priorisation produit</span> : frameworks RICE, MoSCoW, Value vs Effort, Kano model.</div></div>
                                    <div class="case-item"><div class="case-text"><span class="highlight">OKRs & stratégie</span> : définir des objectifs alignés, mesurer l'impact, rituels OKRs.</div></div>
                                    <div class="case-item"><div class="case-text"><span class="highlight">Agilité & Scrum</span> : fondamentaux, rôles, cérémonies, mise en pratique.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Organiser un <span class="cta-highlight">Workshop</span> ?</h3>
                            <p class="cta-subtitle">Nos experts créent un format sur-mesure !</p>
                            <button class="cta-button" onclick="openContactModal()">Nous contacter →</button>
                        </div>
                    </div>
                </div>

                <!-- DATA & IA - GOUVERNANCE -->
                <div class="work-in-progress" id="pageDataIAGov">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Data & IA - Vision Produit</h1>
                            <p class="story-subtitle">STRATÉGIE DATA AU SERVICE DU BUSINESS</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Au-delà de la technique, nous aidons à <span class="highlight">définir la stratégie data</span> alignée sur les objectifs métier : priorisation des use cases, définition des KPIs, gouvernance des données, roadmap produit data. Transformez vos données en <span class="highlight">valeur business mesurable</span>.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Typiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Élaborer une <span class="highlight">data strategy</span> avec priorisation des use cases à fort ROI.</div></div>
                                    <div class="case-item"><div class="case-text">Mettre en place une <span class="highlight">gouvernance des données</span> (data quality, data catalog, rôles).</div></div>
                                    <div class="case-item"><div class="case-text">Piloter un <span class="highlight">projet data/IA en mode produit</span> : roadmap, OKRs, mesure de l'impact.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Atypiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Accompagner la <span class="highlight">transformation data-driven</span> : culture, organisation, upskilling.</div></div>
                                    <div class="case-item"><div class="case-text">Créer un <span class="highlight">data office</span> avec définition des rôles (CDO, Data Stewards).</div></div>
                                    <div class="case-item"><div class="case-text">Piloter un programme <span class="highlight">IA éthique et responsable</span> conforme aux régulations.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Besoin d'aide sur votre <span class="cta-highlight">stratégie Data</span> ?</h3>
                            <p class="cta-subtitle">Un expert répond sous 24h !</p>
                            <button class="cta-button" onclick="openContactModal()">Poser ma question →</button>
                        </div>
                    </div>
                </div>

                <!-- PRODUCT MANAGEMENT - GOUVERNANCE -->
                <div class="work-in-progress" id="pageDigitalGov">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Product Management</h1>
                            <p class="story-subtitle">VISION PRODUIT & EXPÉRIENCE UTILISATEUR</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Nos Product Managers et UX Designers accompagnent la <span class="highlight">définition de la vision produit</span>, la priorisation du backlog, et la conception d'expériences utilisateurs fluides. Nous aidons à construire des <span class="highlight">produits centrés utilisateur</span>.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Typiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Définir la <span class="highlight">product roadmap</span> alignée sur la stratégie business avec OKRs.</div></div>
                                    <div class="case-item"><div class="case-text">Conduire des <span class="highlight">ateliers de discovery</span> : user research, personas, jobs-to-be-done.</div></div>
                                    <div class="case-item"><div class="case-text">Prioriser le <span class="highlight">backlog produit</span> avec frameworks adaptés (RICE, MoSCoW).</div></div>
                                    <div class="case-item"><div class="case-text">Optimiser l'<span class="highlight">UX/UI</span> : audit ergonomique, wireframes, tests utilisateurs.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Atypiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Structurer une <span class="highlight">organisation produit</span> à l'échelle (Product Ops, Product Marketing).</div></div>
                                    <div class="case-item"><div class="case-text">Lancer un <span class="highlight">MVP en 3 mois</span> avec méthodologie Lean Startup.</div></div>
                                    <div class="case-item"><div class="case-text">Piloter la <span class="highlight">refonte complète</span> d'une plateforme avec 100k+ utilisateurs.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Besoin d'un <span class="cta-highlight">Product Manager</span> ?</h3>
                            <p class="cta-subtitle">Un expert répond sous 24h !</p>
                            <button class="cta-button" onclick="openContactModal()">Poser ma question →</button>
                        </div>
                    </div>
                </div>

                <!-- CLOUD - STRATÉGIE - GOUVERNANCE -->
                <div class="work-in-progress" id="pageInfrastructureGov">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Cloud - Stratégie & Gouvernance</h1>
                            <p class="story-subtitle">PILOTER LA TRANSFORMATION CLOUD</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Nous accompagnons la <span class="highlight">définition de la stratégie cloud</span> et son exécution : évaluation des workloads, business case de migration, gouvernance multi-cloud, optimisation FinOps, conduite du changement.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Typiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Élaborer une <span class="highlight">cloud strategy</span> : choix des providers, modèles hybride/multi-cloud.</div></div>
                                    <div class="case-item"><div class="case-text">Construire le <span class="highlight">business case</span> de migration avec TCO et ROI détaillés.</div></div>
                                    <div class="case-item"><div class="case-text">Mettre en place une <span class="highlight">gouvernance cloud</span> : politiques, gestion des coûts, sécurité.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Atypiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Piloter la <span class="highlight">transformation cloud</span> : PMO, conduite du changement, formation.</div></div>
                                    <div class="case-item"><div class="case-text">Optimiser les <span class="highlight">coûts cloud</span> avec approche FinOps et tableaux de bord.</div></div>
                                    <div class="case-item"><div class="case-text">Définir une stratégie <span class="highlight">cloud souverain</span> pour secteurs régulés.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Besoin d'aide sur votre <span class="cta-highlight">stratégie Cloud</span> ?</h3>
                            <p class="cta-subtitle">Un expert répond sous 24h !</p>
                            <button class="cta-button" onclick="openContactModal()">Poser ma question →</button>
                        </div>
                    </div>
                </div>

                <!-- CYBER - GOUVERNANCE -->
                <div class="work-in-progress" id="pageCybersecurityGov">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Cybersécurité - Gouvernance</h1>
                            <p class="story-subtitle">PILOTAGE DE LA SÉCURITÉ</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Au-delà des audits techniques, nous accompagnons la <span class="highlight">gouvernance de la cybersécurité</span> : définition de la politique de sécurité, mise en place d'un SMSI (ISO 27001), pilotage de la conformité réglementaire.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Typiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Mettre en place un <span class="highlight">SMSI (ISO 27001)</span> : politique, procédures, analyse de risques.</div></div>
                                    <div class="case-item"><div class="case-text">Piloter la <span class="highlight">conformité NIS2, RGPD, DORA</span> avec roadmap et suivi des actions.</div></div>
                                    <div class="case-item"><div class="case-text">Définir une <span class="highlight">stratégie de cybersécurité</span> alignée sur les risques métier.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Atypiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Animer un programme de <span class="highlight">sensibilisation sécurité</span> pour créer une culture cyber.</div></div>
                                    <div class="case-item"><div class="case-text">Structurer une <span class="highlight">organisation cyber</span> : RSSI, Security Champions, SOC.</div></div>
                                    <div class="case-item"><div class="case-text">Piloter la <span class="highlight">cyber-résilience</span> : plans de continuité, gestion de crise.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Besoin d'aide sur la <span class="cta-highlight">gouvernance Cyber</span> ?</h3>
                            <p class="cta-subtitle">Un expert répond sous 24h !</p>
                            <button class="cta-button" onclick="openContactModal()">Poser ma question →</button>
                        </div>
                    </div>
                </div>

                <!-- GOUVERNANCE OPÉRATIONNELLE -->
                <div class="work-in-progress" id="pageGouvernance">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Gouvernance Opérationnelle</h1>
                            <p class="story-subtitle">PILOTAGE & TRANSFORMATION</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Nous accompagnons le <span class="highlight">pilotage de projets complexes</span> et la <span class="highlight">transformation des organisations</span> : agilité à l'échelle (SAFe, LeSS, Spotify), coaching de Product Owners et Scrum Masters, structuration de PMO.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Typiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Déployer l'<span class="highlight">agilité à l'échelle</span> : SAFe, LeSS, framework Spotify adapté.</div></div>
                                    <div class="case-item"><div class="case-text">Structurer un <span class="highlight">PMO agile</span> pour piloter un portefeuille de projets complexes.</div></div>
                                    <div class="case-item"><div class="case-text">Accompagner la <span class="highlight">transformation digitale</span> : diagnostic, roadmap, conduite du changement.</div></div>
                                    <div class="case-item"><div class="case-text">Former et coacher vos <span class="highlight">Product Owners, Scrum Masters, Agile Coaches</span>.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Atypiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Optimiser vos <span class="highlight">processus métiers</span> et flux de valeur avec Lean et Kanban.</div></div>
                                    <div class="case-item"><div class="case-text">Piloter une <span class="highlight">transformation organisationnelle</span> post-fusion/acquisition.</div></div>
                                    <div class="case-item"><div class="case-text">Créer un <span class="highlight">centre d'excellence agile</span> pour diffuser les pratiques.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Besoin d'accompagnement sur la <span class="cta-highlight">Gouvernance</span> ?</h3>
                            <p class="cta-subtitle">Un expert répond sous 24h !</p>
                            <button class="cta-button" onclick="openContactModal()">Poser ma question →</button>
                        </div>
                    </div>
                </div>

                <!-- TRANSFORMATION RH TECH -->
                <div class="work-in-progress" id="pageRHTech">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Transformation RH pour la Tech</h1>
                            <p class="story-subtitle">RECRUTER ET GÉRER LES TALENTS IT</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Les profils tech sont difficiles à recruter et à retenir. Nous accompagnons les <span class="highlight">services RH</span> pour comprendre les métiers IT, structurer les processus de recrutement, définir les parcours de carrière et créer une <span class="highlight">marque employeur attractive</span> pour les talents tech.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Typiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Former les RH aux <span class="highlight">métiers et compétences IT</span> : différence entre DevOps, Data Engineer, etc.</div></div>
                                    <div class="case-item"><div class="case-text">Structurer le <span class="highlight">processus de recrutement tech</span> : grilles d'évaluation, tests techniques.</div></div>
                                    <div class="case-item"><div class="case-text">Définir des <span class="highlight">parcours de carrière IT</span> : évolutions possibles, compétences à développer.</div></div>
                                    <div class="case-item"><div class="case-text">Créer une <span class="highlight">marque employeur tech</span> : communication, événements, employee advocacy.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Cas Atypiques</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Accompagner la <span class="highlight">reconversion</span> de profils non-tech vers l'IT.</div></div>
                                    <div class="case-item"><div class="case-text">Mettre en place un <span class="highlight">programme de mentoring</span> entre seniors et juniors tech.</div></div>
                                    <div class="case-item"><div class="case-text">Structurer une <span class="highlight">académie interne</span> pour former aux nouvelles technos.</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Besoin d'aide pour <span class="cta-highlight">recruter des profils tech</span> ?</h3>
                            <p class="cta-subtitle">Un expert répond sous 24h !</p>
                            <button class="cta-button" onclick="openContactModal()">Poser ma question →</button>
                        </div>
                    </div>
                </div>

                <!-- NOS RÉSEAUX -->
                <div class="work-in-progress" id="pageReseaux">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Nos Réseaux</h1>
                            <p class="story-subtitle">RESTEZ CONNECTÉS AVEC Codentis</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Suivez-nous sur nos différentes plateformes pour découvrir nos <span class="highlight">contenus exclusifs</span>, nos <span class="highlight">podcasts</span>, et rester en contact avec notre équipe d'experts.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Nos Plateformes</h3>
                                <div style="display: flex; flex-direction: column; gap: 20px;">
                                    <div class="network-card" onclick="window.open('https://open.spotify.com/playlist/45ngfo71ETCssYI9G30ycT?si=40853b23e0bb4a19', '_blank')">
                                        <div style="display: flex; align-items: center; gap: 20px;">
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF7F5C" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="10"/>
                                                <path d="M8 14.5c2.5-1 5-1 7.5 0"/>
                                                <path d="M7.5 11c3-1.5 7-1.5 10 0"/>
                                                <path d="M7 7.5c3.5-2 8-2 11 0"/>
                                            </svg>
                                            <div>
                                                <div class="network-card-title">Spotify</div>
                                                <div class="network-card-desc">Écoutez nos podcasts et interviews d'experts</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="network-card" onclick="window.open('https://wa.me/33603062710', '_blank')">
                                        <div style="display: flex; align-items: center; gap: 20px;">
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF7F5C" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                                            </svg>
                                            <div>
                                                <div class="network-card-title">WhatsApp</div>
                                                <div class="network-card-desc">Contactez-nous directement pour échanger</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="network-card" onclick="window.location.href='mailto:contact@audentis.fr'">
                                        <div style="display: flex; align-items: center; gap: 20px;">
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF7F5C" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                                <polyline points="22,6 12,13 2,6"/>
                                            </svg>
                                            <div>
                                                <div class="network-card-title">Email</div>
                                                <div class="network-card-desc">contact@audentis.fr</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="network-card" onclick="window.open('https://www.linkedin.com/company/audentis/', '_blank')">
                                        <div style="display: flex; align-items: center; gap: 20px;">
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF7F5C" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                                                <rect x="2" y="9" width="4" height="12"/>
                                                <circle cx="4" cy="4" r="2"/>
                                            </svg>
                                            <div>
                                                <div class="network-card-title">LinkedIn</div>
                                                <div class="network-card-desc">Suivez notre actualité professionnelle</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Une question <span class="cta-highlight">spécifique</span> ?</h3>
                            <p class="cta-subtitle">Nos experts vous répondent sous 24h !</p>
                            <button class="cta-button" onclick="openContactModal()">Nous contacter →</button>
                        </div>
                    </div>
                </div>

                <!-- PLAQUETTE COMMERCIALE -->
                <div class="work-in-progress" id="pagePlaquette">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Plaquette Commerciale</h1>
                            <p class="story-subtitle">DÉCOUVREZ NOS OFFRES EN DÉTAIL</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Téléchargez notre <span class="highlight">plaquette commerciale</span> pour découvrir l'ensemble de nos expertises, nos méthodes d'accompagnement, et des exemples concrets de missions réussies.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Au programme</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text">Présentation détaillée de nos <span class="highlight">expertises IT et stratégiques</span></div></div>
                                    <div class="case-item"><div class="case-text">Nos <span class="highlight">méthodes d'accompagnement</span> et processus de travail</div></div>
                                    <div class="case-item"><div class="case-text">Des <span class="highlight">cas clients</span> et retours d'expérience</div></div>
                                    <div class="case-item"><div class="case-text">Les profils de nos <span class="highlight">experts et stratèges</span></div></div>
                                    <div class="case-item"><div class="case-text">Nos <span class="highlight">tarifs et modalités</span> d'intervention</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Télécharger notre <span class="cta-highlight">plaquette</span></h3>
                            <p class="cta-subtitle">Format PDF - Découvrez toutes nos expertises</p>
                            <a href="computer:///mnt/user-data/outputs/Codentis-Plaquette.pdf" download="Codentis-Plaquette.pdf" class="cta-button" style="text-decoration: none; display: inline-block;">📥 Télécharger la plaquette</a>
                        </div>
                    </div>
                </div>

                <!-- NOTRE HISTOIRE -->
                <div class="work-in-progress" id="pageHistoire">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Notre Histoire</h1>
                            <p class="story-subtitle">L'ALLIANCE DE L'EXPERTISE TECHNIQUE, PRODUIT & STRATÉGIQUE</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Chez Codentis, nous combinons <span class="highlight">expertise technique et vision stratégique</span> pour accompagner ceux qui font face à des <span class="highlight">enjeux IT et business complexes</span>. Nos clients nous sollicitent aussi bien pour des <span class="highlight">missions techniques pointues</span> (audits cybersécurité, architectures cloud, projets data/IA) que pour des <span class="highlight">transformations organisationnelles</span> (gouvernance IT, coaching agile, product ownership, conduite du changement). Qu'il s'agisse d'interventions longues ou de missions courtes à fort impact, nous combinons <span class="highlight">excellence technique, sens du produit et accompagnement humain</span>.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Chaque membre de Codentis est un <span class="highlight">chercheur de solutions</span>, qu'elles soient techniques ou organisationnelles. Nous ne nous contentons pas de résoudre des problèmes IT : nous aidons nos clients à <span class="highlight">transformer leurs ambitions en résultats concrets</span>. Cela passe par la définition de stratégies produit, l'optimisation de la gouvernance IT, le coaching d'équipes, la refonte d'architectures ou encore l'accélération de projets critiques. Notre <span class="highlight">approche personnalisée</span> et notre <span class="highlight">suivi continu</span> garantissent que chaque intervention crée un impact réel et durable.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Cette philosophie se reflète aussi dans notre site web. Sur notre page d'accueil, vous pouvez poser votre question à l'un de nos experts et recevoir une <span class="highlight">réponse sous 24h</span>, une manière concrète de montrer que notre <span class="highlight">engagement est réel</span>, même pour des besoins ponctuels ou des audits rapides.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    <span class="highlight">Codentis</span>, c'est l'alliance de l'<span class="highlight">expertise technique pointue</span>, de la <span class="highlight">vision produit et stratégique</span>, et du <span class="highlight">service sur-mesure</span>. Nous intervenons aussi bien sur des sujets d'architecture et de développement que sur la définition de roadmaps produit, la transformation organisationnelle ou le pilotage de projets complexes. Cette <span class="highlight">double compétence technique et business</span> fait notre singularité.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Nos Domaines d'Excellence</h3>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 30px;">
                                    <div style="padding: 25px; background: rgba(255, 127, 92, 0.05); border: 1px solid rgba(255, 127, 92, 0.2); border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center;" onmouseover="this.style.background='rgba(255, 127, 92, 0.1)'; this.style.borderColor='rgba(255, 127, 92, 0.3)'" onmouseout="this.style.background='rgba(255, 127, 92, 0.05)'; this.style.borderColor='rgba(255, 127, 92, 0.2)'" onclick="openExpertiseModal('pageDataIA')">
                                        <div style="font-size: 1.2rem; font-weight: 700; color: #FF7F5C;">Data & IA</div>
                                    </div>
                                    <div style="padding: 25px; background: rgba(255, 127, 92, 0.05); border: 1px solid rgba(255, 127, 92, 0.2); border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center;" onmouseover="this.style.background='rgba(255, 127, 92, 0.1)'; this.style.borderColor='rgba(255, 127, 92, 0.3)'" onmouseout="this.style.background='rgba(255, 127, 92, 0.05)'; this.style.borderColor='rgba(255, 127, 92, 0.2)'" onclick="openExpertiseModal('pageDigital')">
                                        <div style="font-size: 1.2rem; font-weight: 700; color: #FF7F5C;">Développement</div>
                                    </div>
                                    <div style="padding: 25px; background: rgba(255, 127, 92, 0.05); border: 1px solid rgba(255, 127, 92, 0.2); border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center;" onmouseover="this.style.background='rgba(255, 127, 92, 0.1)'; this.style.borderColor='rgba(255, 127, 92, 0.3)'" onmouseout="this.style.background='rgba(255, 127, 92, 0.05)'; this.style.borderColor='rgba(255, 127, 92, 0.2)'" onclick="openExpertiseModal('pageInfrastructure')">
                                        <div style="font-size: 1.2rem; font-weight: 700; color: #FF7F5C;">Infrastructure & Cloud</div>
                                    </div>
                                    <div style="padding: 25px; background: rgba(255, 127, 92, 0.05); border: 1px solid rgba(255, 127, 92, 0.2); border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center;" onmouseover="this.style.background='rgba(255, 127, 92, 0.1)'; this.style.borderColor='rgba(255, 127, 92, 0.3)'" onmouseout="this.style.background='rgba(255, 127, 92, 0.05)'; this.style.borderColor='rgba(255, 127, 92, 0.2)'" onclick="openExpertiseModal('pageCybersecurity')">
                                        <div style="font-size: 1.2rem; font-weight: 700; color: #FF7F5C;">Cybersécurité</div>
                                    </div>
                                    <div style="padding: 25px; background: rgba(255, 127, 92, 0.05); border: 1px solid rgba(255, 127, 92, 0.2); border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center;" onmouseover="this.style.background='rgba(255, 127, 92, 0.1)'; this.style.borderColor='rgba(255, 127, 92, 0.3)'" onmouseout="this.style.background='rgba(255, 127, 92, 0.05)'; this.style.borderColor='rgba(255, 127, 92, 0.2)'" onclick="openExpertiseModal('pageGouvernance')">
                                        <div style="font-size: 1.2rem; font-weight: 700; color: #FF7F5C;">Gouvernance Opérationnelle<br>& Stratégique</div>
                                    </div>
                                    <div style="padding: 25px; background: rgba(255, 127, 92, 0.05); border: 1px solid rgba(255, 127, 92, 0.2); border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center;" onmouseover="this.style.background='rgba(255, 127, 92, 0.1)'; this.style.borderColor='rgba(255, 127, 92, 0.3)'" onmouseout="this.style.background='rgba(255, 127, 92, 0.05)'; this.style.borderColor='rgba(255, 127, 92, 0.2)'" onclick="openExpertiseModal('pageWorkshops')">
                                        <div style="font-size: 1.2rem; font-weight: 700; color: #FF7F5C;">Workshops<br>& Conférences</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Nos Valeurs</h3>
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; margin-top: 30px;">
                                    <div style="padding: 25px; background: rgba(245, 245, 247, 0.03); border: 1px solid rgba(255, 127, 92, 0.15); border-radius: 12px;">
                                        <div style="font-size: 1.2rem; font-weight: 700; color: #FF7F5C; margin-bottom: 12px;">Excellence Technique & Stratégique</div>
                                        <div style="font-size: 1rem; line-height: 1.7; color: rgba(245, 245, 247, 0.8);">Chaque mission repose sur une double expertise : technique (data, cloud, cyber, dev) et stratégique (product, gouvernance, transformation). Nous maîtrisons aussi bien le code que la vision produit.</div>
                                    </div>
                                    <div style="padding: 25px; background: rgba(245, 245, 247, 0.03); border: 1px solid rgba(255, 127, 92, 0.15); border-radius: 12px;">
                                        <div style="font-size: 1.2rem; font-weight: 700; color: #FF7F5C; margin-bottom: 12px;">Engagement & Responsabilité</div>
                                        <div style="font-size: 1rem; line-height: 1.7; color: rgba(245, 245, 247, 0.8);">Nous nous impliquons pleinement auprès de nos clients et dans nos missions, en prenant la responsabilité des résultats.</div>
                                    </div>
                                    <div style="padding: 25px; background: rgba(245, 245, 247, 0.03); border: 1px solid rgba(255, 127, 92, 0.15); border-radius: 12px;">
                                        <div style="font-size: 1.2rem; font-weight: 700; color: #FF7F5C; margin-bottom: 12px;">Agilité & Réactivité</div>
                                        <div style="font-size: 1rem; line-height: 1.7; color: rgba(245, 245, 247, 0.8);">Capacité à intervenir rapidement sur des besoins critiques et à adapter nos solutions aux situations uniques.</div>
                                    </div>
                                    <div style="padding: 25px; background: rgba(245, 245, 247, 0.03); border: 1px solid rgba(255, 127, 92, 0.15); border-radius: 12px;">
                                        <div style="font-size: 1.2rem; font-weight: 700; color: #FF7F5C; margin-bottom: 12px;">Orientation Service & Humain</div>
                                        <div style="font-size: 1rem; line-height: 1.7; color: rgba(245, 245, 247, 0.8);">Chaque client et chaque talent bénéficie d'attention et de considération, avec pour objectif de dépasser les attentes.</div>
                                    </div>
                                    <div style="padding: 25px; background: rgba(245, 245, 247, 0.03); border: 1px solid rgba(255, 127, 92, 0.15); border-radius: 12px;">
                                        <div style="font-size: 1.2rem; font-weight: 700; color: #FF7F5C; margin-bottom: 12px;">Audace & Innovation</div>
                                        <div style="font-size: 1rem; line-height: 1.7; color: rgba(245, 245, 247, 0.8);">Nous challengeons les standards et proposons des solutions inédites ou de niche pour apporter plus de valeur.</div>
                                    </div>
                                    <div style="padding: 25px; background: rgba(245, 245, 247, 0.03); border: 1px solid rgba(255, 127, 92, 0.15); border-radius: 12px;">
                                        <div style="font-size: 1.2rem; font-weight: 700; color: #FF7F5C; margin-bottom: 12px;">Esprit d'équipe & Partage</div>
                                        <div style="font-size: 1rem; line-height: 1.7; color: rgba(245, 245, 247, 0.8);">Les forces combinées des fondateurs et des équipes créent une synergie unique, favorisant la collaboration et la co-construction.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Prêt à transformer <span class="cta-highlight">vos défis</span> en succès ?</h3>
                            <p class="cta-subtitle">Parlons de votre projet !</p>
                            <button class="cta-button" onclick="openContactModal()">Nous contacter →</button>
                        </div>
                    </div>
                </div>

                <!-- NOUS REJOINDRE -->
                <div class="work-in-progress" id="pageRejoindre">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Nous Rejoindre</h1>
                            <p class="story-subtitle">INTÉGREZ UNE ÉQUIPE D'EXPERTS PASSIONNÉS</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Codentis recrute en continu des <span class="highlight">profils d'exception</span> qui partagent notre passion pour l'excellence technique et stratégique. Que vous soyez <span class="highlight">développeur senior</span>, <span class="highlight">architecte cloud</span>, <span class="highlight">expert cybersécurité</span>, <span class="highlight">product owner</span>, <span class="highlight">data scientist</span> ou <span class="highlight">consultant en transformation</span>, nous cherchons des talents qui veulent faire la différence sur des missions à fort impact.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Profils recherchés</h3>
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 30px;">
                                    <div style="padding: 25px; background: rgba(255, 127, 92, 0.05); border: 1px solid rgba(255, 127, 92, 0.2); border-radius: 12px;">
                                        <div style="font-size: 1.2rem; font-weight: 700; color: #FF7F5C; margin-bottom: 12px;">Experts Techniques</div>
                                        <div style="font-size: 0.95rem; line-height: 1.7; color: rgba(245, 245, 247, 0.8);">Développeurs fullstack, architectes cloud, DevOps, data engineers, experts cybersécurité</div>
                                    </div>
                                    <div style="padding: 25px; background: rgba(255, 127, 92, 0.05); border: 1px solid rgba(255, 127, 92, 0.2); border-radius: 12px;">
                                        <div style="font-size: 1.2rem; font-weight: 700; color: #FF7F5C; margin-bottom: 12px;">Product & Stratégie</div>
                                        <div style="font-size: 0.95rem; line-height: 1.7; color: rgba(245, 245, 247, 0.8);">Product owners, product managers, consultants en transformation digitale</div>
                                    </div>
                                    <div style="padding: 25px; background: rgba(255, 127, 92, 0.05); border: 1px solid rgba(255, 127, 92, 0.2); border-radius: 12px;">
                                        <div style="font-size: 1.2rem; font-weight: 700; color: #FF7F5C; margin-bottom: 12px;">Gouvernance & Pilotage</div>
                                        <div style="font-size: 0.95rem; line-height: 1.7; color: rgba(245, 245, 247, 0.8);">Directeurs de projet, PMO, RSSI, consultants en gouvernance IT</div>
                                    </div>
                                    <div style="padding: 25px; background: rgba(255, 127, 92, 0.05); border: 1px solid rgba(255, 127, 92, 0.2); border-radius: 12px;">
                                        <div style="font-size: 1.2rem; font-weight: 700; color: #FF7F5C; margin-bottom: 12px;">HR & Business</div>
                                        <div style="font-size: 0.95rem; line-height: 1.7; color: rgba(245, 245, 247, 0.8);">Chargé(e) de recrutement, responsable RH, business développeur, directeur d'agence</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <div class="story-text">
                                    Chez Codentis, nous valorisons la <span class="highlight">curiosité intellectuelle</span>, l'<span class="highlight">excellence opérationnelle</span> et l'<span class="highlight">esprit entrepreneurial</span>. Que vous soyez en recherche d'un CDI, d'une mission freelance longue durée, ou d'un partenariat structuré, nous construisons ensemble un modèle qui vous correspond.
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Prêt à <span class="cta-highlight">nous rejoindre</span> ?</h3>
                            <p class="cta-subtitle">Envoyez-nous votre CV et parlons de votre projet professionnel</p>
                            <button class="cta-button" onclick="openChatModal('Je souhaite rejoindre Codentis', 'recruitment')">Postuler →</button>
                        </div>
                    </div>
                </div>

                <!-- PARTENARIAT (Simplifié) -->
                <div class="work-in-progress" id="pagePartenariat">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Partenariat</h1>
                            <p class="story-subtitle">NOS MODÈLES DE COLLABORATION</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Nos modèles de partenariat</h3>
                                <div class="expertise-cases">
                                    <div class="case-item"><div class="case-text"><span class="highlight">Partenariat technologique</span> : intégration de solutions, co-développement, mise à disposition d'expertise technique</div></div>
                                    <div class="case-item"><div class="case-text"><span class="highlight">Partenariat commercial</span> : apporteurs d'affaires, revente de services, co-traitance sur grands projets</div></div>
                                    <div class="case-item"><div class="case-text"><span class="highlight">Alliance stratégique</span> : co-construction d'offres, partage de compétences complémentaires</div></div>
                                    <div class="case-item"><div class="case-text"><span class="highlight">Partenariat formation</span> : workshops, conférences, accompagnement sur-mesure de vos équipes</div></div>
                                    <div class="case-item"><div class="case-text"><span class="highlight">Partenariat institutionnel</span> : accompagnement des acteurs publics dans leur transformation digitale</div></div>
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Intéressé par un <span class="cta-highlight">partenariat</span> ?</h3>
                            <p class="cta-subtitle">Discutons de nos synergies et opportunités de collaboration</p>
                            <button class="cta-button" onclick="openChatInterface()">Contactez notre agent IA →</button>
                        </div>
                    </div>
                </div>

                <!-- EXPERTS & STRATÈGES -->
                <div class="work-in-progress" id="pageExperts">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Experts & Stratèges</h1>
                            <p class="story-subtitle">DES PROFILS D'EXCEPTION AU SERVICE DE VOS AMBITIONS</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Céline</h3>
                                <h4 style="color: #FF7F5C; text-align: center; margin-bottom: 20px; font-size: 1.1rem;">Directrice de projet IT & Transformation digitale</h4>
                                <div class="story-text">
                                    Céline pilote des projets IT complexes et des équipes de développeurs en garantissant l'efficacité opérationnelle et la qualité de delivery. Elle accompagne des organisations dans la structuration et la rationalisation de leurs services, la mise en place d'outils et processus IT, ainsi que le pilotage des risques. Son expertise couvre le management de projets multi-sites, la conduite du changement, le Product Ownership et le coaching agile, avec une expérience notable dans des grands groupes comme Enedis et Groupama. Elle combine leadership technique et sens stratégique pour transformer la performance des équipes IT.
                                    <br><br>
                                    <span class="highlight">Points forts :</span> management de projets IT complexes, structuration des équipes et processus, delivery management, coaching agile et Product Ownership, amélioration continue.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Quentin</h3>
                                <h4 style="color: #FF7F5C; text-align: center; margin-bottom: 20px; font-size: 1.1rem;">Expert Cybersécurité – Red Team & Pentesting</h4>
                                <div class="story-text">
                                    Quentin est spécialisé en cybersécurité offensive et audits de vulnérabilités. Il mène des opérations Red Team, pentests, simulations de crise et audits Cloud pour des entreprises comme Arkema et Enedis. Sa maîtrise des standards de sécurité, des environnements Cloud et des frameworks MITRE ATT&CK lui permet de détecter et corriger efficacement les failles, tout en accompagnant la sensibilisation des équipes et l'implémentation de stratégies de sécurité robustes.
                                    <br><br>
                                    <span class="highlight">Points forts :</span> Red Team, pentesting, cybersécurité Cloud, audits de vulnérabilités, analyse de risques et stratégie de sécurité.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Karim</h3>
                                <h4 style="color: #FF7F5C; text-align: center; margin-bottom: 20px; font-size: 1.1rem;">Architecte et Développeur Fullstack .NET / Angular</h4>
                                <div class="story-text">
                                    Karim conçoit et met en œuvre des architectures logicielles modernes et robustes, intégrant microservices, micro frontends, DevOps et solutions cloud (Azure). Il accompagne des projets variés, de la TMA à la refonte complète de plateformes, avec un focus sur l'industrialisation, le monitoring et le développement de solutions métier. Son expérience inclut la direction technique et l'architecture de solutions pour des clients tels que Or en Cash, Clauger et Engie.
                                    <br><br>
                                    <span class="highlight">Points forts :</span> architecture logicielle, microservices & micro frontends, DevOps, .NET / Angular, industrialisation et monitoring.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Adrien</h3>
                                <h4 style="color: #FF7F5C; text-align: center; margin-bottom: 20px; font-size: 1.1rem;">Développeur & Architecte Logiciel / IoT & Data</h4>
                                <div class="story-text">
                                    Adrien est un développeur et architecte logiciel polyvalent, spécialisé en Node.js, Python, IoT et plateformes data. Il conçoit des systèmes de collecte et d'analyse de données pour améliorer la maintenance et l'innovation produit. Il a également assuré la continuité opérationnelle de plateformes IoT et dirigé des équipes techniques sur des projets SaaS et de fleet management. Son expertise couvre la supervision de projets complexes, la migration cloud et le développement d'infrastructures performantes.
                                    <br><br>
                                    <span class="highlight">Points forts :</span> Node.js, Python, IoT, architecture logicielle, maintenance préventive et innovation produit.
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Caroline</h3>
                                <h4 style="color: #FF7F5C; text-align: center; margin-bottom: 20px; font-size: 1.1rem;">Coach Transformation & Agile / Product Owner</h4>
                                <div class="story-text">
                                    Caroline accompagne les organisations dans leur transformation digitale et agile. Elle intervient sur la gestion de projets complexes, l'amélioration continue, la conduite du changement et le coaching d'équipes et managers. Elle possède également une solide expérience en formation professionnelle et enseignement supérieur, partageant ses compétences en agilité, stratégie produit et management de projets avec des étudiants et professionnels.
                                    <br><br>
                                    <span class="highlight">Points forts :</span> transformation organisationnelle, coaching agile et d'équipes, Product Ownership, gestion de projets complexes, formation et amélioration des processus.
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Besoin d'un <span class="cta-highlight">expert</span> pour votre projet ?</h3>
                            <p class="cta-subtitle">Nos experts sont à votre écoute !</p>
                            <button class="cta-button" onclick="openContactModal()">Nous contacter →</button>
                        </div>
                    </div>
                </div>

                <!-- VEILLE & ACTUALITÉS -->
                <div class="work-in-progress" id="pageVeille">
                    <div class="story-container">
                        <div class="story-hero">
                            <h1 class="story-title">Veille & Actualités</h1>
                            <p class="story-subtitle">ANALYSES & PERSPECTIVES TECH PAR NOS EXPERTS</p>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Marché Tech France 2025 : Opportunités en vue</h3>
                                <div class="story-text">
                                    Le marché IT français connaît une transformation profonde. Malgré un contexte économique tendu, plusieurs secteurs affichent une <span class="highlight">croissance à deux chiffres</span> et créent de nouvelles opportunités pour les experts techniques et stratégiques.
                                </div>
                                
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0;">
                                    <div style="background: rgba(255, 127, 92, 0.08); padding: 25px; border-radius: 12px; text-align: center; border: 1px solid rgba(255, 127, 92, 0.2);">
                                        <div style="font-size: 0.85rem; color: rgba(245, 245, 247, 0.6); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.1em;">Cloud & SaaS</div>
                                        <div style="font-size: 2.2rem; font-weight: 900; color: #FF7F5C; margin-bottom: 5px;">+12,5%</div>
                                        <div style="font-size: 0.9rem; color: rgba(245, 245, 247, 0.5);">Migration accélérée</div>
                                    </div>
                                    <div style="background: rgba(255, 127, 92, 0.08); padding: 25px; border-radius: 12px; text-align: center; border: 1px solid rgba(255, 127, 92, 0.2);">
                                        <div style="font-size: 0.85rem; color: rgba(245, 245, 247, 0.6); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.1em;">IA & Data</div>
                                        <div style="font-size: 2.2rem; font-weight: 900; color: #FF7F5C; margin-bottom: 5px;">+18,3%</div>
                                        <div style="font-size: 0.9rem; color: rgba(245, 245, 247, 0.5);">Demande explosive</div>
                                    </div>
                                    <div style="background: rgba(255, 127, 92, 0.08); padding: 25px; border-radius: 12px; text-align: center; border: 1px solid rgba(255, 127, 92, 0.2);">
                                        <div style="font-size: 0.85rem; color: rgba(245, 245, 247, 0.6); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.1em;">Cybersécurité</div>
                                        <div style="font-size: 2.2rem; font-weight: 900; color: #FF7F5C; margin-bottom: 5px;">+15,7%</div>
                                        <div style="font-size: 0.9rem; color: rgba(245, 245, 247, 0.5);">Enjeu prioritaire</div>
                                    </div>
                                </div>

                                <div style="background: linear-gradient(135deg, rgba(255, 127, 92, 0.08) 0%, rgba(255, 127, 92, 0.03) 100%); padding: 25px; border-radius: 12px; border-left: 3px solid #FF7F5C; margin-top: 30px;">
                                    <div style="font-weight: 700; color: #FF7F5C; margin-bottom: 15px; font-size: 1.1rem;">Notre analyse – Codentis</div>
                                    <div class="story-text" style="margin: 0;">
                                        Le marché évolue vers <span class="highlight">plus de qualité et moins de volume</span>. Les entreprises cherchent des experts capables de livrer de la valeur immédiate : audits, diagnostics, proof of concepts, quick-wins. Chez Codentis, nous constatons une <span class="highlight">explosion des missions courtes à fort impact</span>. Les DSI veulent des résultats tangibles, pas des roadmaps à 18 mois.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Compétences IT recherchées en 2025</h3>
                                <div class="story-text">
                                    Le marché de l'emploi IT se concentre sur <span class="highlight">l'expertise de pointe</span>. Les profils généralistes cèdent la place aux spécialistes capables d'intervenir sur des problématiques complexes et de créer un impact immédiat.
                                </div>
                                <div style="background: linear-gradient(135deg, rgba(255, 127, 92, 0.08) 0%, rgba(255, 127, 92, 0.03) 100%); padding: 25px; border-radius: 12px; border-left: 3px solid #FF7F5C; margin-top: 20px;">
                                    <div style="font-weight: 700; color: #FF7F5C; margin-bottom: 15px; font-size: 1.1rem;">Notre analyse – Codentis</div>
                                    <div class="story-text" style="margin: 0;">
                                        Les talents pointus sont <span class="highlight">sur-sollicités</span> : experts IA/ML, architectes cloud natifs, spécialistes cybersécurité, data engineers seniors, product owners expérimentés. Chez Codentis, nos consultants reçoivent plusieurs propositions par semaine. <span class="highlight">L'expertise bat le volume</span> : un expert senior vaut 10 juniors sur des sujets critiques.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="story-section">
                            <div class="story-card">
                                <h3 class="section-header">Transformation digitale : les entreprises accélèrent</h3>
                                <div class="story-text">
                                    Selon Gartner, <span class="highlight">78% des entreprises</span> considèrent la transformation digitale comme une priorité absolue en 2025. Les investissements dans l'IA générative, l'automatisation et la modernisation des SI atteignent des <span class="highlight">sommets historiques</span>.
                                </div>
                                
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0;">
                                    <div style="background: rgba(255, 127, 92, 0.08); padding: 25px; border-radius: 12px; text-align: center; border: 1px solid rgba(255, 127, 92, 0.2);">
                                        <div style="font-size: 0.85rem; color: rgba(245, 245, 247, 0.6); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.1em;">Budget IA 2025</div>
                                        <div style="font-size: 2.2rem; font-weight: 900; color: #FF7F5C; margin-bottom: 5px;">+45%</div>
                                        <div style="font-size: 0.9rem; color: rgba(245, 245, 247, 0.5);">vs 2024</div>
                                    </div>
                                    <div style="background: rgba(255, 127, 92, 0.08); padding: 25px; border-radius: 12px; text-align: center; border: 1px solid rgba(255, 127, 92, 0.2);">
                                        <div style="font-size: 0.85rem; color: rgba(245, 245, 247, 0.6); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.1em;">Projets Cloud</div>
                                        <div style="font-size: 2.2rem; font-weight: 900; color: #FF7F5C; margin-bottom: 5px;">+32%</div>
                                        <div style="font-size: 0.9rem; color: rgba(245, 245, 247, 0.5);">Migrations actives</div>
                                    </div>
                                    <div style="background: rgba(255, 127, 92, 0.08); padding: 25px; border-radius: 12px; text-align: center; border: 1px solid rgba(255, 127, 92, 0.2);">
                                        <div style="font-size: 0.85rem; color: rgba(245, 245, 247, 0.6); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.1em;">Automatisation</div>
                                        <div style="font-size: 2.2rem; font-weight: 900; color: #FF7F5C; margin-bottom: 5px;">+28%</div>
                                        <div style="font-size: 0.9rem; color: rgba(245, 245, 247, 0.5);">ROI prouvé</div>
                                    </div>
                                </div>

                                <div style="background: linear-gradient(135deg, rgba(255, 127, 92, 0.08) 0%, rgba(255, 127, 92, 0.03) 100%); padding: 25px; border-radius: 12px; border-left: 3px solid #FF7F5C; margin-top: 30px;">
                                    <div style="font-weight: 700; color: #FF7F5C; margin-bottom: 15px; font-size: 1.1rem;">Notre analyse – Codentis</div>
                                    <div class="story-text" style="margin: 0;">
                                        Les entreprises qui investissent maintenant dans <span class="highlight">l'IA, le cloud et l'automatisation</span> prennent une longueur d'avance décisive. Chez Codentis, nous accompagnons nos clients sur ces sujets stratégiques avec une approche pragmatique : <span class="highlight">POC rapides, quick-wins mesurables, scalabilité pensée dès le départ</span>. Pas de bullshit, que de la valeur.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="cta-section">
                            <h3 class="cta-title">Vous voulez notre <span class="cta-highlight">analyse</span> sur un sujet ?</h3>
                            <p class="cta-subtitle">Posez votre question à nos experts !</p>
                            <button class="cta-button" onclick="openContactModal()">Nous contacter</button>
                        </div>
                    </div>
                </div>
            `;
        }

        // Fonctions pour le modal de contact
        window.openContactModal = function() {
            // Détecter la page active pour savoir si IT ou GOV
            const activePages = document.querySelectorAll('.work-in-progress');
            let currentPage = null;
            
            // Trouver la page visible
            for (let page of activePages) {
                const rect = page.getBoundingClientRect();
                if (rect.top >= 0 && rect.top < window.innerHeight) {
                    currentPage = page.id;
                    break;
                }
            }
            
            // Déterminer le type (IT ou GOV) basé sur l'ID de la page
            let siteType = 'it'; // par défaut
            const govPages = ['pageWorkshopsGov', 'pageDataIAGov', 'pageDigitalGov', 
                            'pageInfrastructureGov', 'pageCybersecurityGov', 'pageGouvernance'];
            
            if (currentPage && govPages.includes(currentPage)) {
                siteType = 'gov';
            }
            
            // Vérifier aussi le thème actif du body
            if (document.body.classList.contains('theme-gov')) {
                siteType = 'gov';
            }
            
            // Question par défaut contextuelle
            let question = "J'ai une question concernant vos services";
            
            // Ouvrir le chat IA
            openChatModal(question, siteType);
        }
        
        window.closeContactModal = function() {
            const modal = document.getElementById('contactModal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
        
        window.handleContactSubmit = function(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                company: formData.get('company'),
                question: formData.get('question')
            };
            
            const subject = encodeURIComponent(`Contact depuis le site Codentis - ${data.firstName} ${data.lastName}`);
            const body = encodeURIComponent(
                `Prénom: ${data.firstName}\n` +
                `Nom: ${data.lastName}\n` +
                `Email: ${data.email}\n` +
                `Entreprise: ${data.company || 'Non renseignée'}\n\n` +
                `Question:\n${data.question}`
            );
            
            window.location.href = `mailto:contact@audentis.fr?subject=${subject}&body=${body}`;
            
            setTimeout(() => {
                closeContactModal();
                event.target.reset();
            }, 1000);
            
            return false;
        }

        // Fonctions pour la modal d'expertise
        window.openExpertiseModal = function(expertiseId) {
            const modal = document.getElementById('expertiseModal');
            const modalContent = document.getElementById('expertiseModalContent');
            const expertisePage = document.getElementById(expertiseId);
            
            if (modal && modalContent && expertisePage) {
                // Cloner le contenu de la page d'expertise
                const clonedContent = expertisePage.cloneNode(true);
                clonedContent.style.display = 'block';
                clonedContent.style.opacity = '1';
                
                // Vider le contenu précédent et injecter le nouveau
                modalContent.innerHTML = '';
                modalContent.appendChild(clonedContent);
                
                // Afficher la modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
        
        window.closeExpertiseModal = function() {
            const modal = document.getElementById('expertiseModal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
        
        // Fermer la modal en cliquant sur le fond
        document.addEventListener('click', function(e) {
            const modal = document.getElementById('expertiseModal');
            if (e.target === modal) {
                closeExpertiseModal();
            }
        });
        
        // Fermer la modal avec la touche Échap
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeExpertiseModal();
            }
        });

        // Init
        init();
