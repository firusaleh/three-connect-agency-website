// Process Section Video Handler
document.addEventListener('DOMContentLoaded', function() {
    const processVideo = document.querySelector('.process-video-bg');
    
    if (processVideo) {
        // Ensure video plays on mobile devices
        processVideo.addEventListener('loadeddata', function() {
            processVideo.play().catch(function(error) {
                console.log('Video autoplay failed:', error);
                // Video couldn't autoplay, show fallback
                processVideo.style.display = 'none';
            });
        });
        
        // Optimize video loading
        if ('IntersectionObserver' in window) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        processVideo.play();
                    } else {
                        processVideo.pause();
                    }
                });
            }, { threshold: 0.25 });
            
            videoObserver.observe(processVideo);
        }
        
        // Handle video errors
        processVideo.addEventListener('error', function(e) {
            console.error('Video loading error:', e);
            // Hide video on error
            processVideo.style.display = 'none';
        });
    }
    
    // Add fade-in effect to process cards when they come into view
    const processCards = document.querySelectorAll('.process-card');
    
    if ('IntersectionObserver' in window) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in');
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        processCards.forEach(card => {
            cardObserver.observe(card);
        });
    }
});