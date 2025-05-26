/**
 * GSAP Animation System
 * Advanced animations and interactions for 2025 design
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, DrawSVGPlugin);

class AnimationSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupHeroAnimations();
        this.setupScrollAnimations();
        this.setup3DCards();
        this.setupTextAnimations();
        this.setupCTAAnimations();
        this.setupMicroInteractions();
    }

    setupHeroAnimations() {
        // Hero section entrance animation
        const heroTimeline = gsap.timeline({
            defaults: { ease: "power4.out" }
        });

        heroTimeline
            .from(".hero-title", {
                y: 100,
                opacity: 0,
                duration: 1.2,
                scale: 0.9
            })
            .from(".hero-subtitle", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1
            }, "-=0.8")
            .from(".hero-cta", {
                scale: 0,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.5")
            .from(".hero-stats", {
                x: -50,
                opacity: 0,
                duration: 1,
                stagger: 0.2
            }, "-=0.5");

        // Floating animation for hero elements
        gsap.to(".float-element", {
            y: -20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            stagger: {
                each: 0.2,
                from: "random"
            }
        });
    }

    setupScrollAnimations() {
        // Parallax scrolling effects
        gsap.utils.toArray(".parallax-bg").forEach(bg => {
            gsap.to(bg, {
                yPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: bg,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Section reveal animations
        gsap.utils.toArray(".section-content").forEach(section => {
            gsap.from(section, {
                y: 100,
                opacity: 0,
                duration: 1.5,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "top 50%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Counter animations - disabled as hero-stats were removed
        // gsap.utils.toArray(".counter").forEach(counter => {
        //     const target = parseInt(counter.getAttribute("data-target"));
        //     
        //     ScrollTrigger.create({
        //         trigger: counter,
        //         start: "top 80%",
        //         onEnter: () => {
        //             gsap.to(counter, {
        //                 textContent: target,
        //                 duration: 2,
        //                 ease: "power2.out",
        //                 snap: { textContent: 1 },
        //                 onUpdate: function() {
        //                     counter.textContent = Math.floor(counter.textContent);
        //                 }
        //             });
        //         },
        //         once: true
        //     });
        // });
    }

    setup3DCards() {
        // 3D card tilt effect
        document.querySelectorAll(".card-3d").forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                gsap.to(card, {
                    rotationY: rotateY,
                    rotationX: rotateX,
                    transformPerspective: 1000,
                    ease: "power2.out",
                    duration: 0.3
                });
            });

            card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                    rotationY: 0,
                    rotationX: 0,
                    ease: "power2.out",
                    duration: 0.5
                });
            });
        });
    }

    setupTextAnimations() {
        // Split text animations
        gsap.utils.toArray(".split-text").forEach(text => {
            const split = new SplitText(text, { type: "chars, words" });
            
            gsap.from(split.chars, {
                opacity: 0,
                y: 50,
                rotationX: -90,
                stagger: 0.02,
                duration: 1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: text,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Typewriter effect
        gsap.utils.toArray(".typewriter").forEach(text => {
            const content = text.textContent;
            text.textContent = "";
            
            ScrollTrigger.create({
                trigger: text,
                start: "top 80%",
                onEnter: () => {
                    gsap.to(text, {
                        text: content,
                        duration: content.length * 0.05,
                        ease: "none"
                    });
                },
                once: true
            });
        });
    }

    setupCTAAnimations() {
        // Magnetic button effect
        document.querySelectorAll(".magnetic-button").forEach(button => {
            button.addEventListener("mousemove", (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(button, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(button.querySelector(".button-text"), {
                    x: x * 0.1,
                    y: y * 0.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            button.addEventListener("mouseleave", () => {
                gsap.to([button, button.querySelector(".button-text")], {
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Pulse effect on scroll
        gsap.utils.toArray(".pulse-on-scroll").forEach(element => {
            gsap.to(element, {
                scale: 1.05,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play pause resume pause"
                }
            });
        });
    }

    setupMicroInteractions() {
        // Hover sound effects (optional)
        const hoverSound = new Audio("sounds/hover.mp3");
        hoverSound.volume = 0.1;
        
        document.querySelectorAll(".interactive").forEach(element => {
            element.addEventListener("mouseenter", () => {
                // Play sound if enabled
                if (localStorage.getItem("soundEnabled") === "true") {
                    hoverSound.currentTime = 0;
                    hoverSound.play().catch(() => {});
                }
                
                // Visual feedback
                gsap.to(element, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });

            element.addEventListener("mouseleave", () => {
                gsap.to(element, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });

        // Ripple effect on click
        document.addEventListener("click", (e) => {
            if (e.target.matches(".ripple-effect, .ripple-effect *")) {
                const button = e.target.closest(".ripple-effect");
                const ripple = document.createElement("span");
                ripple.className = "ripple";
                
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + "px";
                ripple.style.left = x + "px";
                ripple.style.top = y + "px";
                
                button.appendChild(ripple);
                
                gsap.to(ripple, {
                    scale: 2,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    onComplete: () => ripple.remove()
                });
            }
        });
    }

    // Scroll-based color theme changes
    setupDynamicTheme() {
        const sections = gsap.utils.toArray(".themed-section");
        
        sections.forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: "top center",
                end: "bottom center",
                onEnter: () => this.updateTheme(section.dataset.theme),
                onEnterBack: () => this.updateTheme(section.dataset.theme)
            });
        });
    }

    updateTheme(theme) {
        const root = document.documentElement;
        const themes = {
            light: {
                "--neu-bg": "#e0e5ec",
                "--text-primary": "#2d3748"
            },
            dark: {
                "--neu-bg": "#1a1a2e",
                "--text-primary": "#f7fafc"
            },
            gradient: {
                "--neu-bg": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "--text-primary": "#ffffff"
            }
        };

        if (themes[theme]) {
            Object.entries(themes[theme]).forEach(([property, value]) => {
                gsap.to(root, {
                    [property]: value,
                    duration: 0.5,
                    ease: "power2.inOut"
                });
            });
        }
    }
}

// Initialize animations when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    // Load GSAP from CDN
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    script.onload = () => {
        // Load ScrollTrigger
        const scrollTriggerScript = document.createElement("script");
        scrollTriggerScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
        scrollTriggerScript.onload = () => {
            window.animationSystem = new AnimationSystem();
        };
        document.head.appendChild(scrollTriggerScript);
    };
    document.head.appendChild(script);
});