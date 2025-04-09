document.addEventListener('DOMContentLoaded', () => {
    console.log('Products.js loaded'); // Debug statement
    
    // Mobile Menu Toggle - Simplified and more direct implementation
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        // Log when elements are found
        console.log('Menu elements found');
        
        menuToggle.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Menu toggle clicked'); // Debug
            mobileMenu.classList.toggle('show');
        });
    } else {
        console.log('Menu elements not found'); // Debug if elements are missing
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && mobileMenu.classList.contains('show')) {
            // Only close if click is outside menu and toggle button
            if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                mobileMenu.classList.remove('show');
            }
        }
    });

    // Ensure menu items close the menu when clicked
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu li a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('show');
        });
    });

    // Sticky Header
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if (header) header.classList.toggle('sticky', window.scrollY > 50);
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Cart Sync
    const cartCountElem = document.querySelectorAll('.cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    function updateCartCount() {
        cartCountElem.forEach(elem => {
            if (elem) elem.textContent = cart.length;
        });
    }
    updateCartCount();

    // Contact Dropdown
    const contactIcon = document.querySelector('.contact-icon');
    const contactOptions = document.querySelector('.contact-options');
    if (contactIcon && contactOptions) {
        contactIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            contactOptions.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!contactIcon.contains(e.target) && !contactOptions.contains(e.target)) {
                contactOptions.classList.remove('show');
            }
        });

        // Prevent dropdown from closing when clicking inside
        contactOptions.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Sanitize input function for security
    function sanitizeInput(input) {
        if (!input) return '';
        return input.toString().replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // Debounce function to limit function calls
    function debounce(func, delay) {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    }

    // Products Data with Descriptions
    const productsData = [
        { id: 1, name: "جهاز المساج المحمول برو", category: "massage", price: 899, oldPrice: 1200, rating: 4.9, reviewCount: 124, image: "assets/images/product1.jpg", isNew: true, isBestseller: true, description: "جهاز مساج محمول بتقنية الاهتزاز العميق لتخفيف الآلام والتوتر." },
        { id: 2, name: "وسادة طبية لدعم الرقبة", category: "pillows", price: 199, oldPrice: 249, rating: 4.7, reviewCount: 86, image: "assets/images/product2.jpg", isNew: false, isBestseller: true, description: "وسادة مريحة تدعم الرقبة وتحسن جودة النوم." },
        { id: 3, name: "جهاز قياس ضغط الدم الرقمي", category: "measuring", price: 299, oldPrice: 399, rating: 4.8, reviewCount: 73, image: "assets/images/product4.jpg", isNew: true, isBestseller: false, description: "جهاز دقيق لقياس ضغط الدم في المنزل." },
        { id: 4, name: "جهاز ركض منزلي احترافي", category: "treadmill", price: 3999, oldPrice: 4500, rating: 4.6, reviewCount: 38, image: "assets/images/product5.jpg", isNew: true, isBestseller: false, description: "جهاز ركض قوي ومتين للتمارين المنزلية." },
        { id: 5, name: "جهاز مساج القدم الكهربائي", category: "massage", price: 599, oldPrice: 699, rating: 4.4, reviewCount: 64, image: "assets/images/product6.jpg", isNew: false, isBestseller: true, description: "مساج قدم مريح لتخفيف الإجهاد بعد يوم طويل." },
        { id: 6, name: "وسادة لومبار لدعم أسفل الظهر", category: "pillows", price: 159, oldPrice: null, rating: 4.3, reviewCount: 47, image: "assets/images/product7.jpg", isNew: false, isBestseller: false, description: "دعم مثالي لأسفل الظهر أثناء الجلوس." },
        { id: 7, name: "جهاز قياس السكر المنزلي", category: "measuring", price: 249, oldPrice: 299, rating: 4.7, reviewCount: 91, image: "assets/images/product8.jpg", isNew: false, isBestseller: true, description: "جهاز سهل الاستخدام لمراقبة مستوى السكر." },
        { id: 8, name: "جهاز ركض قابل للطي", category: "treadmill", price: 2499, oldPrice: 2799, rating: 4.5, reviewCount: 56, image: "assets/images/product10.jpg", isNew: true, isBestseller: false, description: "جهاز ركض عملي يمكن طيه لتوفير المساحة." },
        { id: 9, name: "وسادة طبية للنوم على الجانب", category: "pillows", price: 179, oldPrice: 229, rating: 4.6, reviewCount: 62, image: "assets/images/product11.jpg", isNew: true, isBestseller: false, description: "وسادة مصممة للنوم المريح على الجانب." },
        { id: 10, name: "جهاز مساج اليد الذكي", category: "massage", price: 349, oldPrice: 399, rating: 4.8, reviewCount: 78, image: "assets/images/product12.jpg", isNew: false, isBestseller: true, description: "مساج ذكي لليدين لتخفيف آلام المفاصل." },
        { id: 11, name: "عكاز تقليدي", category: "supports", price: 99, oldPrice: null, rating: 4.5, reviewCount: 50, image: "assets/images/eldry/O404504_3152017131858-9-9.png", isNew: false, isBestseller: false, description: "عكاز بسيط ومتين لدعم المشي." },
        { id: 12, name: "مشايه لكبار السن Rollator Walker", category: "supports", price: 499, oldPrice: 599, rating: 4.7, reviewCount: 85, image: "assets/images/eldry/H357049_315201710530-9-29.png", isNew: true, isBestseller: true, description: "مشاية مريحة مع عجلات لكبار السن." },
        { id: 13, name: "عكاز ٤ نقاط", category: "supports", price: 149, oldPrice: 179, rating: 4.6, reviewCount: 60, image: "assets/images/eldry/Cat_240429_866.jpg", isNew: false, isBestseller: false, description: "عكاز بأربع نقاط لثبات إضافي." },
        { id: 14, name: "عكاكيز canadian crutches", category: "supports", price: 199, oldPrice: 249, rating: 4.4, reviewCount: 45, image: "assets/images/eldry/Crutches8.jpg", isNew: false, isBestseller: false, description: "عكاكيز كندية مريحة للاستخدام اليومي." },
        { id: 15, name: "عكاكيز axillary crutches", category: "supports", price: 179, oldPrice: 219, rating: 4.5, reviewCount: 55, image: "assets/images/eldry/25_4_1.jpg", isNew: false, isBestseller: false, description: "عكاكيز تحت الإبط لدعم الحركة." }
    ];

    // DOM Elements
    const productsContainer = document.getElementById('products-container');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const currentPageElem = document.querySelector('.current-page');
    const totalPagesElem = document.querySelector('.total-pages');
    const categoryCards = document.querySelectorAll('.category-card');

    // State Variables
    let currentPage = 1;
    const productsPerPage = 6;
    let filteredProducts = [...productsData];
    let currentCategory = 'all';
    let currentSort = 'popular';

    // Get favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Initialize
    filterAndSortProducts();
    displayProducts();
    updatePagination();

    // Event Listeners
    if (categoryFilter) categoryFilter.addEventListener('change', debounce(() => { 
        currentCategory = categoryFilter.value; 
        filterAndSortProducts(); 
    }, 300));
    
    if (sortFilter) sortFilter.addEventListener('change', debounce(() => { 
        currentSort = sortFilter.value; 
        filterAndSortProducts(); 
    }, 300));
    
    if (prevPageBtn) prevPageBtn.addEventListener('click', () => { 
        if (currentPage > 1) { 
            currentPage--; 
            displayProducts(); 
            updatePagination(); 
        } 
    });
    
    if (nextPageBtn) nextPageBtn.addEventListener('click', () => { 
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage); 
        if (currentPage < totalPages) { 
            currentPage++; 
            displayProducts(); 
            updatePagination(); 
        } 
    });
    
    if (categoryCards) {
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                currentCategory = card.dataset.category;
                if (categoryFilter) categoryFilter.value = currentCategory;
                filterAndSortProducts();
            });
        });
    }

    // Filter and Sort Products
    function filterAndSortProducts() {
        filteredProducts = currentCategory === 'all' ? [...productsData] : productsData.filter(product => product.category === currentCategory);
        switch (currentSort) {
            case 'popular': filteredProducts.sort((a, b) => b.rating - a.rating); break;
            case 'price-low': filteredProducts.sort((a, b) => a.price - b.price); break;
            case 'price-high': filteredProducts.sort((a, b) => b.price - a.price); break;
            case 'newest': filteredProducts.sort((a, b) => (a.isNew && !b.isNew ? -1 : 0)); break;
        }
        currentPage = 1;
        displayProducts();
        updatePagination();
    }

    // Display Products
    function displayProducts() {
        if (!productsContainer) return;
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const currentProducts = filteredProducts.slice(startIndex, endIndex);
        
        // Minimize DOM manipulations by building HTML string
        let productsHTML = '';
        
        currentProducts.forEach(product => {
            const badges = `${product.isNew ? '<span class="badge new-badge">جديد</span>' : ''}${product.isBestseller ? '<span class="badge bestseller-badge">الأكثر مبيعاً</span>' : ''}`;
            const priceHTML = product.oldPrice ? 
                `<div class="product-price"><span class="current-price">${sanitizeInput(product.price)} دولار</span><span class="old-price">${sanitizeInput(product.oldPrice)} دولار</span></div>` : 
                `<div class="product-price"><span class="current-price">${sanitizeInput(product.price)} دولار</span></div>`;
            
            productsHTML += `
                <div class="product-card" data-id="${sanitizeInput(product.id)}">
                    <a href="product-detail.html?id=${sanitizeInput(product.id)}" class="product-link">
                        <div class="product-image">
                            <img src="${sanitizeInput(product.image)}" alt="${sanitizeInput(product.name)}">
                            ${badges}
                            <div class="product-actions">
                                <button class="action-btn"><i class="${favorites.includes(product.id) ? 'fas' : 'far'} fa-heart"></i></button>
                                <button class="action-btn add-to-cart"><i class="fas fa-shopping-cart"></i></button>
                                <button class="action-btn"><i class="fas fa-eye"></i></button>
                            </div>
                        </div>
                        <div class="product-info">
                            <h3 class="product-name">${sanitizeInput(product.name)}</h3>
                            <div class="product-rating">
                                <div class="stars">${generateStars(product.rating)}</div>
                                <span class="review-count">(${sanitizeInput(product.reviewCount)})</span>
                            </div>
                            ${priceHTML}
                            <button class="btn add-to-cart-btn">أضف للسلة</button>
                        </div>
                    </a>
                </div>
            `;
        });
        
        productsContainer.innerHTML = productsHTML;
        
        // Add event listeners to the newly created elements
        document.querySelectorAll('.product-card').forEach(card => {
            const product = filteredProducts.find(p => p.id.toString() === card.dataset.id);
            if (!product) return;
            
            // Add to favorites functionality
            const heartButton = card.querySelector('.action-btn .fa-heart').parentElement;
            heartButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!favorites.includes(product.id)) {
                    favorites.push(product.id);
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                    alert(`تمت إضافة ${sanitizeInput(product.name)} إلى المفضلة`);
                    heartButton.querySelector('i').classList.remove('far');
                    heartButton.querySelector('i').classList.add('fas');
                } else {
                    // Option to remove from favorites
                    if (confirm(`${sanitizeInput(product.name)} موجود بالفعل في المفضلة. هل تريد إزالته؟`)) {
                        favorites = favorites.filter(id => id !== product.id);
                        localStorage.setItem('favorites', JSON.stringify(favorites));
                        alert(`تمت إزالة ${sanitizeInput(product.name)} من المفضلة`);
                        heartButton.querySelector('i').classList.remove('fas');
                        heartButton.querySelector('i').classList.add('far');
                    }
                }
            });
            
            // Add to cart functionality
            card.querySelectorAll('.add-to-cart, .add-to-cart-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    cart.push(product);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartCount();
                    alert(`تمت إضافة ${sanitizeInput(product.name)} للسلة`);
                });
            });
        });
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

    // Update Pagination
    function updatePagination() {
        if (!totalPagesElem || !currentPageElem) return;
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        totalPagesElem.textContent = totalPages || 1;
        currentPageElem.textContent = currentPage;
        if (prevPageBtn) prevPageBtn.disabled = currentPage === 1;
        if (nextPageBtn) nextPageBtn.disabled = currentPage === totalPages;
    }

    // Update favorites when window storage event occurs (to sync across tabs)
    window.addEventListener('storage', (e) => {
        if (e.key === 'favorites') {
            favorites = JSON.parse(e.newValue) || [];
            displayProducts(); // Refresh the display to update heart icons
        }
    });

    // Function to handle "Add to Favorites" button clicks
    document.addEventListener('click', (e) => {
        if (e.target.closest('.action-btn') && e.target.closest('.action-btn').querySelector('.fa-heart')) {
            e.preventDefault();
            const productCard = e.target.closest('.product-card');
            if (productCard) {
                const productId = parseInt(productCard.dataset.id);
                toggleFavorite(productId);
                displayProducts(); // Refresh the display to update heart icons
            }
        }
    });
});