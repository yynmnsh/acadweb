// Academic Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAnimations();
    initMobileMenu();
    initContactForm();
    loadDynamicContent();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-item a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
        
        // Smooth scrolling for anchor links
        if (href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
}

// Scroll effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    const animatedElements = document.querySelectorAll('.card, .publication-item, .timeline-item');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Animation utilities
function initAnimations() {
    // Add stagger animation to grid items
    const gridItems = document.querySelectorAll('.grid .card');
    gridItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Typing effect for hero subtitle (if exists)
    const heroSubtitle = document.querySelector('.hero-subtitle[data-typing]');
    if (heroSubtitle) {
        typeWriter(heroSubtitle, heroSubtitle.textContent, 50);
    }
}

// Typing effect
function typeWriter(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Update toggle icon
            const icon = mobileToggle.textContent;
            mobileToggle.textContent = icon === '☰' ? '✕' : '☰';
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.textContent = '☰';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.textContent = '☰';
            }
        });
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Dynamic content loading (for CMS integration)
function loadDynamicContent() {
    // Check if we have stored content in localStorage
    const storedContent = localStorage.getItem('academicWebsiteContent');
    if (storedContent) {
        try {
            const content = JSON.parse(storedContent);
            updatePageContent(content);
        } catch (e) {
            console.log('No valid stored content found');
        }
    }
}

// Update page content with CMS data
function updatePageContent(content) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageKey = currentPage.replace('.html', '');
    
    if (content[pageKey]) {
        const pageContent = content[pageKey];
        
        // Update common elements
        if (pageContent.title) {
            const titleElement = document.querySelector('h1, .hero-title');
            if (titleElement) titleElement.textContent = pageContent.title;
        }
        
        if (pageContent.subtitle) {
            const subtitleElement = document.querySelector('.hero-subtitle, .page-subtitle');
            if (subtitleElement) subtitleElement.textContent = pageContent.subtitle;
        }
        
        if (pageContent.description) {
            const descElement = document.querySelector('.hero-description, .page-description');
            if (descElement) descElement.textContent = pageContent.description;
        }
        
        // Update specific content based on page type
        updateSpecificContent(pageKey, pageContent);
    }
}

// Update page-specific content
function updateSpecificContent(pageKey, content) {
    switch (pageKey) {
        case 'index':
            updateHomeContent(content);
            break;
        case 'research':
            updateResearchContent(content);
            break;
        case 'teaching':
            updateTeachingContent(content);
            break;
        case 'about':
            updateAboutContent(content);
            break;
        case 'contact':
            updateContactContent(content);
            break;
    }
}

// Page-specific content updaters
function updateHomeContent(content) {
    if (content.recentNews && content.recentNews.length > 0) {
        const newsContainer = document.querySelector('.recent-news');
        if (newsContainer) {
            newsContainer.innerHTML = content.recentNews.map(news => `
                <div class="card">
                    <div class="card-meta">${news.date}</div>
                    <h3 class="card-title">${news.title}</h3>
                    <p>${news.summary}</p>
                </div>
            `).join('');
        }
    }
}

function updateResearchContent(content) {
    if (content.publications && content.publications.length > 0) {
        const pubContainer = document.querySelector('.publications-list');
        if (pubContainer) {
            pubContainer.innerHTML = content.publications.map(pub => `
                <div class="publication-item">
                    <div class="publication-title">${pub.title}</div>
                    <div class="publication-authors">${pub.authors}</div>
                    <div class="publication-venue">${pub.venue}</div>
                    <div class="publication-links">
                        ${pub.links.map(link => `<a href="${link.url}" target="_blank">${link.text}</a>`).join('')}
                    </div>
                </div>
            `).join('');
        }
    }
}

function updateTeachingContent(content) {
    if (content.courses && content.courses.length > 0) {
        const coursesContainer = document.querySelector('.courses-list');
        if (coursesContainer) {
            coursesContainer.innerHTML = content.courses.map(course => `
                <div class="card">
                    <h3 class="card-title">${course.title}</h3>
                    <div class="card-meta">${course.semester} | ${course.level}</div>
                    <p>${course.description}</p>
                </div>
            `).join('');
        }
    }
}

function updateAboutContent(content) {
    if (content.biography) {
        const bioElement = document.querySelector('.biography');
        if (bioElement) {
            bioElement.innerHTML = content.biography;
        }
    }
}

function updateContactContent(content) {
    if (content.contactInfo) {
        const contactInfo = content.contactInfo;
        
        // Update contact details
        Object.keys(contactInfo).forEach(key => {
            const element = document.querySelector(`[data-contact="${key}"]`);
            if (element) {
                element.textContent = contactInfo[key];
            }
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

