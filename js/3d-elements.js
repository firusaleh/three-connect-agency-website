// 3D Elements with Three.js

class Hero3D {
    constructor() {
        this.container = document.getElementById('hero3D');
        if (!this.container || typeof THREE === 'undefined') return;
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        
        this.clock = new THREE.Clock();
        this.mouse = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        // Setup renderer
        this.renderer.setSize(600, 600);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
        
        // Camera position
        this.camera.position.z = 5;
        
        // Create geometry
        this.createGeometry();
        
        // Lighting
        this.addLights();
        
        // Mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Handle resize
        window.addEventListener('resize', () => this.onResize());
        
        // Start animation
        this.animate();
    }
    
    createGeometry() {
        // Create main sphere
        const geometry = new THREE.IcosahedronGeometry(1.5, 0);
        
        // Custom shader material
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                colorA: { value: new THREE.Color('#00ffff') },
                colorB: { value: new THREE.Color('#ff00ff') }
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vPosition;
                uniform float time;
                
                void main() {
                    vUv = uv;
                    vPosition = position;
                    
                    vec3 pos = position;
                    float displacement = sin(pos.x * 10.0 + time) * 0.1;
                    pos += normal * displacement;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 colorA;
                uniform vec3 colorB;
                uniform float time;
                varying vec2 vUv;
                varying vec3 vPosition;
                
                void main() {
                    float mixValue = (sin(vPosition.y * 5.0 + time) + 1.0) * 0.5;
                    vec3 color = mix(colorA, colorB, mixValue);
                    
                    gl_FragColor = vec4(color, 0.8);
                }
            `,
            transparent: true,
            wireframe: true
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
        
        // Add particles around the sphere
        this.createParticles();
    }
    
    createParticles() {
        const particleCount = 1000;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        
        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 10;
            
            positions.push(x, y, z);
            
            // Random colors between cyan and magenta
            const r = Math.random();
            colors.push(r, 1 - r, 1);
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }
    
    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambientLight);
        
        const pointLight1 = new THREE.PointLight(0x00ffff, 1);
        pointLight1.position.set(5, 5, 5);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0xff00ff, 1);
        pointLight2.position.set(-5, -5, -5);
        this.scene.add(pointLight2);
    }
    
    onResize() {
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const time = this.clock.getElapsedTime();
        
        // Update shader uniforms
        if (this.mesh && this.mesh.material.uniforms) {
            this.mesh.material.uniforms.time.value = time;
        }
        
        // Rotate mesh
        if (this.mesh) {
            this.mesh.rotation.x = time * 0.1;
            this.mesh.rotation.y = time * 0.15;
            
            // Mouse interaction
            this.mesh.rotation.x += this.mouse.y * 0.1;
            this.mesh.rotation.y += this.mouse.x * 0.1;
        }
        
        // Rotate particles
        if (this.particles) {
            this.particles.rotation.y = time * 0.05;
            this.particles.rotation.x = time * 0.03;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Floating 3D Icons
class Floating3DIcon {
    constructor(element) {
        this.element = element;
        this.init();
    }
    
    init() {
        if (typeof THREE === 'undefined') return;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        
        renderer.setSize(80, 80);
        this.element.appendChild(renderer.domElement);
        
        // Create icon geometry
        const geometry = new THREE.OctahedronGeometry(1, 0);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 0.5,
            shininess: 100,
            specular: 0xffffff,
            transparent: true,
            opacity: 0.9
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        
        // Add light
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1);
        scene.add(light);
        
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        
        camera.position.z = 3;
        
        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.02;
            
            renderer.render(scene, camera);
        };
        
        animate();
    }
}

// AI Visualization Canvas
class AIVisualization {
    constructor() {
        this.canvas = document.getElementById('aiVisualization');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        this.nodes = [];
        this.connections = [];
        this.nodeCount = 20;
        
        this.init();
    }
    
    init() {
        // Create nodes
        for (let i = 0; i < this.nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 2,
                color: this.getRandomColor()
            });
        }
        
        this.animate();
    }
    
    getRandomColor() {
        const colors = ['#00ffff', '#ff00ff', '#a855f7', '#00ff80'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
        // Update node positions
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off walls
            if (node.x < 0 || node.x > this.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.height) node.vy *= -1;
            
            // Keep within bounds
            node.x = Math.max(0, Math.min(this.width, node.x));
            node.y = Math.max(0, Math.min(this.height, node.y));
        });
        
        // Update connections
        this.connections = [];
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.connections.push({
                        from: this.nodes[i],
                        to: this.nodes[j],
                        distance: distance
                    });
                }
            }
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw connections
        this.connections.forEach(conn => {
            const opacity = 1 - (conn.distance / 100);
            this.ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.3})`;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(conn.from.x, conn.from.y);
            this.ctx.lineTo(conn.to.x, conn.to.y);
            this.ctx.stroke();
        });
        
        // Draw nodes
        this.nodes.forEach(node => {
            // Glow effect
            const gradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, node.radius * 3
            );
            gradient.addColorStop(0, node.color);
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Core
            this.ctx.fillStyle = node.color;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize 3D elements
document.addEventListener('DOMContentLoaded', () => {
    // Main hero 3D element
    new Hero3D();
    
    // AI Visualization
    new AIVisualization();
    
    // Floating 3D icons
    document.querySelectorAll('.icon-hologram').forEach(icon => {
        new Floating3DIcon(icon);
    });
});