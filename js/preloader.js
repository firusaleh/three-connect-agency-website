// Elegant Preloader Script

class PreloaderManager {
    constructor() {
        this.preloader = document.getElementById('preloader');
        this.progressBar = document.querySelector('.preloader-bar');
        this.percentage = document.querySelector('.preloader-percentage');
        this.progress = 0;
        this.assets = [];
        this.loadedAssets = 0;
        
        this.init();
    }
    
    init() {
        // Collect all assets to track
        this.collectAssets();
        
        // Start loading simulation
        this.simulateLoading();
        
        // Track actual page load
        window.addEventListener('load', () => {
            this.completeLoading();
        });
    }
    
    collectAssets() {
        // Track images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete) {
                this.assets.push(img);
                img.addEventListener('load', () => this.assetLoaded());
                img.addEventListener('error', () => this.assetLoaded());
            }
        });
        
        // Track videos
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            this.assets.push(video);
            video.addEventListener('canplaythrough', () => this.assetLoaded());
            video.addEventListener('error', () => this.assetLoaded());
        });
        
        // If no assets or all loaded, use time-based loading
        if (this.assets.length === 0) {
            this.assets = new Array(10).fill(null); // Simulate 10 assets
        }
    }
    
    assetLoaded() {
        this.loadedAssets++;
        this.updateProgress((this.loadedAssets / this.assets.length) * 100);
    }
    
    simulateLoading() {
        // Smooth progress animation
        const duration = 2000; // 2 seconds max
        const interval = 50; // Update every 50ms
        const steps = duration / interval;
        const increment = 90 / steps; // Go up to 90%
        
        const timer = setInterval(() => {
            this.progress = Math.min(90, this.progress + increment);
            this.updateProgress(this.progress);
            
            if (this.progress >= 90) {
                clearInterval(timer);
            }
        }, interval);
    }
    
    updateProgress(value) {
        this.progress = Math.min(100, Math.max(0, value));
        
        if (this.progressBar) {
            this.progressBar.style.width = `${this.progress}%`;
        }
        
        if (this.percentage) {
            this.percentage.textContent = `${Math.floor(this.progress)}%`;
        }
    }
    
    completeLoading() {
        // Ensure we reach 100%
        this.updateProgress(100);
        
        // Wait a moment at 100% before hiding
        setTimeout(() => {
            this.hidePreloader();
        }, 300);
    }
    
    hidePreloader() {
        if (this.preloader) {
            this.preloader.classList.add('fade-out');
            
            // Remove from DOM after transition
            setTimeout(() => {
                this.preloader.remove();
                document.body.classList.add('loaded');
            }, 500);
        }
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PreloaderManager();
    });
} else {
    new PreloaderManager();
}

// Fallback: Hide preloader after max 3 seconds
setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('fade-out')) {
        preloader.classList.add('fade-out');
        setTimeout(() => preloader.remove(), 500);
    }
}, 3000);