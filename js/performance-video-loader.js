// Performance-optimized Video Loader
document.addEventListener('DOMContentLoaded', function() {
    // Only load videos after initial page render
    const loadVideos = () => {
        const videos = document.querySelectorAll('video[data-autoplay]');
        
        videos.forEach(video => {
            // Set poster for immediate visual
            if (video.dataset.poster) {
                video.poster = video.dataset.poster;
            }
            
            // Create Intersection Observer for lazy loading
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const video = entry.target;
                        const sources = video.querySelectorAll('source[data-src]');
                        
                        // Load video sources
                        sources.forEach(source => {
                            source.src = source.dataset.src;
                            source.removeAttribute('data-src');
                        });
                        
                        // Load and play video
                        video.load();
                        
                        // Play with fallback
                        video.play().catch(err => {
                            console.log('Video autoplay failed:', err);
                            // Show play button overlay if autoplay fails
                            const playOverlay = document.createElement('div');
                            playOverlay.className = 'video-play-overlay';
                            playOverlay.innerHTML = '<i class="fas fa-play-circle"></i>';
                            playOverlay.onclick = () => {
                                video.play();
                                playOverlay.remove();
                            };
                            video.parentNode.appendChild(playOverlay);
                        });
                        
                        videoObserver.unobserve(video);
                    }
                });
            }, {
                rootMargin: '50px'
            });
            
            videoObserver.observe(video);
        });
    };
    
    // Load videos after page load
    if (document.readyState === 'complete') {
        loadVideos();
    } else {
        window.addEventListener('load', loadVideos);
    }
    
    // Mobile-specific video optimizations
    if (window.innerWidth <= 768) {
        document.querySelectorAll('video').forEach(video => {
            // Reduce quality on mobile
            video.setAttribute('data-quality', 'low');
            
            // Remove autoplay on very slow connections
            if ('connection' in navigator) {
                const connection = navigator.connection;
                if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                    video.removeAttribute('autoplay');
                    video.removeAttribute('data-autoplay');
                }
            }
        });
    }
});

// Add required CSS
const videoStyles = document.createElement('style');
videoStyles.textContent = `
    video[data-autoplay] {
        background-color: #1a1a1a;
        background-image: var(--poster-image);
        background-size: cover;
        background-position: center;
    }
    
    .video-play-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 80px;
        color: white;
        cursor: pointer;
        z-index: 10;
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5));
        transition: transform 0.3s ease;
    }
    
    .video-play-overlay:hover {
        transform: translate(-50%, -50%) scale(1.1);
    }
    
    @media (max-width: 768px) {
        .video-play-overlay {
            font-size: 60px;
        }
    }
`;
document.head.appendChild(videoStyles);