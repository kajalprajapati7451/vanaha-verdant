document.addEventListener('DOMContentLoaded', function() {
    // ==================== Mobile Menu Toggle ====================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // ==================== Header Scroll Effect ====================
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ==================== Back to Top Button ====================
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==================== Smooth Scrolling ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== Popup Form ====================
    const popupForm = document.getElementById('popupForm');
    if (popupForm) {
        // Show popup after 5 seconds
        setTimeout(() => {
            if (!sessionStorage.getItem('popupShown')) {
                popupForm.classList.add('active');
                document.body.classList.add('no-scroll');
                sessionStorage.setItem('popupShown', 'true');
            }
        }, 5000);

        // Close popup
        document.querySelector('.close-popup')?.addEventListener('click', () => {
            popupForm.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });

        // Form submission
        document.getElementById('enquiryForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                interest: this.querySelector('select').value
            };
            
            // Here you would typically send this data to your server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your enquiry! Our team will contact you shortly.');
            popupForm.classList.remove('active');
            document.body.classList.remove('no-scroll');
            this.reset();
        });
    }

    // ==================== Chatbot Functionality ====================
    const chatbotTrigger = document.querySelector('.chatbot-trigger');
    const chatbotContainer = document.querySelector('.chatbot-container');
    
    if (chatbotTrigger && chatbotContainer) {
        chatbotTrigger.addEventListener('click', () => {
            chatbotContainer.classList.toggle('active');
        });
        
        document.querySelector('.close-chatbot')?.addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
        });
        
        // Simple Chatbot Functionality
        const chatbotMessages = document.querySelector('.chatbot-messages');
        const chatbotInput = document.querySelector('.chatbot-input input');
        const sendBtn = document.querySelector('.send-btn');
        
        // Initial bot message
        addChatbotMessage("Hello! Welcome to Vanaha Verdant. How can I help you today?");
        
        function addChatbotMessage(message, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('chatbot-message');
            
            if (isUser) {
                messageDiv.classList.add('user');
            } else {
                messageDiv.classList.add('bot');
            }
            
            messageDiv.innerHTML = `<p>${message}</p>`;
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
        
        function handleUserMessage() {
            const message = chatbotInput.value.trim();
            if (message) {
                addChatbotMessage(message, true);
                chatbotInput.value = '';
                
                // Bot response
                setTimeout(() => {
                    let response;
                    const lowerMsg = message.toLowerCase();
                    
                    if (lowerMsg.includes('price') || lowerMsg.includes('cost')) {
                        response = "We offer various pricing options. 2BHK starts at ₹1.2Cr, 3BHK at ₹1.8Cr, and villas at ₹2.5Cr onwards. Would you like a detailed brochure?";
                    } else if (lowerMsg.includes('amenities') || lowerMsg.includes('facilities')) {
                        response = "Our property features a clubhouse, swimming pool, gym, landscaped gardens, children's play area, and 24/7 security. Check our Amenities section for photos!";
                    } else if (lowerMsg.includes('contact') || lowerMsg.includes('call') || lowerMsg.includes('number')) {
                        response = "You can reach our sales team at +91 9876543210 or email sales@vanahaverdant.com. Our sales office is open 9AM-7PM daily.";
                    } else if (lowerMsg.includes('location') || lowerMsg.includes('map') || lowerMsg.includes('where')) {
                        response = "Vanaha Verdant is located in Prime City, Bangalore, just 5 minutes from the new metro station. Check our Location section for the exact map.";
                    } else if (lowerMsg.includes('thank')) {
                        response = "You're welcome! Is there anything else I can help you with?";
                    } else if (lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('hey')) {
                        response = "Hello there! How can I assist you with Vanaha Verdant today?";
                    } else {
                        response = "Thank you for your message. Our sales team will contact you shortly. Meanwhile, you might find answers in our Features or Amenities sections.";
                    }
                    
                    addChatbotMessage(response);
                }, 1000);
            }
        }
        
        sendBtn?.addEventListener('click', handleUserMessage);
        chatbotInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleUserMessage();
            }
        });
    }

    // ==================== Scroll Animations ====================
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .amenity-item, .gallery-item, .location-card, .stat');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }
    
    // Initialize elements with animation classes
    document.querySelectorAll('.feature-card, .amenity-item, .gallery-item, .location-card, .stat').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Add animate class to elements in view
    function checkAnimation() {
        document.querySelectorAll('.feature-card, .amenity-item, .gallery-item, .location-card, .stat').forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    window.addEventListener('scroll', checkAnimation);
    window.addEventListener('load', checkAnimation);

    // ==================== Contact Form Submission ====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: this.querySelector('input[name="name"]').value,
                email: this.querySelector('input[name="email"]').value,
                phone: this.querySelector('input[name="phone"]').value,
                message: this.querySelector('textarea').value
            };
            
            // Here you would typically send this data to your server
            console.log('Contact form submitted:', formData);
            
            // Show success message
            alert('Thank you for your message! We will get back to you within 24 hours.');
            this.reset();
        });
    }

    // ==================== Floating Action Buttons ====================
    const floatButtons = document.querySelectorAll('.float-btn');
    floatButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.classList.contains('whatsapp') ? 
                'https://wa.me/919876543210' : 
                'tel:+919876543210';
            window.open(action, '_blank');
        });
    });
});

