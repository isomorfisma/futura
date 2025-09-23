const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const animationType = element.dataset.animation;
            if (animationType) {
                element.classList.add(`animate-${animationType}`);
            }
            if (element.classList.contains('paragraph-reveal')) {
                setTimeout(() => {
                    element.classList.add('revealed');
                }, 300);
            }
            observer.unobserve(element);
        }
    });
}, observerOptions);

const staggeredObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const icons = entry.target.querySelectorAll('[data-animation="iconBounce"]');
            icons.forEach((icon, index) => {
                setTimeout(() => {
                    icon.classList.add('animate-iconBounce');
                }, index * 150); 
            });
            staggeredObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function () {
    const elements = [
        { selector: '.animate-fadeInLeft', delay: 100 },
        { selector: '.animate-fadeInRight', delay: 100 },
        { selector: 'div.animate-fadeInUp', delay: 600 },
        { selector: 'p.animate-fadeInUp', delay: 600 },
        { selector: '.animate-scaleIn', delay: 1000 },
        { selector: 'h2.animate-fadeInUp', delay: 1000 },
        { selector: 'button.animate-fadeInUp', delay: 1100 }
    ];

    elements.forEach((item, index) => {
        const element = document.querySelector(item.selector);
        if (element) {
            setTimeout(() => {
                element.style.opacity = '1';
            }, item.delay);
        }
    });

    const button = document.querySelector('button');
    if (button) {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05) rotate(1deg)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    scrollElements.forEach(el => observer.observe(el));

    const iconContainers = document.querySelectorAll('.grid');
    iconContainers.forEach(container => staggeredObserver.observe(container));
});