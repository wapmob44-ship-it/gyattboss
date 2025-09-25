// CRT Effect Controller
// This file manages the CRT monitor effect overlay

class CRTEffect {
    constructor() {
        this.enabled = true;
        this.overlay = null;
        this.init();
    }

    init() {
        // Create CRT overlay element
        this.overlay = document.createElement('div');
        this.overlay.className = 'crt-overlay';
        document.body.appendChild(this.overlay);
        
        // Add CRT class to body
        document.body.classList.add('crt-enabled');
        
        // Optional: Add random screen distortion
        this.addRandomDistortion();
    }

    addRandomDistortion() {
        // Occasionally add brief screen distortion
        setInterval(() => {
            if (Math.random() < 0.02) { // 2% chance every interval
                this.glitch();
            }
        }, 1000);
    }

    glitch() {
        // Brief screen glitch effect
        const originalFilter = document.body.style.filter;
        document.body.style.filter = originalFilter + ' hue-rotate(5deg) contrast(1.5)';
        
        setTimeout(() => {
            document.body.style.filter = originalFilter;
        }, 100);
    }

    toggle() {
        this.enabled = !this.enabled;
        
        if (this.enabled) {
            this.enable();
        } else {
            this.disable();
        }
    }

    enable() {
        this.enabled = true;
        document.body.classList.add('crt-enabled');
        if (this.overlay) {
            this.overlay.style.display = 'block';
        }
    }

    disable() {
        this.enabled = false;
        document.body.classList.remove('crt-enabled');
        if (this.overlay) {
            this.overlay.style.display = 'none';
        }
    }

    destroy() {
        // Remove CRT effect completely
        if (this.overlay) {
            this.overlay.remove();
        }
        document.body.classList.remove('crt-enabled');
    }
}

// Initialize CRT effect when page loads
let crtEffect = null;

document.addEventListener('DOMContentLoaded', function() {
    crtEffect = new CRTEffect();
    
    // Optional: Add toggle key (press 'C' to toggle CRT effect)
    document.addEventListener('keydown', function(e) {
        if (e.key.toLowerCase() === 'c' && e.ctrlKey) {
            e.preventDefault();
            crtEffect.toggle();
            console.log('CRT Effect:', crtEffect.enabled ? 'ON' : 'OFF');
        }
    });
});

// Export for external control
window.CRTEffect = CRTEffect;
window.crtEffect = crtEffect;
