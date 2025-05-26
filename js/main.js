document.addEventListener('DOMContentLoaded', function() {
    "use strict";
    
    // ======= Preloader =======
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1500);
        });
    }
    
    // ======= Header Scroll Effect =======
    function handleHeaderScroll() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleHeaderScroll);
    // Initial ausführen
    handleHeaderScroll();
    
    // ======= Mobile Menu Toggle =======
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    if (burger && mobileMenu) {
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                burger.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }
    
    // ======= Smooth Scrolling für Navigation =======
    window.scrollToSection = function(sectionId) {
        event.preventDefault();
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            // Header-Höhe berücksichtigen
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // URL-Hash aktualisieren ohne Scroll-Sprung
            history.pushState(null, null, `#${sectionId}`);
        }
    };
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // ======= Scroll Animations =======
    const fadeElements = document.querySelectorAll('.fade-in');
    const staggeredElements = document.querySelectorAll('.staggered-fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
        
        staggeredElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                setTimeout(() => {
                    element.classList.add('active');
                }, index * 100);
            }
        });
    }
    
    window.addEventListener('scroll', checkFade);
    window.addEventListener('resize', checkFade);
    window.addEventListener('load', checkFade);
    
    // Add class to make available globally
    window.checkFade = checkFade;
    
    // ======= Number Counter Animation =======
    function initCounters() {
        const statNumbers = document.querySelectorAll('.stat-number, .about-stat-number');
        
        statNumbers.forEach(counter => {
            // Skip if already initialized
            if (counter.classList.contains('counted')) return;
            
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // ms
            
            let startTime = null;
            
            function countUp(timestamp) {
                if (!startTime) startTime = timestamp;
                
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / duration, 1);
                
                // Easing function for smoother animation
                const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
                const currentValue = Math.floor(easeOutQuart * target);
                
                counter.textContent = currentValue;
                
                if (percentage < 1) {
                    requestAnimationFrame(countUp);
                } else {
                    counter.textContent = target;
                    counter.classList.add('counted');
                }
            }
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        requestAnimationFrame(countUp);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    // Initialize counters
    setTimeout(initCounters, 1000);
    
    // ======= Typed Text Effect in Hero Section =======
    const typedTextSpan = document.querySelector('.typed-text');
    if (typedTextSpan) {
        const texts = ['Umsätze', 'Lead-Generierung', 'Vertriebsprozesse', 'Conversion', 'Website-Qualität'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typingSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before typing next word
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start typing animation
        setTimeout(type, 1000);
    }
    
    // ======= Back to Top Button =======
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 600) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ======= Cookie Consent Banner =======
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    const cookieSettingsBtn = document.getElementById('cookieSettings');
    
    if (cookieConsent && acceptCookiesBtn) {
        // Check if user has already accepted cookies
        if (!localStorage.getItem('cookiesAccepted')) {
            // Show cookie banner after a delay
            setTimeout(() => {
                cookieConsent.style.display = 'block';
                setTimeout(() => {
                    cookieConsent.classList.add('active');
                }, 100);
            }, 2000);
        }
        
        // Accept all cookies
        acceptCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieConsent.classList.remove('active');
            setTimeout(() => {
                cookieConsent.style.display = 'none';
            }, 500);
        });
        
        // Cookie settings
        if (cookieSettingsBtn) {
            cookieSettingsBtn.addEventListener('click', function() {
                // In a real implementation, this would open a modal with cookie settings
                alert('In einer vollständigen Implementierung würde hier ein Modal mit Cookie-Einstellungen geöffnet werden.');
            });
        }
    }
    
    // ======= Video Loading Handling =======
    function handleVideoLoading() {
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            // Handle loading errors
            video.addEventListener('error', function() {
                console.error('Fehler beim Laden des Videos:', this.src);
                const section = this.closest('section');
                if (section) {
                    section.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
                }
                this.style.display = 'none';
                
                // Activate fallback
                const videoParent = this.closest('.video-bg');
                if (videoParent) {
                    const videoError = document.createElement('div');
                    videoError.className = 'video-error active';
                    videoParent.appendChild(videoError);
                }
            });
            
            // Optimize performance by pausing videos when not visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (video.paused) video.play();
                    } else {
                        if (!video.paused) video.pause();
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(video);
        });
    }
    
    // Initialize video handling
    handleVideoLoading();
    
    // ======= Services Filter =======
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (filterButtons.length && serviceCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Active-Klasse entfernen
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Active-Klasse zum geklickten Button hinzufügen
                this.classList.add('active');
                
                // Filter anwenden
                const filterValue = this.getAttribute('data-filter');
                
                serviceCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        const cardCategories = card.getAttribute('data-category').split(' ');
                        if (cardCategories.includes(filterValue)) {
                            card.classList.remove('hidden');
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 100);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.classList.add('hidden');
                            }, 300);
                        }
                    }
                });
            });
        });
    }
    
    // ======= Projects Tabs Toggle =======
    const projectTabs = document.querySelectorAll('.project-tab');
    const projectContents = document.querySelectorAll('.project-content');
    
    if (projectTabs.length && projectContents.length) {
        projectTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Aktive Klasse von allen Tabs entfernen
                projectTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Aktiven Inhalt ändern
                const projectId = this.getAttribute('data-project');
                projectContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                const targetContent = document.getElementById(`${projectId}-content`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
                
                // Animationen zurücksetzen und neu starten
                setTimeout(() => {
                    checkFade();
                }, 100);
            });
        });
    }
    
    // ======= Client Logos Testimonial Interaction =======
    const clientLogos = document.querySelectorAll('.client-logo');
    const testimonialText = document.getElementById('testimonial-text');
    const testimonialClient = document.getElementById('testimonial-client');
    
    if (clientLogos.length && testimonialText && testimonialClient) {
        clientLogos.forEach(logo => {
            logo.addEventListener('mouseenter', function() {
                // Remove active class from all logos
                clientLogos.forEach(l => l.classList.remove('active'));
                // Add active class to this logo
                this.classList.add('active');
                
                const testimonial = this.getAttribute('data-testimonial');
                const client = this.getAttribute('data-client');
                
                // Remove animation class
                testimonialText.classList.remove('testimonial-fade');
                testimonialClient.classList.remove('testimonial-fade');
                
                // Trigger reflow to restart animation
                void testimonialText.offsetWidth;
                void testimonialClient.offsetWidth;
                
                // Update text and add animation class
                testimonialText.textContent = testimonial;
                testimonialClient.textContent = client;
                testimonialText.classList.add('testimonial-fade');
                testimonialClient.classList.add('testimonial-fade');
            });
        });
    }
    
    // ======= About Tab Toggle =======
    const aboutTabs = document.querySelectorAll('.about-tab');
    const aboutContents = document.querySelectorAll('.about-content');
    
    if (aboutTabs.length && aboutContents.length) {
        aboutTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Aktive Klasse von allen Tabs entfernen
                aboutTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Aktiven Inhalt ändern
                const tabId = this.getAttribute('data-tab');
                aboutContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                const targetContent = document.getElementById(tabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
                
                // Animationen zurücksetzen und neu starten
                const staggeredElements = document.querySelectorAll('.staggered-fade-in');
                staggeredElements.forEach(el => {
                    el.classList.remove('active');
                });
                
                setTimeout(() => {
                    checkFade();
                }, 100);
            });
        });
    }
    
    // ======= Process Tab Navigation =======
    const processNavButtons = document.querySelectorAll('.process-nav-btn');
    const processViews = document.querySelectorAll('.process-view');
    
    if (processNavButtons.length && processViews.length) {
        processNavButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all nav buttons
                processNavButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show the relevant process view
                const targetView = this.getAttribute('data-target');
                processViews.forEach(view => view.classList.remove('active'));
                document.getElementById(targetView).classList.add('active');
                
                // Reset and restart animations
                const staggeredElements = document.querySelectorAll('.staggered-fade-in');
                staggeredElements.forEach(el => el.classList.remove('active'));
                
                setTimeout(() => {
                    checkFade();
                }, 100);
            });
        });
    }
    
    // ======= Contact Form Validation =======
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Einfache Client-Validierung
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showError(field);
                } else {
                    removeError(field);
                }
            });
            
            // E-Mail-Validierung
            const emailField = contactForm.querySelector('#email');
            if (emailField && !validateEmail(emailField.value) && emailField.value.trim()) {
                isValid = false;
                showError(emailField, 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
            }
            
            if (isValid) {
                // In einer realen Implementierung würde hier ein AJAX-Request erfolgen
                // Für Demonstrationszwecke zeigen wir eine Erfolgsmeldung
                showSuccess(contactForm);
            }
        });
        
        // Input-Animations für bessere UX
        const formInputs = contactForm.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.closest('.input-container').classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.closest('.input-container').classList.remove('focused');
            });
        });
    }
    
    // Hilfsfunktionen für die Formular-Validierung
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function showError(field, message) {
        const container = field.closest('.form-group');
        
        // Existierende Fehlermeldung entfernen
        const existingError = container.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Fehlermeldung hinzufügen
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message || 'Dieses Feld ist erforderlich.';
        
        container.appendChild(errorDiv);
        field.closest('.input-container').classList.add('error');
        
        // Fehler-Styling
        if (!document.getElementById('error-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'error-styles';
            styleSheet.innerHTML = `
                .input-container.error {
                    border-color: #e74c3c;
                }
                
                .error-message {
                    color: #e74c3c;
                    font-size: 1.3rem;
                    margin-top: 0.8rem;
                    animation: fadeIn 0.3s ease;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }
    
    function removeError(field) {
        const container = field.closest('.form-group');
        const errorMessage = container.querySelector('.error-message');
        
        if (errorMessage) {
            errorMessage.remove();
        }
        
        field.closest('.input-container').classList.remove('error');
    }
    
    function showSuccess(form) {
        // Form ausblenden
        form.style.opacity = '0';
        form.style.transform = 'scale(0.95)';
        form.style.transition = 'all 0.5s var(--easing)';
        
        // Success-Nachricht erstellen
        setTimeout(() => {
            form.innerHTML = `
                <div class="success-message">
                    <div class="success-icon">
                        <i class="fas fa-check"></i>
                    </div>
                    <h3>Vielen Dank!</h3>
                    <p>Ihre Anfrage wurde erfolgreich gesendet. Unser Team wird sich innerhalb von 24 Stunden mit Ihnen in Verbindung setzen.</p>
                    <div class="success-actions">
                        <a href="#" onclick="window.scrollTo({top: 0, behavior: 'smooth'}); return false;" class="btn btn-outline">Zurück zur Startseite</a>
                    </div>
                </div>
            `;
            
            // Success-Styling
            if (!document.getElementById('success-styles')) {
                const styleSheet = document.createElement('style');
                styleSheet.id = 'success-styles';
                styleSheet.innerHTML = `
                    .success-message {
                        text-align: center;
                        padding: 4rem 2rem;
                        animation: fadeScale 0.5s var(--easing) forwards;
                    }
                    
                    .success-icon {
                        width: 10rem;
                        height: 10rem;
                        background: var(--accent-gradient);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 3rem;
                        font-size: 4rem;
                        color: white;
                        box-shadow: 0 0 30px rgba(52, 152, 219, 0.5);
                    }
                    
                   .success-message h3 {
                            font-size: 3rem;
                            margin-bottom: 2rem;
                            color: var(--text-light);
                        }
                        
                        .success-message p {
                            font-size: 1.8rem;
                            color: var(--text-muted);
                            max-width: 80%;
                            margin: 0 auto 3rem;
                            line-height: 1.7;
                        }
                        
                        .success-actions {
                            margin-top: 3rem;
                        }
                        
                        @keyframes fadeScale {
                            from { opacity: 0; transform: scale(0.9); }
                            to { opacity: 1; transform: scale(1); }
                        }
                `;
                document.head.appendChild(styleSheet);
            }
            
            form.style.opacity = '1';
            form.style.transform = 'scale(1)';
        }, 500);
    }
    
    // Initialize all functionalities
    checkFade();
});