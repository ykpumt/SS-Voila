// E-commerce Global Variables
let cart = JSON.parse(localStorage.getItem('ssvoila_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('ssvoila_wishlist')) || [];

// Modern Men's Fashion Product Data for SS Voila
const products = [
    {
        id: 1,
        name: "Oversized Beyaz Tişört",
        price: 299,
        originalPrice: null,
        discount: null,
        category: "t-shirts",
        tags: ["new", "summer", "oversized"],
        colors: ["white", "black", "navy"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        description: "Premium pamuk karışımı oversized kesim. Günlük kullanım için ideal.",
        features: ["100% Pamuk", "Nefes Alabilir", "Kolay Bakım"],
        rating: 4.8,
        reviews: 156,
        inStock: true,
        badge: "Yeni"
    },
    {
        id: 2,
        name: "Kargo Şort - Haki",
        price: 399,
        originalPrice: 499,
        discount: 20,
        category: "shorts",
        tags: ["sale", "summer", "cargo"],
        colors: ["khaki", "navy", "black"],
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1506629905607-c6394faf7b47?w=400&h=400&fit=crop",
        description: "Çok cepli kargo şort. Outdoor aktiviteler için mükemmel.",
        features: ["Ripstop Kumaş", "Su İtici", "6 Cep"],
        rating: 4.6,
        reviews: 89,
        inStock: true,
        badge: "%20 İndirim"
    },
    {
        id: 3,
        name: "Linen Karışımlı Gömlek",
        price: 599,
        originalPrice: null,
        discount: null,
        category: "shirts",
        tags: ["premium", "summer", "linen"],
        colors: ["white", "light-blue", "beige"],
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
        description: "Keten karışımlı hafif dokuma. Özel günler için şık seçim.",
        features: ["Keten Karışımı", "Hafif Dokuma", "Anti-Wrinkle"],
        rating: 4.9,
        reviews: 234,
        inStock: true,
        badge: "Premium"
    },
    {
        id: 4,
        name: "Set: Polo + Şort Kombini",
        price: 549,
        originalPrice: 698,
        discount: null,
        category: "sets",
        tags: ["set", "summer", "combo"],
        colors: ["navy-white", "black-gray", "khaki-beige"],
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop",
        description: "Uyumlu polo tişört ve şort kombinasyonu. 2 parça set.",
        features: ["2 Parça Set", "Uyumlu Renkler", "₺149 Tasarruf"],
        rating: 4.7,
        reviews: 67,
        inStock: true,
        badge: "Set"
    },
    {
        id: 5,
        name: "Vintage Grafik Tişört",
        price: 349,
        originalPrice: null,
        discount: null,
        category: "t-shirts",
        tags: ["trendy", "graphic", "vintage"],
        colors: ["black", "white", "gray"],
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=400&fit=crop",
        description: "Retro grafik baskılı tişört. Sokak modası severler için.",
        features: ["Grafik Baskı", "Soft Touch", "Vintage Look"],
        rating: 4.5,
        reviews: 112,
        inStock: true,
        badge: "Trend"
    },
    {
        id: 6,
        name: "Chino Pantolon - Slim Fit",
        price: 449,
        originalPrice: null,
        discount: null,
        category: "pants",
        tags: ["chino", "business", "slim"],
        colors: ["beige", "navy", "black"],
        sizes: ["30", "32", "34", "36", "38"],
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop",
        description: "Klasik chino pantolon slim fit kesim. İş ve günlük için.",
        features: ["Slim Fit", "Stretch Kumaş", "Klasik Kesim"],
        rating: 4.8,
        reviews: 198,
        inStock: true,
        badge: null
    },
    {
        id: 7,
        name: "Polo Tişört - Pique",
        price: 399,
        originalPrice: null,
        discount: null,
        category: "polo",
        tags: ["polo", "classic", "summer"],
        colors: ["white", "navy", "burgundy"],
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
        description: "Klasik pique polo tişört. Zamansız şıklık.",
        features: ["Pique Kumaş", "Klasik Yaka", "Nefes Alabilir"],
        rating: 4.6,
        reviews: 143,
        inStock: true,
        badge: null
    },
    {
        id: 8,
        name: "Linen Gömlek - Premium",
        price: 699,
        originalPrice: null,
        discount: null,
        category: "shirts",
        tags: ["premium", "linen", "luxury"],
        colors: ["white", "light-blue", "sage"],
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
        description: "100% keten premium gömlek. Lüks hissin adresi.",
        features: ["100% Keten", "El Yapımı", "Premium Kalite"],
        rating: 4.9,
        reviews: 87,
        inStock: true,
        badge: "Premium"
    }
];

// Cart Management
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('ssvoila_cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('ssvoila_wishlist')) || [];
        this.initializeEventListeners();
        this.updateCartDisplay();
    }

    initializeEventListeners() {
        // Cart toggle
        const cartBtn = document.getElementById('cartBtn');
        const miniCart = document.getElementById('miniCart');
        const closeCart = document.getElementById('closeCart');
        
        if (cartBtn && miniCart) {
            cartBtn.addEventListener('click', () => {
                miniCart.classList.toggle('open');
            });
        }
        
        if (closeCart && miniCart) {
            closeCart.addEventListener('click', () => {
                miniCart.classList.remove('open');
            });
        }

        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            if (miniCart && !miniCart.contains(e.target) && !cartBtn.contains(e.target)) {
                miniCart.classList.remove('open');
            }
        });

        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', this.handleNewsletterSubmit.bind(this));
        }
    }

    addToCart(productId, size = 'M', color = null) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => 
            item.id === productId && item.size === size && item.color === color
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                size,
                color: color || product.colors[0],
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        this.showNotification(`${product.name} sepete eklendi!`, 'success');
    }

    removeFromCart(productId, size, color) {
        this.cart = this.cart.filter(item => 
            !(item.id === productId && item.size === size && item.color === color)
        );
        this.saveCart();
        this.updateCartDisplay();
    }

    updateQuantity(productId, size, color, quantity) {
        const item = this.cart.find(item => 
            item.id === productId && item.size === size && item.color === color
        );
        
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId, size, color);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartItemCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    saveCart() {
        localStorage.setItem('ssvoila_cart', JSON.stringify(this.cart));
    }

    updateCartDisplay() {
        // Update cart counter
        const cartCounter = document.querySelector('.cart-counter');
        if (cartCounter) {
            const itemCount = this.getCartItemCount();
            cartCounter.textContent = itemCount;
            cartCounter.style.display = itemCount > 0 ? 'flex' : 'none';
        }

        // Update mini cart content
        this.updateMiniCartContent();
    }

    updateMiniCartContent() {
        const emptyCart = document.querySelector('.empty-cart');
        const cartItems = document.querySelector('.cart-items');
        const miniCartFooter = document.querySelector('.mini-cart-footer');
        
        if (this.cart.length === 0) {
            if (emptyCart) emptyCart.style.display = 'block';
            if (cartItems) cartItems.style.display = 'none';
            if (miniCartFooter) miniCartFooter.style.display = 'none';
        } else {
            if (emptyCart) emptyCart.style.display = 'none';
            if (cartItems) cartItems.style.display = 'block';
            if (miniCartFooter) miniCartFooter.style.display = 'block';
            
            // Render cart items
            if (cartItems) {
                cartItems.innerHTML = this.cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p>Beden: ${item.size} | Renk: ${this.getColorName(item.color)}</p>
                            <div class="quantity-controls">
                                <button onclick="cartManager.updateQuantity(${item.id}, '${item.size}', '${item.color}', ${item.quantity - 1})">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="cartManager.updateQuantity(${item.id}, '${item.size}', '${item.color}', ${item.quantity + 1})">+</button>
                            </div>
                        </div>
                        <div class="cart-item-price">
                            <span>₺${item.price * item.quantity}</span>
                            <button onclick="cartManager.removeFromCart(${item.id}, '${item.size}', '${item.color}')" class="remove-item">×</button>
                        </div>
                    </div>
                `).join('');
            }
            
            // Update total
            const cartTotal = document.querySelector('.cart-total span');
            if (cartTotal) {
                cartTotal.textContent = `Toplam: ₺${this.getCartTotal()}`;
            }
        }
    }

    getColorName(colorCode) {
        const colorMap = {
            'white': 'Beyaz',
            'black': 'Siyah',
            'navy': 'Lacivert',
            'khaki': 'Haki',
            'beige': 'Bej',
            'gray': 'Gri',
            'light-blue': 'Açık Mavi',
            'burgundy': 'Bordo',
            'sage': 'Yeşil'
        };
        return colorMap[colorCode] || colorCode;
    }

    // Wishlist management
    addToWishlist(productId) {
        if (!this.wishlist.includes(productId)) {
            this.wishlist.push(productId);
            localStorage.setItem('ssvoila_wishlist', JSON.stringify(this.wishlist));
            this.updateWishlistDisplay();
            
            const product = products.find(p => p.id === productId);
            this.showNotification(`${product.name} favorilere eklendi!`, 'success');
        }
    }

    removeFromWishlist(productId) {
        this.wishlist = this.wishlist.filter(id => id !== productId);
        localStorage.setItem('ssvoila_wishlist', JSON.stringify(this.wishlist));
        this.updateWishlistDisplay();
    }

    updateWishlistDisplay() {
        const wishlistCounter = document.querySelector('.wishlist-counter');
        if (wishlistCounter) {
            wishlistCounter.textContent = this.wishlist.length;
            wishlistCounter.style.display = this.wishlist.length > 0 ? 'flex' : 'none';
        }
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Newsletter subscription
    handleNewsletterSubmit(e) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Simulate API call
        setTimeout(() => {
            this.showNotification('Bültenimize başarıyla abone oldunuz! %15 indirim kodu: HOSGELDIN15', 'success');
            e.target.reset();
        }, 1000);
    }
}

// Product Display Manager
class ProductManager {
    constructor() {
        this.currentFilter = 'all';
        this.currentSort = 'newest';
        this.loadFeaturedProducts();
    }

    loadFeaturedProducts() {
        const featuredGrid = document.getElementById('featuredProductsGrid');
        if (!featuredGrid) return;

        // Get featured products (first 8 products)
        const featuredProducts = products.slice(0, 8);
        
        featuredGrid.innerHTML = featuredProducts.map(product => this.createProductCard(product)).join('');
    }

    createProductCard(product) {
        const discountBadge = product.discount ? 
            `<div class="product-badge sale">%${product.discount} İndirim</div>` : 
            product.badge ? `<div class="product-badge ${product.badge.toLowerCase()}">${product.badge}</div>` : '';

        const priceDisplay = product.originalPrice ?
            `<span class="sale-price">₺${product.price}</span>
             <span class="original-price">₺${product.originalPrice}</span>` :
            `₺${product.price}`;

        const colorOptions = product.colors.slice(0, 3).map(color => 
            `<span class="color-option" style="background: ${this.getColorCode(color)}; ${color === 'white' ? 'border: 1px solid #ddd;' : ''}"></span>`
        ).join('');

        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${discountBadge}
                    <div class="product-actions">
                        <button class="quick-view-btn" onclick="productManager.quickView(${product.id})">Hızlı Bakış</button>
                        <button class="add-to-cart-btn" onclick="cartManager.addToCart(${product.id})">Sepete Ekle</button>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">${priceDisplay}</p>
                    <div class="product-colors">${colorOptions}</div>
                </div>
            </div>
        `;
    }

    getColorCode(colorName) {
        const colorCodes = {
            'white': '#FFFFFF',
            'black': '#000000',
            'navy': '#1E3A8A',
            'khaki': '#8B7355',
            'beige': '#F5F5DC',
            'gray': '#6B7280',
            'light-blue': '#3B82F6',
            'burgundy': '#7C2D12',
            'sage': '#84CC16'
        };
        return colorCodes[colorName] || '#000000';
    }

    quickView(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        // Create quick view modal
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="quick-view-content">
                <button class="close-modal" onclick="this.parentElement.parentElement.remove()">×</button>
                <div class="quick-view-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="quick-view-details">
                    <h2>${product.name}</h2>
                    <p class="price">₺${product.price}</p>
                    <p class="description">${product.description}</p>
                    <div class="product-features">
                        ${product.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                    </div>
                    <div class="size-selector">
                        <label>Beden:</label>
                        <select id="quickViewSize">
                            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                        </select>
                    </div>
                    <div class="color-selector">
                        <label>Renk:</label>
                        <div class="color-options">
                            ${product.colors.map((color, index) => 
                                `<input type="radio" id="color-${index}" name="color" value="${color}" ${index === 0 ? 'checked' : ''}>
                                 <label for="color-${index}" style="background: ${this.getColorCode(color)}"></label>`
                            ).join('')}
                        </div>
                    </div>
                    <button class="add-to-cart-btn-large" onclick="cartManager.addToCart(${product.id}, document.getElementById('quickViewSize').value, document.querySelector('input[name=color]:checked').value)">
                        Sepete Ekle - ₺${product.price}
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 100);
    }
}

// Animation and Scroll Effects
class AnimationManager {
    constructor() {
        this.initializeAnimations();
        this.initializeScrollEffects();
    }

    initializeAnimations() {
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

        // Add intersection observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.product-card, .collection-card, .value-item, .style-card').forEach(el => {
            observer.observe(el);
        });
    }

    initializeScrollEffects() {
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Navbar hide/show on scroll
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            // Add shadow to navbar when scrolled
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
    }
}

