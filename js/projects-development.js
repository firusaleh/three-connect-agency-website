// Projects Development Status JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Early Access Form Handler
    const earlyAccessForm = document.getElementById('earlyAccessForm');
    if (earlyAccessForm) {
        earlyAccessForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const button = this.querySelector('button');
            const originalButtonText = button.innerHTML;
            
            // Show loading state
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird gesendet...';
            button.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Success message
                button.innerHTML = '<i class="fas fa-check"></i> Erfolgreich registriert!';
                button.style.background = 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)';
                
                // Reset form
                emailInput.value = '';
                
                // Show notification
                showNotification('Vielen Dank! Sie erhalten Launch-Updates per E-Mail.');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    button.innerHTML = originalButtonText;
                    button.style.background = '';
                    button.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
    
    // Progress Bar Animation on Scroll
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    
    const animateProgressBar = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;
                
                // Reset and animate
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);
                
                // Animate percentage counter
                const percentageElement = progressBar.closest('.development-progress').querySelector('.progress-percentage');
                if (percentageElement) {
                    const targetPercentage = parseInt(percentageElement.textContent);
                    animateCounter(percentageElement, 0, targetPercentage, 1500);
                }
                
                observer.unobserve(entry.target);
            }
        });
    };
    
    const progressObserver = new IntersectionObserver(animateProgressBar, {
        threshold: 0.5
    });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
    
    // Counter Animation
    function animateCounter(element, start, end, duration) {
        const startTime = Date.now();
        const step = () => {
            const progress = Math.min((Date.now() - startTime) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + '%';
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        step();
    }
    
    // Show Notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'development-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 1rem;
            font-size: 1.4rem;
            z-index: 1000;
            animation: slideInRight 0.5s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 5000);
    }
    
    // Add animations CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Enhanced Tab Switching for Projects
    const originalTabButtons = document.querySelectorAll('.tab-button');
    originalTabButtons.forEach(button => {
        const originalClickHandler = button.onclick;
        button.onclick = function(e) {
            // Call original handler if exists
            if (originalClickHandler) {
                originalClickHandler.call(this, e);
            }
            
            // Trigger progress bar animations when switching tabs
            setTimeout(() => {
                const activeProject = document.querySelector('.project-item.active');
                if (activeProject) {
                    const progressBar = activeProject.querySelector('.progress-bar-fill');
                    if (progressBar) {
                        const targetWidth = progressBar.style.width;
                        progressBar.style.width = '0%';
                        setTimeout(() => {
                            progressBar.style.width = targetWidth;
                        }, 100);
                    }
                }
            }, 100);
        };
    });
    
    // Coming Soon Overlay Hover Effect
    const comingSoonOverlays = document.querySelectorAll('.coming-soon-overlay');
    comingSoonOverlays.forEach(overlay => {
        overlay.addEventListener('mouseenter', function() {
            this.querySelector('.coming-soon-text').style.transform = 'rotate(-15deg) scale(1.1)';
        });
        
        overlay.addEventListener('mouseleave', function() {
            this.querySelector('.coming-soon-text').style.transform = 'rotate(-15deg) scale(1)';
        });
    });
});