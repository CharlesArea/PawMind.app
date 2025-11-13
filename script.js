// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation to feature cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate feature cards on scroll
document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate about features
    const aboutFeatures = document.querySelectorAll('.about-features li');
    aboutFeatures.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-30px)';
        feature.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(feature);
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroPhone = document.querySelector('.hero-phone');
    
    if (hero && heroPhone && scrolled < window.innerHeight) {
        heroPhone.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Button interactions
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Download app button functionality
const downloadButtons = document.querySelectorAll('.store-badge, .store-badge-mobile, .btn-store-nav, .store-btn');
downloadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Check if it's iOS or Android button
        const isIOS = button.classList.contains('apple-store') || button.classList.contains('apple');
        const platform = isIOS ? 'iOS (App Store)' : 'Android (Google Play)';
        
        // In a real app, this would redirect to app store
        alert(`🐾 Thanks for your interest in PawMind for ${platform}! The app will be available soon. 100% FREE, forever!`);
    });
});

// Learn More button (secondary button in hero)
const learnMoreBtn = document.querySelector('.btn-secondary');
if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', () => {
        // Scroll to features section
        const featuresSection = document.querySelector('#features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Feature explore buttons functionality
const learnMoreButtons = document.querySelectorAll('.btn-explore');
learnMoreButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        const featureTitle = button.closest('.feature-content').querySelector('h3').textContent;
        alert(`📱 Learn more about ${featureTitle}! This feature is completely free and will be available when PawMind launches.`);
    });
});

// Add active state to navigation on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-nav');
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Phone screen feature tabs
const featureTabs = document.querySelectorAll('.feature-tab');
const phoneScreen = document.querySelector('.screen-content');

