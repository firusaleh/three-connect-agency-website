// Gradient Transitions on Scroll

document.addEventListener('DOMContentLoaded', () => {
    // Get all gradient transitions
    const gradients = document.querySelectorAll('.gradient-transition');
    
    // Create Intersection Observer for fade-in effect
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const gradientObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add pulse animation
                entry.target.classList.add('pulse');
            }
        });
    }, observerOptions);
    
    // Observe all gradients
    gradients.forEach(gradient => {
        gradientObserver.observe(gradient);
    });
    
    // Parallax effect on scroll
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateGradientParallax() {
        const scrollY = window.scrollY;
        
        gradients.forEach((gradient, index) => {
            const rect = gradient.getBoundingClientRect();
            const speed = 0.5 + (index * 0.1); // Different speeds for each gradient
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(scrollY * speed);
                gradient.style.transform = `translateY(${yPos * 0.1}px)`;
                gradient.classList.add('parallax');
            }
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateGradientParallax);
            ticking = true;
        }
    }
    
    // Throttled scroll event
    window.addEventListener('scroll', requestTick);
    
    // Dynamic gradient color change based on section
    const sections = document.querySelectorAll('section');
    const sectionColors = [
        { primary: '#667eea', secondary: '#764ba2' },
        { primary: '#f093fb', secondary: '#f5576c' },
        { primary: '#fa709a', secondary: '#fee140' },
        { primary: '#4facfe', secondary: '#00f2fe' },
        { primary: '#43e97b', secondary: '#38f9d7' }
    ];
    
    // Update gradient colors based on visible section
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionIndex = Array.from(sections).indexOf(entry.target);
                const nextGradient = gradients[sectionIndex];
                
                if (nextGradient && sectionColors[sectionIndex]) {
                    const colors = sectionColors[sectionIndex];
                    updateGradientColors(nextGradient, colors);
                }
            }
        });
    }, {
        threshold: 0.3
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Update gradient colors function
    function updateGradientColors(gradient, colors) {
        gradient.style.background = `
            linear-gradient(180deg,
                rgba(15, 23, 42, 0) 0%,
                ${hexToRgba(colors.primary, 0.15)} 25%,
                ${hexToRgba(colors.secondary, 0.1)} 50%,
                ${hexToRgba(colors.primary, 0.15)} 75%,
                rgba(15, 23, 42, 0) 100%
            )
        `;
        gradient.style.filter = 'blur(40px)';
    }
    
    // Helper function to convert hex to rgba
    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    // Add smooth transition effect
    gradients.forEach(gradient => {
        gradient.style.transition = 'all 1s ease-out';
    });
    
    // Create animated gradient waves
    function createGradientWave(gradient) {
        const wave = document.createElement('div');
        wave.className = 'gradient-wave';
        wave.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 200%;
            height: 100%;
            background: linear-gradient(90deg,
                transparent,
                rgba(99, 102, 241, 0.3),
                transparent
            );
            animation: wave-move 3s linear infinite;
        `;
        gradient.appendChild(wave);
    }
    
    // Add wave animation to each gradient
    gradients.forEach(gradient => {
        createGradientWave(gradient);
    });
    
    // CSS for wave animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes wave-move {
            0% {
                transform: translateX(-50%);
            }
            100% {
                transform: translateX(50%);
            }
        }
        
        .gradient-transition {
            overflow: hidden;
        }
        
        .gradient-wave {
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
});