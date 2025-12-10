// ==================== GOOGLE ANALYTICS TRACKING ====================

function trackPageView(pageName) {
    if (window.gtag && hasConsent()) {
        gtag('event', 'page_view', {
            page_title: pageName,
            page_location: window.location.href
        });
    }
}

function trackChatOpened(siteType) {
    if (window.gtag && hasConsent()) {
        gtag('event', 'chat_opened', {
            site_type: siteType,
            timestamp: new Date().toISOString()
        });
    }
}

function trackQuestionSubmitted(question, siteType) {
    if (window.gtag && hasConsent()) {
        gtag('event', 'question_submitted', {
            site_type: siteType,
            question_length: question.length
        });
    }
}

function trackSiteSwitch(from, to) {
    if (window.gtag && hasConsent()) {
        gtag('event', 'site_switch', {
            from_site: from,
            to_site: to
        });
    }
}

function trackExpertiseClick(expertiseId, siteType) {
    if (window.gtag && hasConsent()) {
        gtag('event', 'expertise_clicked', {
            expertise: expertiseId,
            site_type: siteType
        });
    }
}

function hasConsent() {
    return localStorage.getItem('analytics_consent') === 'granted';
}

function grantConsent() {
    localStorage.setItem('analytics_consent', 'granted');
    if (window.gtag) {
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
    }
}

function denyConsent() {
    localStorage.setItem('analytics_consent', 'denied');
    if (window.gtag) {
        gtag('consent', 'update', {
            'analytics_storage': 'denied'
        });
    }
}

// ==================== COOKIE CONSENT MANAGEMENT ====================

function handleCookieConsent(accepted) {
    const banner = document.getElementById('cookieBanner');

    if (accepted) {
        grantConsent();
        console.log('✅ Analytics consent granted');
    } else {
        denyConsent();
        console.log('❌ Analytics consent denied');
    }

    // Masquer le banner
    banner.classList.add('hidden');
    setTimeout(() => {
        banner.style.display = 'none';
    }, 400);
}

// Vérifier au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const consent = localStorage.getItem('analytics_consent');
    const banner = document.getElementById('cookieBanner');

    if (consent === null) {
        // Pas encore de choix → afficher le banner après 2 secondes
        setTimeout(() => {
            if (banner) banner.style.display = 'block';
        }, 2000);
    } else {
        // Choix déjà fait → masquer le banner
        if (banner) banner.style.display = 'none';

        // Appliquer le consentement
        if (consent === 'granted') {
            grantConsent();
        } else {
            denyConsent();
        }
    }
});
