// Projects Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (tabButtons.length === 0 || projectItems.length === 0) return;
    
    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetProject = this.getAttribute('data-project');
            
            // Update active states for buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Update active states for project items
            projectItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Show the selected project
            const targetElement = document.getElementById(targetProject + '-project');
            if (targetElement) {
                targetElement.classList.add('active');
                
                // Trigger animation
                targetElement.style.animation = 'none';
                targetElement.offsetHeight; // Trigger reflow
                targetElement.style.animation = 'fadeInUp 0.8s ease';
            }
        });
    });
    
    // Interactive demo elements
    const matchItems = document.querySelectorAll('.match-item');
    const movingItems = document.querySelectorAll('.moving-item');
    const demoButtons = document.querySelectorAll('.demo-button');
    
    // Add hover effects to match items
    matchItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add hover effects to moving items
    movingItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Demo button interactions
    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'translateY(-3px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 100);
        });
    });
    
    // Device mockup 3D effect on mouse move
    const deviceMockups = document.querySelectorAll('.device-mockup');
    
    deviceMockups.forEach(mockup => {
        mockup.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        mockup.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // Animate numbers on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const animateValue = (element, start, end, duration) => {
        const startTimestamp = Date.now();
        const step = () => {
            const progress = Math.min((Date.now() - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            if (element.textContent.includes('%')) {
                element.textContent = value + '%';
            } else if (element.textContent.includes('+')) {
                element.textContent = value + '+';
            } else {
                element.textContent = value;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        step();
    };
    
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                const element = entry.target;
                element.setAttribute('data-animated', 'true');
                
                const text = element.textContent;
                let endValue = parseInt(text.replace(/[^0-9]/g, ''));
                
                if (text.includes('.')) {
                    endValue = parseFloat(text) * 1000;
                }
                
                animateValue(element, 0, endValue, 2000);
            }
        });
    }, observerOptions);
    
    // Observe all result values and match percentages
    document.querySelectorAll('.result-value, .match-percentage').forEach(el => {
        numberObserver.observe(el);
    });
});