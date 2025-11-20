/**
 * Navigation.js - Gestion de la navigation multi-pages
 * Remplace les fonctions de navigation de la SPA par des redirections
 */

// Fonction pour sélectionner un site depuis la page Welcome
function selectSite(site) {
    if (site === 'it') {
        window.location.href = '../it/';
    } else if (site === 'gov') {
        window.location.href = '../gov/';
    }
}

// Fonction pour revenir à l'accueil
function goHome() {
    window.location.href = '../welcome/';
}

// Fonction pour changer de site (IT ↔ Gov)
function switchSite() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/it/')) {
        window.location.href = '../gov/';
    } else if (currentPath.includes('/gov/')) {
        window.location.href = '../it/';
    } else {
        // Si on est sur welcome ou ailleurs, aller vers IT par défaut
        window.location.href = '../it/';
    }
}

// Fonction pour basculer le thème (utilisé par le switcher sidebar)
function toggleTheme() {
    switchSite();
}

// Détection automatique du site actuel et application du thème
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;

    // Appliquer le thème approprié selon la page
    if (currentPath.includes('/it/')) {
        document.body.classList.add('theme-it');
        document.body.classList.remove('theme-gov', 'welcome-mode');

        // Mettre à jour les textes des switchers
        const siteSwitcher = document.getElementById('siteSwitcher');
        if (siteSwitcher) {
            siteSwitcher.textContent = 'Stratégie Gouvernance';
            siteSwitcher.classList.add('visible');
        }

        const sidebarSwitcherText = document.querySelector('.sidebar-switcher-text');
        if (sidebarSwitcherText) {
            sidebarSwitcherText.textContent = 'Gouv';
        }

        // Rendre visibles les éléments de navigation
        const logoBtn = document.getElementById('logoBtn');
        const miniSidebar = document.getElementById('miniSidebar');
        const dynamicIsland = document.getElementById('dynamicIsland');

        if (logoBtn) logoBtn.classList.add('visible');
        if (miniSidebar) miniSidebar.classList.add('visible');
        if (dynamicIsland) dynamicIsland.classList.add('visible');
        document.body.classList.add('has-mini-sidebar');

    } else if (currentPath.includes('/gov/')) {
        document.body.classList.add('theme-gov');
        document.body.classList.remove('theme-it', 'welcome-mode');

        // Mettre à jour les textes des switchers
        const siteSwitcher = document.getElementById('siteSwitcher');
        if (siteSwitcher) {
            siteSwitcher.textContent = 'Expertise IT';
            siteSwitcher.classList.add('visible');
        }

        const sidebarSwitcherText = document.querySelector('.sidebar-switcher-text');
        if (sidebarSwitcherText) {
            sidebarSwitcherText.textContent = 'IT';
        }

        // Rendre visibles les éléments de navigation
        const logoBtn = document.getElementById('logoBtn');
        const miniSidebar = document.getElementById('miniSidebar');
        const dynamicIsland = document.getElementById('dynamicIsland');

        if (logoBtn) logoBtn.classList.add('visible');
        if (miniSidebar) miniSidebar.classList.add('visible');
        if (dynamicIsland) dynamicIsland.classList.add('visible');
        document.body.classList.add('has-mini-sidebar');

    } else if (currentPath.includes('/welcome/')) {
        document.body.classList.add('welcome-mode');
        document.body.classList.remove('theme-it', 'theme-gov');
    }
});