if (featureTabs.length > 0 && phoneScreen) {
    // Store original screen content
    const originalContent = phoneScreen.innerHTML;
    
    // Define different screen contents for each feature
    const screenContents = {
        home: originalContent,
        health: `
            <div class="status-bar">
                <span class="time">9:41</span>
                <div class="status-icons">
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                        <rect x="0.5" y="0.5" width="4" height="10" rx="1" fill="currentColor"/>
                        <rect x="5.5" y="2.5" width="4" height="8" rx="1" fill="currentColor" opacity="0.7"/>
                        <rect x="10.5" y="4.5" width="4" height="6" rx="1" fill="currentColor" opacity="0.4"/>
                    </svg>
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                        <rect x="0.5" y="0.5" width="15" height="10" rx="2" stroke="currentColor"/>
                        <path d="M16.5 4V8C17.5 8 17.5 4 16.5 4Z" fill="currentColor"/>
                        <rect x="2" y="2.5" width="11" height="7" rx="1" fill="currentColor"/>
                    </svg>
                </div>
            </div>
            <div class="screen-header">
                <h2 class="screen-title">Health Tracking</h2>
                <button class="add-btn">+</button>
            </div>
            <div class="pet-card">
                <h3 style="font-size: 0.9rem; margin-bottom: 15px;">Max's Health</h3>
                <div class="pet-stats">
                    <div class="stat-box">
                        <span class="stat-label">Last Checkup</span>
                        <span class="stat-value">2 weeks ago</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-label">Next Vaccine</span>
                        <span class="stat-value">In 3 months</span>
                    </div>
                </div>
            </div>
            <div class="reminders-section">
                <h4>Medical Records</h4>
                <div class="reminder-item">
                    <div class="reminder-icon">🏥</div>
                    <div class="reminder-text">
                        <span class="reminder-title">Annual Checkup</span>
                        <span class="reminder-time">Completed - Dec 1, 2024</span>
                    </div>
                </div>
                <div class="reminder-item">
                    <div class="reminder-icon">💉</div>
                    <div class="reminder-text">
                        <span class="reminder-title">Rabies Vaccine</span>
                        <span class="reminder-time">Due - March 15, 2025</span>
                    </div>
                </div>
            </div>
            <div class="bottom-nav">
                <div class="nav-item"><span>🏠</span></div>
                <div class="nav-item active"><span>📊</span></div>
                <div class="nav-item"><span>📸</span></div>
                <div class="nav-item"><span>👤</span></div>
            </div>
        `,
        expenses: `
            <div class="status-bar">
                <span class="time">9:41</span>
                <div class="status-icons">
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                        <rect x="0.5" y="0.5" width="4" height="10" rx="1" fill="currentColor"/>
                        <rect x="5.5" y="2.5" width="4" height="8" rx="1" fill="currentColor" opacity="0.7"/>
                        <rect x="10.5" y="4.5" width="4" height="6" rx="1" fill="currentColor" opacity="0.4"/>
                    </svg>
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                        <rect x="0.5" y="0.5" width="15" height="10" rx="2" stroke="currentColor"/>
                        <path d="M16.5 4V8C17.5 8 17.5 4 16.5 4Z" fill="currentColor"/>
                        <rect x="2" y="2.5" width="11" height="7" rx="1" fill="currentColor"/>
                    </svg>
                </div>
            </div>
            <div class="screen-header">
                <h2 class="screen-title">Expenses</h2>
                <button class="add-btn">+</button>
            </div>
            <div class="pet-card">
                <h3 style="font-size: 0.9rem; margin-bottom: 10px;">This Month</h3>
                <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 15px;">$248.50</h2>
                <div class="pet-stats">
                    <div class="stat-box">
                        <span class="stat-label">Food</span>
                        <span class="stat-value">$120</span>
                    </div>
                    <div class="stat-box">
                        <span class="stat-label">Medical</span>
                        <span class="stat-value">$85</span>
                    </div>
                </div>
            </div>
            <div class="reminders-section">
                <h4>Recent Expenses</h4>
                <div class="reminder-item">
                    <div class="reminder-icon">🍖</div>
                    <div class="reminder-text">
                        <span class="reminder-title">Dog Food</span>
                        <span class="reminder-time">$45.00 - Today</span>
                    </div>
                </div>
                <div class="reminder-item">
                    <div class="reminder-icon">🎾</div>
                    <div class="reminder-text">
                        <span class="reminder-title">New Toys</span>
                        <span class="reminder-time">$23.50 - Yesterday</span>
                    </div>
                </div>
            </div>
            <div class="bottom-nav">
                <div class="nav-item"><span>🏠</span></div>
                <div class="nav-item active"><span>📊</span></div>
                <div class="nav-item"><span>📸</span></div>
                <div class="nav-item"><span>👤</span></div>
            </div>
        `,
        reminders: `
            <div class="status-bar">
                <span class="time">9:41</span>
                <div class="status-icons">
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                        <rect x="0.5" y="0.5" width="4" height="10" rx="1" fill="currentColor"/>
                        <rect x="5.5" y="2.5" width="4" height="8" rx="1" fill="currentColor" opacity="0.7"/>
                        <rect x="10.5" y="4.5" width="4" height="6" rx="1" fill="currentColor" opacity="0.4"/>
                    </svg>
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                        <rect x="0.5" y="0.5" width="15" height="10" rx="2" stroke="currentColor"/>
                        <path d="M16.5 4V8C17.5 8 17.5 4 16.5 4Z" fill="currentColor"/>
                        <rect x="2" y="2.5" width="11" height="7" rx="1" fill="currentColor"/>
                    </svg>
                </div>
            </div>
            <div class="screen-header">
                <h2 class="screen-title">Reminders</h2>
                <button class="add-btn">+</button>
            </div>
            <div class="reminders-section" style="margin-top: 20px;">
                <h4>Today</h4>
                <div class="reminder-item">
                    <div class="reminder-icon">💊</div>
                    <div class="reminder-text">
                        <span class="reminder-title">Medication</span>
                        <span class="reminder-time">Today, 6:00 PM</span>
                    </div>
                </div>
                <div class="reminder-item">
                    <div class="reminder-icon">🍖</div>
                    <div class="reminder-text">
                        <span class="reminder-title">Dinner Time</span>
                        <span class="reminder-time">Today, 7:30 PM</span>
                    </div>
                </div>
            </div>
            <div class="reminders-section" style="margin-top: 20px;">
                <h4>Tomorrow</h4>
                <div class="reminder-item">
                    <div class="reminder-icon">🏥</div>
                    <div class="reminder-text">
                        <span class="reminder-title">Vet Checkup</span>
                        <span class="reminder-time">Tomorrow, 10:00 AM</span>
                    </div>
                </div>
                <div class="reminder-item">
                    <div class="reminder-icon">🛁</div>
                    <div class="reminder-text">
                        <span class="reminder-title">Grooming</span>
                        <span class="reminder-time">Tomorrow, 2:00 PM</span>
                    </div>
                </div>
            </div>
            <div class="bottom-nav">
                <div class="nav-item"><span>🏠</span></div>
                <div class="nav-item"><span>📊</span></div>
                <div class="nav-item active"><span>📸</span></div>
                <div class="nav-item"><span>👤</span></div>
            </div>
        `,
        memories: `
            <div class="status-bar">
                <span class="time">9:41</span>
                <div class="status-icons">
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                        <rect x="0.5" y="0.5" width="4" height="10" rx="1" fill="currentColor"/>
                        <rect x="5.5" y="2.5" width="4" height="8" rx="1" fill="currentColor" opacity="0.7"/>
                        <rect x="10.5" y="4.5" width="4" height="6" rx="1" fill="currentColor" opacity="0.4"/>
                    </svg>
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                        <rect x="0.5" y="0.5" width="15" height="10" rx="2" stroke="currentColor"/>
                        <path d="M16.5 4V8C17.5 8 17.5 4 16.5 4Z" fill="currentColor"/>
                        <rect x="2" y="2.5" width="11" height="7" rx="1" fill="currentColor"/>
                    </svg>
                </div>
            </div>
            <div class="screen-header">
                <h2 class="screen-title">Memories</h2>
                <button class="add-btn">+</button>
            </div>
            <div class="pet-card">
                <h3 style="font-size: 0.9rem; margin-bottom: 15px;">Max's Timeline</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                    <div style="height: 80px; background: linear-gradient(135deg, #FFE5F0 0%, #FFD6E8 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2rem;">📷</div>
                    <div style="height: 80px; background: linear-gradient(135deg, #E8F8F0 0%, #D4F4E8 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2rem;">🎉</div>
                    <div style="height: 80px; background: linear-gradient(135deg, #FFE5D6 0%, #FFD6C4 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2rem;">🐕</div>
                    <div style="height: 80px; background: linear-gradient(135deg, #E5E8FF 0%, #D6DCFF 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2rem;">❤️</div>
                </div>
            </div>
            <div class="reminders-section">
                <h4>Recent Moments</h4>
                <div class="reminder-item">
                    <div class="reminder-icon">🎂</div>
                    <div class="reminder-text">
                        <span class="reminder-title">Birthday Party</span>
                        <span class="reminder-time">Dec 15, 2024</span>
                    </div>
                </div>
                <div class="reminder-item">
                    <div class="reminder-icon">🏖️</div>
                    <div class="reminder-text">
                        <span class="reminder-title">Beach Day</span>
                        <span class="reminder-time">Nov 28, 2024</span>
                    </div>
                </div>
            </div>
            <div class="bottom-nav">
                <div class="nav-item"><span>🏠</span></div>
                <div class="nav-item"><span>📊</span></div>
                <div class="nav-item active"><span>📸</span></div>
                <div class="nav-item"><span>👤</span></div>
            </div>
        `
    };
    
    // Handle tab clicks
    featureTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            featureTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get screen type
            const screenType = this.getAttribute('data-screen');
            
            // Fade out animation
            phoneScreen.style.opacity = '0';
            phoneScreen.style.transform = 'scale(0.95)';
            
            // Change content after fade out
            setTimeout(() => {
                phoneScreen.innerHTML = screenContents[screenType] || screenContents.home;
                
                // Fade in animation
                setTimeout(() => {
                    phoneScreen.style.opacity = '1';
                    phoneScreen.style.transform = 'scale(1)';
                }, 50);
            }, 200);
        });
    });
    
    // Add smooth transition to phone screen
    phoneScreen.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

