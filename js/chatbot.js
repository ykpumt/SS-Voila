// SS Voila Chatbot System
class Chatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.responses = {
            greetings: [
                "Merhaba! SS Voila'ya hoş geldiniz! Size nasıl yardımcı olabilirim? 😊",
                "Selam! SS Voila müşteri hizmetleri burada. Ne ile ilgili yardıma ihtiyacınız var?",
                "Merhaba! Size yardımcı olmaktan mutluluk duyarım. Sorunuzu sorabilirsiniz! 👋"
            ],
            products: [
                "Ürünlerimiz hakkında detaylı bilgi için shop sayfamızı ziyaret edebilirsiniz. Hangi kategoriyle ilgileniyorsunuz?",
                "Tişört, gömlek, şort ve set ürünlerinde geniş seçeneklerimiz var. Özel bir ürün mü arıyorsunuz?",
                "Premium kalitede erkek giyim ürünlerimiz var. Size en uygun ürünü bulmak için yardımcı olabilirim!"
            ],
            sizing: [
                "📏 Beden rehberimiz:\n\nS: 86-91 cm (göğüs)\nM: 96-101 cm (göğüs)\nL: 106-111 cm (göğüs)\nXL: 116-121 cm (göğüs)\nXXL: 126-131 cm (göğüs)\n\nDetaylı ölçüler için ürün sayfalarını kontrol edebilirsiniz!",
                "Beden konusunda kararsızsanız, müşteri hizmetlerimizle iletişime geçebilirsiniz. Size en uygun bedeni bulmak için yardımcı oluruz!"
            ],
            shipping: [
                "🚚 Kargo bilgileri:\n\n• Ücretsiz kargo: 299₺ ve üzeri siparişlerde\n• Standart kargo: 1-3 iş günü\n• Hızlı kargo: Aynı gün teslimat (İstanbul için)\n• Kargo ücreti: 29.90₺",
                "Kargolamada MNG, Yurtiçi ve Aras kargo seçeneklerimiz bulunuyor. Hangi ili tercih edersiniz?"
            ],
            returns: [
                "🔄 İade koşullarımız:\n\n• 14 gün içinde ücretsiz iade\n• Ürün etiketli ve kullanılmamış olmalı\n• İade kargo ücreti tarafımızdan karşılanır\n• Para iadesi 3-5 iş günü içinde",
                "İade işlemi için sipariş numaranızla birlikte müşteri hizmetlerimizle iletişime geçebilirsiniz."
            ],
            payment: [
                "💳 Ödeme seçenekleri:\n\n• Kredi kartı (Visa, MasterCard, Troy)\n• Kapıda ödeme\n• Havale/EFT\n• 6 aya varan taksit imkanı",
                "Güvenli ödeme altyapımızla tüm kartlarınızı güvenle kullanabilirsiniz."
            ],
            discounts: [
                "🎯 Aktif kampanyalar:\n\n• Yeni üyelere %15 indirim (HOSGELDIN15)\n• 2. ürün %30 indirim\n• Set ürünlerde %20 indirim\n• Ücretsiz kargo 299₺ üzeri",
                "Özel indirim kodları için bültenimize abone olabilirsiniz!"
            ],
            contact: [
                "📞 Bize ulaşın:\n\nTelefon: 0850 xxx xx xx\nE-posta: info@ssvoila.com\nWhatsApp: 0555 xxx xx xx\n\nMüşteri hizmetleri: Pazartesi-Cuma 09:00-18:00",
                "Sosyal medya hesaplarımızdan da bize ulaşabilirsiniz! Instagram: @ssvoila"
            ]
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadChatHistory();
    }

    setupEventListeners() {
        // Enter key for input
        const input = document.getElementById('chatbotInput');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        // Auto-show chatbot after 10 seconds
        setTimeout(() => {
            if (!this.isOpen && !localStorage.getItem('chatbot_shown')) {
                this.showNotification();
                localStorage.setItem('chatbot_shown', 'true');
            }
        }, 10000);
    }

    showNotification() {
        const notification = document.getElementById('chatNotification');
        if (notification) {
            notification.style.display = 'block';
            notification.classList.add('pulse');
        }
    }

    hideNotification() {
        const notification = document.getElementById('chatNotification');
        if (notification) {
            notification.style.display = 'none';
            notification.classList.remove('pulse');
        }
    }

    sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        
        if (message === '') return;

        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTyping();

        // Generate response after delay
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }

    sendQuickReply(message) {
        this.addMessage(message, 'user');
        
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 800);
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        if (sender === 'bot') {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z" fill="currentColor"/>
                    </svg>
                </div>
                <div class="message-content">
                    <p>${text.replace(/\n/g, '<br>')}</p>
                    <span class="message-time">${new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}</span>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${text}</p>
                    <span class="message-time">${new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}</span>
                </div>
            `;
        }

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Save to chat history
        this.messages.push({ text, sender, timestamp: Date.now() });
        this.saveChatHistory();
    }

    showTyping() {
        const messagesContainer = document.getElementById('chatbotMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z" fill="currentColor"/>
                </svg>
            </div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTyping() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    generateResponse(message) {
        const lowercaseMessage = message.toLowerCase();

        // Greeting responses
        if (this.containsWords(lowercaseMessage, ['merhaba', 'selam', 'hey', 'hi', 'hello'])) {
            return this.getRandomResponse('greetings');
        }

        // Product related
        if (this.containsWords(lowercaseMessage, ['ürün', 'tişört', 'gömlek', 'şort', 'polo', 'set', 'koleksiyon'])) {
            return this.getRandomResponse('products');
        }

        // Size related
        if (this.containsWords(lowercaseMessage, ['beden', 'boyut', 'ölçü', 'size', 'büyük', 'küçük'])) {
            return this.getRandomResponse('sizing');
        }

        // Shipping related
        if (this.containsWords(lowercaseMessage, ['kargo', 'teslimat', 'gönderi', 'nakliye', 'ne zaman'])) {
            return this.getRandomResponse('shipping');
        }

        // Return related
        if (this.containsWords(lowercaseMessage, ['iade', 'değişim', 'geri', 'return'])) {
            return this.getRandomResponse('returns');
        }

        // Payment related
        if (this.containsWords(lowercaseMessage, ['ödeme', 'kredi kartı', 'kart', 'taksit', 'kapıda'])) {
            return this.getRandomResponse('payment');
        }

        // Discount related
        if (this.containsWords(lowercaseMessage, ['indirim', 'kampanya', 'kupon', 'kod', 'promosyon'])) {
            return this.getRandomResponse('discounts');
        }

        // Contact related
        if (this.containsWords(lowercaseMessage, ['iletişim', 'telefon', 'mail', 'ulaş', 'kontak'])) {
            return this.getRandomResponse('contact');
        }

        // Default responses
        const defaultResponses = [
            "Bu konuda size yardımcı olmak için müşteri hizmetlerimizle iletişime geçmenizi öneriyorum. 📞",
            "Sorunuzu daha detaylı açıklayabilir misiniz? Size daha iyi yardımcı olabilmek için. 🤔",
            "Bu konu hakkında detaylı bilgi için müşteri hizmetlerimizi arayabilirsiniz: 0850 xxx xx xx",
            "Anlayamadığım bir soru. Lütfen daha açık bir şekilde sorabilir misiniz? 😊"
        ];

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    containsWords(text, words) {
        return words.some(word => text.includes(word));
    }

    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    saveChatHistory() {
        localStorage.setItem('chatbot_history', JSON.stringify(this.messages.slice(-20))); // Keep last 20 messages
    }

    loadChatHistory() {
        const history = localStorage.getItem('chatbot_history');
        if (history) {
            this.messages = JSON.parse(history);
            // Load only recent messages to UI
            const messagesContainer = document.getElementById('chatbotMessages');
            if (messagesContainer && this.messages.length > 1) {
                // Clear default message and load history
                messagesContainer.innerHTML = '';
                this.messages.forEach(msg => {
                    this.addMessageToUI(msg.text, msg.sender);
                });
            }
        }
    }

    addMessageToUI(text, sender) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        if (sender === 'bot') {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z" fill="currentColor"/>
                    </svg>
                </div>
                <div class="message-content">
                    <p>${text.replace(/\n/g, '<br>')}</p>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${text}</p>
                </div>
            `;
        }

        messagesContainer.appendChild(messageDiv);
    }
}

// Global functions for HTML onclick events
function toggleChatbot() {
    const widget = document.getElementById('chatbotWidget');
    const toggle = document.getElementById('chatbotToggle');
    
    if (chatbot.isOpen) {
        widget.classList.remove('open');
        toggle.classList.remove('active');
        chatbot.isOpen = false;
    } else {
        widget.classList.add('open');
        toggle.classList.add('active');
        chatbot.isOpen = true;
        chatbot.hideNotification();
        
        // Focus input when opened
        setTimeout(() => {
            const input = document.getElementById('chatbotInput');
            if (input) input.focus();
        }, 300);
    }
}

function sendMessage() {
    if (window.chatbot) {
        window.chatbot.sendMessage();
    }
}

function sendQuickReply(message) {
    if (window.chatbot) {
        window.chatbot.sendQuickReply(message);
    }
}

// Initialize chatbot
document.addEventListener('DOMContentLoaded', function() {
    window.chatbot = new Chatbot();
}); 