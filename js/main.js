// E-commerce Global Variables
let cart = JSON.parse(localStorage.getItem('ssvoila_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('ssvoila_wishlist')) || [];

// Sample Products Data
const sampleProducts = [
    {
        id: 1,
        name: "Beyaz Keten Gömlek",
        brand: "SS Voila",
        price: 1299,
        originalPrice: 1599,
        images: ["images/featured-look-1.jpg", "images/lookbook-item-1.jpg"],
        category: "gomlek",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["white", "beige"],
        description: "Premium keten kumaştan üretilmiş, yazın sıcak günlerinde maximum konfor sağlayan gömlek."
    },
    {
        id: 2,
        name: "Denizci Elbise",
        brand: "SS Voila",
        price: 2299,
        originalPrice: null,
        images: ["images/featured-look-2.jpg", "images/lookbook-item-2.jpg"],
        category: "elbise",
        sizes: ["XS", "S", "M", "L"],
        colors: ["navy", "white"],
        description: "Klasik kesim ile modern detayların buluştuğu zarif elbise."
    },
    {
        id: 3,
        name: "Rahat Kesim Pantolon",
        brand: "SS Voila",
        price: 1899,
        originalPrice: 2299,
        images: ["images/featured-look-3.jpg", "images/lookbook-item-3.jpg"],
        category: "pantolon",
        sizes: ["S", "M", "L", "XL"],
        colors: ["black", "beige", "navy"],
        description: "Günlük kullanım için mükemmel, rahat ve şık pantolon."
    },
    {
        id: 4,
        name: "Casual Blazer",
        brand: "SS Voila",
        price: 3299,
        originalPrice: null,
        images: ["images/lookbook-item-4.jpg", "images/lookbook-item-5.jpg"],
        category: "ceket",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["black", "navy"],
        description: "İş ve günlük yaşamda kullanabileceğiniz çok amaçlı blazer."
    }
];

// Sample Men's Fashion Products Data
const mensFashionProducts = [
    {
        id: 1,
        name: "Oversized Beyaz Tişört",
        category: "t-shirts",
        price: 299,
        originalPrice: null,
        image: "images/lookbook-item-1.jpg",
        badge: "Yeni",
        colors: ["white", "black", "green"],
        sizes: ["S", "M", "L", "XL"],
        description: "Yaz günlerinin vazgeçilmez parçası oversized beyaz tişört. %100 pamuk kumaş."
    },
    {
        id: 2,
        name: "Kargo Şort",
        category: "shorts",
        price: 399,
        originalPrice: 499,
        image: "images/lookbook-item-2.jpg",
        badge: "%20 İndirim",
        colors: ["olive", "brown", "navy"],
        sizes: ["S", "M", "L", "XL"],
        description: "Rahat kesimli kargo şort. Çok cepli pratik tasarım."
    },
    {
        id: 3,
        name: "Keten Karışımlı Gömlek",
        category: "shirts",
        price: 599,
        originalPrice: null,
        image: "images/lookbook-item-3.jpg",
        badge: null,
        colors: ["beige", "blue", "gray"],
        sizes: ["S", "M", "L", "XL"],
        description: "Nefes alabilir keten karışımlı yazlık gömlek. Şık ve rahat."
    },
    {
        id: 4,
        name: "Set: Beyaz Tişört + Şort",
        category: "sets",
        price: 549,
        originalPrice: 699,
        image: "images/lookbook-item-4.jpg",
        badge: "Set",
        colors: ["white", "gray"],
        sizes: ["S", "M", "L", "XL"],
        description: "Uyumlu 2'li set. Ayrı alınabilir ürünler."
    },
    {
        id: 5,
        name: "Vintage Tişört",
        category: "t-shirts",
        price: 349,
        originalPrice: null,
        image: "images/lookbook-item-5.jpg",
        badge: null,
        colors: ["gray", "navy", "black"],
        sizes: ["S", "M", "L", "XL"],
        description: "Vintage baskılı pamuklu tişört. Retro tarz."
    },
    {
        id: 6,
        name: "Chino Şort",
        category: "shorts",
        price: 449,
        originalPrice: null,
        image: "images/lookbook-item-6.jpg",
        badge: null,
        colors: ["beige", "navy", "olive"],
        sizes: ["S", "M", "L", "XL"],
        description: "Klasik chino şort. Her kombine uygun."
    },
    {
        id: 7,
        name: "Polo Tişört",
        category: "t-shirts",
        price: 399,
        originalPrice: null,
        image: "images/lookbook-item-7.jpg",
        badge: null,
        colors: ["white", "navy", "green"],
        sizes: ["S", "M", "L", "XL"],
        description: "Şık polo yaka tişört. İş ve günlük kullanım."
    },
    {
        id: 8,
        name: "Linen Gömlek",
        category: "shirts",
        price: 699,
        originalPrice: null,
        image: "images/lookbook-item-8.jpg",
        badge: "Premium",
        colors: ["white", "beige", "blue"],
        sizes: ["S", "M", "L", "XL"],
        description: "%100 keten gömlek. Yazın en şık seçimi."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize app
    initializeApp();
    
    // Page Fade-In
    document.body.classList.add('fade-in');
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize cart
    initializeCart();
    
    // Initialize animations
    initializeAnimations();
    
    // Page-specific initializations
    if (document.body.classList.contains('page-index')) {
        initializeHomePage();
    } else if (document.body.classList.contains('page-shop')) {
        initializeShopPage();
    } else if (document.body.classList.contains('page-product')) {
        initializeProductPage();
    }
});

function initializeApp() {
    // Update cart and wishlist counters
    updateCartCounter();
    updateWishlistCounter();
    
    // Load products into localStorage if not exists
    if (!localStorage.getItem('ssvoila_products')) {
        localStorage.setItem('ssvoila_products', JSON.stringify(sampleProducts));
    }
}

function initializeNavigation() {
    // Active Navigation Link
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';
        link.classList.remove('active');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
    
    // Page transitions
    const allLinks = document.querySelectorAll('a:not([href^="#"]):not([target="_blank"]):not(.no-transition)');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && (href.startsWith('/') || href.includes('.html'))) {
                e.preventDefault();
                document.body.classList.add('page-fade-out');
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

function initializeCart() {
    const cartBtn = document.querySelector('.cart-btn');
    const miniCart = document.getElementById('miniCart');
    const closeMiniCart = document.querySelector('.close-cart');
    
    // Cart button click
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            openMiniCart();
        });
    }
    
    // Close mini cart
    if (closeMiniCart) {
        closeMiniCart.addEventListener('click', () => {
            closeMiniCartFunc();
        });
    }
    
    // Close cart when clicking outside
    if (miniCart) {
        miniCart.addEventListener('click', (e) => {
            if (e.target === miniCart) {
                closeMiniCartFunc();
            }
        });
    }
    
    // Render cart items
    renderMiniCart();
}

