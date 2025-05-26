// Cyberpunk 2025 - Main JavaScript

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Navigation
const nav = document.getElementById('navigation');
const navBurger = document.getElementById('navBurger');
const navMenu = document.getElementById('navMenu');

// Sticky Navigation
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.classList.remove('nav-hidden');
        nav.classList.remove('nav-scrolled');
    } else if (currentScroll > lastScroll) {
        nav.classList.add('nav-hidden');
    } else {
        nav.classList.remove('nav-hidden');
        nav.classList.add('nav-scrolled');
    }
    
    lastScroll = currentScroll;
    
    // Update scroll progress
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollPercentage = (currentScroll / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = `${scrollPercentage}%`;
});

// Mobile Menu Toggle
navBurger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navBurger.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
            navBurger.classList.remove('active');
        }
    });
});

// Typing Effect
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.txt = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.type();
    }
    
    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.element.innerHTML = `<span class="neon-text">${this.txt}</span>`;
        
        let typeSpeed = 100;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    const typedElement = document.querySelector('.hero-title .neon-text');
    if (typedElement) {
        const words = ['Umsätze', 'Erfolg', 'Wachstum', 'Performance'];
        new TypeWriter(typedElement, words);
    }
});

// Counter Animation
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / 200;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 10);
        } else {
            counter.innerText = target;
        }
    });
};

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger counter animation
            if (entry.target.classList.contains('stats-grid')) {
                animateCounters();
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.stats-grid').forEach(el => {
    observer.observe(el);
});

// Tabs Functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const targetContent = document.getElementById(`${tabName}-tab`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Project Tabs
const projectButtons = document.querySelectorAll('[data-project]');
const projectContents = document.querySelectorAll('.project-content');

projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectName = button.getAttribute('data-project');
        
        projectButtons.forEach(btn => btn.classList.remove('active'));
        projectContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        
        const targetProject = document.getElementById(`${projectName}-content`);
        if (targetProject) {
            targetProject.classList.add('active');
        }
    });
});

// Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add loading state
        const submitButton = contactForm.querySelector('.form-submit');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird gesendet...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Erfolgreich gesendet!';
            submitButton.style.background = 'var(--neon-cyan)';
            submitButton.style.color = 'var(--cyber-black)';
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
                submitButton.style.color = '';
            }, 3000);
        }, 2000);
    });
}

// Early Access Form
const earlyAccessForm = document.getElementById('earlyAccessForm');
if (earlyAccessForm) {
    earlyAccessForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = earlyAccessForm.querySelector('input[type="email"]').value;
        
        // Show success message
        earlyAccessForm.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <p>Vielen Dank! Sie erhalten Updates an: ${email}</p>
            </div>
        `;
    });
}

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
let isDarkMode = true;

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('light-mode');
    
    const icon = themeToggle.querySelector('i');
    icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
});

// Visitor Counter
const updateVisitorCount = () => {
    const visitorCount = document.getElementById('visitorCount');
    if (visitorCount) {
        let count = parseInt(visitorCount.textContent);
        setInterval(() => {
            count += Math.floor(Math.random() * 3);
            visitorCount.textContent = count;
        }, 5000);
    }
};

updateVisitorCount();

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Video Optimization
const videos = document.querySelectorAll('video');
videos.forEach(video => {
    // Pause videos when not in viewport
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });
    
    videoObserver.observe(video);
});

// Cookie Banner
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.querySelector('.cookie-accept');
const cookieSettings = document.querySelector('.cookie-settings');

// Check if cookies were already accepted
if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => {
        cookieBanner.classList.add('show');
    }, 3000);
}

cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.classList.remove('show');
});

cookieSettings.addEventListener('click', () => {
    // Open cookie settings modal
    console.log('Cookie settings clicked');
});

// Floating CTA
const floatingCTA = document.getElementById('floatingCTA');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        floatingCTA.classList.add('show');
    } else {
        floatingCTA.classList.remove('show');
    }
});

// GSAP Animations
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Fade in animations
    gsap.utils.toArray('.fade-in-up').forEach(element => {
        gsap.fromTo(element, 
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Service cards stagger animation
    gsap.fromTo('.service-card',
        {
            opacity: 0,
            y: 100
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 70%'
            }
        }
    );
    
    // Timeline animation
    gsap.fromTo('.timeline-item',
        {
            opacity: 0,
            x: (index) => index % 2 === 0 ? -100 : 100
        },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            stagger: 0.3,
            scrollTrigger: {
                trigger: '.story-timeline',
                start: 'top 70%'
            }
        }
    );
}

// Initialize Vanilla Tilt
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });
}

// Performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Optimize scroll events
let ticking = false;
const handleScroll = () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Your scroll handling code here
            ticking = false;
        });
        ticking = true;
    }
};

window.addEventListener('scroll', handleScroll);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Cyberpunk 2025 Website Initialized');
});