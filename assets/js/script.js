// Language support system
let currentLang = 'en';
let translations = {};

// Load language files
async function loadTranslations() {
    try {
        const enResponse = await fetch('assets/js/lang/en.json');
        const zhResponse = await fetch('assets/js/lang/zh.json');
        
        translations['en'] = await enResponse.json();
        translations['zh'] = await zhResponse.json();
        
        updateContent(currentLang);
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Update content based on selected language
function updateContent(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const value = getTranslation(key, lang);
        
        if (value) {
            element.textContent = value;
        }
    });
}

// Get translation for a specific key
function getTranslation(key, lang) {
    const keys = key.split('.');
    let value = translations[lang];
    
    for (const k of keys) {
        if (value && value[k] !== undefined) {
            value = value[k];
        } else {
            return null;
        }
    }
    
    return value;
}

// Language switch event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadTranslations();
    
    const langEn = document.getElementById('lang-en');
    const langZh = document.getElementById('lang-zh');
    
    langEn.addEventListener('click', function() {
        currentLang = 'en';
        updateContent(currentLang);
        langEn.classList.add('active');
        langZh.classList.remove('active');
    });
    
    langZh.addEventListener('click', function() {
        currentLang = 'zh';
        updateContent(currentLang);
        langZh.classList.add('active');
        langEn.classList.remove('active');
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Change icon based on menu state
            const icon = mobileMenuBtn.querySelector('svg');
            if (navLinks.classList.contains('active')) {
                // Change to close icon
                icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
            } else {
                // Change back to menu icon
                icon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
            }
        });
    }
    
    // Close mobile menu when a link is clicked
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                // Change back to menu icon
                const icon = mobileMenuBtn.querySelector('svg');
                icon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuBtn.contains(event.target) && !navLinks.contains(event.target)) {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                // Change back to menu icon
                const icon = mobileMenuBtn.querySelector('svg');
                icon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
            }
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});