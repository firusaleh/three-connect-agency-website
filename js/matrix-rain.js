// Matrix Rain Effect

class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrixRain');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        // Matrix characters
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.charArray = this.chars.split('');
        
        // Settings
        this.fontSize = 14;
        this.columns = this.width / this.fontSize;
        this.drops = [];
        
        // Initialize drops
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
        
        // Colors
        this.colors = [
            'rgba(0, 255, 255, 0.8)',    // Cyan
            'rgba(255, 0, 255, 0.8)',    // Magenta
            'rgba(168, 85, 247, 0.8)',   // Purple
            'rgba(0, 255, 65, 0.8)'      // Matrix Green
        ];
        
        // Start animation
        this.animate();
        
        // Handle resize
        window.addEventListener('resize', () => this.handleResize());
    }
    
    handleResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.columns = this.width / this.fontSize;
        
        // Reinitialize drops
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }
    
    draw() {
        // Semi-transparent black background for trail effect
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Set font
        this.ctx.font = this.fontSize + 'px monospace';
        
        // Draw characters
        for (let i = 0; i < this.drops.length; i++) {
            // Random character
            const char = this.charArray[Math.floor(Math.random() * this.charArray.length)];
            
            // Random color from palette
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            this.ctx.fillStyle = color;
            
            // Draw character
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);
            
            // Add glow effect for some characters
            if (Math.random() > 0.95) {
                this.ctx.shadowBlur = 20;
                this.ctx.shadowColor = color;
                this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);
                this.ctx.shadowBlur = 0;
            }
            
            // Reset drop when it reaches bottom
            if (this.drops[i] * this.fontSize > this.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            // Move drop down
            this.drops[i]++;
        }
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize Matrix Rain
document.addEventListener('DOMContentLoaded', () => {
    new MatrixRain();
});

// Alternative Particle Rain for Hero Section
class HeroParticles {
    constructor() {
        this.container = document.getElementById('heroParticles');
        if (!this.container) return;
        
        this.particles = [];
        this.particleCount = 50;
        
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 20;
        const startX = Math.random() * 100;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${this.getRandomColor()};
            border-radius: 50%;
            left: ${startX}%;
            top: -10px;
            opacity: ${Math.random() * 0.8 + 0.2};
            box-shadow: 0 0 ${size * 2}px currentColor;
            animation: particle-fall ${duration}s ${delay}s linear infinite;
        `;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }
    
    getRandomColor() {
        const colors = [
            'var(--neon-cyan)',
            'var(--neon-magenta)',
            'var(--neon-purple)',
            'var(--matrix-green)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

// CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particle-fall {
        to {
            transform: translateY(110vh) rotate(360deg);
        }
    }
    
    .hero-particle {
        pointer-events: none;
        z-index: 1;
    }
`;
document.head.appendChild(style);

// Initialize Hero Particles
document.addEventListener('DOMContentLoaded', () => {
    new HeroParticles();
});