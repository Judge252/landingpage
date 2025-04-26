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
        { id: 15, name: "عكاكيز axillary crutches", category: "supports", price: 179, oldPrice: 219, rating: 4.5, reviewCount: 55, image: "assets/images/eldry/25_4_1.jpg", isNew: false, isBestseller: false, description: "عكاكيز تحت الإبط لدعم الحركة." },
        { id: 16, name: "Genumedi مشد الركبه", category: "supports", price: 300, oldPrice: 350, rating: 4.7, reviewCount: 95, image: "assets/images/101/genumedi/1.png", images: ["assets/images/101/genumedi/1.png", "assets/images/101/genumedi/2.png", "assets/images/101/genumedi/3.png", "assets/images/101/genumedi/4.png", "assets/images/101/genumedi/5.png", "assets/images/101/genumedi/genumedi-comfort-zone-m-96511.jpeg", "assets/images/101/genumedi/genumedi-stoff-m-303438.jpeg", "assets/images/101/genumedi/genumedi-elastizitaet-m-303439.jpeg", "assets/images/101/genumedi/genumedi-silber-m-96517.jpeg", "assets/images/101/genumedi/genumedi-bgv-kniebandage-silber-m-96524.jpeg"], isNew: true, isBestseller: true, description: "مشد مخصص لمشاكل صابونة الركبه، مثل الاصابات و العمليات الجراحيه، يساعد في تثبيت المفصل، تخفيف الآلم لشفاء اسرع، مصنوع من مواد مريح لللبس" },
        { id: 17, name: "Levamed مشد الكاحل", category: "supports", price: 299, oldPrice: 350, rating: 4.6, reviewCount: 78, image: "assets/images/101/Levamed/1.png", images: ["assets/images/101/Levamed/1.png", "assets/images/101/Levamed/2.png", "assets/images/101/Levamed/levamed-ankle-supports-medi-m-109285.jpeg", "assets/images/101/Levamed/levamed-ankle-supports-medi-m-109297.jpeg"], isNew: true, isBestseller: false, description: "مشد لمفصل الكاحل، مناسب للاصبات مثل التواء الكاحل، يساعد في تخفيف الآلم والتورم، يعطي ثبات وراحه للمفصل" },
        { id: 18, name: "Genumedi مشد الركبه الثانوي", category: "supports", price: 300, oldPrice: 370, rating: 4.8, reviewCount: 86, image: "assets/images/101/genumedi/2.png", images: ["assets/images/101/genumedi/2.png", "assets/images/101/genumedi/3.png", "assets/images/101/genumedi/4.png", "assets/images/101/genumedi/5.png", "assets/images/101/genumedi/genumedi-comfort-zone-m-96511.jpeg", "assets/images/101/genumedi/genumedi-stoff-m-303438.jpeg"], isNew: false, isBestseller: true, description: "يساعد في ثبات الركبه، تخفيف الآلم والالتهاب، مناسب ما بعد الصابات ومشاكل الركبه، مصنوع من مواد مريحه لللبس وعالية الجودة" },
        { id: 19, name: "Epicomed مشد الكوع", category: "supports", price: 399, oldPrice: 450, rating: 4.5, reviewCount: 69, image: "assets/images/101/Epicomed/1.png", images: ["assets/images/101/Epicomed/1.png", "assets/images/101/Epicomed/2.png", "assets/images/101/Epicomed/3.png", "assets/images/101/Epicomed/4.png", "assets/images/101/Epicomed/epicomed-elbow-supports-medi-m-228710.jpeg", "assets/images/101/Epicomed/epicomed-elbow-supports-medi-m-228715.jpeg", "assets/images/101/Epicomed/epicomed-elbow-supports-medi-m-228712.jpeg", "assets/images/101/Epicomed/epicomed-elbow-supports-medi-m-228717.jpeg"], isNew: true, isBestseller: false, description: "مشد مريح للكوع، مناسب ما بعد الاصابات، التهاب ومشاكل المفصل، يساعد في ثبات المفضل للشفاء السريع." },
        { id: 20, name: "مشد الظهر Lumbamed", category: "supports", price: 550, oldPrice: 650, rating: 4.9, reviewCount: 110, image: "assets/images/101/Lumbamed/1.png", images: ["assets/images/101/Lumbamed/1.png", "assets/images/101/Lumbamed/2.png", "assets/images/101/Lumbamed/3.png", "assets/images/101/Lumbamed/4.png", "assets/images/101/Lumbamed/5.png", "assets/images/101/Lumbamed/6.png", "assets/images/101/Lumbamed/lumbamed-basic-lumbar-spine-orthosis-inside-m-83105.jpeg", "assets/images/101/Lumbamed/lumbamed-basis-lumbar-spine-orthosis-hand-loop-m-83108.jpeg", "assets/images/101/Lumbamed/lumbamed-basic-lumbar-support-sand-back-view-m-96539.jpeg", "assets/images/101/Lumbamed/lumbamed-plus-lumbar-support-foldable-edges-m-96631.jpeg", "assets/images/101/Lumbamed/lumbamed-basic-lumbar-supports-finger-loops--m-96628.jpeg", "assets/images/101/Lumbamed/lumbamed-basic-back-braces-lumbar-spine-m-83121.jpeg"], isNew: true, isBestseller: true, description: "مشد للعامود الفقري السفلي، يساعد في ثبات الفقرات وتخفيف الضغط عنها، يمكن استعماله بعد الاصابات او لمشاكل العامود الفقري مثل مشاكل الديسكات" },
        { id: 21, name: "Manumed مشد اليد والرسغ", category: "supports", price: 450, oldPrice: 520, rating: 4.7, reviewCount: 82, image: "assets/images/101/Manumed/1.png", images: ["assets/images/101/Manumed/1.png", "assets/images/101/Manumed/2.png", "assets/images/101/Manumed/3.png", "assets/images/101/Manumed/4.png", "assets/images/101/Manumed/5.png", "assets/images/101/Manumed/manumed-active-wrist-supports-sand-m-17094.jpeg", "assets/images/101/Manumed/manumed-active-soft-wrist-supports-medi-m-190544.jpeg", "assets/images/101/Manumed/manumed-active-soft-wrist-supports-medi-m-234478.jpeg", "assets/images/101/Manumed/manumed-active-soft-wrist-supports-medi-m-234479.jpeg", "assets/images/101/Manumed/manumed-active-soft-wrist-supports-medi-m-189221.jpeg"], isNew: true, isBestseller: false, description: "مشد لتثبيت الرسغ واليد، مناسب للاصابات والالتهابات، يساعد في تخفيف الآلم وتسريع الشفاء، مصنوع من مواد مريحة عالية الجودة." },
        // New products
        { id: 22, name: "Activemed wrist مشد كف اليد", category: "supports", price: 270, oldPrice: 320, rating: 4.6, reviewCount: 75, image: "assets/images/new product/activemed wrist/Frame 2.png", images: ["assets/images/new product/activemed wrist/Frame 2.png", "assets/images/new product/activemed wrist/Frame 3.png", "assets/images/new product/activemed wrist/Frame 4.png"], isNew: true, isBestseller: false, description: "مشد مصنوع من قماش عالي الجوده ومريح للارتداء، يعزز ثبات المفصل، مناسب بعد الاصابات، التهاب المفصل والاوتار، يساعد في تخفيف التورم، الالم والالتهاب" },
        { id: 23, name: "Air ankle دعامة الكاحل", category: "supports", price: 220, oldPrice: 260, rating: 4.7, reviewCount: 84, image: "assets/images/new product/air ankle/Frame 2.png", images: ["assets/images/new product/air ankle/Frame 2.png", "assets/images/new product/air ankle/Frame 3.png", "assets/images/new product/air ankle/Frame 4.png", "assets/images/new product/air ankle/Frame 5.png", "assets/images/new product/air ankle/Frame 6.png", "assets/images/new product/air ankle/6.png", "assets/images/new product/air ankle/7.png", "assets/images/new product/air ankle/8.png"], isNew: true, isBestseller: false, description: "دعامة مخصصه ما بعد اصابات الكاحل والمعليات الجراحيه، تعمل على تثبيت المفصل وزيادة ثباته، تشمل وسائد هاوئيه لراحه وثبات قوي." },
        { id: 24, name: "Airmed prim دعامة الابهام", category: "supports", price: 200, oldPrice: 230, rating: 4.5, reviewCount: 68, image: "assets/images/new product/airmed prim/Frame 2.png", images: ["assets/images/new product/airmed prim/Frame 2.png", "assets/images/new product/airmed prim/Frame 3.png", "assets/images/new product/airmed prim/8.png"], isNew: true, isBestseller: false, description: "دعامة مخصصه لتثبيت البهام، مناسب في حالات الاصابة والالتهابات في الاوتار والمفصل." },
        { id: 25, name: "Airsport مشد الكاحل", category: "supports", price: 350, oldPrice: 390, rating: 4.8, reviewCount: 92, image: "assets/images/new product/airsport/1.png", images: ["assets/images/new product/airsport/1.png", "assets/images/new product/airsport/2.png", "assets/images/new product/airsport/3.png", "assets/images/new product/airsport/4.png"], isNew: true, isBestseller: true, description: "مشدد مخصص للكاحل، مناسب للحركه والرياضه، يعمل على تثبيت الحاكل مع راحه قصوى، اربطه قويه لدعم المفصل، قوي ومريح" },
        { id: 26, name: "Ankle foot orthosis دعامة كف القدم", category: "supports", price: 390, oldPrice: 450, rating: 4.7, reviewCount: 80, image: "assets/images/new product/ankle foot orthosis/1.png", images: ["assets/images/new product/ankle foot orthosis/1.png", "assets/images/new product/ankle foot orthosis/2.png", "assets/images/new product/ankle foot orthosis/3.png", "assets/images/new product/ankle foot orthosis/4.png", "assets/images/new product/ankle foot orthosis/5.png"], isNew: true, isBestseller: false, description: "دعامة مخصصه لكف القدم AFO تستعمل في حالات ضعف عضلات القدم بعد اصابات الاعصاب، او بعد الستكة الدماغيه" },
        { id: 27, name: "Aspen lumbar support مشد الظهر", category: "supports", price: 499, oldPrice: 550, rating: 4.9, reviewCount: 105, image: "assets/images/new product/aspen lumbar support/1.png", images: ["assets/images/new product/aspen lumbar support/1.png", "assets/images/new product/aspen lumbar support/2.png", "assets/images/new product/aspen lumbar support/3.png", "assets/images/new product/aspen lumbar support/4.png", "assets/images/new product/aspen lumbar support/5.png", "assets/images/new product/aspen lumbar support/6.png"], isNew: true, isBestseller: true, description: "مشد للظهر السفلي، مريح جدا للاستعمال، مميز بتقنية شد مخصصه لزيادة ثبات العامود الفقري" },
        { id: 28, name: "Bady strap 26 DJO مشد الظهر", category: "supports", price: 290, oldPrice: 350, rating: 4.6, reviewCount: 77, image: "assets/images/new product/body strap 26 DJO/1.png", images: ["assets/images/new product/body strap 26 DJO/1.png", "assets/images/new product/body strap 26 DJO/2.png", "assets/images/new product/body strap 26 DJO/3.png", "assets/images/new product/body strap 26 DJO/4.png"], isNew: true, isBestseller: false, description: "مشد ظهر من شركة Donjoy مخصص لدعم العامود الفقري السفلي مع خاصيه التثبيت الثنائي، مناسب بعد الاصبات او لمشاكل العامود الفقري السفلي" },
        { id: 29, name: "Droop foot PRIM", category: "supports", price: 390, oldPrice: 430, rating: 4.7, reviewCount: 89, image: "assets/images/new product/drop foot PRIM/1.png", images: ["assets/images/new product/drop foot PRIM/1.png", "assets/images/new product/drop foot PRIM/2.png", "assets/images/new product/drop foot PRIM/3.png", "assets/images/new product/drop foot PRIM/4.png"], isNew: true, isBestseller: false, description: "جهاز مخصص لمشاكل سقوط القدم، اعتلال باعصاب القدم او بعد الجلطه الدماغيه" },
        { id: 30, name: "Immo sling علاقة الكتف", category: "supports", price: 199, oldPrice: 235, rating: 4.5, reviewCount: 70, image: "assets/images/new product/immo sling/5.png", images: ["assets/images/new product/immo sling/5.png", "assets/images/new product/immo sling/6.png"], isNew: true, isBestseller: false, description: "علاقه مريحه للاستعمال، مناسبه بعد الاصابات او العمليات الجراحيه" },
        { id: 31, name: "Medi elastic ankle مشد الكاحل", category: "supports", price: 67, oldPrice: 95, rating: 4.3, reviewCount: 60, image: "assets/images/new product/medi elastic ankle/1.png", images: ["assets/images/new product/medi elastic ankle/1.png", "assets/images/new product/medi elastic ankle/2.png", "assets/images/new product/medi elastic ankle/3.png", "assets/images/new product/medi elastic ankle/4.png", "assets/images/new product/medi elastic ankle/5.png", "assets/images/new product/medi elastic ankle/6.png"], isNew: true, isBestseller: false, description: "مشد خفيف ومريح للكاحل، يمكن استعماله مع الحذاء، مناسب للاصابات الخفيفه مثل التواء الكاحل" },
        { id: 32, name: "Vista Collar دعامة الرقبه", category: "supports", price: 470, oldPrice: 520, rating: 4.8, reviewCount: 95, image: "assets/images/new product/VISTA COLLAR/1.png", images: ["assets/images/new product/VISTA COLLAR/1.png", "assets/images/new product/VISTA COLLAR/2.png", "assets/images/new product/VISTA COLLAR/3.png", "assets/images/new product/VISTA COLLAR/4.png"], isNew: true, isBestseller: true, description: "دعامة مخصصه لتثبيت العامود الفقري العنقي، تستعمل بعد الاصابات او العمليات الجراحيه، ثبات مثالي لشفاء اسرع" }
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
            
            // Check if product has multiple images
            if (product.images && product.images.length > 1) {
                // Create image gallery
                let galleryHTML = `
                    <div class="product-image-gallery">
                        <div class="main-image">
                            <img src="${product.images[0]}" alt="${product.name}" id="main-product-image">
                            ${badges}
                        </div>
                        <div class="image-thumbnails">
                `;
                
                // Add thumbnails
                product.images.forEach((img, index) => {
                    galleryHTML += `<img src="${img}" alt="${product.name} - صورة ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage(this.src)">`;
                });
                
                galleryHTML += `
                        </div>
                        <div class="product-actions product-detail-actions">
                            <button class="action-btn" title="إضافة للمفضلة"><i class="far fa-heart"></i></button>
                            <button class="action-btn add-to-cart" title="إضافة للسلة"><i class="fas fa-shopping-cart"></i></button>
                            <button class="action-btn" title="مشاركة المنتج"><i class="fas fa-share-alt"></i></button>
                        </div>
                    </div>
                `;
                
                const priceHTML = product.oldPrice ? `<div class="product-price"><span class="current-price">${product.price} ₪</span><span class="old-price">${product.oldPrice} ₪</span></div>` : `<div class="product-price"><span class="current-price">${product.price} ₪</span></div>`;
                
                productCardContainer.innerHTML = `
                    ${galleryHTML}
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
                
                // Add image gallery functionality
                window.changeMainImage = function(src) {
                    document.getElementById('main-product-image').src = src;
                    document.querySelectorAll('.thumbnail').forEach(thumb => {
                        thumb.classList.remove('active');
                        if (thumb.src === src) {
                            thumb.classList.add('active');
                        }
                    });
                };
                
                // Add click event to thumbnails
                document.querySelectorAll('.thumbnail').forEach(thumb => {
                    thumb.addEventListener('click', function() {
                        const src = this.src;
                        changeMainImage(src);
                    });
                });
                
            } else {
                // Single image product
                const priceHTML = product.oldPrice ? `<div class="product-price"><span class="current-price">${product.price} ₪</span><span class="old-price">${product.oldPrice} ₪</span></div>` : `<div class="product-price"><span class="current-price">${product.price} ₪</span></div>`;
                productCardContainer.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                        ${badges}
                        <div class="product-actions product-detail-actions">
                            <button class="action-btn" title="إضافة للمفضلة"><i class="far fa-heart"></i></button>
                            <button class="action-btn add-to-cart" title="إضافة للسلة"><i class="fas fa-shopping-cart"></i></button>
                            <button class="action-btn" title="مشاركة المنتج"><i class="fas fa-share-alt"></i></button>
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
        }

        // Populate Detailed Info
        if (productName) productName.textContent = product.name;
        if (productCurrentPrice) productCurrentPrice.textContent = `${product.price} ₪`;
        if (productOldPrice) productOldPrice.textContent = product.oldPrice ? `${product.oldPrice} ₪` : '';
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
        
        // Favorites Functionality
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const heartButtons = document.querySelectorAll('.action-btn .fa-heart');
        
        heartButtons.forEach(icon => {
            // Update icon based on favorites status
            if (favorites.includes(product.id)) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
            
            icon.parentElement.addEventListener('click', (e) => {
                e.preventDefault();
                if (!favorites.includes(product.id)) {
                    favorites.push(product.id);
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                    alert(`تمت إضافة ${product.name} إلى المفضلة`);
                    heartButtons.forEach(i => {
                        i.classList.remove('far');
                        i.classList.add('fas');
                    });
                } else {
                    // Option to remove from favorites
                    if (confirm(`${product.name} موجود بالفعل في المفضلة. هل تريد إزالته؟`)) {
                        favorites = favorites.filter(id => id !== product.id);
                        localStorage.setItem('favorites', JSON.stringify(favorites));
                        alert(`تمت إزالة ${product.name} من المفضلة`);
                        heartButtons.forEach(i => {
                            i.classList.remove('fas');
                            i.classList.add('far');
                        });
                    }
                }
            });
        });
        
        // Share Functionality
        document.querySelectorAll('.action-btn .fa-share-alt').forEach(icon => {
            icon.parentElement.addEventListener('click', (e) => {
                e.preventDefault();
                if (navigator.share) {
                    navigator.share({
                        title: product.name,
                        text: product.description,
                        url: window.location.href
                    })
                    .catch(error => {
                        console.log('Error sharing:', error);
                        alert('تم نسخ رابط المنتج');
                        navigator.clipboard.writeText(window.location.href);
                    });
                } else {
                    // Fallback for browsers that don't support sharing
                    alert('تم نسخ رابط المنتج');
                    navigator.clipboard.writeText(window.location.href);
                }
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

    // Add CSS for image gallery
    const style = document.createElement('style');
    style.textContent = `
        .product-image-gallery {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 20px;
            position: relative;
        }
        .main-image {
            width: 100%;
            margin-bottom: 15px;
            overflow: hidden;
            border-radius: 10px;
            position: relative;
        }
        .main-image img {
            width: 100%;
            display: block;
            transition: transform 0.3s ease;
        }
        .main-image img:hover {
            transform: scale(1.03);
        }
        .image-thumbnails {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
        }
        .thumbnail {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 8px;
            cursor: pointer;
            opacity: 0.7;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        .thumbnail:hover {
            opacity: 1;
        }
        .thumbnail.active {
            opacity: 1;
            border-color: #007bff;
        }
        /* Product Detail Actions Styling */
        .product-detail-actions {
            position: static;
            display: flex;
            justify-content: flex-start;
            margin-top: 15px;
            opacity: 1;
            transform: none;
            background-color: transparent;
            padding: 0;
        }
        .product-detail-actions .action-btn {
            background-color: #f5f5f5;
            color: #333;
            width: 45px;
            height: 45px;
            margin-right: 10px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.1);
            font-size: 1.1rem;
        }
        .product-detail-actions .action-btn:hover {
            background-color: #70AD47;
            color: white;
            transform: translateY(-2px);
        }
        [dir="rtl"] .product-detail-actions {
            justify-content: flex-end;
        }
        [dir="rtl"] .product-detail-actions .action-btn {
            margin-right: 0;
            margin-left: 10px;
        }
        @media (max-width: 768px) {
            .thumbnail {
                width: 50px;
                height: 50px;
            }
            .product-detail-actions {
                justify-content: center;
            }
        }
    `;
    document.head.appendChild(style);
});