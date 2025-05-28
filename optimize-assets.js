// Asset Optimization Script
const fs = require('fs').promises;
const path = require('path');

// CSS files to combine (in order)
const cssFiles = [
    'css/preloader-elegant.css',
    'css/modern-2025-design.css',
    'css/additional-styles.css',
    'css/process-glassmorphism.css',
    'css/projects-enhanced.css',
    'css/projects-development-status.css',
    'css/enhancements-2025.css',
    'css/header-improvements.css',
    'css/visibility-fixes.css',
    'css/hero-trust-badges-fix.css',
    'css/hero-2025-premium.css',
    'css/services-space-grid.css',
    'css/mobile-complete-optimization.css',
    'css/performance-optimized.css'
];

// Minify CSS
function minifyCSS(css) {
    return css
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove unnecessary whitespace
        .replace(/\s+/g, ' ')
        // Remove space around selectors
        .replace(/\s*([{}:;,])\s*/g, '$1')
        // Remove trailing semicolon
        .replace(/;}/g, '}')
        // Remove quotes from url()
        .replace(/url\(["']?([^"']+)["']?\)/g, 'url($1)')
        // Remove empty rules
        .replace(/[^{}]+\{\s*\}/g, '')
        .trim();
}

// Extract critical CSS
function extractCriticalCSS(css) {
    const critical = [];
    const nonCritical = [];
    
    // Patterns for critical CSS
    const criticalPatterns = [
        /:root/,
        /^(html|body)/,
        /\.preloader/,
        /\.nav-2025/,
        /\.hero-2025/,
        /\.hero-title/,
        /\.hero-subtitle/,
        /\.btn-2025/,
        /\.loading/,
        /@media\s*\([^)]*max-width:\s*768px[^)]*\)/
    ];
    
    // Split CSS into rules
    const rules = css.match(/[^{}]+\{[^{}]+\}/g) || [];
    
    rules.forEach(rule => {
        const isCritical = criticalPatterns.some(pattern => pattern.test(rule));
        if (isCritical) {
            critical.push(rule);
        } else {
            nonCritical.push(rule);
        }
    });
    
    return {
        critical: minifyCSS(critical.join('\n')),
        nonCritical: minifyCSS(nonCritical.join('\n'))
    };
}

async function optimizeCSS() {
    try {
        // Read all CSS files
        const cssContents = await Promise.all(
            cssFiles.map(file => fs.readFile(file, 'utf8').catch(() => ''))
        );
        
        // Combine all CSS
        const combinedCSS = cssContents.join('\n\n');
        
        // Extract critical and non-critical CSS
        const { critical, nonCritical } = extractCriticalCSS(combinedCSS);
        
        // Write critical CSS
        await fs.writeFile('css/critical.min.css', critical);
        console.log('✓ Critical CSS created: css/critical.min.css');
        
        // Write main CSS
        await fs.writeFile('css/main.min.css', nonCritical);
        console.log('✓ Main CSS created: css/main.min.css');
        
        // Create combined minified CSS
        const allMinified = minifyCSS(combinedCSS);
        await fs.writeFile('css/all.min.css', allMinified);
        console.log('✓ Combined CSS created: css/all.min.css');
        
        // Log file sizes
        const criticalSize = (critical.length / 1024).toFixed(2);
        const mainSize = (nonCritical.length / 1024).toFixed(2);
        const totalSize = (allMinified.length / 1024).toFixed(2);
        
        console.log(`\nFile sizes:`);
        console.log(`- Critical CSS: ${criticalSize} KB`);
        console.log(`- Main CSS: ${mainSize} KB`);
        console.log(`- Total CSS: ${totalSize} KB`);
        
    } catch (error) {
        console.error('Error optimizing CSS:', error);
    }
}

// Run optimization
optimizeCSS();