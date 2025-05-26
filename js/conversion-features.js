// Conversion Features - Social Proof, Exit Intent, Countdown Timer

// Social Proof Notifications
class SocialProof {
    constructor() {
        this.container = document.getElementById('socialProof');
        if (!this.container) return;
        
        this.notifications = [
            {
                name: 'Michael K.',
                location: 'Berlin',
                action: 'hat gerade eine Beratung gebucht',
                time: 'vor 2 Minuten'
            },
            {
                name: 'Sarah M.',
                location: 'München',
                action: 'nutzt unsere Lead-Generierung',
                time: 'vor 5 Minuten'
            },
            {
                name: 'Thomas B.',
                location: 'Hamburg',
                action: 'hat 45% mehr Umsatz generiert',
                time: 'vor 8 Minuten'
            },
            {
                name: 'Lisa W.',
                location: 'Frankfurt',
                action: 'empfiehlt Three Connect',
                time: 'vor 12 Minuten'
            },
            {
                name: 'Andreas H.',
                location: 'Köln',
                action: 'hat MoveMaster Early Access',
                time: 'vor 15 Minuten'
            }
        ];
        
        this.currentIndex = 0;
        this.init();
    }
    
    init() {
        // Show first notification after delay
        setTimeout(() => {
            this.showNotification();
        }, 5000);
    }
    
