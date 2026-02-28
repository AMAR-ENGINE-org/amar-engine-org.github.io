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
        });
    }
    
    // Close mobile menu when a link is clicked
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
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