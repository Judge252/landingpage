document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle (same as index.js)
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('show');
        const isOpen = mobileMenu.classList.contains('show');
        menuToggle.querySelector('i').classList.toggle('fa-bars', !isOpen);
        menuToggle.querySelector('i').classList.toggle('fa-times', isOpen);
    });

    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('show');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });

    // Sticky Header (same as index.js)
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        header.classList.toggle('sticky', window.scrollY > 50);
    });

    // Cart Functionality
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    const cartCountEl = document.querySelector('.cart-count');
    const checkoutBtn = document.querySelector('.checkout-btn');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart fa-3x"></i>
                    <p>سلتك فارغة حاليًا. ابدأ التسوق الآن!</p>
                    <a href="products.html" class="btn primary-btn pulse-animation">تسوق الآن</a>
                </div>
            `;
            cartSummary.style.display = 'none';
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </div>
                    <span class="cart-item-price">${item.price} دولار</span>
                    <div class="cart-item-quantity">
                        <button class="decrease">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase">+</button>
                    </div>
                    <button class="cart-item-remove"><i class="fas fa-trash"></i></button>
                `;
                cartItemsContainer.appendChild(cartItem);

                // Quantity controls
                cartItem.querySelector('.increase').addEventListener('click', () => {
                    cart[index].quantity++;
                    updateCart();
                });
                cartItem.querySelector('.decrease').addEventListener('click', () => {
                    if (cart[index].quantity > 1) {
                        cart[index].quantity--;
                        updateCart();
                    }
                });
                cartItem.querySelector('.cart-item-remove').addEventListener('click', () => {
                    cart.splice(index, 1);
                    updateCart();
                });
            });
            cartSummary.style.display = 'block';
        }

        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        subtotalEl.textContent = `${subtotal} دولار`;
        totalEl.textContent = `${subtotal} دولار`; // Shipping is free
        
        // Use the global updateCartCount function if available, otherwise fall back to local update
        if (window.updateCartCount) {
            window.updateCartCount();
        } else {
            // Fallback for backwards compatibility
            cartCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
        
        // Save cart to localStorage - this will trigger the storage event for other pages
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Checkout Button
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('تم إتمام الشراء بنجاح! شكرًا لتسوقك معنا.');
            cart = [];
            updateCart();
        }
    });

    // Sample cart items (for testing)
    if (cart.length === 0) {
        cart = [
            { name: 'جهاز المساج المحمول برو', description: 'مساج احترافي', price: 899, quantity: 1, image: 'im/5.jpg' },
            { name: 'وسادة طبية', description: 'راحة أثناء النوم', price: 150, quantity: 2, image: 'im/pillow.jpg' }
        ];
    }
    updateCart();
});