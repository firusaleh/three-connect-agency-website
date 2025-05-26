/* ================================================
   THREE.JS 3D EFFECTS
   Advanced 3D Visualizations
   ================================================ */

// Initialize Three.js Scene
let scene, camera, renderer, particles;

function init3DScene() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('aiVisualization'),
        alpha: true,
        antialias: true
    });
    renderer.setSize(400, 400);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create particle system
    createParticleSystem();
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00ffff, 1);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);
    
    // Start animation
    animate();
}

function createParticleSystem() {
    const geometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        // Position
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;
        
        // Color (cyan to purple gradient)
        colors[i] = Math.random() * 0.5 + 0.5; // R
        colors[i + 1] = Math.random() * 0.5; // G
        colors[i + 2] = Math.random() * 0.5 + 0.5; // B
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate particles
    if (particles) {
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.002;
    }
    
    // Mouse interaction
    if (window.mouseX && window.mouseY) {
        camera.position.x = (window.mouseX / window.innerWidth - 0.5) * 2;
        camera.position.y = -(window.mouseY / window.innerHeight - 0.5) * 2;
        camera.lookAt(scene.position);
    }
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// Track mouse position
window.addEventListener('mousemove', (e) => {
    window.mouseX = e.clientX;
    window.mouseY = e.clientY;
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('aiVisualization');
    if (canvas) {
        init3DScene();
    }
});

// Create floating 3D elements for sections
function create3DElement(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(200, 200);
    container.appendChild(renderer.domElement);
    
    // Create geometric shape
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.2,
        wireframe: true
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    
    camera.position.z = 3;
    
    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    
    animate();
}

// WebGL Background Effect
class WebGLBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;
        document.body.appendChild(this.canvas);
        
        this.gl = this.canvas.getContext('webgl');
        this.init();
    }
    
    init() {
        const gl = this.gl;
        
        // Vertex shader
        const vsSource = `
            attribute vec4 aVertexPosition;
            void main() {
                gl_Position = aVertexPosition;
            }
        `;
        
        // Fragment shader with gradient effect
        const fsSource = `
            precision mediump float;
            uniform vec2 uResolution;
            uniform float uTime;
            
            void main() {
                vec2 st = gl_FragCoord.xy / uResolution;
                vec3 color = vec3(0.0);
                
                // Create animated gradient
                color.r = sin(st.x * 10.0 + uTime) * 0.5 + 0.5;
                color.g = sin(st.y * 10.0 + uTime * 0.7) * 0.5 + 0.5;
                color.b = sin((st.x + st.y) * 10.0 + uTime * 1.3) * 0.5 + 0.5;
                
                // Add noise
                color *= 0.2;
                
                gl_FragColor = vec4(color, 1.0);
            }
        `;
        
        // Create shaders
        const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fsSource);
        
        // Create program
        this.program = this.createProgram(gl, vertexShader, fragmentShader);
        
        // Get locations
        this.positionLocation = gl.getAttribLocation(this.program, 'aVertexPosition');
        this.resolutionLocation = gl.getUniformLocation(this.program, 'uResolution');
        this.timeLocation = gl.getUniformLocation(this.program, 'uTime');
        
        // Create buffer
        const positions = [
            -1, -1,
             1, -1,
            -1,  1,
             1,  1,
        ];
        
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        
        this.render();
    }
    
    createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    }
    
    createProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        return program;
    }
    
    render() {
        const gl = this.gl;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        
        gl.useProgram(this.program);
        
        gl.enableVertexAttribArray(this.positionLocation);
        gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);
        
        gl.uniform2f(this.resolutionLocation, gl.canvas.width, gl.canvas.height);
        gl.uniform1f(this.timeLocation, performance.now() * 0.001);
        
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        
        requestAnimationFrame(() => this.render());
    }
}

// Initialize WebGL background on load
if (window.WebGLRenderingContext) {
    window.addEventListener('load', () => {
        new WebGLBackground();
    });
}