function openMiniCart() {
    const miniCart = document.getElementById('miniCart');
    if (miniCart) {
        miniCart.classList.add('open');
        document.body.style.overflow = 'hidden';
        renderMiniCart();
    }
}

function closeMiniCartFunc() {
    const miniCart = document.getElementById('miniCart');
    if (miniCart) {
        miniCart.classList.remove('open');
        document.body.style.overflow = '';
    }
}

function addToCart(productId, size = 'M', color = 'white', quantity = 1) {
    const products = JSON.parse(localStorage.getItem('ssvoila_products')) || sampleProducts;
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const cartItemId = `${productId}-${size}-${color}`;
    const existingItem = cart.find(item => item.id === cartItemId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: cartItemId,
            productId: productId,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size: size,
            color: color,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartCounter();
    renderMiniCart();
    
    // Show success animation
    showAddToCartSuccess();
}

function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.id !== cartItemId);
    saveCart();
    updateCartCounter();
    renderMiniCart();
}

function updateCartQuantity(cartItemId, newQuantity) {
    const item = cart.find(item => item.id === cartItemId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(cartItemId);
        } else {
            item.quantity = newQuantity;
            saveCart();
            updateCartCounter();
            renderMiniCart();
        }
    }
}

function saveCart() {
    localStorage.setItem('ssvoila_cart', JSON.stringify(cart));
}

function updateCartCounter() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

