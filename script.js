
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
if (btn && menu) {
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
}

const textElement = document.querySelector('.typing-effect');
if (textElement) {
    setInterval(() => {
        const cursor = textElement.querySelector('.animate-pulse');
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 500);
}