// Add this to your CSS for the animations:
/*
.feature-card.animate,
.amenity-item.animate,
.gallery-item.animate,
.location-card.animate,
.stat.animate {
    opacity: 1 !important;
    transform: translateY(0) !important;
}
*/
// Form Submission with Email
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Form elements
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const spinner = submitBtn.querySelector('.loading-spinner');
            
            // Validate form
            let isValid = true;
            
            // Clear previous errors
            contactForm.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            // Name validation
            if (!formData.get('name') || formData.get('name').trim().length < 3) {
                showError(contactForm, 'name', 'Please enter your full name');
                isValid = false;
            }
            
            // Email validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.get('email'))) {
                showError(contactForm, 'email', 'Please enter a valid email');
                isValid = false;
            }
            
            // Interest validation
            if (!formData.get('interest')) {
                showError(contactForm, 'interest', 'Please select property type');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                submitBtn.disabled = true;
                btnText.textContent = 'Sending...';
                spinner.style.display = 'block';
                
                try {
                    // Using FormSubmit.co service (replace with your email)
                    const response = await fetch('https://formsubmit.co/ajax/your-email@example.com', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            name: formData.get('name'),
                            email: formData.get('email'),
                            interest: formData.get('interest'),
                            message: formData.get('message') || 'No additional requirements',
                            _subject: 'Vanaha Verdant Information Request',
                            _template: 'table'
                        })
                    });
                    
                    if (response.ok) {
                        alert('Thank you! We have sent the property details to your email.');
                        contactForm.reset();
                    } else {
                        throw new Error('Failed to send');
                    }
                } catch (error) {
                    alert('Something went wrong. Please try again later.');
                    console.error('Error:', error);
                } finally {
                    // Reset button
                    submitBtn.disabled = false;
                    btnText.textContent = 'Get Details in Email';
                    spinner.style.display = 'none';
                }
            }
        });
    }
    
    function showError(form, fieldName, message) {
        const errorElement = form.querySelector(`[name="${fieldName}"] + .error-message`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
});
// Show popup when page loads
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('vanahaPopup').style.display = 'flex';
    }, 1000); // Show after 1 second delay
});

// Close functionality
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('vanahaPopup').style.display = 'none';
});

document.querySelector('.popup-overlay').addEventListener('click', function() {
    document.getElementById('vanahaPopup').style.display = 'none';
});

// Form submission
document.querySelector('.vanaha-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    let isValid = true;
    document.querySelectorAll('.vanaha-form input, .vanaha-form select').forEach(el => {
        if (!el.value.trim()) isValid = false;
    });
    
    if (isValid) {
        // Here you would typically send data to server
        alert('Thank you for your interest in Vanaha Verdant! Our team will contact you shortly.');
        document.getElementById('vanahaPopup').style.display = 'none';
    } else {
        alert('Please fill all required fields');
    }
});
emailjs.init('YOUR_USER_ID');
emailjs.send("service_brg4zsl","template_cqfjh2r");
document.addEventListener('DOMContentLoaded', function() {
        const popup = document.getElementById('vanahaPopup');
        const closeBtn = document.querySelector('.close-btn');
        
        // Show popup after slight delay
        setTimeout(() => {
            popup.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }, 1000);
        
        // Close functionality
        closeBtn.addEventListener('click', closePopup);
        document.querySelector('.popup-overlay').addEventListener('click', closePopup);
        
        function closePopup() {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
        
        // Close with ESC key
        document.addEventListener('keydown', function(e) {
            if(e.key === 'Escape') closePopup();
        });
    });
    document.addEventListener('DOMContentLoaded', function() {
  // Get all view details buttons
  const viewButtons = document.querySelectorAll('.view-details-btn');
  const formContainer = document.getElementById('vanahaForm');
  const closeButton = document.querySelector('.close-form-btn');
  const selectedPlanSpan = document.getElementById('selectedPlan');
  
  // Add click event to each button
  viewButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Get the plan name from data attribute
      const planName = this.getAttribute('data-plan');
      selectedPlanSpan.textContent = planName;
      
      // Show the form
      formContainer.style.display = 'flex';
    });
  });
  
  // Close form when close button is clicked
  closeButton.addEventListener('click', function() {
    formContainer.style.display = 'none';
  });
  
  // Close form when overlay is clicked
  document.querySelector('.form-overlay').addEventListener('click', function() {
    formContainer.style.display = 'none';
  });
});
