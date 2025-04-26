document.addEventListener('DOMContentLoaded', function() {
    // Get the footer element
    const footer = document.querySelector('footer');
    
    if (footer) {
        // Set the footer content
        footer.innerHTML = `
        <div class="quick-connect-section">
            <div class="container">
                <div class="quick-connect-content animated-element">
                    <div class="quick-connect-text">
                        <h3>احجز موعداً الآن</h3>
                        <p>احصل على استشارة سريعة أو احجز موعدًا لزيارة العيادة</p>
                    </div>
                    <div class="quick-connect-buttons">
                        <a href="https://api.whatsapp.com/send/?phone=972526020026&text=أود%20حجز%20موعد%20للكشف&type=phone_number&app_absent=0" target="_blank" class="connect-btn whatsapp-btn">
                            <i class="fab fa-whatsapp"></i> تواصل عبر واتساب
                        </a>
                        <a href="tel:+97252-602-0026" class="connect-btn call-btn">
                            <i class="fas fa-phone-alt"></i> اتصل بنا
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-main">
            <div class="container">
                <div class="footer-sections">
                    <div class="footer-section animated-element">
                        <h3>تواصل معنا</h3>
                        <div class="contact-info">
                            <div class="contact-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <p>طرعان - 14 شارع ابوبكر</p>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-phone"></i>
                                <p dir="ltr">+972 52-602-0026</p>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-clock"></i>
                                <p>أيام العمل: الأحد - الخميس</p>
                                <p>ساعات العمل: 9:00 ص - 7:00 م</p>
                            </div>
                        </div>
                    </div>

                    <div class="footer-section animated-element">
                        <h3>روابط سريعة</h3>
                        <ul>
                            <li><a href="index.html">الرئيسية</a></li>
                            <li><a href="about.html">من نحن</a></li>
                            <li><a href="products.html">منتجاتنا</a></li>
                            <li><a href="treatments.html">العلاجات</a></li>
                            <li><a href="favorite.html">المفضلة</a></li>
                            <li><a href="contact.html">تواصل معنا</a></li>
                        </ul>
                    </div>

                    <div class="footer-section animated-element">
                        <img src="assets/images/logo.png" alt="عيادة العلاج الطبيعي" class="footer-logo">
                        <p>نحن مركز متخصص في العلاج الطبيعي وتوفير أحدث المنتجات الطبية لتحسين صحتك وراحتك.</p>
                        <div class="social-icons">
                            <a href="https://api.whatsapp.com/send/?phone=972526020026&text&type=phone_number&app_absent=0&wame_ctl=1" target="_blank" class="social-icon" aria-label="WhatsApp">
                                <i class="fab fa-whatsapp"></i>
                            </a>
                            <a href="https://www.instagram.com/theclinic.sal?igsh=ZmxyMDZkYW40eHU0" target="_blank" class="social-icon" aria-label="Instagram">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="https://www.facebook.com/share/1EneHRr84o/?mibextid=wwXIfr" target="_blank" class="social-icon" aria-label="Facebook">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <div class="container">
                <p>&copy; ${new Date().getFullYear()} عيادة العلاج الطبيعي. جميع الحقوق محفوظة.</p>
            </div>
        </div>
        `;
        
        // Add animation to elements as they appear in viewport
        const animatedElements = document.querySelectorAll('.animated-element');
        
        // Create an observer to detect when elements come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe all animated elements
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}); 