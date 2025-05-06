document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Crear corazones flotantes
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 3 + 's';
        document.querySelector('.floating-hearts').appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    setInterval(createHeart, 300);

    // Contador de días juntos
    function updateDaysCounter() {
        const startDate = new Date('2024-06-22'); // Fecha de inicio: 22 de junio de 2024
        const today = new Date();
        const diffTime = Math.abs(today - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        document.getElementById('days-together').textContent = diffDays;
    }

    updateDaysCounter();
    setInterval(updateDaysCounter, 86400000); // Actualizar cada día

    // Variables para el reproductor de música
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    let isPlaying = false;

    // Función para reproducir música
    function playMusic() {
        backgroundMusic.play();
        isPlaying = true;
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        musicToggle.classList.add('playing');
    }

    // Función para pausar música
    function pauseMusic() {
        backgroundMusic.pause();
        isPlaying = false;
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        musicToggle.classList.remove('playing');
    }

    // Evento click para el botón de música
    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                pauseMusic();
            } else {
                playMusic();
            }
        });

        // Reproducir música automáticamente cuando el usuario interactúa con la página
        document.addEventListener('click', () => {
            if (!isPlaying) {
                playMusic();
            }
        }, { once: true });
    }

    // Efecto parallax en el hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // Efecto de zoom en las fotos
    const photos = document.querySelectorAll('.photo-item');
    photos.forEach(photo => {
        photo.addEventListener('click', () => {
            const img = photo.querySelector('img');
            const overlay = photo.querySelector('.photo-overlay');
            
            if (overlay && overlay.style.transform === 'translateY(0px)') {
                overlay.style.transform = 'translateY(100%)';
            } else if (overlay) {
                overlay.style.transform = 'translateY(0)';
            }
        });
    });

    // Animación de mensajes
    const messages = document.querySelectorAll('.message');
    messages.forEach((message, index) => {
        message.style.animationDelay = `${index * 0.2}s`;
    });

    // Interactividad para las tarjetas de razones
    const reasonCards = document.querySelectorAll('.reason-card');
    reasonCards.forEach(card => {
        card.addEventListener('click', () => {
            const inner = card.querySelector('.card-inner');
            inner.style.transform = inner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
        });
    });

    // Efecto de escritura en el título
    const title = document.querySelector('.title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        typeWriter();
    }

    // Animación suave al hacer scroll
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.5s ease-out';
        observer.observe(section);
    });

    // Función para añadir fotos
    function addPhoto(imageUrl, description) {
        const photoGrid = document.querySelector('.photo-grid');
        if (photoGrid) {
            const photoElement = document.createElement('div');
            photoElement.className = 'photo-item';
            photoElement.innerHTML = `
                <img src="${imageUrl}" alt="${description}">
                <p>${description}</p>
            `;
            photoGrid.appendChild(photoElement);
        }
    }

    // Función para añadir eventos a la línea de tiempo
    function addTimelineEvent(date, title, description) {
        const timelineContainer = document.querySelector('.timeline-container');
        if (timelineContainer) {
            const eventElement = document.createElement('div');
            eventElement.className = 'timeline-event';
            eventElement.innerHTML = `
                <div class="date">${date}</div>
                <div class="content">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            `;
            timelineContainer.appendChild(eventElement);
        }
    }

    // Función para añadir mensajes
    function addMessage(message) {
        const messageContainer = document.querySelector('.message-container');
        if (messageContainer) {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.innerHTML = `
                <p>${message}</p>
            `;
            messageContainer.appendChild(messageElement);
        }
    }

    // Solo ejecutar estas funciones si estamos en la página principal
    if (document.querySelector('.timeline-container')) {
        addTimelineEvent('Primera cita', 'El día que todo comenzó', 'El momento en que nuestros caminos se cruzaron');
    }
    
    if (document.querySelector('.message-container')) {
        addMessage('Cada día a tu lado es un nuevo regalo. Te amo.');
    }

    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.prev-btn');
        const nextBtn = lightbox.querySelector('.next-btn');
        const photoItems = document.querySelectorAll('.photo-item');
        let currentImageIndex = 0;

        // Open lightbox
        photoItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentImageIndex = index;
                const imgSrc = item.querySelector('img').src;
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close lightbox
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close lightbox with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Navigate through images
        function showImage(index) {
            if (index < 0) {
                currentImageIndex = photoItems.length - 1;
            } else if (index >= photoItems.length) {
                currentImageIndex = 0;
            } else {
                currentImageIndex = index;
            }
            const imgSrc = photoItems[currentImageIndex].querySelector('img').src;
            lightboxImg.src = imgSrc;
        }

        prevBtn.addEventListener('click', () => {
            showImage(currentImageIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            showImage(currentImageIndex + 1);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'ArrowLeft') {
                showImage(currentImageIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showImage(currentImageIndex + 1);
            }
        });
    }
}); 