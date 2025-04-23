// Main JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
        });
    });

    // Search button functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input input');
    
    searchBtn.addEventListener('click', function() {
        if (searchInput.value.trim() !== '') {
            alert('Searching for: ' + searchInput.value);
            // In a real implementation, this would redirect to search results
        } else {
            alert('Please enter a destination');
        }
    });

    // Make header sticky on scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.left = '0';
            header.style.right = '0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.position = 'relative';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to features on scroll
    const features = document.querySelectorAll('.feature');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    features.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(feature);
    });

    // Initialize guides with animation
    const guides = document.querySelectorAll('.guide');
    
    guides.forEach((guide, index) => {
        guide.style.opacity = '0';
        guide.style.transform = 'translateY(20px)';
        guide.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        guide.style.transitionDelay = `${index * 0.2}s`;
        
        setTimeout(() => {
            guide.style.opacity = '1';
            guide.style.transform = 'translateY(0)';
        }, 500);
    });
});
