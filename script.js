/**
 * NEXUS Workshop - Build Your Personal Website
 * Interactive presentation script
 */

// ============================================
// Workshop Countdown & Check-in System
// ============================================
(function() {
    // Workshop time settings (Central Time - Dec 4, 2025)
    const WORKSHOP_START = new Date('2025-12-04T12:00:00-06:00'); // Noon CT
    const CHECKIN_START = new Date('2025-12-04T12:01:00-06:00');  // 12:01 PM CT
    const CHECKIN_END = new Date('2025-12-04T12:30:00-06:00');    // 12:30 PM CT
    
    // Store check-ins in localStorage (will be sent via email)
    const CHECKINS_KEY = 'nexus_workshop_checkins';
    
    const countdownContainer = document.getElementById('countdown-container');
    const checkinContainer = document.getElementById('checkin-container');
    const checkinForm = document.getElementById('checkin-form');
    const checkinSuccess = document.getElementById('checkin-success');
    
    // Update countdown timer
    function updateCountdown() {
        const now = new Date();
        const diff = WORKSHOP_START - now;
        
        if (diff <= 0) {
            // Workshop has started, hide countdown
            if (countdownContainer) {
                countdownContainer.style.display = 'none';
            }
            return false;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const hoursEl = document.getElementById('countdown-hours');
        const minutesEl = document.getElementById('countdown-minutes');
        const secondsEl = document.getElementById('countdown-seconds');
        
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        
        return true;
    }
    
    // Check if check-in window is active
    function isCheckinActive() {
        const now = new Date();
        return now >= CHECKIN_START && now <= CHECKIN_END;
    }
    
    // Update visibility based on time
    function updateVisibility() {
        const now = new Date();
        
        // Countdown: visible before workshop starts
        if (countdownContainer) {
            if (now < WORKSHOP_START) {
                countdownContainer.style.display = 'block';
            } else {
                countdownContainer.style.display = 'none';
            }
        }
        
        // Check-in: visible only during 12:01-12:30 window
        if (checkinContainer) {
            if (isCheckinActive()) {
                checkinContainer.style.display = 'block';
            } else {
                checkinContainer.style.display = 'none';
            }
        }
    }
    
    // Get stored check-ins
    function getCheckins() {
        try {
            return JSON.parse(localStorage.getItem(CHECKINS_KEY) || '[]');
        } catch {
            return [];
        }
    }
    
    // Save check-in
    function saveCheckin(name, email) {
        const checkins = getCheckins();
        checkins.push({
            name: name,
            email: email,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(CHECKINS_KEY, JSON.stringify(checkins));
        return checkins;
    }
    
    // Send check-ins via mailto (aggregated)
    function sendCheckinsEmail() {
        const checkins = getCheckins();
        if (checkins.length === 0) return;
        
        const subject = encodeURIComponent('NEXUS Workshop Check-ins - Dec 4, 2025');
        const body = encodeURIComponent(
            'Workshop Check-ins:\n\n' +
            checkins.map((c, i) => 
                `${i + 1}. ${c.name} <${c.email}> - ${new Date(c.timestamp).toLocaleTimeString()}`
            ).join('\n') +
            '\n\nTotal: ' + checkins.length + ' attendees'
        );
        
        // Open mailto link
        window.open(`mailto:nexus@stthomas.edu?subject=${subject}&body=${body}`, '_blank');
    }
    
    // Handle check-in form submission
    if (checkinForm) {
        checkinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('checkin-name');
            const emailInput = document.getElementById('checkin-email');
            
            if (nameInput && emailInput) {
                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
                
                if (name && email) {
                    // Save check-in
                    saveCheckin(name, email);
                    
                    // Show success message
                    checkinForm.style.display = 'none';
                    if (checkinSuccess) {
                        checkinSuccess.style.display = 'flex';
                    }
                    
                    // Send email with all check-ins after a short delay
                    setTimeout(() => {
                        sendCheckinsEmail();
                    }, 1000);
                }
            }
        });
    }
    
    // Initialize
    updateVisibility();
    updateCountdown();
    
    // Update every second
    setInterval(() => {
        updateCountdown();
        updateVisibility();
    }, 1000);
    
    // Export for debugging
    window.nexusWorkshop = {
        getCheckins,
        sendCheckinsEmail,
        isCheckinActive
    };
})();

// ============================================
// Mobile Menu Toggle
// ============================================
const mobileToggle = document.querySelector('.nav-mobile-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// Cursor Glow Effect
// ============================================
const cursorGlow = document.querySelector('.cursor-glow');

if (cursorGlow && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '0.5';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
}

// ============================================
// Scroll Progress Indicator
// ============================================
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    
    if (scrollProgress) {
        scrollProgress.style.transform = `scaleX(${scrollPercent})`;
    }
});

