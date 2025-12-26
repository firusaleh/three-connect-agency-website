// Advanced Three.js 3D Animations

let scene, camera, renderer;
let dnaHelix, morphingSpheres = [];
let floatingIslands = [];
let liquidSphere;
let waveGeometry, waveMesh;
let time = 0;
let mouseX = 0, mouseY = 0;

// Initialize Three.js with new effects
function initThreeAdvanced() {
    // Scene Setup with fog
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0f172a, 0.002);
    
    // Camera Setup
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 50);
    
    // Renderer Setup with better quality
    renderer = new THREE.WebGLRenderer({
        canvas: document.createElement('canvas'),
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Add canvas to container
    const container = document.getElementById('three-canvas');
    if (container) {
        container.appendChild(renderer.domElement);
    }
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x667eea, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x764ba2, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    // Create DNA Helix for Hero Section
    createDNAHelix();
    
    // Create Morphing Spheres
    createMorphingSpheres();
    
    // Create Wave Pattern
    createWavePattern();
    
    // Create Floating Islands
    createFloatingIslands();
    
    // Create Liquid Metal Sphere
    createLiquidMetalSphere();
    
    // Mouse Movement Listener
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', onMouseClick);
    
    // Window Resize Handler
    window.addEventListener('resize', onWindowResize);
    
    // Start Animation Loop
    animateAdvanced();
}

// Create DNA Helix
function createDNAHelix() {
    const helixContainer = document.getElementById('rotating-cube');
    if (!helixContainer) return;
    
    const helixScene = new THREE.Scene();
    const helixCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    helixCamera.position.z = 30;
    
    const helixRenderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    helixRenderer.setSize(400, 400);
    helixContainer.appendChild(helixRenderer.domElement);
    
    // DNA Helix Group
    const helixGroup = new THREE.Group();
    
    // Create double helix
    const helixCurve1 = [];
    const helixCurve2 = [];
    const connectors = [];
    
    for (let i = 0; i < 50; i++) {
        const t = i / 10;
        
        // First strand
        const x1 = Math.sin(t) * 5;
        const y1 = (i - 25) * 0.5;
        const z1 = Math.cos(t) * 5;
        
        // Second strand
        const x2 = Math.sin(t + Math.PI) * 5;
        const y2 = (i - 25) * 0.5;
        const z2 = Math.cos(t + Math.PI) * 5;
        
        // Create spheres for strands
        const sphereGeometry = new THREE.SphereGeometry(0.3, 8, 8);
        const material1 = new THREE.MeshPhongMaterial({
            color: 0x667eea,
            emissive: 0x667eea,
            emissiveIntensity: 0.5
        });
        const material2 = new THREE.MeshPhongMaterial({
            color: 0x764ba2,
            emissive: 0x764ba2,
            emissiveIntensity: 0.5
        });
        
        const sphere1 = new THREE.Mesh(sphereGeometry, material1);
        sphere1.position.set(x1, y1, z1);
        helixGroup.add(sphere1);
        
        const sphere2 = new THREE.Mesh(sphereGeometry, material2);
        sphere2.position.set(x2, y2, z2);
        helixGroup.add(sphere2);
        
        // Create connectors every 3 points
        if (i % 3 === 0) {
            const connectorGeometry = new THREE.CylinderGeometry(0.1, 0.1, 10, 8);
            const connectorMaterial = new THREE.MeshPhongMaterial({
                color: 0xa855f7,
                emissive: 0xa855f7,
                emissiveIntensity: 0.3,
                transparent: true,
                opacity: 0.6
            });
            
            const connector = new THREE.Mesh(connectorGeometry, connectorMaterial);
            connector.position.set((x1 + x2) / 2, y1, (z1 + z2) / 2);
            connector.lookAt(new THREE.Vector3(x2, y2, z2));
            connector.rotateX(Math.PI / 2);
            helixGroup.add(connector);
        }
    }
    
    helixScene.add(helixGroup);
    
    // Add lighting to helix scene
    const helixLight = new THREE.PointLight(0xffffff, 1, 100);
    helixLight.position.set(10, 0, 10);
    helixScene.add(helixLight);
    
    const ambientHelixLight = new THREE.AmbientLight(0x404040);
    helixScene.add(ambientHelixLight);
    
    // Animate DNA Helix
    function animateHelix() {
        requestAnimationFrame(animateHelix);
        
        helixGroup.rotation.y += 0.01;
        helixGroup.position.y = Math.sin(Date.now() * 0.001) * 2;
        
        helixRenderer.render(helixScene, helixCamera);
    }
    
    animateHelix();
}

// Create Morphing Spheres
function createMorphingSpheres() {
    const geometry = new THREE.IcosahedronGeometry(3, 4);
    
    for (let i = 0; i < 5; i++) {
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(0.6 + i * 0.1, 0.7, 0.5),
            wireframe: Math.random() > 0.5,
            transparent: true,
            opacity: 0.8,
            emissive: new THREE.Color().setHSL(0.6 + i * 0.1, 0.7, 0.3),
            emissiveIntensity: 0.5
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30
        );
        sphere.scale.set(
            Math.random() * 0.5 + 0.5,
            Math.random() * 0.5 + 0.5,
            Math.random() * 0.5 + 0.5
        );
        
        sphere.userData = {
            originalPosition: sphere.position.clone(),
            speed: Math.random() * 0.02 + 0.01,
            amplitude: Math.random() * 5 + 2,
            morphSpeed: Math.random() * 0.001 + 0.001
        };
        
        morphingSpheres.push(sphere);
        scene.add(sphere);
    }
}

