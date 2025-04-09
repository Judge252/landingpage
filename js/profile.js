document.addEventListener('DOMContentLoaded', function() {
    // Check if user is authenticated
    // This is a simple simulation since we don't have a real authentication system
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const currentUser = localStorage.getItem('currentUser');
    
    // Set user name if available
    if (currentUser) {
        const userNameElement = document.getElementById('user-name');
        if (userNameElement) {
            userNameElement.textContent = `أهلاً، ${currentUser}`;
        }
    }
    
    // For demonstration purposes only - in a real app, you'd use a proper auth system
    // If this is the first visit, set as authenticated with a default user
    if (!isAuthenticated) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', 'محمد أحمد');
        showNotification('تم تسجيل الدخول بنجاح', 'success');
    }
    
    // Tab Navigation
    const tabLinks = document.querySelectorAll('.profile-nav li:not(.logout)');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all tabs
            tabLinks.forEach(item => item.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current tab
            this.classList.add('active');
            
            // Show the corresponding tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Profile Image Upload
    const avatarUpload = document.getElementById('avatar-upload');
    const profileAvatar = document.getElementById('profile-avatar-img');
    
    if (avatarUpload && profileAvatar) {
        avatarUpload.addEventListener('change', function(event) {
            const file = event.target.files[0];
            
            if (file) {
                // Check if file is an image
                if (!file.type.match('image.*')) {
                    alert('الرجاء اختيار صورة صالحة');
                    return;
                }
                
                // Check file size (max 2MB)
                if (file.size > 2 * 1024 * 1024) {
                    alert('حجم الصورة يجب أن لا يتجاوز 2 ميجابايت');
                    return;
                }
                
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    profileAvatar.src = e.target.result;
                    
                    // Here you would typically upload the image to the server
                    // For now, we'll just show a success message
                    showNotification('تم تحديث صورة الملف الشخصي بنجاح', 'success');
                };
                
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Logout Functionality
    const logoutButton = document.querySelector('.profile-nav li.logout');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                // Clear authentication state
                localStorage.removeItem('isAuthenticated');
                
                // Show notification and redirect
                showNotification('تم تسجيل الخروج بنجاح', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    }
    
    // Profile Form Submission
    const profileForm = document.querySelector('.profile-form');
    
    if (profileForm) {
        profileForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Here you would typically send data to the server
            // For now, we'll just show a success message
            showNotification('تم تحديث المعلومات الشخصية بنجاح', 'success');
        });
    }
    
    // Security Form Submission
    const securityForm = document.querySelector('.security-form');
    
    if (securityForm) {
        securityForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Simple validation
            if (!currentPassword || !newPassword || !confirmPassword) {
                showNotification('الرجاء ملء جميع الحقول', 'error');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showNotification('كلمة المرور الجديدة وتأكيدها غير متطابقين', 'error');
                return;
            }
            
            // Password strength validation
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            
            if (!passwordRegex.test(newPassword)) {
                showNotification('كلمة المرور لا تستوفي متطلبات القوة المطلوبة', 'error');
                return;
            }
            
            // Here you would typically send data to the server
            // For now, we'll just show a success message
            showNotification('تم تغيير كلمة المرور بنجاح', 'success');
            securityForm.reset();
        });
    }
    
    // Add to Cart Functionality for Favorites
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Here you would typically add the product to the cart
            // For now, we'll just show a success message
            showNotification(`تمت إضافة "${productName}" إلى سلة التسوق`, 'success');
            
            // Update cart count
            const cartCount = document.querySelectorAll('.cart-count');
            cartCount.forEach(count => {
                let currentCount = parseInt(count.textContent);
                count.textContent = currentCount + 1;
            });
        });
    });
    
    // Address Actions
    const makeDefaultButtons = document.querySelectorAll('.make-default');
    
    makeDefaultButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove default class from all address cards
            document.querySelectorAll('.address-card').forEach(card => {
                card.classList.remove('default');
                card.querySelector('.address-header').innerHTML = `
                    <h4>${card.querySelector('.address-header h4').textContent}</h4>
                `;
            });
            
            // Add default class to current address card
            const addressCard = this.closest('.address-card');
            addressCard.classList.add('default');
            addressCard.querySelector('.address-header').innerHTML = `
                <h4>${addressCard.querySelector('.address-header h4').textContent}</h4>
                <span class="default-badge">افتراضي</span>
            `;
            
            // Remove make default button
            this.remove();
            
            showNotification('تم تعيين العنوان كافتراضي بنجاح', 'success');
        });
    });
    
    // Add New Address
    const addAddressButton = document.querySelector('.add-address-btn');
    
    if (addAddressButton) {
        addAddressButton.addEventListener('click', function() {
            // Here you would typically show a modal or redirect to add address page
            // For now, we'll just show a message
            showNotification('سيتم تنفيذ هذه الميزة قريبًا', 'info');
        });
    }
    
    // Utility function to show notifications
    function showNotification(message, type = 'info') {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        // Add type class
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Show notification
        notification.classList.add('show');
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Add necessary styles for notification
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
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
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
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
    
    document.head.appendChild(notificationStyle);
}); 