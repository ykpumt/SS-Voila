// Shop Page Manager
class ShopManager {
    constructor() {
        this.currentPage = 1;
        this.productsPerPage = 12;
        this.totalProducts = 0;
        this.currentFilters = {
            category: [],
            minPrice: 0,
            maxPrice: 1000,
            sizes: [],
            colors: [],
            features: []
        };
        this.currentSort = 'newest';
        this.currentView = 'grid';
        this.wishlist = JSON.parse(localStorage.getItem('ssvoila_wishlist')) || [];
        this.allProducts = this.generateProducts();
        this.filteredProducts = [...this.allProducts];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.renderProducts();
        this.updateProductCount();
    }
    
    generateProducts() {
        const categories = [
            { name: 't-shirts', label: 'Tişört' },
            { name: 'shirts', label: 'Gömlek' },
            { name: 'shorts', label: 'Şort' },
            { name: 'sets', label: 'Set' },
            { name: 'polo', label: 'Polo' }
        ];
        
        const products = [];
        const baseNames = {
            't-shirts': ['Premium Pamuk Tişört', 'Slim Fit Tişört', 'Oversize Tişört', 'V Yaka Tişört', 'Polo Yaka Tişört'],
            'shirts': ['Oxford Gömlek', 'Linen Gömlek', 'Polo Gömlek', 'Düğmeli Gömlek', 'Casual Gömlek'],
            'shorts': ['Chino Şort', 'Denim Şort', 'Cargo Şort', 'Bermuda Şort', 'Spor Şort'],
            'sets': ['Yazlık Set', 'Tatil Seti', 'Casual Set', 'Sport Set', 'Premium Set'],
            'polo': ['Classic Polo', 'Slim Polo', 'Premium Polo', 'Sport Polo', 'Pique Polo']
        };

        // Real product reviews data
        const reviewsData = [
            { author: 'Mehmet K.', rating: 5, comment: 'Mükemmel kalite, kumaşı çok yumuşak. Tavsiye ederim!', date: '15 Ocak 2024', helpful: 12 },
            { author: 'Ali D.', rating: 4, comment: 'Güzel ürün ama biraz büyük geldi. Bir beden küçük alın.', date: '10 Ocak 2024', helpful: 8 },
            { author: 'Emre S.', rating: 5, comment: 'Çok beğendim, rengi fotoğraftaki gibi. Hızlı kargo.', date: '5 Ocak 2024', helpful: 15 },
            { author: 'Can Y.', rating: 3, comment: 'Fena değil ama beklediğim kadar kaliteli değildi.', date: '28 Aralık 2023', helpful: 3 },
            { author: 'Burak M.', rating: 5, comment: 'Harika! İkincisini de aldım. Çok rahat ve şık.', date: '20 Aralık 2023', helpful: 20 },
            { author: 'Onur T.', rating: 4, comment: 'Güzel tasarım, fiyat performans açısından iyi.', date: '15 Aralık 2023', helpful: 7 },
            { author: 'Kemal A.', rating: 5, comment: 'SS Voila kalitesi her zamanki gibi mükemmel!', date: '12 Aralık 2023', helpful: 18 },
            { author: 'Serkan L.', rating: 4, comment: 'Beğendim ama kargo biraz geç geldi.', date: '8 Aralık 2023', helpful: 5 },
            { author: 'Tolga R.', rating: 5, comment: 'Arkadaşıma da tavsiye ettim. Çok memnunum.', date: '5 Aralık 2023', helpful: 11 },
            { author: 'Murat G.', rating: 3, comment: 'Ortalama bir ürün. Daha iyi olabilirdi.', date: '1 Aralık 2023', helpful: 2 },
            { author: 'Deniz B.', rating: 5, comment: 'Kalite çok iyi, fiyatına göre süper. Aldığıma değdi.', date: '28 Kasım 2023', helpful: 16 },
            { author: 'Cem F.', rating: 4, comment: 'Güzel ürün, sadece renk biraz soluk geldi.', date: '25 Kasım 2023', helpful: 6 }
        ];
        
        const colors = ['white', 'black', 'navy', 'gray', 'beige', 'khaki', 'light-blue', 'burgundy'];
        const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        const features = ['new', 'sale', 'premium', 'bestseller'];
        
        const imageUrls = [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1506629905607-c6394faf7b47?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1622445275576-721325763671?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1556821840-3a9fbc86b1b5?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop'
        ];
        
        let productId = 1;
        
        categories.forEach(category => {
            baseNames[category.name].forEach((baseName, index) => {
                const randomFeatures = features.filter(() => Math.random() > 0.7);
                const isOnSale = randomFeatures.includes('sale');
                const originalPrice = Math.floor(Math.random() * (800 - 200) + 200);
                const salePrice = isOnSale ? Math.floor(originalPrice * 0.7) : originalPrice;
                
                // Generate reviews for this product
                const productReviewCount = Math.floor(Math.random() * 5) + 2;
                const productReviews = [];
                const shuffledReviews = [...reviewsData].sort(() => 0.5 - Math.random());
                
                for (let i = 0; i < productReviewCount && i < shuffledReviews.length; i++) {
                    productReviews.push(shuffledReviews[i]);
                }
                
                // Calculate average rating based on reviews
                const avgRating = productReviews.length > 0 
                    ? (productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length).toFixed(1)
                    : (Math.random() * 2 + 3).toFixed(1);
                
                products.push({
                    id: productId++,
                    name: baseName,
                    category: category.name,
                    price: salePrice,
                    originalPrice: isOnSale ? originalPrice : null,
                    image: imageUrls[(index + productId) % imageUrls.length],
                    colors: colors.slice(0, Math.floor(Math.random() * 4) + 2),
                    sizes: sizes.slice(0, Math.floor(Math.random() * 3) + 3),
                    features: randomFeatures,
                    rating: parseFloat(avgRating),
                    reviews: productReviews,
                    reviewCount: productReviews.length,
                    description: `Premium kalitede ${category.label.toLowerCase()}. Yüksek kaliteli kumaş ve modern tasarım.`,
                    isNew: randomFeatures.includes('new'),
                    isBestseller: randomFeatures.includes('bestseller'),
                    isPremium: randomFeatures.includes('premium')
                });
            });
        });
        
        return products;
    }
    
