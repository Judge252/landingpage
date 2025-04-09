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
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                alert('شكراً لاشتراكك في نشرتنا البريدية!');
                emailInput.value = '';
            }
        });
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