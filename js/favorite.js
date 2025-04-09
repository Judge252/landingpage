// DOM Elements
const favoritesGrid = document.querySelector('.favorites-grid');
const emptyFavoritesMessage = document.querySelector('.empty-favorites');
const loadingSpinner = document.querySelector('.loading-spinner');

// State
let favorites = [];
let isLoading = true;

// Event Listeners
document.addEventListener('DOMContentLoaded', initializeFavorites);

// Initialize favorites
function initializeFavorites() {
    try {
        showLoading();
        // Load favorites from localStorage
        favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        displayFavorites();
    } catch (error) {
        console.error('Error loading favorites:', error);
        showError('حدث خطأ أثناء تحميل المفضلة');
    } finally {
        hideLoading();
    }
}

// Display favorites
function displayFavorites() {
    if (favorites.length === 0) {
        showEmptyState();
        return;
    }

    hideEmptyState();
    favoritesGrid.innerHTML = favorites.map(item => createItemCard(item)).join('');
    
    // Add event listeners to buttons
    document.querySelectorAll('.remove-favorite').forEach(button => {
        button.addEventListener('click', handleRemoveFavorite);
    });
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
}

// Create item card
function createItemCard(item) {
    return `
        <div class="item-card" data-id="${item.id}">
                    <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-type">${item.category}</div>
            <div class="item-actions">
                        <button class="remove-favorite" data-id="${item.id}">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="add-to-cart" data-id="${item.id}">
                    <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                    <div class="item-info">
                        <h3 class="item-name">${item.name}</h3>
                <div class="item-price">
                    <span class="current-price">${item.price} ريال</span>
                    ${item.oldPrice ? `<span class="old-price">${item.oldPrice} ريال</span>` : ''}
                </div>
                <div class="item-rating">
                    ${generateRatingStars(item.rating)}
                    <span class="rating-count">(${item.reviewCount || 0})</span>
                </div>
                        </div>
                    </div>
                `;
            }
            
// Generate rating stars
function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return `
        ${Array(fullStars).fill('<i class="fas fa-star"></i>').join('')}
        ${hasHalfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
        ${Array(emptyStars).fill('<i class="far fa-star"></i>').join('')}
    `;
}

// Handle remove favorite
function handleRemoveFavorite(event) {
    const productId = event.currentTarget.dataset.id;
    try {
        // Remove from favorites array
        favorites = favorites.filter(item => item.id !== productId);
        // Update localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
        // Update display
        displayFavorites();
        showNotification('تمت إزالة المنتج من المفضلة');
    } catch (error) {
        console.error('Error removing favorite:', error);
        showError('حدث خطأ أثناء إزالة المنتج من المفضلة');
    }
}

// Handle add to cart
function handleAddToCart(event) {
    const productId = event.currentTarget.dataset.id;
    try {
        // Get current cart
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        // Find product in favorites
        const product = favorites.find(item => item.id === productId);
        if (product) {
            // Check if product already in cart
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            // Update localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
            // Update cart count
            updateCartCount();
            showNotification('تمت إضافة المنتج إلى السلة');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        showError('حدث خطأ أثناء إضافة المنتج إلى السلة');
    }
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

// Utility functions
function showLoading() {
    isLoading = true;
    loadingSpinner.style.display = 'flex';
    favoritesGrid.style.display = 'none';
    emptyFavoritesMessage.style.display = 'none';
}

function hideLoading() {
    isLoading = false;
    loadingSpinner.style.display = 'none';
    favoritesGrid.style.display = 'grid';
}

function showEmptyState() {
    emptyFavoritesMessage.style.display = 'block';
    favoritesGrid.style.display = 'none';
}

function hideEmptyState() {
    emptyFavoritesMessage.style.display = 'none';
    favoritesGrid.style.display = 'grid';
}

function showNotification(message) {
    // You can implement your preferred notification system here
    alert(message);
}

function showError(message) {
    // You can implement your preferred error notification system here
    alert(message);
}