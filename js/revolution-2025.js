/* ================================================
   THREE CONNECT - REVOLUTION 2025 JS
   Advanced Interactions & Features
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all revolutionary features
    initCustomCursor();
    initProgressIndicator();
    initParallaxEffects();
    initMagneticButtons();
    initThemeToggle();
    initSocialProof();
    initUrgencyTimer();
    initFloatingCTA();
    initMicroInteractions();
    initSoundEffects();
    initIntersectionAnimations();
    initSmoothScroll();
    initExitIntent();
    initLiveVisitorCounter();
    initAchievements();
    initAIChat();
    
    // Performance monitoring
    monitorPerformance();
});

// Custom Cursor Implementation
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(follower);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Main cursor
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        
        // Follower
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX - 20 + 'px';
        follower.style.top = followerY - 20 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects
    document.querySelectorAll('a, button, .clickable').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Progress Indicator
function initProgressIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'progress-indicator';
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        indicator.style.width = scrolled + '%';
    });
}

// Advanced Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Magnetic Button Effects
function initMagneticButtons() {
    document.querySelectorAll('.magnetic-button').forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// Theme Toggle with Auto-Detection
function initThemeToggle() {
    const toggle = document.createElement('div');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = '<span class="theme-icon">🌙</span>';
    document.body.appendChild(toggle);
    
    // Auto-detect system theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.add(prefersDark ? 'dark-mode' : 'light-mode');
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        toggle.querySelector('.theme-icon').textContent = 
            document.body.classList.contains('dark-mode') ? '🌙' : '☀️';
    });
}

// Social Proof Notifications
function initSocialProof() {
    const messages = [
        { name: 'Max M.', action: 'hat gerade eine Beratung gebucht', time: 'vor 2 Minuten' },
        { name: 'Sarah K.', action: 'hat ein Projekt gestartet', time: 'vor 5 Minuten' },
        { name: 'Tech GmbH', action: 'nutzt unsere Lösungen', time: 'vor 8 Minuten' },
        { name: 'Digital AG', action: 'hat 45% mehr Leads generiert', time: 'vor 12 Minuten' }
    ];
    
    let index = 0;
    
    function showNotification() {
        const notification = document.createElement('div');
        notification.className = 'social-proof glass';
        
        const message = messages[index % messages.length];
        notification.innerHTML = `
            <div class="social-proof-avatar">${message.name.charAt(0)}</div>
            <div class="social-proof-content">
                <strong>${message.name}</strong>
                <p>${message.action}</p>
                <small>${message.time}</small>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slide-out-left 0.5s ease-out';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
        
        index++;
    }
    
    // Show first notification after 3 seconds
    setTimeout(showNotification, 3000);
    // Then every 8 seconds
    setInterval(showNotification, 8000);
}

// Urgency Timer
function initUrgencyTimer() {
    const timers = document.querySelectorAll('.urgency-timer');
    
    timers.forEach(timer => {
        let hours = 24;
        let minutes = 0;
        let seconds = 0;
        
        setInterval(() => {
            if (seconds > 0) {
                seconds--;
            } else if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else if (hours > 0) {
                hours--;
                minutes = 59;
                seconds = 59;
            }
            
            timer.innerHTML = `
                <span>${String(hours).padStart(2, '0')}h</span>
                <span>${String(minutes).padStart(2, '0')}m</span>
                <span>${String(seconds).padStart(2, '0')}s</span>
            `;
        }, 1000);
    });
}

// Floating CTA
function initFloatingCTA() {
    const floatingCTA = document.createElement('div');
    floatingCTA.className = 'floating-cta glass floating';
    floatingCTA.innerHTML = `
        <button class="magnetic-button">
            <span>Jetzt beraten lassen</span>
            <i class="fas fa-arrow-right"></i>
        </button>
    `;
    floatingCTA.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        z-index: 100;
        display: none;
    `;
    document.body.appendChild(floatingCTA);
    
    // Show after scrolling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            floatingCTA.style.display = 'block';
        } else {
            floatingCTA.style.display = 'none';
        }
    });
}

// Micro-interactions
function initMicroInteractions() {
    // Add ripple effect to all buttons
    document.querySelectorAll('button, .button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Sound Effects (Optional)
function initSoundEffects() {
    const sounds = {
        hover: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
            // ... truncated for brevity
    };
    
    // Add sound toggle
    const soundToggle = document.createElement('button');
    soundToggle.className = 'sound-toggle';
    soundToggle.innerHTML = '🔇';
    soundToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 80px;
        background: var(--glass-white);
        backdrop-filter: var(--glass-blur);
        border: 1px solid var(--glass-border);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        z-index: 100;
    `;
    document.body.appendChild(soundToggle);
    
    let soundEnabled = false;
    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundToggle.innerHTML = soundEnabled ? '🔊' : '🔇';
        document.body.classList.toggle('sound-enabled', soundEnabled);
    });
    
    // Play hover sound
    if (soundEnabled) {
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (soundEnabled) sounds.hover.play();
            });
        });
    }
}

// Intersection Observer Animations
function initIntersectionAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Smooth Scroll with Easing
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
}

// Exit Intent Popup
function initExitIntent() {
    let shown = false;
    
    document.addEventListener('mouseout', (e) => {
        if (!shown && e.clientY <= 0 && e.relatedTarget == null) {
            shown = true;
            
            const popup = document.createElement('div');
            popup.className = 'exit-intent-popup';
            popup.innerHTML = `
                <div class="popup-overlay"></div>
                <div class="popup-content glass">
                    <button class="popup-close">×</button>
                    <h2 class="neon-glow">Warten Sie! 🎁</h2>
                    <p>Exklusives Angebot nur für Sie:</p>
                    <h3>20% Rabatt auf alle Leistungen!</h3>
                    <div class="urgency-timer"></div>
                    <form class="popup-form">
                        <input type="email" placeholder="Ihre E-Mail für den Rabattcode" required>
                        <button type="submit" class="magnetic-button">Rabatt sichern</button>
                    </form>
                </div>
            `;
            
            popup.style.cssText = `
                position: fixed;
                inset: 0;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            document.body.appendChild(popup);
            
            // Close functionality
            popup.querySelector('.popup-close').addEventListener('click', () => popup.remove());
            popup.querySelector('.popup-overlay').addEventListener('click', () => popup.remove());
        }
    });
}

// Live Visitor Counter
function initLiveVisitorCounter() {
    const counter = document.createElement('div');
    counter.className = 'live-visitors glass';
    counter.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 1rem 2rem;
        z-index: 100;
    `;
    
    let visitors = Math.floor(Math.random() * 50) + 100;
    counter.innerHTML = `<span class="pulse">●</span> ${visitors} Besucher online`;
    document.body.appendChild(counter);
    
    // Simulate visitor changes
    setInterval(() => {
        visitors += Math.floor(Math.random() * 5) - 2;
        visitors = Math.max(80, Math.min(200, visitors));
        counter.innerHTML = `<span class="pulse">●</span> ${visitors} Besucher online`;
    }, 5000);
}

// Gamification - Achievements
function initAchievements() {
    const achievements = {
        firstScroll: { name: 'Explorer', icon: '🏆', unlocked: false },
        contactClick: { name: 'Interessiert', icon: '💎', unlocked: false },
        videoWatch: { name: 'Zuschauer', icon: '🎬', unlocked: false }
    };
    
    // Track scroll
    let scrolled = false;
    window.addEventListener('scroll', () => {
        if (!scrolled && window.scrollY > 500) {
            scrolled = true;
            unlockAchievement('firstScroll');
        }
    });
    
    // Track contact clicks
    document.querySelectorAll('a[href="#contact"]').forEach(link => {
        link.addEventListener('click', () => unlockAchievement('contactClick'));
    });
    
    function unlockAchievement(key) {
        if (!achievements[key].unlocked) {
            achievements[key].unlocked = true;
            
            const notification = document.createElement('div');
            notification.className = 'achievement';
            notification.innerHTML = `
                <div class="achievement-icon">${achievements[key].icon}</div>
                <div class="achievement-text">
                    <strong>Achievement Unlocked!</strong>
                    <p>${achievements[key].name}</p>
                </div>
            `;
            
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
        }
    }
}

// AI Chat Widget
function initAIChat() {
    const chatWidget = document.createElement('div');
    chatWidget.className = 'ai-chat-widget';
    chatWidget.innerHTML = `
        <div class="chat-bubble glass floating">
            <i class="fas fa-robot"></i>
            <span class="chat-badge">1</span>
        </div>
        <div class="chat-window glass" style="display: none;">
            <div class="chat-header">
                <h4>Three Connect AI Assistant</h4>
                <button class="chat-close">×</button>
            </div>
            <div class="chat-messages">
                <div class="message ai">
                    Hallo! 👋 Ich bin Ihr KI-Assistent. Wie kann ich Ihnen heute helfen?
                </div>
            </div>
            <form class="chat-input">
                <input type="text" placeholder="Ihre Nachricht...">
                <button type="submit">→</button>
            </form>
        </div>
    `;
    
    chatWidget.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1000;
    `;
    
    document.body.appendChild(chatWidget);
    
    const bubble = chatWidget.querySelector('.chat-bubble');
    const window = chatWidget.querySelector('.chat-window');
    
    bubble.addEventListener('click', () => {
        window.style.display = window.style.display === 'none' ? 'flex' : 'none';
        chatWidget.querySelector('.chat-badge').style.display = 'none';
    });
    
    chatWidget.querySelector('.chat-close').addEventListener('click', () => {
        window.style.display = 'none';
    });
    
    // Simple AI responses
    const responses = {
        'hallo': 'Hallo! Schön Sie zu treffen. Wie kann Three Connect Ihnen helfen?',
        'leistungen': 'Wir bieten SDR Coldcalling, Lead-Generierung, Website-Erstellung und CRM-Einrichtung an.',
        'preis': 'Unsere Preise sind maßgeschneidert. Lassen Sie uns in einem kostenlosen Beratungsgespräch über Ihre Bedürfnisse sprechen!',
        'kontakt': 'Sie erreichen uns unter kontakt@three-connect.de oder über das Kontaktformular auf der Website.'
    };
    
    chatWidget.querySelector('.chat-input').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = e.target.querySelector('input');
        const message = input.value.toLowerCase();
        
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'message user';
        userMsg.textContent = input.value;
        chatWidget.querySelector('.chat-messages').appendChild(userMsg);
        
        // AI response
        setTimeout(() => {
            const aiMsg = document.createElement('div');
            aiMsg.className = 'message ai';
            
            let response = 'Interessante Frage! Kontaktieren Sie uns für eine detaillierte Antwort.';
            Object.keys(responses).forEach(key => {
                if (message.includes(key)) {
                    response = responses[key];
                }
            });
            
            aiMsg.textContent = response;
            chatWidget.querySelector('.chat-messages').appendChild(aiMsg);
        }, 1000);
        
        input.value = '';
    });
}

// Performance Monitoring
function monitorPerformance() {
    // Log Core Web Vitals
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        }).observe({ entryTypes: ['first-input'] });
        
        // Cumulative Layout Shift
        let cls = 0;
        new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (!entry.hadRecentInput) {
                    cls += entry.value;
                    console.log('CLS:', cls);
                }
            });
        }).observe({ entryTypes: ['layout-shift'] });
    }
}

// Initialize particles background
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2;
            this.color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize on load
window.addEventListener('load', () => {
    initParticles();
});