// Create Wave Pattern
function createWavePattern() {
    const width = 100;
    const height = 100;
    const segments = 50;
    
    waveGeometry = new THREE.PlaneGeometry(width, height, segments, segments);
    
    const material = new THREE.MeshPhongMaterial({
        color: 0x667eea,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
        emissive: 0x667eea,
        emissiveIntensity: 0.2,
        side: THREE.DoubleSide
    });
    
    waveMesh = new THREE.Mesh(waveGeometry, material);
    waveMesh.rotation.x = -Math.PI / 2;
    waveMesh.position.y = -20;
    scene.add(waveMesh);
}

// Create Floating Islands
function createFloatingIslands() {
    const islandGroup = new THREE.Group();
    
    for (let i = 0; i < 8; i++) {
        // Create island base (irregular shape)
        const islandGeometry = new THREE.ConeGeometry(
            Math.random() * 3 + 2,  // radius
            Math.random() * 4 + 2,  // height
            6 + Math.floor(Math.random() * 4),  // segments
            1,
            false,
            0,
            Math.PI * 2
        );
        
        // Deform the island for more organic look
        const vertices = islandGeometry.attributes.position;
        for (let j = 0; j < vertices.count; j++) {
            const x = vertices.getX(j);
            const y = vertices.getY(j);
            const z = vertices.getZ(j);
            
            vertices.setX(j, x + (Math.random() - 0.5) * 0.5);
            vertices.setZ(j, z + (Math.random() - 0.5) * 0.5);
        }
        
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(0.75, 0.5, 0.3),
            flatShading: true,
            emissive: 0x764ba2,
            emissiveIntensity: 0.1
        });
        
        const island = new THREE.Mesh(islandGeometry, material);
        island.position.set(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 50 - 20
        );
        island.rotation.z = Math.PI;
        island.castShadow = true;
        island.receiveShadow = true;
        
        // Add some crystals on top
        const crystalGeometry = new THREE.OctahedronGeometry(0.5, 0);
        const crystalMaterial = new THREE.MeshPhongMaterial({
            color: 0x667eea,
            emissive: 0x667eea,
            emissiveIntensity: 0.8,
            transparent: true,
            opacity: 0.8
        });
        
        for (let j = 0; j < 3; j++) {
            const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
            crystal.position.set(
                island.position.x + (Math.random() - 0.5) * 2,
                island.position.y + 2,
                island.position.z + (Math.random() - 0.5) * 2
            );
            crystal.scale.y = Math.random() * 2 + 1;
            islandGroup.add(crystal);
        }
        
        island.userData = {
            floatSpeed: Math.random() * 0.001 + 0.001,
            floatAmplitude: Math.random() * 2 + 1,
            rotationSpeed: Math.random() * 0.001 - 0.0005
        };
        
        floatingIslands.push(island);
        islandGroup.add(island);
    }
    
    scene.add(islandGroup);
}

