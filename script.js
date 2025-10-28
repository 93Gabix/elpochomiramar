// Variables
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link');

// Testimonios
const testimoniosContainer = document.getElementById('testimoniosContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentTestimonioIndex = 0;
const testimonios = document.querySelectorAll('.testimonio');
const totalTestimonios = testimonios.length;

// Menú móvil toggle
navToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    const icon = this.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Header scroll effect
window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll suave para scroll-down
document.querySelector('.scroll-down').addEventListener('click', function () {
    document.querySelector('#nosotros').scrollIntoView({ behavior: 'smooth' });
});

// Testimonios slider
function updateTestimonioSlider() {
    const translateX = -currentTestimonioIndex * 100;
    testimoniosContainer.style.transform = `translateX(${translateX}%)`;
}

function nextTestimonio() {
    currentTestimonioIndex = (currentTestimonioIndex + 1) % totalTestimonios;
    updateTestimonioSlider();
}

function prevTestimonio() {
    currentTestimonioIndex = currentTestimonioIndex === 0 ? totalTestimonios - 1 : currentTestimonioIndex - 1;
    updateTestimonioSlider();
}

nextBtn.addEventListener('click', nextTestimonio);
prevBtn.addEventListener('click', prevTestimonio);

// Auto-slider para testimonios
let autoSlideInterval = setInterval(nextTestimonio, 5000);

// Pausar auto-slide al hacer hover
const testimoniosSlider = document.querySelector('.testimonios-slider');
testimoniosSlider.addEventListener('mouseenter', function () {
    clearInterval(autoSlideInterval);
});

testimoniosSlider.addEventListener('mouseleave', function () {
    autoSlideInterval = setInterval(nextTestimonio, 5000);
});

// Footer form
const footerForm = document.getElementById('footerForm');
footerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    alert('¡Gracias por suscribirte! Te mantendremos informado sobre nuestras ofertas.');
    emailInput.value = '';
});

// Animación de aparición al scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.cabana-card, .servicio-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Carruseles de cabañas
const cabanaCards = document.querySelectorAll('.cabana-card');

cabanaCards.forEach((card, cardIndex) => {
    const carousel = card.querySelector('.cabana-carousel');
    const prevBtn = card.querySelector('.carousel-prev');
    const nextBtn = card.querySelector('.carousel-next');
    const dots = card.querySelectorAll('.carousel-dot');
    let currentIndex = 0;
    const totalImages = 3;
    let autoSlide;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    }

    function prevImage() {
        currentIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
        updateCarousel();
    }

    // function startAutoSlide() {
    //     autoSlide = setInterval(nextImage, 4000);
    // }

    // function stopAutoSlide() {
    //     clearInterval(autoSlide);
    // }

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextImage();
        stopAutoSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevImage();
        stopAutoSlide();
        startAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            // stopAutoSlide();
            // startAutoSlide();
        });
    });

    // card.addEventListener('mouseenter', stopAutoSlide);
    // card.addEventListener('mouseleave', startAutoSlide);

    // startAutoSlide();
});

document.addEventListener('DOMContentLoaded', function () {
    // Toggle mobile menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');
    });

    // Toggle view
    const gridViewBtn = document.getElementById('grid-view-btn');
    const timelineViewBtn = document.getElementById('timeline-view-btn');
    const gridView = document.getElementById('grid-view');
    const timelineView = document.getElementById('timeline-view');

    gridViewBtn.addEventListener('click', function () {
        gridView.classList.remove('hidden');
        timelineView.classList.add('hidden');
        gridViewBtn.classList.add('bg-white', 'shadow-sm', 'text-gray-800');
        gridViewBtn.classList.remove('text-gray-600');
        timelineViewBtn.classList.remove('bg-white', 'shadow-sm', 'text-gray-800');
        timelineViewBtn.classList.add('text-gray-600');
    });

    timelineViewBtn.addEventListener('click', function () {
        gridView.classList.add('hidden');
        timelineView.classList.remove('hidden');
        timelineViewBtn.classList.add('bg-white', 'shadow-sm', 'text-gray-800');
        timelineViewBtn.classList.remove('text-gray-600');
        gridViewBtn.classList.remove('bg-white', 'shadow-sm', 'text-gray-800');
        gridViewBtn.classList.add('text-gray-600');
    });
});

/* Alternar grid / línea de tiempo */
const gridBtn = document.getElementById('grid-view-btn');
const timelineBtn = document.getElementById('timeline-view-btn');
const gridView = document.getElementById('grid-view');
const timelineView = document.getElementById('timeline-view');

gridBtn.addEventListener('click', () => {
    gridView.classList.remove('hidden');
    timelineView.classList.add('hidden');
    gridBtn.classList.add('bg-white', 'shadow-sm', 'text-gray-800');
    gridBtn.classList.remove('text-gray-600');
    timelineBtn.classList.remove('bg-white', 'shadow-sm', 'text-gray-800');
    timelineBtn.classList.add('text-gray-600');
});

timelineBtn.addEventListener('click', () => {
    gridView.classList.add('hidden');
    timelineView.classList.remove('hidden');
    timelineBtn.classList.add('bg-white', 'shadow-sm', 'text-gray-800');
    timelineBtn.classList.remove('text-gray-600');
    gridBtn.classList.remove('bg-white', 'shadow-sm', 'text-gray-800');
    gridBtn.classList.add('text-gray-600');
});
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const modalTag = document.getElementById('modal-tag');
const modalDate = document.getElementById('modal-date');
const currentSpan = document.getElementById('current-image');
const totalSpan = document.getElementById('total-images');
const btnClose = document.getElementById('close-modal');
const btnPrev = document.getElementById('prev-image');
const btnNext = document.getElementById('next-image');

let currentModalIndex = 0;

// abrir modal
document.addEventListener('click', e => {
    const card = e.target.closest('[data-index]');
    if (!card) return;
    currentModalIndex = parseInt(card.dataset.index, 10);
    fillModal();
    modal.classList.remove('hidden');
});

// cerrar modal
[btnClose, modal].forEach(el => el.addEventListener('click', () => modal.classList.add('hidden')));
modal.querySelector('.bg-white').addEventListener('click', e => e.stopPropagation());

// navegación
btnPrev.addEventListener('click', () => {
    currentModalIndex = (currentModalIndex - 1 + galleryData.length) % galleryData.length;
    fillModal();
});
btnNext.addEventListener('click', () => {
    currentModalIndex = (currentModalIndex + 1) % galleryData.length;
    fillModal();
});

// rellena campos
function fillModal() {
    const item = galleryData[currentModalIndex];
    modalImg.src = item.img;
    modalTitle.textContent = item.title;
    modalDesc.textContent = item.description;
    modalTag.textContent = item.tag;
    modalTag.className = `text-xs font-medium px-2.5 py-0.5 rounded ${item.tagClass}`;
    modalDate.textContent = item.date;
    currentSpan.textContent = currentModalIndex + 1;
    totalSpan.textContent = galleryData.length;
}