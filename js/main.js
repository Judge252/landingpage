// Load Header and Footer
document.addEventListener('DOMContentLoaded', async () => {
    // Load Header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        try {
            const response = await fetch('components/header.html');
            const headerHtml = await response.text();
            headerPlaceholder.innerHTML = headerHtml;
            initializeHeader();
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }

    // Load Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        try {
            const response = await fetch('components/footer.html');
            const footerHtml = await response.text();
            footerPlaceholder.innerHTML = footerHtml;
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }

    // Initialize components
    initializeMobileMenu();
    
    // Update cart count on page load and every time cart changes
    updateCartCount();
    syncCartCount();
    
    checkAuth();
});

// Initialize Header Components
function initializeHeader() {
    const userMenu = document.querySelector('.user-menu');
    const authLinks = document.querySelector('.auth-links');
    const userIcon = document.querySelector('.user-icon');
    const userName = document.querySelector('.user-name');
    const logoutBtn = document.querySelector('.logout-btn');

    if (userMenu && authLinks) {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        if (token && user.name) {
            userMenu.classList.add('show');
            authLinks.style.display = 'none';
            userName.textContent = user.name;

            // Add click event for mobile menu
            userIcon.addEventListener('click', () => {
                userMenu.classList.toggle('show');
            });

            // Handle logout
            if (logoutBtn) {
                logoutBtn.addEventListener('click', logout);
            }
        } else {
            userMenu.classList.remove('show');
            authLinks.style.display = 'flex';
        }
    }
}

// Mobile Menu Toggle
function initializeMobileMenu() {
    // Skip if already initialized by another script
    if (window.mobileMenuInitialized) {
        console.log('Mobile menu already initialized, skipping in main.js');
        return;
    }
    
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle && mobileMenu) {
        console.log('Initializing mobile menu from main.js');
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('show');
            console.log('Menu toggled:', mobileMenu.classList.contains('show'));
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('show')) {
                if (!e.target.closest('.mobile-menu') && !e.target.closest('.menu-toggle')) {
                    mobileMenu.classList.remove('show');
                }
            }
        });
    }
}

// Update Cart Count
function updateCartCount() {
    // Get all cart count elements (both in header and mobile view)
    const cartCountElements = document.querySelectorAll('.cart-count');
    if (cartCountElements.length === 0) return;

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    
    // Update all cart count elements
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

// Expose the function globally so it can be called from other scripts
window.updateCartCount = updateCartCount;

// Add an event listener to update cart count whenever localStorage changes
window.addEventListener('storage', (event) => {
    if (event.key === 'cart') {
        updateCartCount();
    }
});

// Check Authentication Status
function checkAuth() {
    // For demonstration purposes only - in a real app, you'd use a proper auth system
    // If this is the first visit, set as authenticated with a default user
    if (localStorage.getItem('isAuthenticated') === null) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', 'محمد أحمد');
    }
    
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const currentUser = localStorage.getItem('currentUser');
    
    // Update user icons to reflect login status
    const authIcons = document.querySelectorAll('.auth-icon a');
    if (authIcons.length > 0) {
        authIcons.forEach(icon => {
            // If authenticated, link to profile, otherwise to login
            if (isAuthenticated) {
                icon.href = 'profile.html';
                // Add a subtle indicator that user is logged in (optional)
                icon.classList.add('logged-in');
            } else {
                icon.href = 'login.html';
                icon.classList.remove('logged-in');
            }
        });
    }
}

// Logout Function
function logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Add to Favorites
function addToFavorites(item) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const existingItem = favorites.find(fav => fav.id === item.id);

    if (existingItem) {
        const updatedFavorites = favorites.filter(fav => fav.id !== item.id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        showNotification('تمت إزالة العنصر من المفضلة');
    } else {
        favorites.push(item);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showNotification('تمت إضافة العنصر إلى المفضلة');
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Add styles for the notification if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                left: 20px;
                padding: 15px 25px;
                border-radius: 10px;
                color: white;
                font-weight: 500;
                z-index: 9999;
                transform: translateY(100px);
                opacity: 0;
                transition: all 0.3s ease;
                animation: notification-slide 0.3s forwards;
            }
            
            @keyframes notification-slide {
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .notification.success {
                background-color: #70AD47;
            }
            
            .notification.error {
                background-color: #E63946;
            }
            
            .notification.info {
                background-color: #1D3557;
            }
            
            [dir="rtl"] .notification {
                left: auto;
                right: 20px;
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(100px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Function to synchronize cart counts across all elements
function syncCartCount() {
    // First update from localStorage
    updateCartCount();
    
    // Find all direct cart count elements that aren't in placeholders
    const cartElements = document.querySelectorAll('.cart-count');
    cartElements.forEach(element => {
        if (!element.closest('[id$="-placeholder"]')) {
            element.textContent = getCartItemCount();
        }
    });
    
    // Look for any add-to-cart buttons and add event listeners
    document.querySelectorAll('.add-to-cart-btn, .add-to-cart, [class*="cart"]').forEach(button => {
        if (!button.dataset.cartListenerAdded) {
            button.dataset.cartListenerAdded = 'true';
            button.addEventListener('click', () => {
                // Add a small delay to ensure localStorage is updated first
                setTimeout(updateCartCount, 50);
            });
        }
    });
}

// Helper function to get cart item count
function getCartItemCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
}

document.addEventListener('DOMContentLoaded', function() {
    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.getElementById('main-header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('show');
        });
    }

    // Contact Options Dropdown
    const contactIcons = document.querySelectorAll('.contact-icon');
    
    contactIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation();
            const options = this.querySelector('.contact-options');
            if (options) {
                options.classList.toggle('show');
                
                // Close other open contact options
                contactIcons.forEach(otherIcon => {
                    if (otherIcon !== icon) {
                        const otherOptions = otherIcon.querySelector('.contact-options');
                        if (otherOptions) {
                            otherOptions.classList.remove('show');
                        }
                    }
                });
            }
        });
    });
    
    // Close dropdowns when clicking elsewhere
    document.addEventListener('click', function() {
        document.querySelectorAll('.contact-options').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    });

    // Prevent clicks inside dropdown from closing it
    document.querySelectorAll('.contact-options').forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // Newsletter Form Submission
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('شكراً لاشتراكك في النشرة البريدية!');
                this.reset();
            }
        });
    });

    // Check authentication status when the page loads
    checkAuth();
    
    // Add event listeners for auth icons
    const authIcons = document.querySelectorAll('.auth-icon a');
    authIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
            if (isAuthenticated) {
                // Only show notification if we're not already on the profile page
                if (!window.location.href.includes('profile.html')) {
                    showNotification('جاري الانتقال إلى صفحة الملف الشخصي', 'info');
                }
            } else {
                // Redirect to login (this won't happen in our demo since we auto-authenticate)
                e.preventDefault();
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('currentUser', 'محمد أحمد');
                showNotification('تم تسجيل الدخول بنجاح', 'success');
                setTimeout(() => {
                    window.location.href = 'profile.html';
                }, 1000);
            }
        });
    });
    
    // Add CSS for logged-in icon state
    const style = document.createElement('style');
    style.textContent = `
        .auth-icon a.logged-in i {
            color: var(--secondary-color);
        }
    `;
    document.head.appendChild(style);
}); 