// Projects Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Active Link Highlighting
    const pageSections = document.querySelectorAll('section');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');
    const desktopNavLinks = document.querySelectorAll('.nav-menu li a');
    
    // Ensure circle image matches intro animation
    const mainImageContainer = document.getElementById('mainImage');
    const circleElement = document.querySelector('.circle');
    const profileImage = document.querySelector('.circle img');
    
    if (mainImageContainer && profileImage) {
        // Ensure image fills properly
        profileImage.style.objectFit = 'cover';
        profileImage.style.borderRadius = '50%';
        profileImage.style.width = '100%';
        profileImage.style.height = '100%';
        
        // Enhanced hover effect - additional to CSS
        mainImageContainer.addEventListener('mouseenter', function() {
            profileImage.style.transform = 'scale(1.1)';
        });
        
        mainImageContainer.addEventListener('mouseleave', function() {
            profileImage.style.transform = 'scale(1)';
        });
    }
    
    function setActiveNavItem() {
        let currentSection = '';
        let scrollPosition = window.scrollY;
        
        // Find the current section
        pageSections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        // Highlight the corresponding mobile nav item
        if (currentSection) {
            mobileNavLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === currentSection);
            });
            
            // Highlight the corresponding desktop nav item
            desktopNavLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === currentSection);
            });
        }
    }
    
    // Call on scroll
    window.addEventListener('scroll', setActiveNavItem);
    
    // Call on page load
    setActiveNavItem();

    // Enhanced Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    // Create an Intersection Observer with enhanced animations
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Randomize animation delay for staggered effect
                const delay = Math.random() * 0.3;
                entry.target.style.transitionDelay = `${delay}s`;
                
                // Apply different transforms based on element type
                if (entry.target.classList.contains('bar')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scaleX(1)';
                } else if (entry.target.classList.contains('projects-item')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                } else {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add enhanced initial styles for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        observer.observe(section);
    });

    // Specialized animations for different elements
    const skillBars = document.querySelectorAll('.bar');
    skillBars.forEach(bar => {
        bar.style.opacity = '0';
        bar.style.transform = 'scaleX(0.6)';
        observer.observe(bar);
    });

    const projectItems = document.querySelectorAll('.projects-item');
    projectItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px) scale(0.95)';
        item.style.transitionDelay = `${0.1 * index}s`;
        observer.observe(item);
    });

    const elementsToAnimate = document.querySelectorAll('.skillss-container, .project-image, .form');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // Mobile Navigation Smooth Scrolling
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Projects Slider
    const slider = document.getElementById('projectsSlider');
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    const dotsContainer = document.getElementById('projectDots');
    
    if (slider && slider.children.length > 0) {
        const items = Array.from(slider.querySelectorAll('.projects-item'));
        const itemCount = items.length;
        let currentSlide = 0;
        
        // Create dots for navigation
        dotsContainer.innerHTML = '';
        for (let i = 0; i < itemCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => navigateToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        // Add click handlers to buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                navigateToSlide(currentSlide > 0 ? currentSlide - 1 : itemCount - 1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                navigateToSlide(currentSlide < itemCount - 1 ? currentSlide + 1 : 0);
            });
        }
        
        // Function to navigate to specific slide
        function navigateToSlide(index) {
            if (index < 0 || index >= itemCount) return;
            
            currentSlide = index;
            
            // Calculate position and scroll
            const item = items[index];
            slider.scrollTo({
                left: item.offsetLeft - slider.offsetLeft,
                behavior: 'smooth'
            });
            
            // Update dots
            Array.from(dotsContainer.children).forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Force initial scroll with delay to ensure DOM is ready
        setTimeout(() => navigateToSlide(0), 100);
        
        // Handle scroll events to update dots
        let scrollTimeout;
        slider.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Find closest slide based on scroll position
                const scrollPos = slider.scrollLeft;
                let closestIndex = 0;
                let minDistance = Infinity;
                
                items.forEach((item, i) => {
                    const distance = Math.abs((item.offsetLeft - slider.offsetLeft) - scrollPos);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestIndex = i;
                    }
                });
                
                // Update dots if needed
                if (closestIndex !== currentSlide) {
                    currentSlide = closestIndex;
                    Array.from(dotsContainer.children).forEach((dot, i) => {
                        dot.classList.toggle('active', i === closestIndex);
                    });
                }
            }, 50);
        });
        
        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next slide
                navigateToSlide(currentSlide < itemCount - 1 ? currentSlide + 1 : 0);
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous slide
                navigateToSlide(currentSlide > 0 ? currentSlide - 1 : itemCount - 1);
            }
        }
    }
    
    // Desktop Navigation Smooth Scrolling
    desktopNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Smooth scroll to section
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Footer links smooth scrolling
    const footerNavLinks = document.querySelectorAll('.footer-nav-link');
    footerNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Footer animation enhancements
    const footerSections = document.querySelectorAll('.footer-logo, .footer-links, .footer-social, .footer-contact');
    footerSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.5s ease';
        section.style.transitionDelay = `${0.1 * index}s`;
    });

    // Footer animation observer
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                footerObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    // Observe footer sections
    footerSections.forEach(section => {
        footerObserver.observe(section);
    });

    // Enhanced hover effects for footer social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const i = this.querySelector('i');
            i.style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            const i = this.querySelector('i');
            i.style.transform = 'scale(1) rotate(0)';
        });
    });

    // Change navbar background on scroll
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        
        // Navbar background change on scroll
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
            navbar.style.boxShadow = 'none';
        }
        
        // Scroll to top button visibility
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}); 