    showNotification() {
        const notification = this.notifications[this.currentIndex];
        
        const notificationEl = document.createElement('div');
        notificationEl.className = 'social-proof-notification';
        notificationEl.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="notification-text">
                    <strong>${notification.name}</strong> aus ${notification.location}<br>
                    ${notification.action}
                </div>
                <div class="notification-time">${notification.time}</div>
            </div>
        `;
        
        this.container.appendChild(notificationEl);
        
        // Animate in
        setTimeout(() => {
            notificationEl.classList.add('show');
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notificationEl.classList.remove('show');
            setTimeout(() => {
                notificationEl.remove();
            }, 300);
        }, 5000);
        
        // Show next notification
        this.currentIndex = (this.currentIndex + 1) % this.notifications.length;
        setTimeout(() => {
            this.showNotification();
        }, 15000); // Every 15 seconds
    }
}

// Exit Intent Popup
class ExitIntent {
    constructor() {
        this.popup = document.getElementById('exitPopup');
        this.closeBtn = document.getElementById('closePopup');
        if (!this.popup || !this.closeBtn) return;
        
        this.shown = false;
        this.init();
    }
    
    init() {
        // Desktop exit intent
        document.addEventListener('mouseout', (e) => {
            if (!this.shown && e.clientY <= 0 && e.relatedTarget == null) {
                this.showPopup();
            }
        });
        
        // Mobile exit intent (scroll up quickly)
        let lastScrollTop = 0;
        let scrollVelocity = 0;
        
        window.addEventListener('scroll', () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            scrollVelocity = lastScrollTop - st;
            
            if (!this.shown && scrollVelocity > 50 && st < 500) {
                this.showPopup();
            }
            
            lastScrollTop = st <= 0 ? 0 : st;
        });
        
        // Close button
        this.closeBtn.addEventListener('click', () => {
            this.hidePopup();
        });
        
        // Close on outside click
        this.popup.addEventListener('click', (e) => {
            if (e.target === this.popup) {
                this.hidePopup();
            }
        });
        
        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.popup.classList.contains('show')) {
                this.hidePopup();
            }
        });
    }
    
    showPopup() {
        this.shown = true;
        this.popup.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Start countdown timer
        this.startCountdown();
    }
    
    hidePopup() {
        this.popup.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    startCountdown() {
        const timerEl = document.getElementById('timerValue');
        if (!timerEl) return;
        
        let timeLeft = 300; // 5 minutes in seconds
        
        const updateTimer = () => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft > 0) {
                timeLeft--;
                setTimeout(updateTimer, 1000);
            } else {
                timerEl.textContent = 'Abgelaufen!';
                setTimeout(() => {
                    this.hidePopup();
                }, 2000);
            }
        };
        
        updateTimer();
    }
}

// Floating CTA with Pulse
class FloatingCTA {
    constructor() {
        this.cta = document.getElementById('floatingCTA');
        if (!this.cta) return;
        
        this.init();
    }
    
    init() {
        // Show/hide based on scroll
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 300) {
                this.cta.classList.add('show');
            } else {
                this.cta.classList.remove('show');
            }
            
            // Hide when scrolling down, show when scrolling up
            if (currentScroll > lastScroll && currentScroll > 500) {
                this.cta.classList.add('hide');
            } else {
                this.cta.classList.remove('hide');
            }
            
            lastScroll = currentScroll;
        });
    }
}

// Live Visitor Counter Updates
class VisitorCounter {
    constructor() {
        this.counter = document.getElementById('visitorCount');
        if (!this.counter) return;
        
        this.currentCount = parseInt(this.counter.textContent);
        this.init();
    }
    
    init() {
        // Simulate visitor fluctuations
        setInterval(() => {
            const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
            this.currentCount = Math.max(50, this.currentCount + change); // Min 50 visitors
            this.animateCounter(this.currentCount);
        }, 5000);
    }
    
    animateCounter(target) {
        const current = parseInt(this.counter.textContent);
        const increment = target > current ? 1 : -1;
        const duration = 1000; // 1 second
        const steps = Math.abs(target - current);
        const stepDuration = duration / steps;
        
        let count = current;
        const timer = setInterval(() => {
            count += increment;
            this.counter.textContent = count;
            
            if (count === target) {
                clearInterval(timer);
            }
        }, stepDuration);
    }
}

// Progress Bar on Forms
class FormProgress {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }
    
    init() {
        this.forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            const progressBar = document.createElement('div');
            progressBar.className = 'form-progress-bar';
            progressBar.innerHTML = '<div class="progress-fill"></div>';
            form.insertBefore(progressBar, form.firstChild);
            
            const updateProgress = () => {
                let filled = 0;
                inputs.forEach(input => {
                    if (input.type === 'checkbox') {
                        if (input.checked) filled++;
                    } else if (input.value.trim()) {
                        filled++;
                    }
                });
                
                const percentage = (filled / inputs.length) * 100;
                progressBar.querySelector('.progress-fill').style.width = `${percentage}%`;
            };
            
            inputs.forEach(input => {
                input.addEventListener('input', updateProgress);
                input.addEventListener('change', updateProgress);
            });
        });
    }
}

// Urgency Timer for Offers
class UrgencyTimer {
    constructor() {
        this.timers = document.querySelectorAll('.urgency-timer');
        this.init();
    }
    
    init() {
        this.timers.forEach(timer => {
            const endTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours from now
            
            const updateTimer = () => {
                const now = new Date().getTime();
                const distance = endTime - now;
                
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                timer.innerHTML = `
                    <span class="timer-block">${hours.toString().padStart(2, '0')}<small>Std</small></span>
                    <span class="timer-separator">:</span>
                    <span class="timer-block">${minutes.toString().padStart(2, '0')}<small>Min</small></span>
                    <span class="timer-separator">:</span>
                    <span class="timer-block">${seconds.toString().padStart(2, '0')}<small>Sek</small></span>
                `;
                
                if (distance > 0) {
                    setTimeout(updateTimer, 1000);
                }
            };
            
            updateTimer();
        });
    }
}

// CSS Styles for Conversion Features
const conversionStyles = `
    /* Social Proof Notifications */
    .social-proof {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1000;
    }
    
    .social-proof-notification {
        background: rgba(26, 26, 26, 0.95);
        border: 1px solid var(--neon-cyan);
        border-radius: 10px;
        padding: 15px;
        margin-bottom: 15px;
        max-width: 350px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        backdrop-filter: blur(10px);
    }
    
    .social-proof-notification.show {
        transform: translateX(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .notification-icon {
        color: var(--neon-cyan);
        font-size: 24px;
    }
    
    .notification-text {
        flex: 1;
        font-size: 14px;
        line-height: 1.4;
    }
    
    .notification-time {
        font-size: 12px;
        color: var(--text-muted);
    }
    
    /* Exit Intent Popup */
    .exit-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 10, 10, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .exit-popup.show {
        opacity: 1;
        visibility: visible;
    }
    
    .popup-content {
        max-width: 500px;
        padding: 40px;
        text-align: center;
        position: relative;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }
    
    .exit-popup.show .popup-content {
        transform: scale(1);
    }
    
    .popup-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 30px;
        cursor: pointer;
        transition: color 0.3s ease;
    }
    
    .popup-close:hover {
        color: var(--neon-cyan);
    }
    
    .countdown-timer {
        margin: 20px 0;
        font-size: 24px;
        color: var(--neon-cyan);
    }
    
    /* Floating CTA */
    .floating-cta {
        position: fixed;
        bottom: 100px;
        right: 30px;
        transform: translateX(200px);
        transition: transform 0.3s ease;
        z-index: 999;
    }
    
    .floating-cta.show {
        transform: translateX(0);
    }
    
    .floating-cta.hide {
        transform: translateY(200px);
    }
    
    .floating-button {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 15px 25px;
        background: var(--gradient-neon);
        color: var(--cyber-black);
        text-decoration: none;
        border-radius: 50px;
        font-weight: 600;
        box-shadow: 0 5px 25px rgba(0, 255, 255, 0.3);
        transition: all 0.3s ease;
    }
    
    .floating-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 35px rgba(0, 255, 255, 0.5);
    }
    
    /* Form Progress Bar */
    .form-progress-bar {
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
        margin-bottom: 20px;
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        background: var(--gradient-neon);
        width: 0;
        transition: width 0.3s ease;
    }
    
    /* Cookie Banner */
    .cookie-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(26, 26, 26, 0.98);
        border-top: 1px solid var(--neon-cyan);
        padding: 20px;
        transform: translateY(100%);
        transition: transform 0.3s ease;
        z-index: 1000;
        backdrop-filter: blur(10px);
    }
    
    .cookie-banner.show {
        transform: translateY(0);
    }
    
    .cookie-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
    }
    
    .cookie-actions {
        display: flex;
        gap: 10px;
    }
    
    @media (max-width: 768px) {
        .social-proof-notification {
            max-width: calc(100vw - 60px);
        }
        
        .cookie-content {
            flex-direction: column;
            text-align: center;
        }
        
        .floating-cta {
            bottom: 80px;
            right: 20px;
        }
    }
`;

// Add styles
const styleEl = document.createElement('style');
styleEl.textContent = conversionStyles;
document.head.appendChild(styleEl);

// Initialize all conversion features
document.addEventListener('DOMContentLoaded', () => {
    new SocialProof();
    new ExitIntent();
    new FloatingCTA();
    new VisitorCounter();
    new FormProgress();
    new UrgencyTimer();
});