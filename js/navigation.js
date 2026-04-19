// Navigation JavaScript for AI PM Portfolio

// Initialize navigation
document.addEventListener('DOMContentLoaded', function() {
    highlightCurrentNav();
    initMobileMenu();
    initNavScroll();
});

// Highlight current page in navigation
function highlightCurrentNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === currentPage) {
            link.classList.add('active');
            link.classList.remove('text-white/60');
            link.classList.add('text-primary');
        } else {
            link.classList.remove('active');
            link.classList.remove('text-primary');
            link.classList.add('text-white/60');
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuBtn && mobileMenu) {
        // Toggle menu
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            
            // Update aria-expanded
            const isExpanded = !mobileMenu.classList.contains('hidden');
            menuBtn.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Navigation scroll effects
function initNavScroll() {
    const nav = document.querySelector('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        
        // Add/remove shadow based on scroll position
        if (currentScroll > 10) {
            nav.classList.add('shadow-lg');
            nav.style.background = 'rgba(15, 15, 15, 0.98)';
        } else {
            nav.classList.remove('shadow-lg');
            nav.style.background = 'rgba(15, 15, 15, 0.95)';
        }
        
        lastScroll = currentScroll;
    });
}

// Smooth scroll to anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                
                // Calculate offset for fixed header
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Initialize smooth scroll
document.addEventListener('DOMContentLoaded', initSmoothScroll);

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    highlightCurrentNav();
});

// Export functions for use in other scripts
window.Navigation = {
    highlightCurrentNav,
    initMobileMenu,
    initNavScroll,
    initSmoothScroll
};
