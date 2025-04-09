document.addEventListener('DOMContentLoaded', () => {
    // Get form elements
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.toggle-password');
    const rememberMeCheckbox = document.getElementById('remember-me');
    const forgotPasswordLink = document.getElementById('forgot-password');
    const googleLoginBtn = document.getElementById('google-login');
    const facebookLoginBtn = document.getElementById('facebook-login');
    const registerLink = document.getElementById('register-link');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    // Debug element finding
    console.log('Login form found:', !!loginForm);
    console.log('Email input found:', !!emailInput);
    console.log('Password input found:', !!passwordInput);
    console.log('Remember me checkbox found:', !!rememberMeCheckbox);
    console.log('Forgot password link found:', !!forgotPasswordLink);
    console.log('Google login button found:', !!googleLoginBtn);
    console.log('Facebook login button found:', !!facebookLoginBtn);
    console.log('Register link found:', !!registerLink);
    console.log('Error message element found:', !!errorMessage);
    console.log('Success message element found:', !!successMessage);

    // Check if user is already logged in - but only redirect if we're actually on the login page
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop();
    console.log('Current page:', pageName);
    
    if (pageName === 'login.html') {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        console.log('User has token:', !!token);
        if (token) {
            window.location.href = 'index.html';
            return;
        }
    }

    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    // Event Listeners
    loginForm.addEventListener('submit', handleLogin);
    forgotPasswordLink.addEventListener('click', handleForgotPassword);
    googleLoginBtn.addEventListener('click', handleGoogleLogin);
    facebookLoginBtn.addEventListener('click', handleFacebookLogin);
    registerLink.addEventListener('click', handleRegister);

    // Initialize login page
    initializeLoginPage();
});

// Helper Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
}

function clearMessages() {
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
}

function setLoadingState(isLoading) {
    const submitButton = loginForm.querySelector('button[type="submit"]');
    
    if (isLoading) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري تسجيل الدخول...';
    } else {
        submitButton.disabled = false;
        submitButton.innerHTML = 'تسجيل الدخول';
    }
}

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    
    // Clear any existing messages
    clearMessages();
    
    // Get form values
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberMeCheckbox.checked;
    
    // Validate form
    if (!validateLoginForm(email, password)) {
        return;
    }
    
    try {
        // Show loading state
        setLoadingState(true);
        
        // Simulate login delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Login successful
            handleLoginSuccess(user, rememberMe);
        } else {
            // Login failed
            showError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        }
    } catch (error) {
        console.error('Login error:', error);
        showError('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.');
    } finally {
        // Hide loading state
        setLoadingState(false);
    }
}

// Validate login form
function validateLoginForm(email, password) {
    // Reset validation styles
    resetValidationStyles();
    
    let isValid = true;
    
    // Validate email
    if (!email) {
        showFieldError(emailInput, 'يرجى إدخال البريد الإلكتروني');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError(emailInput, 'يرجى إدخال بريد إلكتروني صحيح');
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        showFieldError(passwordInput, 'يرجى إدخال كلمة المرور');
        isValid = false;
    }
    
    return isValid;
}

// Handle login success
function handleLoginSuccess(user, rememberMe) {
    // Save user to localStorage
    localStorage.setItem('user', JSON.stringify(user));
    
    // Save email if remember me is checked
    if (rememberMe) {
        localStorage.setItem('savedEmail', user.email);
    } else {
        localStorage.removeItem('savedEmail');
    }
    
    // Show success message
    showSuccess('تم تسجيل الدخول بنجاح! جاري التوجيه...');
    
    // Redirect to profile page after a short delay
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 1500);
}

// Handle forgot password
function handleForgotPassword(event) {
    event.preventDefault();
    
    // Clear any existing messages
    clearMessages();
    
    // Get email
    const email = emailInput.value.trim();
    
    // Validate email
    if (!email) {
        showFieldError(emailInput, 'يرجى إدخال البريد الإلكتروني');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFieldError(emailInput, 'يرجى إدخال بريد إلكتروني صحيح');
        return;
    }
    
    // Show success message
    showSuccess('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
    
    // In a real application, this would send a reset password email
    console.log('Password reset requested for:', email);
}

// Handle Google login
function handleGoogleLogin(event) {
    event.preventDefault();
    
    // Clear any existing messages
    clearMessages();
    
    // Show message that this is a demo
    showError('هذه ميزة تجريبية. في التطبيق الحقيقي، سيتم توجيهك إلى صفحة تسجيل الدخول بجوجل.');
    
    // In a real application, this would redirect to Google OAuth
    console.log('Google login clicked');
}

// Handle Facebook login
function handleFacebookLogin(event) {
    event.preventDefault();
    
    // Clear any existing messages
    clearMessages();
    
    // Show message that this is a demo
    showError('هذه ميزة تجريبية. في التطبيق الحقيقي، سيتم توجيهك إلى صفحة تسجيل الدخول بفيسبوك.');
    
    // In a real application, this would redirect to Facebook OAuth
    console.log('Facebook login clicked');
}

// Handle register link
function handleRegister(event) {
    event.preventDefault();
    
    // Redirect to register page
    window.location.href = 'register.html';
}

function showFieldError(input, message) {
    input.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    // Add error message after input
    input.parentNode.appendChild(errorElement);
}

function resetValidationStyles() {
    // Remove error class from all inputs
    document.querySelectorAll('.form-group input').forEach(input => {
        input.classList.remove('error');
    });
    
    // Remove all field error messages
    document.querySelectorAll('.field-error').forEach(error => {
        error.remove();
    });
}

// Initialize login page
function initializeLoginPage() {
    // Check if user is already logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        // Redirect to profile page if already logged in
        window.location.href = 'profile.html';
        return;
    }

    // Check if there's a saved email
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMeCheckbox.checked = true;
    }

    // Clear any existing messages
    clearMessages();
}

// Add error message styles
const style = document.createElement('style');
style.textContent = `
    .error-message {
        background-color: #ffebee;
        color: #c62828;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 15px;
        text-align: center;
        display: none;
    }
`;
document.head.appendChild(style); 