document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('show');
            const isOpen = mobileMenu.classList.contains('show');
            const toggleIcon = menuToggle.querySelector('i');
            if (toggleIcon) {
                toggleIcon.classList.toggle('fa-bars', !isOpen);
                toggleIcon.classList.toggle('fa-times', isOpen);
            }
        });

        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('show');
                const toggleIcon = menuToggle.querySelector('i');
                if (toggleIcon) {
                    toggleIcon.classList.remove('fa-times');
                    toggleIcon.classList.add('fa-bars');
                }
            });
        });
    }

    // Sticky Header
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 50);
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Cart Functionality
    const cartCountElem = document.querySelectorAll('.cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    function updateCartCount() {
        cartCountElem.forEach(elem => {
            if (elem) elem.textContent = cart.length;
        });
    }
    updateCartCount();

    // Contact Dropdown - Updated for click functionality
    const contactIcons = document.querySelectorAll('.contact-icon');
    contactIcons.forEach(icon => {
        const options = icon.querySelector('.contact-options');
        if (options) {
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other open dropdowns
                document.querySelectorAll('.contact-options.show').forEach(openOptions => {
                    if (openOptions !== options) {
                        openOptions.classList.remove('show');
                    }
                });
                
                options.classList.toggle('show');
            });
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.contact-icon')) {
            document.querySelectorAll('.contact-options.show').forEach(options => {
                options.classList.remove('show');
            });
        }
    });

    // Prevent dropdown from closing when clicking inside it
    document.querySelectorAll('.contact-options').forEach(options => {
        options.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitButton = document.getElementById('submit-button');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    // Event Listeners
    document.addEventListener('DOMContentLoaded', initializeContactPage);
    contactForm.addEventListener('submit', handleContactFormSubmit);

    // Initialize contact page
    function initializeContactPage() {
        // Check if user is logged in
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            // Pre-fill form with user data
            nameInput.value = user.name || '';
            emailInput.value = user.email || '';
            phoneInput.value = user.phone || '';
        }
        
        // Clear any existing messages
        clearMessages();
    }

    // Handle contact form submission
    async function handleContactFormSubmit(event) {
        event.preventDefault();
        
        // Clear any existing messages
        clearMessages();
        
        // Get form values
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim(),
            date: new Date().toISOString()
        };
        
        // Validate form
        if (!validateContactForm(formData)) {
            return;
        }
        
        try {
            // Show loading state
            setLoadingState(true);
            
            // Simulate form submission delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Save contact message to localStorage
            saveContactMessage(formData);
            
            // Show success message
            showSuccess('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
            
            // Reset form
            contactForm.reset();
            
            // Pre-fill form with user data if logged in
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                nameInput.value = user.name || '';
                emailInput.value = user.email || '';
                phoneInput.value = user.phone || '';
            }
        } catch (error) {
            console.error('Contact form submission error:', error);
            showError('حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى.');
        } finally {
            // Hide loading state
            setLoadingState(false);
        }
    }

    // Validate contact form
    function validateContactForm(formData) {
        // Reset validation styles
        resetValidationStyles();
        
        let isValid = true;
        
        // Validate name
        if (!formData.name) {
            showFieldError(nameInput, 'يرجى إدخال الاسم');
            isValid = false;
        }
        
        // Validate email
        if (!formData.email) {
            showFieldError(emailInput, 'يرجى إدخال البريد الإلكتروني');
            isValid = false;
        } else if (!isValidEmail(formData.email)) {
            showFieldError(emailInput, 'يرجى إدخال بريد إلكتروني صحيح');
            isValid = false;
        }
        
        // Validate phone
        if (!formData.phone) {
            showFieldError(phoneInput, 'يرجى إدخال رقم الهاتف');
            isValid = false;
        } else if (!isValidPhone(formData.phone)) {
            showFieldError(phoneInput, 'يرجى إدخال رقم هاتف صحيح');
            isValid = false;
        }
        
        // Validate subject
        if (!formData.subject) {
            showFieldError(subjectInput, 'يرجى إدخال الموضوع');
            isValid = false;
        }
        
        // Validate message
        if (!formData.message) {
            showFieldError(messageInput, 'يرجى إدخال الرسالة');
            isValid = false;
        } else if (formData.message.length < 10) {
            showFieldError(messageInput, 'يجب أن تكون الرسالة 10 أحرف على الأقل');
            isValid = false;
        }
        
        return isValid;
    }

    // Save contact message to localStorage
    function saveContactMessage(formData) {
        // Get existing messages
        const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        
        // Add new message
        messages.push(formData);
        
        // Save back to localStorage
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        // Log for debugging
        console.log('Contact message saved:', formData);
    }

    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        // Simple phone validation - can be enhanced for specific formats
        const phoneRegex = /^[0-9+\-\s()]{8,}$/;
        return phoneRegex.test(phone);
    }

    function showFieldError(input, message) {
        input.classList.add('error');
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        // Add error message after input
        input.parentNode.appendChild(errorElement);
    }

    function resetValidationStyles() {
        // Remove error class from all inputs
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            input.classList.remove('error');
        });
        
        // Remove all field error messages
        document.querySelectorAll('.field-error').forEach(error => {
            error.remove();
        });
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    }

    function showSuccess(message) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
    }

    function clearMessages() {
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';
    }

    function setLoadingState(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        } else {
            submitButton.disabled = false;
            submitButton.innerHTML = 'إرسال الرسالة';
        }
    }

    // Social Links Animation
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) scale(1.1)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });
    });
});