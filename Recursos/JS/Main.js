/* =========================================================
   PORTAFOLIO DE SEGURIDAD INFORMÁTICA
   Santiago Isaac Gasca López
   CNO IV – Seguridad Informática
   ========================================================= */


/* =========================================================
   1. NAVEGACIÓN SUAVE
   ========================================================= */

const navigationLinks = document.querySelectorAll(
    '.navigation a[href^="#"]'
);

navigationLinks.forEach((link) => {

    link.addEventListener('click', (event) => {

        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

    });

});


/* =========================================================
   2. ANIMACIONES AL HACER SCROLL
   ========================================================= */

const animatedElements = document.querySelectorAll(
    '.content-card, .interest-item, .technology-card, .contact-detail'
);

animatedElements.forEach((element) => {

    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition =
        'opacity 0.6s ease, transform 0.6s ease';

});


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.15
    }
);


animatedElements.forEach((element) => {
    observer.observe(element);
});


/* =========================================================
   3. FORMULARIO DE CONTACTO — EMAILJS
   ========================================================= */

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const submitButton = contactForm
    ? contactForm.querySelector('button[type="submit"]')
    : null;


if (contactForm) {

    contactForm.addEventListener('submit', (event) => {

        event.preventDefault();

        /*
         * Evita múltiples envíos mientras EmailJS
         * procesa el formulario.
         */
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
        }

        if (formStatus) {
            formStatus.textContent = 'Enviando tu mensaje...';
            formStatus.className = 'form-status';
        }


        /*
         * Envío mediante EmailJS.
         *
         * Service ID:
         * service_q7hlbbj
         *
         * Template principal:
         * template_0vgt97d
         *
         * El Auto-Reply está vinculado desde EmailJS.
         */

        emailjs.sendForm(
            'service_q7hlbbj',
            'template_0vgt97d',
            contactForm
        )

        .then(() => {

            if (formStatus) {
                formStatus.textContent =
                    'Mensaje enviado correctamente. Gracias por contactarme.';
                formStatus.className =
                    'form-status success';
            }

            contactForm.reset();

        })

        .catch((error) => {

            console.error(
                'Error al enviar el formulario:',
                error
            );

            if (formStatus) {
                formStatus.textContent =
                    '✕ No fue posible enviar el mensaje. Inténtalo nuevamente.';
                formStatus.className =
                    'form-status error';
            }

        })

        .finally(() => {

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar mensaje';
            }

        });

    });

}


/* =========================================================
   4. MENSAJE DE CONSOLA
   ========================================================= */

console.log(
    'Portafolio de SantiagoGasca — CNO IV Seguridad Informática'
);

console.log(
    'JavaScript cargado correctamente.'
);