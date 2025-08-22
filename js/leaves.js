// js/leaves.js

function createPetal() {
    // Constantes para mejor legibilidad y fácil ajuste
    const MIN_SIZE_PX = 15;
    const MAX_SIZE_PX = 40;
    const MIN_FALL_DURATION_S = 5;
    const MAX_FALL_DURATION_S = 15;
    const MIN_SWAY_DURATION_S = 2;
    const MAX_SWAY_DURATION_S = 6;
    const MAX_ANIMATION_DELAY_S = 5;
    const MIN_SWAY_DISTANCE_PX = 20;
    const MAX_SWAY_DISTANCE_PX = 60;

    const petal = document.createElement('div');
    petal.classList.add('petal'); 
    
    petal.style.backgroundImage = 'url(images/petaloA.png)';
    petal.style.backgroundSize = 'contain';
    petal.style.backgroundRepeat = 'no-repeat';
    petal.style.backgroundPosition = 'center';

    petal.style.left = Math.random() * 100 + 'vw';

    const size = Math.random() * (MAX_SIZE_PX - MIN_SIZE_PX) + MIN_SIZE_PX;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;

    const fallDuration = Math.random() * (MAX_FALL_DURATION_S - MIN_FALL_DURATION_S) + MIN_FALL_DURATION_S;
    const swayDuration = Math.random() * (MAX_SWAY_DURATION_S - MIN_SWAY_DURATION_S) + MIN_SWAY_DURATION_S;
    const animationDelay = Math.random() * MAX_ANIMATION_DELAY_S;

    petal.style.animation = `
        fall ${fallDuration}s linear ${animationDelay}s forwards,
        sway ${swayDuration}s ease-in-out ${animationDelay}s infinite alternate
    `;

    const swayDistance = Math.random() * (MAX_SWAY_DISTANCE_PX - MIN_SWAY_DISTANCE_PX) + MIN_SWAY_DISTANCE_PX;
    petal.style.setProperty('--initial-rotation', `${Math.random() * 360}deg`);
    petal.style.setProperty('--sway-distance', `${swayDistance}px`);

    document.body.appendChild(petal);

    petal.addEventListener('animationend', () => {
        petal.remove();
    }, { once: true });
}

const PETAL_CREATION_INTERVAL_MS = 800;
setInterval(createPetal, PETAL_CREATION_INTERVAL_MS);