function renderMiniCart() {
    const miniCartItems = document.querySelector('.mini-cart-items');
    const cartTotal = document.querySelector('.cart-total strong');
    const emptyMessage = document.querySelector('.empty-cart-message');
    
    if (!miniCartItems) return;
    
    if (cart.length === 0) {
        if (emptyMessage) emptyMessage.style.display = 'block';
        return;
    }
    
    if (emptyMessage) emptyMessage.style.display = 'none';
    
    let total = 0;
    let cartHTML = '';
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        cartHTML += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Beden: ${item.size} | Renk: ${item.color}</p>
                    <div class="cart-item-controls">
                        <button onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="cart-item-price">
                    <span>₺${(item.price * item.quantity).toLocaleString()}</span>
                    <button onclick="removeFromCart('${item.id}')" class="remove-item">×</button>
                </div>
            </div>
        `;
    });
    
    miniCartItems.innerHTML = cartHTML;
    if (cartTotal) cartTotal.textContent = `₺${total.toLocaleString()}`;
}

function showAddToCartSuccess() {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'add-to-cart-success';
    notification.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✓</span>
            <span>Ürün sepete eklendi!</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Wishlist Functions
function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(productId);
    }
    
    localStorage.setItem('ssvoila_wishlist', JSON.stringify(wishlist));
    updateWishlistCounter();
    updateWishlistUI();
}

function updateWishlistCounter() {
    const wishlistCount = document.querySelector('.wishlist-count');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

function updateWishlistUI() {
    const wishlistButtons = document.querySelectorAll('.wishlist-toggle');
    wishlistButtons.forEach(btn => {
        const productId = parseInt(btn.dataset.productId);
        if (wishlist.includes(productId)) {
            btn.classList.add('active');
            btn.innerHTML = '♥';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '♡';
        }
    });
}

function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all reveal items
    document.querySelectorAll('.reveal-item').forEach(item => {
        observer.observe(item);
    });
    
    // Add reveal class to collection cards
    document.querySelectorAll('.collection-card, .product-card').forEach(item => {
        item.classList.add('reveal-item');
        observer.observe(item);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeHomePage() {
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            showNotification('Başarıyla abone oldunuz! 🎉', 'success');
            e.target.reset();
        });
    }
    
    // Dynamic product loading for home page
    loadFeaturedProducts();
}

function loadFeaturedProducts() {
    // This would typically load from an API
    // For now, we'll use our sample data
    const products = JSON.parse(localStorage.getItem('ssvoila_products')) || sampleProducts;
    
    // Add event listeners for quick actions if products are displayed
    setTimeout(() => {
        document.querySelectorAll('.quick-add-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.dataset.productId);
                addToCart(productId);
            });
        });
        
        document.querySelectorAll('.wishlist-toggle').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.dataset.productId);
                toggleWishlist(productId);
            });
        });
        
        updateWishlistUI();
    }, 100);
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function formatPrice(price) {
    return `₺${price.toLocaleString()}`;
}

function calculateDiscount(originalPrice, currentPrice) {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

// Custom Cursor (if enabled)
function initializeCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    let cursorVisible = false;
    
    document.addEventListener('mousemove', (e) => {
        if (!cursorVisible) {
            cursor.style.display = 'block';
            document.body.classList.add('custom-cursor-active');
            cursorVisible = true;
        }
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        document.body.classList.remove('custom-cursor-active');
        cursorVisible = false;
    });
    
    // Hover effects
    const interactiveElements = 'a, button, .product-card, .collection-card, input, textarea';
    document.addEventListener('mouseover', (e) => {
        if (e.target.matches(interactiveElements)) {
            cursor.classList.add('hover-effect');
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.matches(interactiveElements)) {
            cursor.classList.remove('hover-effect');
        }
    });
}

// Initialize custom cursor if not on mobile
if (window.innerWidth > 768) {
    initializeCustomCursor();
}

// Global functions for cart operations (accessible from HTML)
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.toggleWishlist = toggleWishlist;
window.addToCart = addToCart;
window.addToWishlist = addToWishlist;
window.quickView = quickView;

// Shop page initialization
function initializeShopPage() {
    loadProducts();
}

// Shop page functionality
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    renderProducts(mensFashionProducts);
    
    // Setup filters
    setupFilters();
    setupSorting();
}

function renderProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        const badge = product.badge ? `<div class="product-badge ${product.originalPrice ? 'sale' : ''}">${product.badge}</div>` : '';
        const priceHTML = product.originalPrice ? 
            `<span class="sale-price">₺${product.price}</span><span class="original-price">₺${product.originalPrice}</span>` :
            `₺${product.price}`;
        
        const colorsHTML = product.colors.map(color => {
            const colorMap = {
                white: '#ffffff',
                black: '#000000',
                gray: '#808080',
                navy: '#1e392a',
                green: '#1e392a',
                beige: '#f5f5dc',
                blue: '#4169e1',
                olive: '#2c5f41',
                brown: '#8b4513'
            };
            const colorStyle = color === 'white' ? 'background: white; border: 1px solid #ddd;' : `background: ${colorMap[color] || color};`;
            return `<span class="color-option" style="${colorStyle}"></span>`;
        }).join('');
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${badge}
                <div class="product-actions">
                    <button class="quick-view-btn" onclick="quickView(${product.id})">Hızlı Bakış</button>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Sepete Ekle</button>
                </div>
                <button class="wishlist-btn-product" onclick="addToWishlist(${product.id})">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">${priceHTML}</p>
                <div class="product-colors">${colorsHTML}</div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Update product count
    const productCount = document.getElementById('productCount');
    if (productCount) {
        productCount.textContent = products.length;
    }
}

function setupFilters() {
    // Category filters
    const categoryFilters = document.querySelectorAll('input[name="category"]');
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
    
    // Price range
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', function() {
            priceValue.textContent = this.value;
            applyFilters();
        });
    }
    
    // Size filters
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            applyFilters();
        });
    });
    
    // Color filters
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            applyFilters();
        });
    });
    
    // Clear filters
    const clearFilters = document.querySelector('.clear-filters');
    if (clearFilters) {
        clearFilters.addEventListener('click', function() {
            // Reset all filters
            categoryFilters.forEach(filter => filter.checked = false);
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            colorButtons.forEach(btn => btn.classList.remove('active'));
            if (priceRange) priceRange.value = priceRange.max;
            if (priceValue) priceValue.textContent = priceRange.max;
            
            renderProducts(mensFashionProducts);
        });
    }
}

function applyFilters() {
    let filteredProducts = [...mensFashionProducts];
    
    // Category filter
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(input => input.value);
    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            selectedCategories.includes(product.category)
        );
    }
    
    // Price filter
    const maxPrice = document.getElementById('priceRange')?.value;
    if (maxPrice) {
        filteredProducts = filteredProducts.filter(product => product.price <= parseInt(maxPrice));
    }
    
    // Size filter
    const selectedSizes = Array.from(document.querySelectorAll('.size-btn.active'))
        .map(btn => btn.dataset.size.toUpperCase());
    if (selectedSizes.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            product.sizes.some(size => selectedSizes.includes(size))
        );
    }
    
    // Color filter
    const selectedColors = Array.from(document.querySelectorAll('.color-btn.active'))
        .map(btn => btn.dataset.color);
    if (selectedColors.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            product.colors.some(color => selectedColors.includes(color))
        );
    }
    
    renderProducts(filteredProducts);
}

function setupSorting() {
    const sortSelect = document.getElementById('sortBy');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            let sortedProducts = [...mensFashionProducts];
            
            switch (sortValue) {
                case 'price-low':
                    sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    sortedProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'newest':
                    // Keep original order (newest first)
                    break;
                case 'popular':
                    // Sort by some popularity metric (mock)
                    sortedProducts.sort((a, b) => b.id - a.id);
                    break;
            }
            
            renderProducts(sortedProducts);
        });
    }
}

function quickView(productId) {
    const product = mensFashionProducts.find(p => p.id === productId);
    if (!product) return;
    
    // Create quick view modal (basic implementation)
    alert(`${product.name}\n₺${product.price}\n\n${product.description}`);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            showNotification('E-bülten aboneliğiniz tamamlandı!');
            this.reset();
        }
    });
}
