// Menu Data with prices in Indian Rupees
const menuItems = [
    {
        id: 1,
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
        price: 299,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Pepperoni Pizza",
        description: "Traditional pizza with pepperoni and mozzarella cheese",
        price: 349,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Classic Cheeseburger",
        description: "Juicy beef patty with cheese, lettuce, tomato, and special sauce",
        price: 249,
        category: "burger",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "BBQ Bacon Burger",
        description: "Burger with bacon, cheddar cheese, and BBQ sauce",
        price: 299,
        category: "burger",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Spaghetti Carbonara",
        description: "Pasta with eggs, cheese, pancetta, and black pepper",
        price: 319,
        category: "pasta",
        image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Fettuccine Alfredo",
        description: "Pasta with creamy Parmesan sauce",
        price: 279,
        category: "pasta",
        image: "https://images.unsplash.com/photo-1470125634816-ede3f51bbb42?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Caesar Salad",
        description: "Crisp romaine lettuce with Caesar dressing and croutons",
        price: 199,
        category: "salad",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Greek Salad",
        description: "Fresh vegetables with feta cheese and olives",
        price: 219,
        category: "salad",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        name: "Chocolate Cake",
        description: "Rich chocolate cake with chocolate frosting",
        price: 149,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 10,
        name: "Cheesecake",
        description: "Creamy cheesecake with strawberry topping",
        price: 179,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 11,
        name: "Veggie Pizza",
        description: "Pizza loaded with fresh vegetables and mozzarella",
        price: 329,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 12,
        name: "Chicken Burger",
        description: "Grilled chicken burger with lettuce and mayo",
        price: 269,
        category: "burger",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
];

// Cart State
let cart = JSON.parse(localStorage.getItem('freshbites_cart')) || [];

// DOM Elements
const menuGrid = document.getElementById('menuGrid');
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const filterButtons = document.querySelectorAll('.filter-btn');
const checkoutBtn = document.getElementById('checkoutBtn');

// Format price in Indian Rupees
function formatPrice(price) {
    return `₹${price}`;
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Create notification content
    const notificationContent = document.createElement('div');
    notificationContent.className = 'notification-content';
    notificationContent.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.appendChild(notificationContent);
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 10000;
                animation: slideIn 0.3s ease;
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 500;
                max-width: 350px;
            }
            
            .notification.success {
                background-color: #4ecdc4;
                color: white;
            }
            
            .notification.error {
                background-color: #ff6b6b;
                color: white;
            }
            
            .notification.info {
                background-color: #3742fa;
                color: white;
            }
            
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize the application
function init() {
    if (menuGrid) {
        renderMenuItems('all');
    }
    updateCartDisplay();
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    // Check if elements exist before adding event listeners
    if (cartIcon) {
        cartIcon.addEventListener('click', openCart);
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', closeCartSidebar);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeCartSidebar);
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
    
    // Filter buttons
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items
                const category = button.dataset.category;
                renderMenuItems(category);
            });
        });
    }
}

// Render menu items based on filter
function renderMenuItems(category) {
    if (!menuGrid) return;
    
    menuGrid.innerHTML = '';
    
    let filteredItems = menuItems;
    if (category !== 'all') {
        filteredItems = menuItems.filter(item => item.category === category);
    }
    
    filteredItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'menu-item';
        menuItemElement.innerHTML = `
            <div class="item-image" style="background-image: url('${item.image}')"></div>
            <div class="item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="item-footer">
                    <div class="price">${formatPrice(item.price)}</div>
                    <button class="add-to-cart" data-id="${item.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(menuItemElement);
    });
    
    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.currentTarget.dataset.id);
            addToCart(itemId);
        });
    });
}

// Add item to cart
function addToCart(itemId) {
    const item = menuItems.find(menuItem => menuItem.id === itemId);
    if (!item) return;
    
    // Check if item already exists in cart
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    // Save to localStorage
    try {
        localStorage.setItem('freshbites_cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
    
    // Update cart display
    updateCartDisplay();
    
    // Show cart sidebar
    openCart();
    
    // Show success message
    showNotification(`${item.name} added to cart!`);
}

// Update cart display
function updateCartDisplay() {
    // Update cart count
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + (item.quantity || 0), 0);
        cartCount.textContent = totalItems;
    }
    
    // Update cart items
    if (cartItems) {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            if (emptyCartMessage) {
                emptyCartMessage.style.display = 'block';
            }
        } else {
            if (emptyCartMessage) {
                emptyCartMessage.style.display = 'none';
            }
            
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <div class="cart-item-controls">
                            <button class="quantity-btn decrease" data-id="${item.id}">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="item-quantity">${item.quantity || 1}</span>
                            <button class="quantity-btn increase" data-id="${item.id}">
                                <i class="fas fa-plus"></i>
                            </button>
                            <span class="cart-item-price">${formatPrice(item.price * (item.quantity || 1))}</span>
                            <button class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                cartItems.appendChild(cartItemElement);
            });
            
            // Add event listeners to cart controls
            document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemId = parseInt(e.currentTarget.dataset.id);
                    updateCartItemQuantity(itemId, -1);
                });
            });
            
            document.querySelectorAll('.quantity-btn.increase').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemId = parseInt(e.currentTarget.dataset.id);
                    updateCartItemQuantity(itemId, 1);
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    const itemId = parseInt(e.currentTarget.dataset.id);
                    removeCartItem(itemId);
                });
            });
        }
    }
    
    // Update cart total
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
        cartTotal.textContent = formatPrice(total);
    }
}

// Update cart item quantity
function updateCartItemQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    
    if (item) {
        // Initialize quantity if not present
        if (!item.quantity) item.quantity = 1;
        
        item.quantity += change;
        
        // Remove item if quantity is 0 or less
        if (item.quantity <= 0) {
            cart = cart.filter(cartItem => cartItem.id !== itemId);
            showNotification('Item removed from cart');
        }
        
        // Save to localStorage
        try {
            localStorage.setItem('freshbites_cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
        
        // Update cart display
        updateCartDisplay();
    }
}

// Remove cart item
function removeCartItem(itemId) {
    const item = cart.find(item => item.id === itemId);
    cart = cart.filter(item => item.id !== itemId);
    
    // Save to localStorage
    try {
        localStorage.setItem('freshbites_cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
    
    // Update cart display
    updateCartDisplay();
    
    // Show notification
    if (item) {
        showNotification(`${item.name} removed from cart`);
    }
}

// Open cart sidebar
function openCart() {
    if (cartSidebar) cartSidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close cart sidebar
function closeCartSidebar() {
    if (cartSidebar) cartSidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    
    // Show order confirmation
    showNotification(`Order placed successfully! Total: ${formatPrice(total)}`, 'success');
    
    // Clear cart
    cart = [];
    try {
        localStorage.setItem('freshbites_cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
    
    // Update cart display
    updateCartDisplay();
    closeCartSidebar();
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Promise rejection:', e.reason);
});