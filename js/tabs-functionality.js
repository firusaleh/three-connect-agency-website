// Tab Functionality Fix for About Section and Others

document.addEventListener('DOMContentLoaded', function() {
    // About Section Tabs
    const aboutTabs = document.querySelectorAll('.about-tab');
    const aboutContents = document.querySelectorAll('.about-content');
    
    if (aboutTabs.length > 0) {
        aboutTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                aboutTabs.forEach(t => t.classList.remove('active'));
                aboutContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding content
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
    
    // Projects Section Tabs
    const projectTabs = document.querySelectorAll('.project-tabs .tab-button');
    const projectContents = document.querySelectorAll('.project-content');
    
    if (projectTabs.length > 0) {
        projectTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetProject = this.getAttribute('data-project');
                
                // Remove active class from all tabs and contents
                projectTabs.forEach(t => t.classList.remove('active'));
                projectContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding content
                const targetContent = document.getElementById(targetProject + '-content');
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
    
    // Generic Tab System (for any other tabs)
    const allTabButtons = document.querySelectorAll('[data-tab]:not(.about-tab)');
    
    allTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabGroup = this.closest('.tab-group');
            if (!tabGroup) return;
            
            const tabName = this.getAttribute('data-tab');
            const allTabs = tabGroup.querySelectorAll('[data-tab]');
            const allContents = tabGroup.querySelectorAll('.tab-content');
            
            // Remove active from all
            allTabs.forEach(t => t.classList.remove('active'));
            allContents.forEach(c => c.classList.remove('active'));
            
            // Add active to current
            this.classList.add('active');
            const targetContent = tabGroup.querySelector(`#${tabName}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Ensure initial state is correct
    ensureInitialTabState();
});

// Function to ensure only one tab content is visible initially
function ensureInitialTabState() {
    // About section
    const aboutContents = document.querySelectorAll('.about-content');
    let hasActive = false;
    
    aboutContents.forEach((content, index) => {
        if (content.classList.contains('active')) {
            if (hasActive) {
                // Remove duplicate active classes
                content.classList.remove('active');
            } else {
                hasActive = true;
            }
        }
    });
    
    // If no active content, activate the first one
    if (!hasActive && aboutContents.length > 0) {
        aboutContents[0].classList.add('active');
        const firstTab = document.querySelector('.about-tab');
        if (firstTab) {
            firstTab.classList.add('active');
        }
    }
    
    // Projects section
    const projectContents = document.querySelectorAll('.project-content');
    hasActive = false;
    
    projectContents.forEach((content, index) => {
        if (content.classList.contains('active')) {
            if (hasActive) {
                content.classList.remove('active');
            } else {
                hasActive = true;
            }
        }
    });
    
    if (!hasActive && projectContents.length > 0) {
        projectContents[0].classList.add('active');
        const firstProjectTab = document.querySelector('.project-tabs .tab-button');
        if (firstProjectTab) {
            firstProjectTab.classList.add('active');
        }
    }
}