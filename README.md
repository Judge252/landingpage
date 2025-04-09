# عيادة العلاج الطبيعي - موقع إلكتروني

موقع إلكتروني لعيادة العلاج الطبيعي يقدم خدمات العلاج الطبيعي ومنتجات طبية.

## المميزات

- تصميم متجاوب يعمل على جميع الأجهزة
- عرض المنتجات والعلاجات مع خيارات التصفية
- وظائف سلة التسوق
- إدارة المفضلة
- دعم اللغة العربية والاتجاه من اليمين إلى اليسار (RTL)
- واجهة مستخدم سهلة الاستخدام وجذابة

## هيكل المشروع

```
/
├── index.html              # الصفحة الرئيسية
├── favorite.html           # صفحة المفضلة
├── products.html           # صفحة المنتجات
├── about.html              # صفحة من نحن
├── contact.html            # صفحة اتصل بنا
├── treatments.html         # صفحة العلاجات
├── cart.html               # صفحة سلة التسوق
├── profile.html            # صفحة الملف الشخصي
├── login.html              # صفحة تسجيل الدخول
├── product-detail.html     # صفحة تفاصيل المنتج
├── css/                    # ملفات CSS
│   ├── index.css           # الأنماط الرئيسية
│   └── favorite.css        # أنماط صفحة المفضلة
├── js/                     # ملفات JavaScript
│   ├── main.js             # الوظائف الرئيسية
│   ├── favorite.js         # وظائف صفحة المفضلة
│   ├── products.js         # وظائف صفحة المنتجات
│   ├── cart.js             # وظائف سلة التسوق
│   └── ...                 # ملفات JavaScript أخرى
└── assets/                 # الصور والموارد الأخرى
    └── images/             # الصور
```

## المتطلبات

- متصفح حديث يدعم JavaScript ES6+
- اتصال بالإنترنت للوصول إلى الموارد الخارجية

## التطوير

للتطوير المحلي، يمكنك استخدام خادم محلي بسيط:

```bash
# باستخدام Python
python -m http.server 8000

# أو باستخدام Node.js
npx serve
```

ثم افتح المتصفح على العنوان `http://localhost:8000`

## تخزين البيانات

يستخدم الموقع التخزين المحلي (localStorage) لتخزين:
- سلة التسوق
- المفضلة
- معلومات المستخدم (بعد تسجيل الدخول)

## التكنولوجيا المستخدمة

- HTML5
- CSS3
- JavaScript (Vanilla)
- Font Awesome للأيقونات
- Google Fonts (Tajawal) للخطوط العربية 