// Create Liquid Metal Sphere for interactive effect
function createLiquidMetalSphere() {
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    
    // Custom shader material for liquid metal effect
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            mouse: { value: new THREE.Vector2(0, 0) }
        },
        vertexShader: `
            varying vec2 vUv;
            varying vec3 vNormal;
            uniform float time;
            uniform vec2 mouse;
            
            void main() {
                vUv = uv;
                vNormal = normal;
                
                vec3 pos = position;
                float dist = length(mouse);
                float influence = 1.0 / (1.0 + dist * 0.1);
                
                pos += normal * sin(time * 2.0 + position.y * 2.0) * 0.3 * influence;
                pos += normal * cos(time * 3.0 + position.x * 2.0) * 0.2 * influence;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            varying vec2 vUv;
            varying vec3 vNormal;
            uniform float time;
            
            void main() {
                vec3 color1 = vec3(0.4, 0.5, 0.9);
                vec3 color2 = vec3(0.6, 0.3, 0.8);
                
                float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                vec3 color = mix(color1, color2, fresnel);
                
                color += vec3(0.2) * sin(time * 5.0 + vUv.y * 10.0);
                
                gl_FragColor = vec4(color, 0.9);
            }
        `,
        transparent: true,
        wireframe: false
    });
    
    liquidSphere = new THREE.Mesh(geometry, material);
    liquidSphere.position.set(0, 0, -10);
    scene.add(liquidSphere);
}

// Create 3D Text Effect
function create3DText(text, position) {
    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function(font) {
        const textGeometry = new THREE.TextGeometry(text, {
            font: font,
            size: 2,
            height: 0.5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelOffset: 0,
            bevelSegments: 5
        });
        
        const textMaterial = new THREE.MeshPhongMaterial({
            color: 0x667eea,
            emissive: 0x667eea,
            emissiveIntensity: 0.3
        });
        
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.copy(position);
        scene.add(textMesh);
    });
}

// Mouse Movement Handler
function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update liquid sphere uniform
    if (liquidSphere) {
        liquidSphere.material.uniforms.mouse.value.set(mouseX, mouseY);
    }
}

// Mouse Click Handler for ripple effect
function onMouseClick(event) {
    // Create ripple effect at click position
    const rippleGeometry = new THREE.RingGeometry(0.1, 1, 32);
    const rippleMaterial = new THREE.MeshBasicMaterial({
        color: 0x667eea,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
    });
    
    const ripple = new THREE.Mesh(rippleGeometry, rippleMaterial);
    ripple.position.set(mouseX * 20, mouseY * 20, 0);
    scene.add(ripple);
    
    // Animate ripple
    const animateRipple = () => {
        ripple.scale.x += 0.5;
        ripple.scale.y += 0.5;
        ripple.material.opacity -= 0.02;
        
        if (ripple.material.opacity > 0) {
            requestAnimationFrame(animateRipple);
        } else {
            scene.remove(ripple);
        }
    };
    animateRipple();
}

