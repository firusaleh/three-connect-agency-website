// Preloader Fix - Ensures preloader is removed even if other scripts fail
(function() {
    'use strict';
    
    // Function to hide preloader
    function hidePreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            document.body.classList.add('loaded');
            
            // Remove from DOM after animation
            setTimeout(function() {
                if (preloader.parentNode) {
                    preloader.style.display = 'none';
                    preloader.remove();
                }
            }, 500);
        }
    }
    
    // Hide preloader when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hidePreloader);
    } else {
        // DOM is already ready
        hidePreloader();
    }
    
    // Fallback: Hide after window load
    window.addEventListener('load', function() {
        setTimeout(hidePreloader, 100);
    });
    
    // Ultimate fallback: Hide after 5 seconds no matter what
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important;';
            if (preloader.parentNode) {
                preloader.remove();
            }
        }
        document.body.classList.add('loaded');
    }, 5000);
    
    // Check if main script failed to initialize
    window.addEventListener('error', function(e) {
        if (e.filename && e.filename.includes('main-2025.js')) {
            console.error('Main script error detected, forcing preloader removal');
            hidePreloader();
        }
    });
})();