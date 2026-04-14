document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- 2. Navbar Background on Scroll ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 15, 30, 0.9)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'var(--glass-bg)';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- 3. Number Counter Animation ---
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            // Check if it's already animated
            if(!counter.classList.contains('animated')) {
                const count = +counter.innerText.replace('+', '');
                const inc = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(animateCounters, 10);
                } else {
                    counter.innerText = target + '+';
                    counter.classList.add('animated');
                }
            }
        });
    };

    // Use Intersection Observer to start counter when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // --- 4. Initialize Particles.js if element exists ---
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": { "enable": true, "value_area": 800 }
                },
                "color": { "value": "#00ff88" },
                "shape": {
                    "type": "circle",
                    "stroke": { "width": 0, "color": "#000000" }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": { "enable": false }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00bbff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": { "enable": false }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    // --- 5. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if(currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

    // --- 6. Form Submission Simulation ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = document.querySelector('.form-message');
            const btn = contactForm.querySelector('button[type="submit"]');

            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;


            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                message.classList.add('success');
                contactForm.reset();

                setTimeout(() => {
                    message.classList.remove('success');
                }, 5000);
            }, 1500);
        });
    }
});
// <!-- Forminit SDK -->

  const forminit = new Forminit();
  const FORM_ID = "4jtawhfx8w6";

  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");
  const submitButton = form.querySelector('button[type="submit"]');
  const submitText = document.getElementById("submit-text");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Loading state
    submitButton.disabled = true;
    submitText.innerHTML = "Sending...";
    messageBox.innerHTML = "";

    const formData = new FormData(form);

     const { error } = await forminit.submit(FORM_ID, formData);

    // Reset button
    submitButton.disabled = false;
    submitText.innerHTML =
      'Submit Request <i class="fas fa-solid fa-paper-plane"></i>';

    if (error) {
      messageBox.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        ${error.message}
      `;
      messageBox.style.color = "#ff4d4f";
      return;
    }

    // Success
    messageBox.innerHTML = `
      <i class="fas fa-solid fa-circle-check"></i>
      Thank you! Your message has been sent successfully.<br>
      We will get back to you soon.
    `;
    messageBox.style.color = "#22c55e";

    form.reset();
  });