// Window Resize Handler
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation Loop
function animateAdvanced() {
    requestAnimationFrame(animateAdvanced);
    
    time += 0.01;
    
    // Update liquid sphere
    if (liquidSphere) {
        liquidSphere.material.uniforms.time.value = time;
        liquidSphere.rotation.x += 0.005;
        liquidSphere.rotation.y += 0.005;
    }
    
    // Animate morphing spheres
    morphingSpheres.forEach((sphere, index) => {
        const userData = sphere.userData;
        
        // Floating motion
        sphere.position.x = userData.originalPosition.x + Math.sin(time * userData.speed) * userData.amplitude;
        sphere.position.y = userData.originalPosition.y + Math.cos(time * userData.speed * 1.5) * userData.amplitude;
        sphere.position.z = userData.originalPosition.z + Math.sin(time * userData.speed * 0.5) * userData.amplitude;
        
        // Morphing effect
        const scale = 1 + Math.sin(time * userData.morphSpeed * 10) * 0.3;
        sphere.scale.set(scale, scale, scale);
        
        // Rotation
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
    });
    
    // Animate wave pattern
    if (waveGeometry) {
        const vertices = waveGeometry.attributes.position;
        for (let i = 0; i < vertices.count; i++) {
            const x = vertices.getX(i);
            const y = vertices.getY(i);
            
            const waveX = Math.sin(x * 0.1 + time) * 2;
            const waveY = Math.cos(y * 0.1 + time) * 2;
            
            vertices.setZ(i, (waveX + waveY) * 0.5);
        }
        vertices.needsUpdate = true;
    }
    
    // Animate floating islands
    floatingIslands.forEach(island => {
        const userData = island.userData;
        island.position.y += Math.sin(time * userData.floatSpeed) * userData.floatAmplitude * 0.01;
        island.rotation.y += userData.rotationSpeed;
    });
    
    // Camera movement based on mouse
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    // Render Scene
    renderer.render(scene, camera);
}

// Create Geometric Patterns for backgrounds
function createGeometricPatterns() {
    const patterns = document.querySelectorAll('.particles-3d');
    
    patterns.forEach(container => {
        // Create CSS-based geometric shapes
        for (let i = 0; i < 20; i++) {
            const shape = document.createElement('div');
            const shapeType = Math.floor(Math.random() * 3);
            
            shape.className = 'geometric-shape';
            shape.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                width: ${Math.random() * 100 + 50}px;
                height: ${Math.random() * 100 + 50}px;
                border: 2px solid rgba(99, 102, 241, 0.3);
                animation: float-rotate ${Math.random() * 10 + 10}s linear infinite;
                transform-style: preserve-3d;
            `;
            
            switch(shapeType) {
                case 0: // Triangle
                    shape.style.width = '0';
                    shape.style.height = '0';
                    shape.style.borderLeft = '25px solid transparent';
                    shape.style.borderRight = '25px solid transparent';
                    shape.style.borderBottom = '50px solid rgba(99, 102, 241, 0.3)';
                    break;
                case 1: // Circle
                    shape.style.borderRadius = '50%';
                    break;
                case 2: // Hexagon
                    shape.style.clipPath = 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';
                    shape.style.background = 'rgba(118, 75, 162, 0.2)';
                    break;
            }
            
            container.appendChild(shape);
        }
    });
}

// CSS Animation for new effects
const style = document.createElement('style');
style.textContent = `
    @keyframes float-rotate {
        0% {
            transform: translateZ(0) rotateX(0deg) rotateY(0deg) translateY(100vh);
            opacity: 0;
        }
        10% {
            opacity: 0.5;
        }
        90% {
            opacity: 0.5;
        }
        100% {
            transform: translateZ(200px) rotateX(360deg) rotateY(360deg) translateY(-100vh);
            opacity: 0;
        }
    }
    
    .geometric-shape {
        pointer-events: none;
    }
    
    #three-canvas {
        background: radial-gradient(ellipse at center, 
            rgba(99, 102, 241, 0.1) 0%, 
            transparent 50%);
    }
`;
document.head.appendChild(style);

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initThreeAdvanced();
    createGeometricPatterns();
});