// Mobile Navigation Manager
class MobileNavManager {
    constructor() {
        this.isOpen = false;
        this.initializeMobileNav();
    }

    initializeMobileNav() {
        // Create mobile menu toggle if it doesn't exist
        const navContainer = document.querySelector('.nav-container');
        if (navContainer && window.innerWidth <= 768) {
            this.createMobileToggle();
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.closeMobileNav();
            }
        });
    }

    createMobileToggle() {
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-nav-toggle';
        mobileToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        mobileToggle.addEventListener('click', () => {
            this.toggleMobileNav();
        });

        const navCenter = document.querySelector('.nav-center');
        if (navCenter) {
            navCenter.appendChild(mobileToggle);
        }
    }

    toggleMobileNav() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            this.isOpen = !this.isOpen;
            navLinks.classList.toggle('mobile-open', this.isOpen);
            document.body.classList.toggle('nav-open', this.isOpen);
        }
    }

    closeMobileNav() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            this.isOpen = false;
            navLinks.classList.remove('mobile-open');
            document.body.classList.remove('nav-open');
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize managers
    window.cartManager = new CartManager();
    window.productManager = new ProductManager();
    window.animationManager = new AnimationManager();
    window.mobileNavManager = new MobileNavManager();

    // Initialize mobile navigation
    const mobileToggle = document.getElementById('mobileNavToggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            const mobileNav = document.createElement('div');
            
            if (!document.querySelector('.mobile-nav')) {
                mobileNav.className = 'mobile-nav';
                mobileNav.innerHTML = `
                    <div class="mobile-nav-header">
                        <span class="logo-text">SS Voila</span>
                        <button class="mobile-nav-close" id="mobileNavClose">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </button>
                    </div>
                    <ul class="mobile-nav-links">
                        <li><a href="index.html" class="nav-link">Ana Sayfa</a></li>
                        <li><a href="shop.html" class="nav-link">Koleksiyon</a></li>
                        <li><a href="campaigns.html" class="nav-link">Kampanyalar</a></li>
                        <li><a href="brand.html" class="nav-link">Marka Hikayesi</a></li>
                        <li><a href="contact.html" class="nav-link">İletişim</a></li>
                    </ul>
                `;
                
                const overlay = document.createElement('div');
                overlay.className = 'mobile-nav-overlay';
                
                document.body.appendChild(overlay);
                document.body.appendChild(mobileNav);
                
                // Animate in
                setTimeout(() => {
                    overlay.classList.add('active');
                    mobileNav.classList.add('active');
                }, 10);
                
                // Close handlers
                const closeNav = () => {
                    overlay.classList.remove('active');
                    mobileNav.classList.remove('active');
                    setTimeout(() => {
                        overlay.remove();
                        mobileNav.remove();
                    }, 300);
                };
                
                document.getElementById('mobileNavClose').addEventListener('click', closeNav);
                overlay.addEventListener('click', closeNav);
            }
        });
    }

    // Add loading states
    document.body.classList.add('loaded');

    // Initialize image lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add CSS for animations and notifications
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .navbar.scrolled {
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }

        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification-success {
            border-left: 4px solid #28A745;
        }

        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }

        .notification-content button {
            background: none;
            border: none;
            font-size: 1.25rem;
            cursor: pointer;
            opacity: 0.7;
        }

        .quick-view-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .quick-view-modal.show {
            opacity: 1;
        }

        .quick-view-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            position: relative;
        }

        .close-modal {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            z-index: 1;
        }

        .feature-tag {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            background: #f0f0f0;
            border-radius: 6px;
            font-size: 0.875rem;
            margin: 0.25rem;
        }

        .add-to-cart-btn-large {
            width: 100%;
            padding: 1rem;
            background: #1A1A1A;
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .add-to-cart-btn-large:hover {
            background: #2B4F3B;
            transform: translateY(-2px);
        }

        .cart-item {
            display: flex;
            gap: 1rem;
            padding: 1rem;
            border-bottom: 1px solid #eee;
        }

        .cart-item-image {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 8px;
        }

        .cart-item-details {
            flex: 1;
        }

        .cart-item-details h4 {
            font-size: 0.875rem;
            margin-bottom: 0.25rem;
        }

        .cart-item-details p {
            font-size: 0.75rem;
            color: #666;
            margin-bottom: 0.5rem;
        }

        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .quantity-controls button {
            width: 24px;
            height: 24px;
            border: 1px solid #ddd;
            background: white;
            border-radius: 4px;
            cursor: pointer;
        }

        .cart-item-price {
            text-align: right;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .remove-item {
            background: none;
            border: none;
            color: #999;
            cursor: pointer;
            font-size: 1.25rem;
        }

        @media (max-width: 768px) {
            .quick-view-content {
                grid-template-columns: 1fr;
                width: 95%;
                margin: 1rem;
            }
            
            .notification {
                right: 10px;
                left: 10px;
                transform: translateY(-100px);
            }
            
            .notification.show {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    console.log('SS Voila - Modern Men\'s Fashion Platform Initialized! 🚀');
});
