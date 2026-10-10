(() => {
    const english = document.documentElement.lang.startsWith('en');
    const labels = english
        ? { open: 'Open navigation', close: 'Close navigation' }
        : { open: 'Apri navigazione', close: 'Chiudi navigazione' };

    // Conserva la sezione corrente quando si cambia lingua.
    const languageLinks = document.querySelectorAll('[data-language-link]');
    function updateLanguageLinks() {
        languageLinks.forEach((link) => {
            const destination = new URL(link.getAttribute('href'), document.baseURI);
            destination.hash = window.location.hash;
            link.href = destination.href;
        });
    }
    updateLanguageLinks();
    window.addEventListener('hashchange', updateLanguageLinks);

    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    if (!toggle || !menu || !navbar) return;

    function setOpen(open) {
        menu.hidden = !open;
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? labels.close : labels.open);
    }

    toggle.addEventListener('click', () => setOpen(menu.hidden));
    menu.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
            setOpen(false);
            toggle.focus({ preventScroll: true });
        }
    });
    document.addEventListener('click', (event) => {
        if (!navbar.contains(event.target)) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !menu.hidden) {
            setOpen(false);
            toggle.focus({ preventScroll: true });
        }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
        if (event.matches) setOpen(false);
    });
})();
