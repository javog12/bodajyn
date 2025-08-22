// js/app.js

document.addEventListener('DOMContentLoaded', function () {

    /**
     * INICIALIZACIÓN DEL CARRUSEL DE LA GALERÍA (SWIPER)
     */
    new Swiper("#galeria .mySwiper", {
        loop: true,
        centeredSlides: true,
        slidesPerView: "auto",
        spaceBetween: 15,
        navigation: {
            nextEl: "#galeria .swiper-button-next",
            prevEl: "#galeria .swiper-button-prev",
        },
        breakpoints: {
            768: {
                spaceBetween: 30
            }
        }
    });

    /**
     * LÓGICA DEL FORMULARIO DE CONFIRMACIÓN (RSVP)
     */
    const rsvpWrapper = document.getElementById('rsvp-interactive');
    const step1 = document.getElementById('rsvp-step-1');
    const step2 = document.getElementById('rsvp-step-2');
    const rsvpForm = document.getElementById('rsvp-form');
    
    // El número debe incluir el código de país sin '+' o espacios.
    const WHATSAPP_PHONE_NUMBER = '59169197397';

    if (rsvpWrapper) {
        document.getElementById('confirm-yes').addEventListener('click', () => {
            const guestName = document.getElementById('guest-names').innerText;
            const nameInput = document.getElementById('name');
            
            if (nameInput && guestName && guestName !== 'Invitado') {
                nameInput.value = guestName;
            }

            step1.classList.remove('active');
            step2.classList.add('active');
        });

        document.getElementById('confirm-no').addEventListener('click', () => {
            rsvpWrapper.innerHTML = `<div class="final-reply"><p>Lamentamos que no puedas acompañarnos, pero agradecemos mucho tu respuesta. ¡Te tendremos en nuestros corazones!</p></div>`;
        });

        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const message = document.getElementById('message').value;
            
            let confirmationMessage = `¡Hola! 👋 Confirmo mi asistencia a su boda.\n\n*Invitado(s):* ${name}`;
            if (message.trim()) { // Solo añade el mensaje si no está vacío
                confirmationMessage += `\n\n*Mensaje/Canción:* ${message}`;
            }
            
            const whatsappURL = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(confirmationMessage)}`;
            
            rsvpWrapper.innerHTML = `<div class="final-reply"><p>¡Gracias por confirmar, ${name}! Serás redirigido a WhatsApp para enviar el mensaje. ¡Nos vemos en la boda!</p></div>`;
            
            // Abrimos WhatsApp en una nueva pestaña para no interrumpir la experiencia.
            window.open(whatsappURL, '_blank');
        });
    }

    /**
     * LÓGICA DEL CONTADOR REGRESIVO
     */
    const weddingDate = new Date("2025-10-25T15:30:00").getTime(); // Formato ISO 8601 para mayor compatibilidad
    
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const countdownContainer = document.getElementById("footer-countdown-container");

    if (daysEl && hoursEl && minutesEl) {
        const countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                if (countdownContainer) {
                    countdownContainer.innerHTML = '<p class="text-4xl md:text-5xl text-white font-playfair-display">¡Llegó el gran día!</p>';
                }
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            const formatTime = (time) => String(time).padStart(2, '0');

            daysEl.innerText = formatTime(days);
            hoursEl.innerText = formatTime(hours);
            minutesEl.innerText = formatTime(minutes);

        }, 1000);
    }
});