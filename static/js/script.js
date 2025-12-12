document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Sticky Navbar Logic
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Chatbot FAB Logic
    const chatbotFab = document.getElementById('chatbot-fab');

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Lower inc to slow and higher to slow
                const inc = target / speed;

                // Check if target is reached
                if (count < target) {
                    // Add inc to count and output in counter
                    counter.innerText = Math.ceil(count + inc);
                    // Call function every ms
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                    // Append '+' if it's the 50000 one (hacky but works for demo)
                    if (target === 50000) counter.innerText += '+';
                }
            };
            updateCount();
        });
    };

    // Trigger counter animation using Intersection Observer
    let counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect(); // Run once
            }
        });
    }, { threshold: 0.5 });

    if (document.querySelector('.counter')) {
        counterObserver.observe(document.querySelector('.counter'));
    }

    // Smooth scrolling for anchor links (if any internal links are added)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form Submission Handling for Book Test
    const bookTestForm = document.querySelector('form[action="/book-test-submit"]'); // Placeholder selector
    if (bookTestForm) {
        bookTestForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you! We will contact you soon.');
            bookTestForm.reset();
        });
    }

    // Generic Contact Form handling if selector differs
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thanks — we will contact you soon.');
            contactForm.reset();
        });
    }

    // Chatbot Logic
    const chatForm = document.getElementById('chatForm');
    const chatBox = document.getElementById('chatBox');
    const chatInput = document.getElementById('chatInput');

    if (chatForm) {
        chatForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (message) {
                // Add User Message
                addMessage(message, 'sent');
                chatInput.value = '';

                // Simulate AI Response (Simple Timeout)
                setTimeout(() => {
                    const responses = [
                        "Thank you for your message. How else can I assist you?",
                        "Our center is open from 8 AM to 9 PM.",
                        "You can book a test using the 'Book Test' page.",
                        "We offer MRI, CT Scan, Ultrasound, and Pathology services.",
                        "Please contact +91 98765 43210 for immediate assistance."
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addMessage(randomResponse, 'received');
                }, 1000);
            }
        });
    }

    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `d-flex mb-3 ${type === 'sent' ? 'justify-content-end' : 'justify-content-start'}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = `p-3 rounded-3 shadow-sm ${type === 'sent' ? 'bg-primary text-white' : 'bg-white'}`;
        contentDiv.style.maxWidth = '80%';
        contentDiv.textContent = text;

        messageDiv.appendChild(contentDiv);
        chatBox.appendChild(messageDiv);

        // Scroll to bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    }

});
