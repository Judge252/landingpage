document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Password Visibility Toggle
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const targetId = icon.getAttribute('data-target');
            const input = document.getElementById(targetId);
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Form Submission (Placeholder)
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('#login-email').value;
        const password = loginForm.querySelector('#login-password').value;
        console.log('Login Attempt:', { email, password });
        alert('تم محاولة تسجيل الدخول! (هذا عرض توضيحي)');
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = signupForm.querySelector('#signup-name').value;
        const email = signupForm.querySelector('#signup-email').value;
        const password = signupForm.querySelector('#signup-password').value;
        const confirmPassword = signupForm.querySelector('#signup-confirm-password').value;
        const phone = signupForm.querySelector('#signup-phone').value;

        if (password !== confirmPassword) {
            alert('كلمة المرور وتأكيدها غير متطابقتين!');
            return;
        }

        console.log('Signup Attempt:', { name, email, password, phone });
        alert('تم محاولة التسجيل! (هذا عرض توضيحي)');
    });

    // Social Login (Placeholder)
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const provider = button.classList.contains('google-btn') ? 'Google' : 'Facebook';
            console.log(`Attempting login with ${provider}`);
            alert(`سيتم تسجيل الدخول باستخدام ${provider} (هذا عرض توضيحي)`);
            // Actual integration would require OAuth setup with Google/Facebook APIs
        });
    });

    // Mobile Menu Toggle (Reused from original)
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('show');
    });
});