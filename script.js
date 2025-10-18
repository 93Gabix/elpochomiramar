document.addEventListener('DOMContentLoaded', function() {
    
    // Variables para el menú de navegación
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.getElementById('header');
    
    // Variables para la galería
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    // Variables para el slider de testimonios
    const testimoniosContainer = document.querySelector('.testimonios-container');
    const prevTestimonioBtn = document.querySelector('.prev-btn');
    const nextTestimonioBtn = document.querySelector('.next-btn');
    const testimonios = document.querySelectorAll('.testimonio');
    
    // Variables para scroll down
    const scrollDown = document.querySelector('.scroll-down');
    
    let currentGalleryIndex = 0;
    let currentTestimonioIndex = 0;
    let testimonioSliderInterval;

    // Array de imágenes para la galería (agregar las imágenes reales)
    const galleryImages = [
        { src: 'img/7.jpg', alt: 'Exterior cabaña' },
        { src: 'img/4.jpg', alt: 'Interior cabaña' },
        { src: 'img/6.jpg', alt: 'Vista al lago' },
        { src: 'img/31.jpg', alt: 'Habitación principal' },
        { src: 'img/1.jpg', alt: 'Cocina equipada' },
        { src: 'img/2.jpg', alt: 'Terraza cabaña' },
        { src: 'img/3.jpg', alt: 'Sendero bosque' },
        { src: 'img/5.jpg', alt: 'Área de descanso' }
    ];
    
    // Cambiar el estilo del header al hacer scroll
    window.addEventListener('scroll', function() {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
    
    // Funcionalidad del scroll down
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            const cabanasSectionTop = document.querySelector('#cabanas').offsetTop;
            const headerHeight = header ? header.offsetHeight : 0;
            
            window.scrollTo({
                top: cabanasSectionTop - headerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Abrir/cerrar el menú móvil
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Cerrar el menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Funcionalidad para la galería - CORREGIDA
    if (galleryItems.length > 0 && modal && modalImg) {
        // Actualizar las imágenes de la galería con las imágenes reales
        galleryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            if (img && galleryImages[index]) {
                img.src = galleryImages[index].src;
                img.alt = galleryImages[index].alt;
            }
        });

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                currentGalleryIndex = index;
                const img = this.querySelector('img');
                if (img) {
                    modalImg.src = img.src;
                    modalImg.alt = img.alt;
                    
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        // Cerrar modal
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                closeGalleryModal();
            });
        }
        
        // Cerrar al hacer clic fuera de la imagen
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeGalleryModal();
            }
        });
        
        // Función para cerrar modal
        function closeGalleryModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Navegar entre imágenes
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                navigateGallery(-1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                navigateGallery(1);
            });
        }
        
        // Navegación con teclado
        document.addEventListener('keydown', function(e) {
            if (!modal.classList.contains('active')) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    navigateGallery(-1);
                    break;
                case 'ArrowRight':
                    navigateGallery(1);
                    break;
                case 'Escape':
                    closeGalleryModal();
                    break;
            }
        });
        
        function navigateGallery(direction) {
            currentGalleryIndex += direction;
            
            if (currentGalleryIndex < 0) {
                currentGalleryIndex = galleryItems.length - 1;
            } else if (currentGalleryIndex >= galleryItems.length) {
                currentGalleryIndex = 0;
            }
            
            const newImg = galleryItems[currentGalleryIndex].querySelector('img');
            if (newImg) {
                modalImg.src = newImg.src;
                modalImg.alt = newImg.alt;
            }
        }
    }
    
    // Slider de testimonios - COMPLETAMENTE CORREGIDO
    if (testimoniosContainer && testimonios.length > 0) {
        
        function updateTestimonioSlider() {
            const translateX = -currentTestimonioIndex * 100;
            testimoniosContainer.style.transform = `translateX(${translateX}%)`;
        }
        
        function nextTestimonio() {
            currentTestimonioIndex = (currentTestimonioIndex + 1) % testimonios.length;
            updateTestimonioSlider();
        }
        
        function prevTestimonio() {
            currentTestimonioIndex = currentTestimonioIndex === 0 ? testimonios.length - 1 : currentTestimonioIndex - 1;
            updateTestimonioSlider();
        }
        
        // Eventos de los botones
        if (nextTestimonioBtn) {
            nextTestimonioBtn.addEventListener('click', function() {
                nextTestimonio();
                resetAutoSlide();
            });
        }
        
        if (prevTestimonioBtn) {
            prevTestimonioBtn.addEventListener('click', function() {
                prevTestimonio();
                resetAutoSlide();
            });
        }
        
        // Auto-slider
        function startAutoSlide() {
            testimonioSliderInterval = setInterval(nextTestimonio, 5000);
        }
        
        function resetAutoSlide() {
            clearInterval(testimonioSliderInterval);
            startAutoSlide();
        }
        
        // Pausar auto-slider cuando el mouse esté sobre el slider
        const testimoniosSlider = document.querySelector('.testimonios-slider');
        if (testimoniosSlider) {
            testimoniosSlider.addEventListener('mouseenter', function() {
                clearInterval(testimonioSliderInterval);
            });
            
            testimoniosSlider.addEventListener('mouseleave', function() {
                startAutoSlide();
            });
        }
        
        // Inicializar slider
        updateTestimonioSlider();
        startAutoSlide();
        
        // Actualizar en resize
        window.addEventListener('resize', function() {
            updateTestimonioSlider();
        });
    }
    
    // Validación de formulario del footer
    const footerForm = document.querySelector('.footer-form');
    if (footerForm) {
        footerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                alert('¡Gracias por suscribirte! Te mantendremos informado sobre nuestras ofertas.');
                emailInput.value = '';
            } else {
                alert('Por favor, introduce un email válido.');
            }
        });
    }
    
    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Animación de aparición de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.cabana-card, .servicio-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Efecto parallax suave para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Mejorar la funcionalidad del botón WhatsApp
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            // El enlace ya está en el HTML, solo agregamos una pequeña animación
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Smooth scrolling para navegadores que no lo soporten nativamente
    if (!('scrollBehavior' in document.documentElement.style)) {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    console.log('Script cargado correctamente - Todas las funcionalidades inicializadas');
});