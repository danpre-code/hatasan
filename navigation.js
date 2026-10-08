(() => {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    if (!toggle || !menu || !navbar) return;

    function setOpen(open) {
        menu.hidden = !open;
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Chiudi navigazione' : 'Apri navigazione');
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
