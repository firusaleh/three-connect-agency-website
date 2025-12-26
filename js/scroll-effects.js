// Scroll Effects with GSAP

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Smooth scroll behavior
    const lenis = {
        raf: (time) => {
            lenis.time = time;
            lenis.update();
        },
        time: 0,
        update: () => {}
    };
    
    // Navbar scroll effect
    const navbar = document.querySelector('.nav-floating');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(30px)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Parallax for video backgrounds
    const videoBgs = document.querySelectorAll('.video-background');
    
    videoBgs.forEach(videoBg => {
        gsap.to(videoBg, {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
                trigger: videoBg.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
    
    // Fade in animations for sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionContent = section.querySelector('.container');
        if (sectionContent) {
            gsap.fromTo(sectionContent,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'top 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }
    });
    
    // Service cards stagger animation
    const serviceCards = document.querySelectorAll('.service-card-3d');
    
    gsap.fromTo(serviceCards,
        {
            opacity: 0,
            y: 100,
            rotateX: -30
        },
        {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.services-grid-3d',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        gsap.fromTo(item,
            {
                opacity: 0,
                x: index % 2 === 0 ? -100 : 100
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Process orbit animation
    const processOrbit = document.querySelector('.process-orbit');
    
    if (processOrbit) {
        gsap.to(processOrbit, {
            rotation: 360,
            duration: 30,
            repeat: -1,
            ease: 'none'
        });
    }
    
    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card-3d');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Counter animation
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.value);
        
        gsap.fromTo(counter,
            {
                textContent: 0
            },
            {
                textContent: target,
                duration: 2,
                ease: 'power1.out',
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    
    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });
    
    // Magnetic buttons effect
    const magneticButtons = document.querySelectorAll('button, .service-cta, .project-cta');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(button, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Text reveal animation
    const revealTexts = document.querySelectorAll('.section-title, .hero-title');
    
    revealTexts.forEach(text => {
        const words = text.innerHTML.split(' ').map(word => 
            `<span class="word-reveal">${word}</span>`
        ).join(' ');
        text.innerHTML = words;
        
        const wordSpans = text.querySelectorAll('.word-reveal');
        
        gsap.fromTo(wordSpans,
            {
                opacity: 0,
                y: 50,
                rotateX: -90
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: text,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = `${scrollPercentage}%`;
    });
});