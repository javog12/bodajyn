// js/personalize.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementos del DOM
    const guestNamesElement = document.getElementById('guest-names');
    const guestPassesElement = document.getElementById('guest-passes');
    const invitationContainer = document.getElementById('invitacion-personal');

    // 2. Parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestCode = urlParams.get('invitados');

    // 3. Validar elementos
    if (!guestNamesElement || !guestPassesElement || !invitationContainer) {
        console.error('Error: Faltan elementos HTML para la personalización.');
        return;
    }

    // 4. Validar el invitado
    // La variable `guestList` viene de `guests.js`.
    const guestInfo = guestCode && guestList?.[guestCode];

    if (guestInfo) {
        // 5. Personalizar contenido
        guestNamesElement.textContent = guestInfo.names;
        guestPassesElement.textContent = guestInfo.passes;

        // 6. Hacer visible la invitación (usando clases)
        invitationContainer.classList.remove('invisible');
    } else {
        // 7. Redirigir si el código no es válido
        window.location.href = 'private.html';
    }
});