// ============================================
// Smooth Scrolling
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - navHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate
const animatedElements = document.querySelectorAll(
    '.bento-card, .step-card, .tool-card, .tools-others, .comparison-card, .timeline-item, .resource-group, .stack-card, .comparison-table-wrapper, .evo-era, .ide-card, .resource-category, .next-steps-box'
);

animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    
    // Check for custom delay attribute
    const delay = el.dataset.delay ? parseInt(el.dataset.delay) : (index % 4) * 100;
    el.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
    fadeInObserver.observe(el);
});

// Staggered animations for grid items
const staggerContainers = document.querySelectorAll('.stack-grid, .tools-list, .resources-grid-new');
staggerContainers.forEach(container => {
    const items = container.children;
    Array.from(items).forEach((item, i) => {
        item.style.transitionDelay = `${i * 100}ms`;
    });
});

// ============================================
// Navigation Active State
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#fafafa';
        }
    });
});

// ============================================
// Hero Parallax Effect
// ============================================
const heroContent = document.querySelector('.hero-content');
const heroOrbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
    
    heroOrbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.1;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// Keyboard Navigation
// ============================================
document.addEventListener('keydown', (e) => {
    // ESC to scroll to top
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Arrow keys for section navigation
    if (e.key === 'ArrowDown' && e.altKey) {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const nextSection = currentSection?.nextElementSibling;
        if (nextSection && nextSection.tagName === 'SECTION') {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    if (e.key === 'ArrowUp' && e.altKey) {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const prevSection = currentSection?.previousElementSibling;
        if (prevSection && prevSection.tagName === 'SECTION') {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

function getCurrentSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let current = null;
    
    sections.forEach(section => {
        if (section.offsetTop <= scrollPosition) {
            current = section;
        }
    });
    
    return current;
}

// ============================================
// Button Hover Effects
// ============================================
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--x', x + 'px');
        this.style.setProperty('--y', y + 'px');
    });
});

// ============================================
// Card Tilt Effect
// ============================================
document.querySelectorAll('.bento-card, .step-card, .tool-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ============================================
// Timeline Animation
// ============================================
const timelineBars = document.querySelectorAll('.timeline-bar');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.5 });

timelineBars.forEach(bar => {
    timelineObserver.observe(bar);
});

// ============================================
// Code Window Typing Effect
// ============================================
const codeContent = document.querySelector('.code-content code');

if (codeContent) {
    const originalHTML = codeContent.innerHTML;
    
    const codeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add subtle highlight animation
                codeContent.style.animation = 'codeGlow 2s ease-in-out';
            }
        });
    }, { threshold: 0.5 });
    
    codeObserver.observe(codeContent);
}

// ============================================
// Console Easter Egg
// ============================================
console.log(
    '%c◆ NEXUS',
    'color: #8b5cf6; font-size: 24px; font-weight: bold; font-family: sans-serif;'
);
console.log(
    '%cBuilding the future, one website at a time.',
    'color: #a1a1aa; font-size: 14px; font-family: sans-serif;'
);
console.log(
    '%c→ ustnexus.club',
    'color: #8b5cf6; font-size: 12px; font-family: sans-serif;'
);

// ============================================
// Performance: Reduce animations on low-end devices
// ============================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    
    animatedElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.transition = 'none';
    });
}

// ============================================
// Mobile Menu Toggle (if needed later)
// ============================================
const initMobileMenu = () => {
    // Placeholder for mobile menu functionality
    // Can be expanded if hamburger menu is added
};

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class for initial animations
    document.body.classList.add('loaded');
    
    // Initialize mobile menu
    initMobileMenu();
});
