// Custom Cursor & Mouse Trail Effect

class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('cursor');
        if (!this.cursor) return;
        
        this.cursorInner = this.cursor.querySelector('.cursor-inner');
        this.cursorOuter = this.cursor.querySelector('.cursor-outer');
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.innerX = 0;
        this.innerY = 0;
        this.outerX = 0;
        this.outerY = 0;
        
        this.init();
    }
    
    init() {
        // Hide default cursor
        document.body.style.cursor = 'none';
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        // Handle hover states
        this.addHoverEffects();
        
        // Start animation
        this.animate();
    }
    
    addHoverEffects() {
        // Links and buttons
        const interactiveElements = document.querySelectorAll('a, button, [data-cursor="pointer"]');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
            });
        });
        
        // Text elements
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span');
        
        textElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-text');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-text');
            });
        });
    }
    
    animate() {
        // Smooth follow for inner cursor
        this.innerX += (this.mouseX - this.innerX) * 0.15;
        this.innerY += (this.mouseY - this.innerY) * 0.15;
        
        // Slower follow for outer cursor
        this.outerX += (this.mouseX - this.outerX) * 0.08;
        this.outerY += (this.mouseY - this.outerY) * 0.08;
        
        // Apply transforms
        this.cursorInner.style.transform = `translate(${this.innerX - 5}px, ${this.innerY - 5}px)`;
        this.cursorOuter.style.transform = `translate(${this.outerX - 20}px, ${this.outerY - 20}px)`;
        
        requestAnimationFrame(() => this.animate());
    }
}

// Mouse Trail Effect
class MouseTrail {
    constructor() {
        this.canvas = document.getElementById('mouseTrail');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        this.trail = [];
        this.maxTrailSize = 30;
        this.mouseX = 0;
        this.mouseY = 0;
        this.hue = 180; // Starting color (cyan)
        
        this.init();
    }
    
    init() {
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Add point to trail
            this.trail.push({
                x: this.mouseX,
                y: this.mouseY,
                hue: this.hue
            });
            
            // Limit trail length
            if (this.trail.length > this.maxTrailSize) {
                this.trail.shift();
            }
            
            // Cycle through colors
            this.hue = (this.hue + 1) % 360;
        });
        
        // Handle resize
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        });
        
        // Start animation
        this.animate();
    }
    
    animate() {
        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw trail
        for (let i = 0; i < this.trail.length; i++) {
            const point = this.trail[i];
            const nextPoint = this.trail[i + 1];
            
            if (!nextPoint) continue;
            
            // Calculate line properties
            const opacity = i / this.trail.length;
            const width = (i / this.trail.length) * 3;
            
            // Draw line segment
            this.ctx.beginPath();
            this.ctx.moveTo(point.x, point.y);
            this.ctx.lineTo(nextPoint.x, nextPoint.y);
            this.ctx.strokeStyle = `hsla(${point.hue}, 100%, 50%, ${opacity})`;
            this.ctx.lineWidth = width;
            this.ctx.lineCap = 'round';
            this.ctx.stroke();
            
            // Add glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = `hsla(${point.hue}, 100%, 50%, ${opacity})`;
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// CSS for cursor
const cursorStyles = `
    .custom-cursor {
        position: fixed;
        pointer-events: none;
        z-index: 10001;
        mix-blend-mode: difference;
    }
    
    .cursor-inner {
        position: absolute;
        width: 10px;
        height: 10px;
        background: var(--neon-cyan);
        border-radius: 50%;
        transition: width 0.2s, height 0.2s, background 0.2s;
    }
    
    .cursor-outer {
        position: absolute;
        width: 40px;
        height: 40px;
        border: 2px solid var(--neon-cyan);
        border-radius: 50%;
        transition: all 0.15s;
    }
    
    .cursor-hover .cursor-inner {
        width: 20px;
        height: 20px;
        background: var(--neon-magenta);
    }
    
    .cursor-hover .cursor-outer {
        width: 60px;
        height: 60px;
        border-color: var(--neon-magenta);
    }
    
    .cursor-text .cursor-inner {
        width: 3px;
        height: 30px;
        border-radius: 2px;
        background: var(--neon-purple);
    }
    
    .cursor-text .cursor-outer {
        width: 50px;
        height: 50px;
        border-color: var(--neon-purple);
    }
    
    .mouse-trail {
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 9999;
    }
    
    @media (max-width: 768px) {
        .custom-cursor,
        .mouse-trail {
            display: none;
        }
        
        body {
            cursor: auto !important;
        }
    }
`;

// Add styles
const styleElement = document.createElement('style');
styleElement.textContent = cursorStyles;
document.head.appendChild(styleElement);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on desktop
    if (window.innerWidth > 768) {
        new CustomCursor();
        new MouseTrail();
    }
});