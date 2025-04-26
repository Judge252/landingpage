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
        // Upper Body Supports (head, neck, arm, shoulder, elbow, wrist)
        { id: 32, name: "Vista Collar دعامة الرقبه", category: "upper", price: 470, oldPrice: 520, rating: 4.8, reviewCount: 95, image: "assets/images/new product/VISTA COLLAR/1.png", images: ["assets/images/new product/VISTA COLLAR/1.png", "assets/images/new product/VISTA COLLAR/2.png", "assets/images/new product/VISTA COLLAR/3.png", "assets/images/new product/VISTA COLLAR/4.png"], isNew: true, isBestseller: true, description: "دعامة مخصصه لتثبيت العامود الفقري العنقي، تستعمل بعد الاصابات او العمليات الجراحيه، ثبات مثالي لشفاء اسرع" },
        { id: 19, name: "Epicomed مشد الكوع", category: "upper", price: 399, oldPrice: 450, rating: 4.5, reviewCount: 69, image: "assets/images/101/Epicomed/1.png", images: ["assets/images/101/Epicomed/1.png", "assets/images/101/Epicomed/2.png", "assets/images/101/Epicomed/3.png", "assets/images/101/Epicomed/4.png", "assets/images/101/Epicomed/epicomed-elbow-supports-medi-m-228710.jpeg", "assets/images/101/Epicomed/epicomed-elbow-supports-medi-m-228715.jpeg", "assets/images/101/Epicomed/epicomed-elbow-supports-medi-m-228712.jpeg", "assets/images/101/Epicomed/epicomed-elbow-supports-medi-m-228717.jpeg"], isNew: true, isBestseller: false, description: "مشد مريح للكوع، مناسب ما بعد الاصابات، التهاب ومشاكل المفصل، يساعد في ثبات المفضل للشفاء السريع." },
        { id: 21, name: "Manumed مشد اليد والرسغ", category: "upper", price: 450, oldPrice: 520, rating: 4.7, reviewCount: 82, image: "assets/images/101/Manumed/1.png", images: ["assets/images/101/Manumed/1.png", "assets/images/101/Manumed/2.png", "assets/images/101/Manumed/3.png", "assets/images/101/Manumed/4.png", "assets/images/101/Manumed/5.png", "assets/images/101/Manumed/manumed-active-wrist-supports-sand-m-17094.jpeg", "assets/images/101/Manumed/manumed-active-soft-wrist-supports-medi-m-190544.jpeg", "assets/images/101/Manumed/manumed-active-soft-wrist-supports-medi-m-234478.jpeg", "assets/images/101/Manumed/manumed-active-soft-wrist-supports-medi-m-234479.jpeg", "assets/images/101/Manumed/manumed-active-soft-wrist-supports-medi-m-189221.jpeg"], isNew: true, isBestseller: false, description: "مشد لتثبيت الرسغ واليد، مناسب للاصابات والالتهابات، يساعد في تخفيف الآلم وتسريع الشفاء، مصنوع من مواد مريحة عالية الجودة." },
        { id: 22, name: "Activemed wrist مشد كف اليد", category: "upper", price: 270, oldPrice: 320, rating: 4.6, reviewCount: 75, image: "assets/images/new product/activemed wrist/Frame 2.png", images: ["assets/images/new product/activemed wrist/Frame 2.png", "assets/images/new product/activemed wrist/Frame 3.png", "assets/images/new product/activemed wrist/Frame 4.png"], isNew: true, isBestseller: false, description: "مشد مصنوع من قماش عالي الجوده ومريح للارتداء، يعزز ثبات المفصل، مناسب بعد الاصابات، التهاب المفصل والاوتار، يساعد في تخفيف التورم، الالم والالتهاب" },
        { id: 24, name: "Airmed prim دعامة الابهام", category: "upper", price: 200, oldPrice: 230, rating: 4.5, reviewCount: 68, image: "assets/images/new product/airmed prim/Frame 2.png", images: ["assets/images/new product/airmed prim/Frame 2.png", "assets/images/new product/airmed prim/Frame 3.png", "assets/images/new product/airmed prim/8.png"], isNew: true, isBestseller: false, description: "دعامة مخصصه لتثبيت البهام، مناسب في حالات الاصابة والالتهابات في الاوتار والمفصل." },
        { id: 30, name: "Immo sling علاقة الكتف", category: "upper", price: 199, oldPrice: 235, rating: 4.5, reviewCount: 70, image: "assets/images/new product/immo sling/5.png", images: ["assets/images/new product/immo sling/5.png", "assets/images/new product/immo sling/6.png"], isNew: true, isBestseller: false, description: "علاقه مريحه للاستعمال، مناسبه بعد الاصابات او العمليات الجراحيه" },
        
        // Spine Supports (back, lumbar)
        { id: 20, name: "مشد الظهر Lumbamed", category: "spine", price: 550, oldPrice: 650, rating: 4.9, reviewCount: 110, image: "assets/images/101/Lumbamed/1.png", images: ["assets/images/101/Lumbamed/1.png", "assets/images/101/Lumbamed/2.png", "assets/images/101/Lumbamed/3.png", "assets/images/101/Lumbamed/4.png", "assets/images/101/Lumbamed/5.png", "assets/images/101/Lumbamed/6.png", "assets/images/101/Lumbamed/lumbamed-basic-lumbar-spine-orthosis-inside-m-83105.jpeg", "assets/images/101/Lumbamed/lumbamed-basis-lumbar-spine-orthosis-hand-loop-m-83108.jpeg", "assets/images/101/Lumbamed/lumbamed-basic-lumbar-support-sand-back-view-m-96539.jpeg", "assets/images/101/Lumbamed/lumbamed-plus-lumbar-support-foldable-edges-m-96631.jpeg", "assets/images/101/Lumbamed/lumbamed-basic-lumbar-supports-finger-loops--m-96628.jpeg", "assets/images/101/Lumbamed/lumbamed-basic-back-braces-lumbar-spine-m-83121.jpeg"], isNew: true, isBestseller: true, description: "مشد للعامود الفقري السفلي، يساعد في ثبات الفقرات وتخفيف الضغط عنها، يمكن استعماله بعد الاصابات او لمشاكل العامود الفقري مثل مشاكل الديسكات" },
        { id: 27, name: "Aspen lumbar support مشد الظهر", category: "spine", price: 499, oldPrice: 550, rating: 4.9, reviewCount: 105, image: "assets/images/new product/aspen lumbar support/1.png", images: ["assets/images/new product/aspen lumbar support/1.png", "assets/images/new product/aspen lumbar support/2.png", "assets/images/new product/aspen lumbar support/3.png", "assets/images/new product/aspen lumbar support/4.png", "assets/images/new product/aspen lumbar support/5.png", "assets/images/new product/aspen lumbar support/6.png"], isNew: true, isBestseller: true, description: "مشد للظهر السفلي، مريح جدا للاستعمال، مميز بتقنية شد مخصصه لزيادة ثبات العامود الفقري" },
        { id: 28, name: "Bady strap 26 DJO مشد الظهر", category: "spine", price: 290, oldPrice: 350, rating: 4.6, reviewCount: 77, image: "assets/images/new product/body strap 26 DJO/1.png", images: ["assets/images/new product/body strap 26 DJO/1.png", "assets/images/new product/body strap 26 DJO/2.png", "assets/images/new product/body strap 26 DJO/3.png", "assets/images/new product/body strap 26 DJO/4.png"], isNew: true, isBestseller: false, description: "مشد ظهر من شركة Donjoy مخصص لدعم العامود الفقري السفلي مع خاصيه التثبيت الثنائي، مناسب بعد الاصبات او لمشاكل العامود الفقري السفلي" },
        
        // Lower Body Supports (knee, ankle, foot)
        { id: 16, name: "Genumedi مشد الركبه", category: "lower", price: 300, oldPrice: 350, rating: 4.7, reviewCount: 95, image: "assets/images/101/genumedi/1.png", images: ["assets/images/101/genumedi/1.png", "assets/images/101/genumedi/2.png", "assets/images/101/genumedi/3.png", "assets/images/101/genumedi/4.png", "assets/images/101/genumedi/5.png", "assets/images/101/genumedi/genumedi-comfort-zone-m-96511.jpeg", "assets/images/101/genumedi/genumedi-stoff-m-303438.jpeg", "assets/images/101/genumedi/genumedi-elastizitaet-m-303439.jpeg", "assets/images/101/genumedi/genumedi-silber-m-96517.jpeg", "assets/images/101/genumedi/genumedi-bgv-kniebandage-silber-m-96524.jpeg"], isNew: true, isBestseller: true, description: "مشد مخصص لمشاكل صابونة الركبه، مثل الاصابات و العمليات الجراحيه، يساعد في تثبيت المفصل، تخفيف الآلم لشفاء اسرع، مصنوع من مواد مريح لللبس" },
        { id: 18, name: "Genumedi مشد الركبه الثانوي", category: "lower", price: 300, oldPrice: 370, rating: 4.8, reviewCount: 86, image: "assets/images/101/genumedi/2.png", images: ["assets/images/101/genumedi/2.png", "assets/images/101/genumedi/3.png", "assets/images/101/genumedi/4.png", "assets/images/101/genumedi/5.png", "assets/images/101/genumedi/genumedi-comfort-zone-m-96511.jpeg", "assets/images/101/genumedi/genumedi-stoff-m-303438.jpeg"], isNew: false, isBestseller: true, description: "يساعد في ثبات الركبه، تخفيف الآلم والالتهاب، مناسب ما بعد الصابات ومشاكل الركبه، مصنوع من مواد مريحه لللبس وعالية الجودة" },
        { id: 17, name: "Levamed مشد الكاحل", category: "lower", price: 299, oldPrice: 350, rating: 4.6, reviewCount: 78, image: "assets/images/101/Levamed/1.png", images: ["assets/images/101/Levamed/1.png", "assets/images/101/Levamed/2.png", "assets/images/101/Levamed/levamed-ankle-supports-medi-m-109285.jpeg", "assets/images/101/Levamed/levamed-ankle-supports-medi-m-109297.jpeg"], isNew: true, isBestseller: false, description: "مشد لمفصل الكاحل، مناسب للاصبات مثل التواء الكاحل، يساعد في تخفيف الآلم والتورم، يعطي ثبات وراحه للمفصل" },
        { id: 23, name: "Air ankle دعامة الكاحل", category: "lower", price: 220, oldPrice: 260, rating: 4.7, reviewCount: 84, image: "assets/images/new product/air ankle/Frame 2.png", images: ["assets/images/new product/air ankle/Frame 2.png", "assets/images/new product/air ankle/Frame 3.png", "assets/images/new product/air ankle/Frame 4.png", "assets/images/new product/air ankle/Frame 5.png", "assets/images/new product/air ankle/Frame 6.png", "assets/images/new product/air ankle/6.png", "assets/images/new product/air ankle/7.png", "assets/images/new product/air ankle/8.png"], isNew: true, isBestseller: false, description: "دعامة مخصصه ما بعد اصابات الكاحل والمعليات الجراحيه، تعمل على تثبيت المفصل وزيادة ثباته، تشمل وسائد هاوئيه لراحه وثبات قوي." },
        { id: 25, name: "Airsport مشد الكاحل", category: "lower", price: 350, oldPrice: 390, rating: 4.8, reviewCount: 92, image: "assets/images/new product/airsport/1.png", images: ["assets/images/new product/airsport/1.png", "assets/images/new product/airsport/2.png", "assets/images/new product/airsport/3.png", "assets/images/new product/airsport/4.png"], isNew: true, isBestseller: true, description: "مشدد مخصص للكاحل، مناسب للحركه والرياضه، يعمل على تثبيت الحاكل مع راحه قصوى، اربطه قويه لدعم المفصل، قوي ومريح" },
        { id: 31, name: "Medi elastic ankle مشد الكاحل", category: "lower", price: 67, oldPrice: 95, rating: 4.3, reviewCount: 60, image: "assets/images/new product/medi elastic ankle/1.png", images: ["assets/images/new product/medi elastic ankle/1.png", "assets/images/new product/medi elastic ankle/2.png", "assets/images/new product/medi elastic ankle/3.png", "assets/images/new product/medi elastic ankle/4.png", "assets/images/new product/medi elastic ankle/5.png", "assets/images/new product/medi elastic ankle/6.png"], isNew: true, isBestseller: false, description: "مشد خفيف ومريح للكاحل، يمكن استعماله مع الحذاء، مناسب للاصابات الخفيفه مثل التواء الكاحل" },
        { id: 26, name: "Ankle foot orthosis دعامة كف القدم", category: "lower", price: 390, oldPrice: 450, rating: 4.7, reviewCount: 80, image: "assets/images/new product/ankle foot orthosis/1.png", images: ["assets/images/new product/ankle foot orthosis/1.png", "assets/images/new product/ankle foot orthosis/2.png", "assets/images/new product/ankle foot orthosis/3.png", "assets/images/new product/ankle foot orthosis/4.png", "assets/images/new product/ankle foot orthosis/5.png"], isNew: true, isBestseller: false, description: "دعامة مخصصه لكف القدم AFO تستعمل في حالات ضعف عضلات القدم بعد اصابات الاعصاب، او بعد الستكة الدماغيه" },
        { id: 29, name: "Droop foot PRIM", category: "lower", price: 390, oldPrice: 430, rating: 4.7, reviewCount: 89, image: "assets/images/new product/drop foot PRIM/1.png", images: ["assets/images/new product/drop foot PRIM/1.png", "assets/images/new product/drop foot PRIM/2.png", "assets/images/new product/drop foot PRIM/3.png", "assets/images/new product/drop foot PRIM/4.png"], isNew: true, isBestseller: false, description: "جهاز مخصص لمشاكل سقوط القدم، اعتلال باعصاب القدم او بعد الجلطه الدماغيه" }
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
                `<div class="product-price"><span class="current-price">${sanitizeInput(product.price)} ₪</span><span class="old-price">${sanitizeInput(product.oldPrice)} ₪</span></div>` : 
                `<div class="product-price"><span class="current-price">${sanitizeInput(product.price)} ₪</span></div>`;
            
            productsHTML += `
                <div class="product-card" data-id="${sanitizeInput(product.id)}">
                    <div class="product-image">
                        <img src="${sanitizeInput(product.image)}" alt="${sanitizeInput(product.name)}">
                        ${badges}
                        <div class="product-actions">
                            <button class="action-btn favorite-btn" title="إضافة للمفضلة"><i class="${favorites.includes(product.id) ? 'fas' : 'far'} fa-heart"></i></button>
                            <button class="action-btn add-to-cart" title="إضافة للسلة"><i class="fas fa-shopping-cart"></i></button>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${sanitizeInput(product.name)}</h3>
                        <div class="product-rating">
                            <div class="stars">${generateStars(product.rating)}</div>
                            <span class="review-count">(${sanitizeInput(product.reviewCount)})</span>
                        </div>
                        ${priceHTML}
                    </div>
                </div>
            `;
        });
        
        if (currentProducts.length === 0) {
            productsHTML = '<div class="no-products">لا توجد منتجات متاحة</div>';
        }
        
        productsContainer.innerHTML = productsHTML;
        
        // Add event listeners to the new elements
        const productCards = document.querySelectorAll('.product-card');
        const favoriteBtns = document.querySelectorAll('.favorite-btn');
        const addToCartBtns = document.querySelectorAll('.add-to-cart');

        // Make entire product card clickable
        productCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Only navigate if the click wasn't on an action button
                if (!e.target.closest('.action-btn')) {
                    const productId = card.dataset.id;
                    window.location.href = `product-detail.html?id=${productId}`;
                }
            });
        });
        
        favoriteBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click event
                const productId = parseInt(btn.closest('.product-card').dataset.id);
                toggleFavorite(productId, btn);
            });
        });
        
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click event
                const productId = parseInt(btn.closest('.product-card').dataset.id);
                addToCart(productId);
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

    // Toggle Favorite
    function toggleFavorite(productId, buttonElement) {
        const product = productsData.find(p => p.id === productId);
        if (!product) return;
        
        const icon = buttonElement.querySelector('i');
        
        if (!favorites.includes(productId)) {
            // Add to favorites
            favorites.push(productId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert(`تمت إضافة ${sanitizeInput(product.name)} إلى المفضلة`);
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            // Remove from favorites
            if (confirm(`${sanitizeInput(product.name)} موجود بالفعل في المفضلة. هل تريد إزالته؟`)) {
                favorites = favorites.filter(id => id !== productId);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert(`تمت إزالة ${sanitizeInput(product.name)} من المفضلة`);
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        }
    }

    // Add to Cart
    function addToCart(productId) {
        const product = productsData.find(p => p.id === productId);
        if (!product) return;
        
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`تمت إضافة ${sanitizeInput(product.name)} للسلة`);
    }
});