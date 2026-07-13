(function () {
    const form = document.getElementById('contact-form');
    const ledger = document.getElementById('contact-ledger');
    const success = document.getElementById('contact-success');
    const successRef = document.getElementById('success-ref');

    if (!form) return;

    const fields = {
        nombre: {
            el: document.getElementById('nombre'),
            error: document.getElementById('error-nombre'),
            validate: (v) => v.trim().length >= 2
        },
        email: {
            el: document.getElementById('email'),
            error: document.getElementById('error-email'),
            validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
        },
        empresa: {
            el: document.getElementById('empresa'),
            error: document.getElementById('error-empresa'),
            validate: (v) => v.trim().length >= 2
        },
        motivo: {
            el: document.getElementById('motivo'),
            error: document.getElementById('error-motivo'),
            validate: (v) => v !== ''
        },
        mensaje: {
            el: document.getElementById('mensaje'),
            error: document.getElementById('error-mensaje'),
            validate: (v) => v.trim().length >= 20
        }
    };

    function setInvalid(field, invalid) {
        field.el.classList.toggle('is-invalid', invalid);
        field.el.setAttribute('aria-invalid', invalid ? 'true' : 'false');
        if (field.error) {
            field.error.hidden = !invalid;
        }
    }

    function validateField(key) {
        const field = fields[key];
        const valid = field.validate(field.el.value);
        setInvalid(field, !valid);
        return valid;
    }

    Object.keys(fields).forEach((key) => {
        const { el } = fields[key];
        const eventName = el.tagName === 'SELECT' ? 'change' : 'blur';
        el.addEventListener(eventName, () => validateField(key));
        el.addEventListener('input', () => {
            if (el.classList.contains('is-invalid')) {
                validateField(key);
            }
        });
    });

    function buildReference() {
        const now = new Date();
        const stamp = String(now.getFullYear()).slice(2)
            + String(now.getMonth() + 1).padStart(2, '0')
            + String(now.getDate()).padStart(2, '0')
            + String(now.getHours()).padStart(2, '0')
            + String(now.getMinutes()).padStart(2, '0');
        return 'CTB-' + stamp;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const results = Object.keys(fields).map(validateField);
        const allValid = results.every(Boolean);

        if (!allValid) {
            const firstInvalid = Object.keys(fields).find((key) => !fields[key].validate(fields[key].el.value));
            if (firstInvalid) {
                fields[firstInvalid].el.focus();
            }
            return;
        }

        successRef.textContent = buildReference();
        form.hidden = true;
        success.hidden = false;
        ledger.classList.add('is-submitted');
        success.focus?.();
        success.setAttribute('tabindex', '-1');
        success.focus();
    });
})();
