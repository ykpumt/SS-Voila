// Authentication JavaScript
class AuthManager {
    constructor() {
        this.initializeAuth();
    }

    initializeAuth() {
        // Password toggle functionality
        this.initPasswordToggle();
        
        // Form validation
        this.initFormValidation();
        
        // Social login
        this.initSocialLogin();
    }

    initPasswordToggle() {
        const passwordToggles = document.querySelectorAll('.password-toggle');
        
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const passwordInput = toggle.previousElementSibling;
                const isPassword = passwordInput.type === 'password';
                
                passwordInput.type = isPassword ? 'text' : 'password';
                
                // Update icon
                const svg = toggle.querySelector('svg');
                if (isPassword) {
                    svg.innerHTML = `
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C7 20 2.73 16.39 1 12C2.73 7.61 7 4 12 4A10.07 10.07 0 0 1 17.94 6.06M9.9 4.24A9.12 9.12 0 0 1 12 4C16.5 4 20.27 7.61 21 12C20.27 16.39 16.5 20 12 20A9.12 9.12 0 0 1 9.9 19.76" stroke="currentColor" stroke-width="2"/>
                        <path d="M1 1L23 23" stroke="currentColor" stroke-width="2"/>
                    `;
                } else {
                    svg.innerHTML = `
                        <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                    `;
                }
            });
        });
    }

    initFormValidation() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(new FormData(loginForm));
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister(new FormData(registerForm));
            });

            // Password strength checker
            const passwordInput = registerForm.querySelector('#password');
            if (passwordInput) {
                passwordInput.addEventListener('input', (e) => {
                    this.checkPasswordStrength(e.target.value);
                });
            }

            // Confirm password validation
            const confirmPasswordInput = registerForm.querySelector('#confirmPassword');
            if (confirmPasswordInput) {
                confirmPasswordInput.addEventListener('input', (e) => {
                    this.validatePasswordMatch();
                });
            }
        }
    }

    checkPasswordStrength(password) {
        const strengthBar = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');
        
        if (!strengthBar || !strengthText) return;

        let strength = 0;
        const checks = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };

        strength = Object.values(checks).filter(Boolean).length;

        const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'];
        const texts = ['Çok Zayıf', 'Zayıf', 'Orta', 'Güçlü', 'Çok Güçlü'];
        
        strengthBar.style.width = `${(strength / 5) * 100}%`;
        strengthBar.style.background = colors[strength - 1] || colors[0];
        strengthText.textContent = texts[strength - 1] || texts[0];
    }

    validatePasswordMatch() {
        const password = document.querySelector('#password')?.value;
        const confirmPassword = document.querySelector('#confirmPassword')?.value;
        const confirmInput = document.querySelector('#confirmPassword');
        
        if (!confirmInput) return;

        if (password && confirmPassword && password !== confirmPassword) {
            confirmInput.setCustomValidity('Şifreler eşleşmiyor');
            confirmInput.style.borderColor = '#ef4444';
        } else {
            confirmInput.setCustomValidity('');
            confirmInput.style.borderColor = '';
        }
    }

    handleLogin(formData) {
        const email = formData.get('email');
        const password = formData.get('password');
        const remember = formData.get('remember');

        // Show loading state
        const submitBtn = document.querySelector('.auth-submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Giriş yapılıyor...';
        submitBtn.disabled = true;

        // Simulate login API call
        setTimeout(() => {
            // Success simulation
            localStorage.setItem('user', JSON.stringify({
                email: email,
                name: 'Kullanıcı',
                loggedIn: true
            }));

            if (remember) {
                localStorage.setItem('rememberMe', 'true');
            }

            // Show success message
            this.showNotification('Giriş başarılı! Yönlendiriliyorsunuz...', 'success');

            // Redirect after delay
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1500);

        }, 2000);
    }

    handleRegister(formData) {
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        const terms = formData.get('terms');

        // Validation
        if (password !== confirmPassword) {
            this.showNotification('Şifreler eşleşmiyor!', 'error');
            return;
        }

        if (!terms) {
            this.showNotification('Kullanım şartlarını kabul etmelisiniz!', 'error');
            return;
        }

        // Show loading state
        const submitBtn = document.querySelector('.auth-submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Hesap oluşturuluyor...';
        submitBtn.disabled = true;

        // Simulate registration API call
        setTimeout(() => {
            // Success simulation
            localStorage.setItem('user', JSON.stringify({
                email: email,
                name: `${firstName} ${lastName}`,
                phone: phone,
                loggedIn: true
            }));

            // Show success message
            this.showNotification('Hesabınız başarıyla oluşturuldu! Yönlendiriliyorsunuz...', 'success');

            // Redirect after delay
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1500);

        }, 2000);
    }

    initSocialLogin() {
        const socialButtons = document.querySelectorAll('.social-btn');
        
        socialButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const provider = btn.textContent.includes('Google') ? 'Google' : 'Facebook';
                this.handleSocialLogin(provider);
            });
        });
    }

    handleSocialLogin(provider) {
        this.showNotification(`${provider} ile giriş yapılıyor...`, 'info');
        
        // Simulate social login
        setTimeout(() => {
            localStorage.setItem('user', JSON.stringify({
                email: 'user@example.com',
                name: 'Social User',
                provider: provider,
                loggedIn: true
            }));

            this.showNotification(`${provider} ile giriş başarılı!`, 'success');
            
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1500);
        }, 2000);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon ${type}">
                    ${this.getNotificationIcon(type)}
                </div>
                <span>${message}</span>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});

// Phone number formatting
document.addEventListener('DOMContentLoaded', () => {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.startsWith('90')) {
                value = value.substring(2);
            }
            
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `+90 (${value}`;
                } else if (value.length <= 6) {
                    value = `+90 (${value.substring(0, 3)}) ${value.substring(3)}`;
                } else if (value.length <= 8) {
                    value = `+90 (${value.substring(0, 3)}) ${value.substring(3, 6)} ${value.substring(6)}`;
                } else {
                    value = `+90 (${value.substring(0, 3)}) ${value.substring(3, 6)} ${value.substring(6, 8)} ${value.substring(8, 10)}`;
                }
            }
            
            e.target.value = value;
        });
    });
}); 