    setupEventListeners() {
        // Category filters
        document.querySelectorAll('input[name="category"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.handleCategoryFilter());
        });
        
        // Price filters
        const priceRange = document.getElementById('priceRange');
        const minPrice = document.getElementById('minPrice');
        const maxPrice = document.getElementById('maxPrice');
        
        if (priceRange) {
            priceRange.addEventListener('input', () => this.handlePriceFilter());
        }
        if (minPrice) {
            minPrice.addEventListener('input', () => this.handlePriceFilter());
        }
        if (maxPrice) {
            maxPrice.addEventListener('input', () => this.handlePriceFilter());
        }
        
        // Size filters
        document.querySelectorAll('.size-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => this.handleSizeFilter(btn));
        });
        
        // Color filters
        document.querySelectorAll('.color-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => this.handleColorFilter(btn));
        });
        
        // Feature filters
        document.querySelectorAll('input[name="feature"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.handleFeatureFilter());
        });
        
        // Sort dropdown
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', () => this.handleSort());
        }
        
        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => this.handleViewChange(btn));
        });
        
        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreProducts());
        }
        
        // Clear filters
        const clearFiltersBtn = document.getElementById('clearFilters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => this.clearAllFilters());
        }
        
        // Mobile filters
        const mobileFiltersBtn = document.getElementById('mobileFiltersBtn');
        const sidebar = document.querySelector('.shop-sidebar');
        if (mobileFiltersBtn && sidebar) {
            mobileFiltersBtn.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
        }
        
        // Filter section expand/collapse
        document.querySelectorAll('.filter-title').forEach(title => {
            title.addEventListener('click', () => {
                const section = title.parentElement;
                section.classList.toggle('collapsed');
            });
        });
    }
    
    handleCategoryFilter() {
        const checkboxes = document.querySelectorAll('input[name="category"]:checked');
        this.currentFilters.category = Array.from(checkboxes).map(cb => cb.value);
        
        // Handle "all" category
        const allCheckbox = document.querySelector('input[name="category"][value="all"]');
        if (this.currentFilters.category.includes('all')) {
            this.currentFilters.category = [];
        }
        
        this.applyFilters();
    }
    
    handlePriceFilter() {
        const priceRange = document.getElementById('priceRange');
        const minPrice = document.getElementById('minPrice');
        const maxPrice = document.getElementById('maxPrice');
        
        if (priceRange) {
            this.currentFilters.maxPrice = parseInt(priceRange.value);
            if (maxPrice) maxPrice.value = priceRange.value;
        }
        
        if (minPrice) {
            this.currentFilters.minPrice = parseInt(minPrice.value) || 0;
        }
        
        if (maxPrice) {
            this.currentFilters.maxPrice = parseInt(maxPrice.value) || 1000;
            if (priceRange) priceRange.value = maxPrice.value;
        }
        
        this.applyFilters();
    }
    
    handleSizeFilter(btn) {
        const size = btn.dataset.size;
        btn.classList.toggle('active');
        
        if (btn.classList.contains('active')) {
            this.currentFilters.sizes.push(size);
        } else {
            this.currentFilters.sizes = this.currentFilters.sizes.filter(s => s !== size);
        }
        
        this.applyFilters();
    }
    
    handleColorFilter(btn) {
        const color = btn.dataset.color;
        btn.classList.toggle('active');
        
        if (btn.classList.contains('active')) {
            this.currentFilters.colors.push(color);
        } else {
            this.currentFilters.colors = this.currentFilters.colors.filter(c => c !== color);
        }
        
        this.applyFilters();
    }
    
    handleFeatureFilter() {
        const checkboxes = document.querySelectorAll('input[name="feature"]:checked');
        this.currentFilters.features = Array.from(checkboxes).map(cb => cb.value);
        this.applyFilters();
    }
    
    handleSort() {
        const sortSelect = document.getElementById('sortSelect');
        this.currentSort = sortSelect.value;
        this.applyFilters();
    }
    
    handleViewChange(btn) {
        const view = btn.dataset.view;
        this.currentView = view;
        
        // Update active state
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update grid class
        const grid = document.getElementById('productsGrid');
        grid.classList.toggle('list-view', view === 'list');
        
        this.renderProducts();
    }
    
    applyFilters() {
        let filtered = [...this.allProducts];
        
        // Category filter
        if (this.currentFilters.category.length > 0) {
            filtered = filtered.filter(product => 
                this.currentFilters.category.includes(product.category)
            );
        }
        
        // Price filter
        filtered = filtered.filter(product => 
            product.price >= this.currentFilters.minPrice && 
            product.price <= this.currentFilters.maxPrice
        );
        
        // Size filter
        if (this.currentFilters.sizes.length > 0) {
            filtered = filtered.filter(product => 
                this.currentFilters.sizes.some(size => product.sizes.includes(size))
            );
        }
        
        // Color filter
        if (this.currentFilters.colors.length > 0) {
            filtered = filtered.filter(product => 
                this.currentFilters.colors.some(color => product.colors.includes(color))
            );
        }
        
        // Feature filter
        if (this.currentFilters.features.length > 0) {
            filtered = filtered.filter(product => 
                this.currentFilters.features.some(feature => product.features.includes(feature))
            );
        }
        
        // Sort
        this.sortProducts(filtered);
        
        this.filteredProducts = filtered;
        this.currentPage = 1;
        this.renderProducts();
        this.updateProductCount();
    }
    
    sortProducts(products) {
        switch (this.currentSort) {
            case 'price-asc':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                products.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                products.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'popular':
                products.sort((a, b) => b.reviews - a.reviews);
                break;
            case 'newest':
            default:
                products.sort((a, b) => b.id - a.id);
                break;
        }
    }
    
    renderProducts() {
        const grid = document.getElementById('productsGrid');
        const startIndex = 0;
        const endIndex = this.currentPage * this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);
        
        if (productsToShow.length === 0) {
            grid.innerHTML = `
                <div class="no-products">
                    <div class="no-products-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" opacity="0.3"/>
                            <path d="M8 12L12 16L16 12" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </div>
                    <h3>Ürün bulunamadı</h3>
                    <p>Arama kriterlerinizi değiştirerek tekrar deneyin.</p>
                    <button class="btn-primary" onclick="shopManager.clearAllFilters()">Filtreleri Temizle</button>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = productsToShow.map(product => this.createProductCard(product)).join('');
        
        // Update load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            if (endIndex >= this.filteredProducts.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-flex';
            }
        }
    }
    
    createProductCard(product) {
        const badges = [];
        if (product.isNew) badges.push('<span class="product-badge new">Yeni</span>');
        if (product.features.includes('sale')) badges.push('<span class="product-badge sale">İndirim</span>');
        if (product.isPremium) badges.push('<span class="product-badge premium">Premium</span>');
        if (product.isBestseller) badges.push('<span class="product-badge bestseller">En Çok Satan</span>');
        
        const priceHTML = product.originalPrice ? 
            `<div class="product-price">
                <span class="sale-price">₺${product.price}</span>
                <span class="original-price">₺${product.originalPrice}</span>
            </div>` :
            `<div class="product-price">
                <span class="current-price">₺${product.price}</span>
            </div>`;
        
        return `
            <div class="product-card" data-id="${product.id}">
                ${badges.length > 0 ? `<div class="product-badges">${badges.join('')}</div>` : ''}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-overlay">
                        <div class="product-actions">
                            <button class="quick-view-btn" onclick="productManager.openQuickView(${product.id})" title="Hızlı Görüntüle">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
                                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                                </svg>
                            </button>
                            <button class="wishlist-btn ${this.isInWishlist(product.id) ? 'active' : ''}" onclick="shopManager.toggleWishlist(${product.id})" title="Favorilere Ekle">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="${this.isInWishlist(product.id) ? 'currentColor' : 'none'}">
                                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="currentColor" stroke-width="2"/>
                                </svg>
                            </button>
                            <button class="add-to-cart-btn" onclick="cartManager.addToCart(${product.id})" title="Sepete Ekle">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7" stroke="currentColor" stroke-width="2"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        <div class="stars">
                            ${this.generateStars(product.rating)}
                        </div>
                        <span class="rating-text">${product.rating} (${product.reviewCount} değerlendirme)</span>
                    </div>
                    ${priceHTML}
                    <div class="product-colors">
                        ${product.colors.slice(0, 4).map(color => 
                            `<span class="color-option color-${color}" title="${this.getColorName(color)}"></span>`
                        ).join('')}
                        ${product.colors.length > 4 ? `<span class="more-colors">+${product.colors.length - 4}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
    
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars += '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>';
        }
        
        // Half star
        if (hasHalfStar) {
            stars += '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#half)"/></svg>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>';
        }
        
        return stars;
    }
    
    getColorName(color) {
        const colorNames = {
            'white': 'Beyaz',
            'black': 'Siyah',
            'navy': 'Lacivert',
            'gray': 'Gri',
            'beige': 'Bej',
            'khaki': 'Haki',
            'light-blue': 'Açık Mavi',
            'burgundy': 'Bordo'
        };
        return colorNames[color] || color;
    }
    
    loadMoreProducts() {
        this.currentPage++;
        this.renderProducts();
    }
    
    updateProductCount() {
        const countElement = document.getElementById('productCount');
        if (countElement) {
            countElement.textContent = this.filteredProducts.length;
        }
    }
    
    clearAllFilters() {
        // Clear category filters
        document.querySelectorAll('input[name="category"]').forEach(cb => {
            cb.checked = cb.value === 'all';
        });
        
        // Clear price filters
        const priceRange = document.getElementById('priceRange');
        const minPrice = document.getElementById('minPrice');
        const maxPrice = document.getElementById('maxPrice');
        
        if (priceRange) priceRange.value = 1000;
        if (minPrice) minPrice.value = 0;
        if (maxPrice) maxPrice.value = 1000;
        
        // Clear size filters
        document.querySelectorAll('.size-filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Clear color filters
        document.querySelectorAll('.color-filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Clear feature filters
        document.querySelectorAll('input[name="feature"]').forEach(cb => {
            cb.checked = false;
        });
        
        // Reset filters object
        this.currentFilters = {
            category: [],
            minPrice: 0,
            maxPrice: 1000,
            sizes: [],
            colors: [],
            features: []
        };
        
        this.applyFilters();
    }
    
    getProductById(id) {
        return this.allProducts.find(product => product.id === parseInt(id));
    }

    isInWishlist(productId) {
        return this.wishlist.includes(productId);
    }

    toggleWishlist(productId) {
        const product = this.getProductById(productId);
        if (!product) return;

        if (this.isInWishlist(productId)) {
            this.wishlist = this.wishlist.filter(id => id !== productId);
            this.showNotification(`${product.name} favorilerden çıkarıldı`, 'info');
        } else {
            this.wishlist.push(productId);
            this.showNotification(`${product.name} favorilere eklendi!`, 'success');
        }

        localStorage.setItem('ssvoila_wishlist', JSON.stringify(this.wishlist));
        this.updateWishlistDisplay();
        this.renderProducts(); // Re-render to update heart icons
    }

    updateWishlistDisplay() {
        const wishlistCounter = document.querySelector('.wishlist-counter');
        if (wishlistCounter) {
            wishlistCounter.textContent = this.wishlist.length;
            wishlistCounter.style.display = this.wishlist.length > 0 ? 'flex' : 'none';
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// No products style
const noProductsStyle = `
<style>
.no-products {
    grid-column: 1 / -1;
    text-align: center;
    padding: 4rem 2rem;
    color: var(--color-gray-600);
}

.no-products-icon {
    margin-bottom: 1.5rem;
    opacity: 0.5;
}

.no-products h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--color-gray-800);
}

.no-products p {
    margin-bottom: 2rem;
    font-size: 1rem;
}
</style>
`;

// Add styles to head
if (!document.querySelector('#no-products-style')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'no-products-style';
    styleElement.textContent = noProductsStyle;
    document.head.appendChild(styleElement);
}

// Initialize shop manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.shopManager = new ShopManager();
}); 