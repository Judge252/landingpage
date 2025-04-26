document.addEventListener('DOMContentLoaded', function() {
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

        // Close mobile menu when a link is clicked
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

    // Enhanced Banner Carousel with Performance Optimization
    const bannerSlides = document.querySelectorAll('.banner-slide');
    const bannerDots = document.querySelectorAll('.banner-dot');
    const prevButton = document.querySelector('.banner-prev');
    const nextButton = document.querySelector('.banner-next');
    let currentSlide = 0;
    let autoSlideInterval;
    const slideDuration = 5000; // 5 seconds per slide
    let isAnimating = false; // Flag to prevent rapid clicking during animation
    
    // Initialize banner carousel
    function initBannerCarousel() {
        if (bannerSlides.length === 0) return;
        
        // Preload all images to prevent flicker on first slide
        const preloadImages = () => {
            bannerSlides.forEach(slide => {
                const img = slide.querySelector('img');
                if (img && img.src) {
                    const preloadImg = new Image();
                    preloadImg.src = img.src;
                }
            });
        };
        preloadImages();
        
        // Show first slide and begin auto-slide
        showSlide(currentSlide);
        startAutoSlide();
        
        // Add event listeners
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (isAnimating) return;
                stopAutoSlide();
                showSlide(currentSlide - 1);
                startAutoSlide();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (isAnimating) return;
                stopAutoSlide();
                showSlide(currentSlide + 1);
                startAutoSlide();
            });
        }
        
        bannerDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (isAnimating || currentSlide === index) return;
                stopAutoSlide();
                showSlide(index);
                startAutoSlide();
            });
        });

        // Add touch/swipe events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        const bannerContainer = document.querySelector('.banner-container');
        if (bannerContainer) {
            bannerContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoSlide();
            }, {passive: true});
            
            bannerContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                startAutoSlide();
            }, {passive: true});
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) < swipeThreshold) return;
            
            if (swipeDistance < 0) {
                // Swipe left - next slide
                showSlide(currentSlide + 1);
            } else {
                // Swipe right - previous slide
                showSlide(currentSlide - 1);
            }
        }
    }
    
    // Show the specified slide with optimized animation
    function showSlide(index) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Handle loop around
        if (index < 0) {
            index = bannerSlides.length - 1;
        } else if (index >= bannerSlides.length) {
            index = 0;
        }
        
        // Hide all slides and remove active class from dots
        bannerSlides.forEach(slide => {
            slide.classList.remove('active');
            if (slide !== bannerSlides[index]) {
                slide.style.display = 'none';
            }
        });
        
        bannerDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Prepare the next slide
        bannerSlides[index].style.display = 'flex';
        
        // Use requestAnimationFrame for smoother animation
        requestAnimationFrame(() => {
            // Allow a brief moment for display:flex to take effect
            setTimeout(() => {
                // Show the current slide and set its dot to active
                bannerSlides[index].classList.add('active');
                if (bannerDots[index]) {
                    bannerDots[index].classList.add('active');
                }
                
                currentSlide = index;
                
                // Reset animation flag after transition completes
                setTimeout(() => {
                    isAnimating = false;
                }, 400); // Match this with the CSS transition duration
            }, 20);
        });
    }
    
    // Start auto slide with performance optimization
    function startAutoSlide() {
        clearInterval(autoSlideInterval); // Clear any existing interval
        autoSlideInterval = setInterval(() => {
            if (!document.hidden) { // Only advance slides when page is visible
                showSlide(currentSlide + 1);
            }
        }, slideDuration);
    }
    
    // Stop auto slide
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Initialize the carousel
    initBannerCarousel();

    // Pause auto-slide when user interacts with the carousel
    const bannerCarousel = document.querySelector('.banner-carousel');
    if (bannerCarousel) {
        bannerCarousel.addEventListener('mouseenter', stopAutoSlide);
        bannerCarousel.addEventListener('mouseleave', startAutoSlide);
        
        // Optimize for mobile devices
        bannerCarousel.addEventListener('touchstart', stopAutoSlide, {passive: true});
        bannerCarousel.addEventListener('touchend', startAutoSlide, {passive: true});
    }
    
    // Optimize for page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

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
    
    // Contact Form Submission
    const contactForm = document.getElementById('quick-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const phone = document.getElementById('contact-phone').value;
            const message = document.getElementById('contact-message').value;
            
            // Here you would normally send this data to your server
            // For now, let's just show a success message
            
            // Create success message element
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>تم إرسال رسالتك بنجاح!</h3>
                <p>شكراً ${name}، سنتواصل معك قريباً على ${email} أو ${phone}</p>
            `;
            
            // Replace form with success message
            contactForm.style.transition = 'opacity 0.3s ease';
            contactForm.style.opacity = '0';
            setTimeout(() => {
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
                contactForm.style.opacity = '1';
            }, 300);
            
            // Reset form after 5 seconds (optional)
            setTimeout(() => {
                contactForm.style.opacity = '0';
                setTimeout(() => {
                    contactForm.innerHTML = `
                        <div class="form-group">
                            <input type="text" id="contact-name" name="name" placeholder="الاسم الكامل" required>
                        </div>
                        <div class="form-group">
                            <input type="email" id="contact-email" name="email" placeholder="البريد الإلكتروني" required>
                        </div>
                        <div class="form-group">
                            <input type="tel" id="contact-phone" name="phone" placeholder="رقم الهاتف" required>
                        </div>
                        <div class="form-group">
                            <textarea id="contact-message" name="message" placeholder="كيف يمكننا مساعدتك؟" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="btn primary-btn">إرسال الرسالة</button>
                    `;
                    contactForm.style.opacity = '1';
                }, 300);
            }, 5000);
        });
    }

    // Testimonial Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        if (testimonialCards.length > 0) {
            testimonialCards.forEach((card, i) => {
                card.style.display = i === index ? 'block' : 'none';
            });
        }
    }

    if (testimonialCards.length > 0) {
        showTestimonial(currentTestimonial);

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
                showTestimonial(currentTestimonial);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
                showTestimonial(currentTestimonial);
            });
        }

        // Auto-slide every 5 seconds
        setInterval(() => {
            if (!document.hidden) { // Only advance when page is visible
                currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
                showTestimonial(currentTestimonial);
            }
        }, 5000);
    }

    // Initialize cart functionality
    initializeCart();
});

// Function to initialize cart functionality
function initializeCart() {
    // Find any "Add to Cart" buttons on the page and add click handlers
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn, .primary-btn');
    
    addToCartButtons.forEach(button => {
        if (!button.dataset.cartInitialized) {
            button.dataset.cartInitialized = 'true';
            
            button.addEventListener('click', (e) => {
                // Prevent default only if it's not a link to another page
                if (!button.getAttribute('href') || button.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                }
                
                // Get product data from the button or its closest product container
                const productContainer = button.closest('.product-card') || button.closest('.featured-product');
                
                if (productContainer) {
                    // Extract product info from container
                    const productName = productContainer.querySelector('h3')?.textContent || 'منتج مميز';
                    const productPrice = extractPrice(productContainer);
                    const productImage = productContainer.querySelector('img')?.src || 'images/placeholder.jpg';
                    
                    // Add to cart
                    addToCart({
                        id: generateProductId(productName),
                        name: productName,
                        price: productPrice,
                        quantity: 1,
                        image: productImage,
                        description: productContainer.querySelector('p')?.textContent || 'منتج مميز من مجموعتنا'
                    });
                    
                    // Show notification
                    showAddToCartNotification(productName);
                }
            });
        }
    });
    
    // Update cart count
    if (window.updateCartCount) {
        window.updateCartCount();
    }
}

// Helper function to extract price from product container
function extractPrice(container) {
    const priceElement = container.querySelector('.new-price') || container.querySelector('.featured-price') || container.querySelector('.current-price');
    if (priceElement) {
        const priceText = priceElement.textContent.trim();
        const priceMatch = priceText.match(/(\d+)/);
        return priceMatch ? parseInt(priceMatch[0]) : 0;
    }
    return 0;
}

// Generate a unique product ID
function generateProductId(name) {
    return 'product_' + name.trim().toLowerCase().replace(/\s+/g, '_') + '_' + Math.floor(Math.random() * 1000);
}

// Add product to cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.name === product.name);
    
    if (existingProductIndex !== -1) {
        // If exists, increase quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // Otherwise add new product
        cart.push(product);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count using global function if available
    if (window.updateCartCount) {
        window.updateCartCount();
    }
}

// Show notification when product is added to cart
function showAddToCartNotification(productName) {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.cart-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>تم إضافة "${productName}" إلى السلة</p>
        <a href="cart.html" class="view-cart">عرض السلة</a>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}