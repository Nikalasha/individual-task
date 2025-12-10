// Головний JavaScript файл

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initContactForm();
    initScrollEffects();
    initAnimations();
});

// Мобільне меню
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Зміна іконки
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }
    
    // Закриття меню при кліку на посилання
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuToggle) {
                menuToggle.querySelector('i').className = 'fas fa-bars';
            }
        });
    });
}

// Форма зворотного зв'язку
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Отримуємо дані форми
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // Проста валідація
            if (validateForm(formData)) {
                // Показуємо завантаження
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Відправка...';
                submitBtn.disabled = true;
                
                // Симулюємо відправку
                setTimeout(() => {
                    showMessage('Дякуємо, ' + formData.name + '! Ваше повідомлення відправлено. Ми зв\'яжемося з вами протягом 24 годин.', 'success');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
}

// Валідація форми
function validateForm(data) {
    // Перевірка імені
    if (!data.name.trim()) {
        showMessage('Будь ласка, введіть ваше ім\'я', 'error');
        return false;
    }
    
    // Перевірка email
    if (!data.email.trim() || !isValidEmail(data.email)) {
        showMessage('Будь ласка, введіть коректний email', 'error');
        return false;
    }
    
    // Перевірка повідомлення
    if (!data.message.trim()) {
        showMessage('Будь ласка, введіть ваше повідомлення', 'error');
        return false;
    }
    
    return true;
}

// Перевірка email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Показ повідомлень
function showMessage(message, type) {
    // Видаляємо старі повідомлення
    const oldMessage = document.querySelector('.message');
    if (oldMessage) {
        oldMessage.remove();
    }
    
    // Створюємо нове повідомлення
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.innerHTML = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 300px;
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Анімація появи
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
        messageDiv.style.opacity = '1';
    }, 100);
    
    // Автоматичне видалення
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(400px)';
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, 5000);
}

// Ефекти при скролі
function initScrollEffects() {
    // Плавна прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Зміна шапки при скролі
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
}

// Прості анімації
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Анімуємо картки
    document.querySelectorAll('.service-card, .portfolio-item, .team-member, .review-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Додаткові покращення
window.addEventListener('resize', function() {
    // Закриваємо меню при зміні розміру на більший
    if (window.innerWidth > 768) {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        if (navLinks && menuToggle) {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        }
    }
});