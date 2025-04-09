document.addEventListener('DOMContentLoaded', function() {
    // Sample treatments data
    const treatments = [
        {
            id: 1,
            name: "العلاج بالمساج العميق",
            description: "يساعد في تخفيف آلام العضلات والتوتر وتحسين الدورة الدموية",
            image: "assets/images/5.jpg",
            price: "300 ريال",
            duration: "60 دقيقة",
            category: "massage"
        },
        {
            id: 2,
            name: "العلاج بالتمارين الرياضية",
            description: "تمارين مصممة خصيصًا لتقوية العضلات وتحسين المرونة والتوازن",
            image: "assets/images/5.jpg",
            price: "250 ريال",
            duration: "45 دقيقة",
            category: "exercise"
        },
        {
            id: 3,
            name: "العلاج الكهربائي للعضلات",
            description: "يستخدم التحفيز الكهربائي لعلاج آلام العضلات وتحسين وظائفها",
            image: "assets/images/5.jpg",
            price: "350 ريال",
            duration: "30 دقيقة",
            category: "electrotherapy"
        },
        {
            id: 4,
            name: "العلاج بالمساج السويدي",
            description: "تقنية مساج تقليدية تساعد في الاسترخاء وتخفيف التوتر",
            image: "assets/images/5.jpg",
            price: "280 ريال",
            duration: "60 دقيقة",
            category: "massage"
        },
        {
            id: 5,
            name: "العلاج بتمارين الظهر",
            description: "تمارين مخصصة لعلاج آلام الظهر وتقوية عضلاته",
            image: "assets/images/5.jpg",
            price: "270 ريال",
            duration: "50 دقيقة",
            category: "exercise"
        },
        {
            id: 6,
            name: "العلاج بالموجات فوق الصوتية",
            description: "استخدام الموجات فوق الصوتية لعلاج الالتهابات والآلام المزمنة",
            image: "assets/images/5.jpg",
            price: "400 ريال",
            duration: "40 دقيقة",
            category: "electrotherapy"
        }
    ];

    // Function to create treatment cards
    function createTreatmentCard(treatment) {
        return `
            <div class="treatment-card" data-category="${treatment.category}">
                    <div class="treatment-image">
                    <img src="${treatment.image}" alt="${treatment.name}">
                    </div>
                    <div class="treatment-info">
                    <h3 class="treatment-name">${treatment.name}</h3>
                    <p class="treatment-description">${treatment.description}</p>
                    <div class="treatment-details">
                        <span class="treatment-price">${treatment.price}</span>
                        <span class="treatment-duration">${treatment.duration}</span>
                    </div>
                    <button class="book-now-btn">احجز الآن</button>
                    </div>
                </div>
            `;
    }

    // Function to render treatments
    function renderTreatments(treatmentsToRender) {
        const treatmentsContainer = document.getElementById('treatments-container');
        if (!treatmentsContainer) return;

        treatmentsContainer.innerHTML = '';
        
        if (treatmentsToRender.length === 0) {
            treatmentsContainer.innerHTML = '<div class="no-treatments">لا توجد علاجات متاحة في هذه الفئة</div>';
            return;
        }

        treatmentsToRender.forEach(treatment => {
            treatmentsContainer.innerHTML += createTreatmentCard(treatment);
        });
    }

    // Filter treatments by category
    function filterTreatments() {
        const categoryFilter = document.getElementById('category-filter');
        if (!categoryFilter) return;

        const selectedCategory = categoryFilter.value;
        let filteredTreatments;

        if (selectedCategory === 'all') {
            filteredTreatments = treatments;
        } else {
            filteredTreatments = treatments.filter(treatment => treatment.category === selectedCategory);
        }

        renderTreatments(filteredTreatments);
    }

    // Initialize the page
    function init() {
        // Render all treatments initially
        renderTreatments(treatments);

        // Set up category filter
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', filterTreatments);
    }

        // Category card click handlers
    const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                const category = this.dataset.category;
                if (categoryFilter) {
                    categoryFilter.value = category;
                    filterTreatments();
                }
            });
        });

        // Testimonial slider functionality
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const prevButton = document.querySelector('.prev-testimonial');
        const nextButton = document.querySelector('.next-testimonial');
        
        if (testimonialCards.length && prevButton && nextButton) {
            let currentIndex = 0;
            
            // Show only the current testimonial
            function updateTestimonials() {
                testimonialCards.forEach((card, index) => {
                    card.style.display = index === currentIndex ? 'block' : 'none';
        });
    }
    
            // Initial display
            updateTestimonials();
            
            // Previous button click
            prevButton.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
                updateTestimonials();
            });
            
            // Next button click
            nextButton.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % testimonialCards.length;
                updateTestimonials();
            });
        }

        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', function() {
                mobileMenu.classList.toggle('show');
            });
        }

        // Contact options toggle
        const contactIcons = document.querySelectorAll('.contact-icon');
        
        contactIcons.forEach(icon => {
            icon.addEventListener('click', function(e) {
                e.stopPropagation();
                const options = this.querySelector('.contact-options');
                options.classList.toggle('show');
                
                // Close other open contact options
                contactIcons.forEach(otherIcon => {
                    if (otherIcon !== icon) {
                        const otherOptions = otherIcon.querySelector('.contact-options');
                        if (otherOptions) otherOptions.classList.remove('show');
                    }
        });
            });
        });
        
        // Close dropdowns when clicking elsewhere on the page
        document.addEventListener('click', function() {
            document.querySelectorAll('.contact-options').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        });
    }

    // Start the application
    init();
});