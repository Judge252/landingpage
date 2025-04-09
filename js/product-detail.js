document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle, Sticky Header, Smooth Scrolling, Cart Sync, Contact Dropdown
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

    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if (header) header.classList.toggle('sticky', window.scrollY > 50);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const cartCountElem = document.querySelectorAll('.cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    function updateCartCount() {
        cartCountElem.forEach(elem => {
            if (elem) elem.textContent = cart.length;
        });
    }
    updateCartCount();

    const contactIcon = document.querySelector('.contact-icon');
    const contactOptions = document.querySelector('.contact-options');
    if (contactIcon && contactOptions) {
        contactIcon.addEventListener('click', (e) => {
            e.preventDefault();
            contactOptions.classList.toggle('show');
            document.addEventListener('click', function closeDropdown(event) {
                if (!contactIcon.contains(event.target) && !contactOptions.contains(event.target)) {
                    contactOptions.classList.remove('show');
                    document.removeEventListener('click', closeDropdown);
                }
            });
        });
        contactIcon.addEventListener('mouseover', (e) => e.stopPropagation());
    }

    // Products Data (same as products.js)
    const productsData = [
        { id: 1, name: "جهاز المساج المحمول برو", category: "massage", price: 899, oldPrice: 1200, rating: 4.9, reviewCount: 124, image: "product1.jpg", isNew: true, isBestseller: true, description: "جهاز مساج محمول بتقنية الاهتزاز العميق لتخفيف الآلام والتوتر." },
        { id: 2, name: "وسادة طبية لدعم الرقبة", category: "pillows", price: 199, oldPrice: 249, rating: 4.7, reviewCount: 86, image: "product2.jpg", isNew: false, isBestseller: true, description: "وسادة مريحة تدعم الرقبة وتحسن جودة النوم." },
        { id: 3, name: "جهاز قياس ضغط الدم الرقمي", category: "measuring", price: 299, oldPrice: 399, rating: 4.8, reviewCount: 73, image: "product4.jpg", isNew: true, isBestseller: false, description: "جهاز دقيق لقياس ضغط الدم في المنزل." },
        { id: 4, name: "جهاز ركض منزلي احترافي", category: "treadmill", price: 3999, oldPrice: 4500, rating: 4.6, reviewCount: 38, image: "product5.jpg", isNew: true, isBestseller: false, description: "جهاز ركض قوي ومتين للتمارين المنزلية." },
        { id: 5, name: "جهاز مساج القدم الكهربائي", category: "massage", price: 599, oldPrice: 699, rating: 4.4, reviewCount: 64, image: "product6.jpg", isNew: false, isBestseller: true, description: "مساج قدم مريح لتخفيف الإجهاد بعد يوم طويل." },
        { id: 6, name: "وسادة لومبار لدعم أسفل الظهر", category: "pillows", price: 159, oldPrice: null, rating: 4.3, reviewCount: 47, image: "product7.jpg", isNew: false, isBestseller: false, description: "دعم مثالي لأسفل الظهر أثناء الجلوس." },
        { id: 7, name: "جهاز قياس السكر المنزلي", category: "measuring", price: 249, oldPrice: 299, rating: 4.7, reviewCount: 91, image: "product8.jpg", isNew: false, isBestseller: true, description: "جهاز سهل الاستخدام لمراقبة مستوى السكر." },
        { id: 8, name: "جهاز ركض قابل للطي", category: "treadmill", price: 2499, oldPrice: 2799, rating: 4.5, reviewCount: 56, image: "product10.jpg", isNew: true, isBestseller: false, description: "جهاز ركض عملي يمكن طيه لتوفير المساحة." },
        { id: 9, name: "وسادة طبية للنوم على الجانب", category: "pillows", price: 179, oldPrice: 229, rating: 4.6, reviewCount: 62, image: "product11.jpg", isNew: true, isBestseller: false, description: "وسادة مصممة للنوم المريح على الجانب." },
        { id: 10, name: "جهاز مساج اليد الذكي", category: "massage", price: 349, oldPrice: 399, rating: 4.8, reviewCount: 78, image: "product12.jpg", isNew: false, isBestseller: true, description: "مساج ذكي لليدين لتخفيف آلام المفاصل." },
        { id: 11, name: "عكاز تقليدي", category: "supports", price: 99, oldPrice: null, rating: 4.5, reviewCount: 50, image: "im/eldry/O404504_3152017131858-9-9.png", isNew: false, isBestseller: false, description: "عكاز بسيط ومتين لدعم المشي." },
        { id: 12, name: "مشايه لكبار السن Rollator Walker", category: "supports", price: 499, oldPrice: 599, rating: 4.7, reviewCount: 85, image: "im/eldry/H357049_315201710530-9-29.png", isNew: true, isBestseller: true, description: "مشاية مريحة مع عجلات لكبار السن." },
        { id: 13, name: "عكاز ٤ نقاط", category: "supports", price: 149, oldPrice: 179, rating: 4.6, reviewCount: 60, image: "im/eldry/Cat_240429_866.jpg", isNew: false, isBestseller: false, description: "عكاز بأربع نقاط لثبات إضافي." },
        { id: 14, name: "عكاكيز canadian crutches", category: "supports", price: 199, oldPrice: 249, rating: 4.4, reviewCount: 45, image: "im/eldry/Crutches8.jpg", isNew: false, isBestseller: false, description: "عكاكيز كندية مريحة للاستخدام اليومي." },
        { id: 15, name: "عكاكيز axillary crutches", category: "supports", price: 179, oldPrice: 219, rating: 4.5, reviewCount: 55, image: "im/eldry/25_4_1.jpg", isNew: false, isBestseller: false, description: "عكاكيز تحت الإبط لدعم الحركة." }
    ];

    // Get Product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = productsData.find(p => p.id === productId);

    // DOM Elements
    const productCardContainer = document.getElementById('product-card');
    const productName = document.getElementById('product-name');
    const productCurrentPrice = document.getElementById('product-current-price');
    const productOldPrice = document.getElementById('product-old-price');
    const productStars = document.getElementById('product-stars');
    const productReviewCount = document.getElementById('product-review-count');
    const productDescription = document.getElementById('product-description');
    const productDetailContainer = document.querySelector('.product-detail');

    // Populate Product Details
    if (product) {
        // Populate Product Card
        if (productCardContainer) {
            const badges = `${product.isNew ? '<span class="badge new-badge">جديد</span>' : ''}${product.isBestseller ? '<span class="badge bestseller-badge">الأكثر مبيعاً</span>' : ''}`;
            const priceHTML = product.oldPrice ? `<div class="product-price"><span class="current-price">${product.price} دولار</span><span class="old-price">${product.oldPrice} دولار</span></div>` : `<div class="product-price"><span class="current-price">${product.price} دولار</span></div>`;
            productCardContainer.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${badges}
                    <div class="product-actions">
                        <button class="action-btn"><i class="far fa-heart"></i></button>
                        <button class="action-btn add-to-cart"><i class="fas fa-shopping-cart"></i></button>
                        <button class="action-btn"><i class="fas fa-eye"></i></button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        <div class="stars">${generateStars(product.rating)}</div>
                        <span class="review-count">(${product.reviewCount})</span>
                    </div>
                    ${priceHTML}
                    <button class="btn add-to-cart-btn">أضف للسلة</button>
                </div>
            `;
        }

        // Populate Detailed Info
        if (productName) productName.textContent = product.name;
        if (productCurrentPrice) productCurrentPrice.textContent = `${product.price} دولار`;
        if (productOldPrice) productOldPrice.textContent = product.oldPrice ? `${product.oldPrice} دولار` : '';
        if (productStars) productStars.innerHTML = generateStars(product.rating);
        if (productReviewCount) productReviewCount.textContent = `(${product.reviewCount})`;
        if (productDescription) productDescription.textContent = product.description || "وصف المنتج غير متوفر حالياً.";

        // Add to Cart Functionality
        document.querySelectorAll('.add-to-cart, .add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent any form submission if present
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                alert(`تمت إضافة ${product.name} للسلة`);
            });
        });
    } else if (productDetailContainer) {
        productDetailContainer.innerHTML = '<p>المنتج غير موجود</p>';
    }

    // Generate Stars
    function generateStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
        if (halfStar) stars += '<i class="fas fa-star-half-alt"></i>';
        for (let i = 0; i < 5 - fullStars - (halfStar ? 1 : 0); i++) stars += '<i class="far fa-star"></i>';
        return stars;
    }
});