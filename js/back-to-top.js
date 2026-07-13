(function () {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    const toggle = () => {
        btn.classList.toggle('is-visible', window.scrollY > 320);
    };

    window.addEventListener('scroll', toggle, { passive: true });
    toggle();

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const top = document.getElementById('top');
        if (top) {
            top.focus({ preventScroll: true });
        }
    });
})();
