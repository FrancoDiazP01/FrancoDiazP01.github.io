// Animación de transición entre páginas
function animatePageTransition() {
    const homeBrand = document.getElementById('home-brand');
    const loginTitle = document.querySelector('.login-title');

    if (homeBrand) {
        // Animación en home
        homeBrand.addEventListener('click', () => {
            homeBrand.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
            homeBrand.style.transform = 'translateY(100vh)';
            homeBrand.style.opacity = '0';
        });
    }

    if (loginTitle) {
        // Animación en login
        window.addEventListener('load', () => {
            loginTitle.style.transform = 'translateY(0)';
            loginTitle.style.opacity = '1';
        });
    }
}

// Inicializar animaciones
document.addEventListener('DOMContentLoaded', animatePageTransition);
