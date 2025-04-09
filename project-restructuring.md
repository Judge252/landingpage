# Project Restructuring Documentation

## Overview

This document explains the restructuring done to organize the landing page project. The restructuring aimed to create a more maintainable, scalable, and clean project structure following web development best practices.

## Changes Made

### 1. Directory Structure

The project now has the following directory structure:

```
landing-page/
├── assets/
│   └── images/       # All images consolidated here
│       └── eldry/    # Specific category images
├── css/              # All CSS files
├── js/               # All JavaScript files
├── HTML files        # In the root directory
├── README.md         # Project documentation
└── .gitignore        # Git ignore file
```

### 2. File Moves

#### CSS Files
- All CSS files were moved to the `css/` directory
- This includes: `index.css`, `about.css`, `products.css`, `treatments.css`, `cart.css`, `contact.css`, `favorite.css`, `login.css`, `product-detail.css`

#### JavaScript Files
- All JavaScript files were moved to the `js/` directory
- This includes: `index.js`, `about.js`, `products.js`, `treatments.js`, `cart.js`, `contact.js`, `favorite.js`, `favorites.js`, `login.js`, `product-detail.js`

#### Image Files
- Created a new `assets/images/` directory
- Moved `logo.png` to `assets/images/`
- Copied all files from `im/` to `assets/images/`
- Copied all files from `im/eldry/` to `assets/images/eldry/`
- Copied all files from `images/` to `assets/images/`

### 3. Reference Updates

All HTML files have been updated to reference the new file locations:

- CSS references:
  - From: `<link rel="stylesheet" href="filename.css">`
  - To: `<link rel="stylesheet" href="css/filename.css">`

- JavaScript references:
  - From: `<script src="filename.js"></script>`
  - To: `<script src="js/filename.js"></script>`

- Image references:
  - From: `<img src="images/logo.png">` or `<img src="im/filename.jpg">`
  - To: `<img src="assets/images/logo.png">` or `<img src="assets/images/filename.jpg">`

### 4. Added Files

- **README.md**: Contains project documentation, structure overview, and setup instructions.
- **.gitignore**: Standard git ignore file for web projects.
- **project-restructuring.md**: This document explaining all the changes made.

## Next Steps

To complete the restructuring:

1. Update the remaining HTML files to reference the new file locations (only `index.html` was updated as an example).
2. Test all pages to ensure they load correctly with the new file references.
3. Consider implementing a build process or bundler in the future (such as Webpack, Parcel, or Vite) to optimize for production. 