// Three.js 3D Animations and Effects

let scene, camera, renderer;
let particlesGeometry, particlesMaterial, particlesSystem;
let cube, cubeWireframe;
let mouseX = 0, mouseY = 0;

// Initialize Three.js
function initThree() {
    // Scene Setup
    scene = new THREE.Scene();
    
    // Camera Setup
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;
    
    // Renderer Setup
    renderer = new THREE.WebGLRenderer({
        canvas: document.createElement('canvas'),
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Add canvas to container
    const container = document.getElementById('three-canvas');
    if (container) {
        container.appendChild(renderer.domElement);
    }
    
    // Create Particle System
    createParticleSystem();
    
    // Create Rotating Cube
    createRotatingCube();
    
    // Create Background Particles
    createBackgroundParticles();
    
    // Mouse Movement Listener
    document.addEventListener('mousemove', onMouseMove);
    
    // Window Resize Handler
    window.addEventListener('resize', onWindowResize);
    
    // Start Animation Loop
    animate();
}

// Create Particle System
function createParticleSystem() {
    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        // Random positions
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;
        
        // Random colors (purple to blue gradient)
        colors[i] = Math.random() * 0.5 + 0.5; // R
        colors[i + 1] = Math.random() * 0.3 + 0.3; // G
        colors[i + 2] = Math.random() * 0.5 + 0.5; // B
    }
    
    particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8
    });
    
    particlesSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesSystem);
}

// Create Rotating Cube for Hero Section
function createRotatingCube() {
    const cubeContainer = document.getElementById('rotating-cube');
    if (!cubeContainer) return;
    
    const cubeScene = new THREE.Scene();
    const cubeCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    cubeCamera.position.z = 3;
    
    const cubeRenderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    cubeRenderer.setSize(400, 400);
    cubeContainer.appendChild(cubeRenderer.domElement);
    
    // Create Cube with Wireframe
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshBasicMaterial({
        color: 0x667eea,
        transparent: true,
        opacity: 0.1
    });
    
    cube = new THREE.Mesh(geometry, material);
    cubeScene.add(cube);
    
    // Add Wireframe
    const wireframeGeometry = new THREE.EdgesGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
        color: 0x667eea,
        linewidth: 2
    });
    cubeWireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    cubeScene.add(cubeWireframe);
    
    // Add Glow Effect
    const glowGeometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x667eea,
        transparent: true,
        opacity: 0.05
    });
    const glowCube = new THREE.Mesh(glowGeometry, glowMaterial);
    cubeScene.add(glowCube);
    
    // Animate Cube
    function animateCube() {
        requestAnimationFrame(animateCube);
        
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
        cubeWireframe.rotation.x += 0.005;
        cubeWireframe.rotation.y += 0.005;
        glowCube.rotation.x -= 0.003;
        glowCube.rotation.y -= 0.003;
        
        cubeRenderer.render(cubeScene, cubeCamera);
    }
    
    animateCube();
}

// Create Background Particles for Sections
function createBackgroundParticles() {
    const particleContainers = document.querySelectorAll('.particles-3d');
    
    particleContainers.forEach(container => {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'bg-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: radial-gradient(circle, rgba(99,102,241,0.8) 0%, transparent 70%);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            `;
            container.appendChild(particle);
        }
    });
}

// Mouse Movement Handler
function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Window Resize Handler
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate Particles
    if (particlesSystem) {
        particlesSystem.rotation.x += 0.0005;
        particlesSystem.rotation.y += 0.0005;
        
        // Mouse interaction
        particlesSystem.rotation.x += mouseY * 0.001;
        particlesSystem.rotation.y += mouseX * 0.001;
    }
    
    // Render Scene
    renderer.render(scene, camera);
}

// Create 3D Service Card Tilt Effect
function initServiceCardTilt() {
    const cards = document.querySelectorAll('[data-tilt]');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.05)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Create Floating Animation for Elements
function createFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach((element, index) => {
        const delay = index * 0.2;
        element.style.animation = `float ${6 + Math.random() * 2}s ease-in-out ${delay}s infinite`;
    });
}

// CSS Animation for Floating Particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initThree();
    initServiceCardTilt();
    createFloatingElements();
});