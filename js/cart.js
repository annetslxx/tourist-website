class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('japanCart')) || [];
        this.init();
    }

    init() {
        this.updateCartIcon();
        this.setupCartModal();
    }

    addToCart(product) {
        // Проверяем, есть ли уже такой товар в корзине
        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartIcon();
        this.showNotification(`${product.name} добавлен в корзину!`);
    }

    removeFromCart(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartIcon();
        this.updateCartModal();
    }

    updateQuantity(productId, newQuantity) {
        if (newQuantity < 1) {
            this.removeFromCart(productId);
            return;
        }

        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.updateCartModal();
        }
    }

    saveCart() {
        localStorage.setItem('japanCart', JSON.stringify(this.items));
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total + (price * item.quantity);
        }, 0).toFixed(2);
    }

    setupCartModal() {
        // Создаем модальное окно корзины
        if (!document.getElementById('cart-modal')) {
            const modalHTML = `
            <div id="cart-modal" class="cart-modal">
                <div class="cart-modal-content">
                    <div class="cart-modal-header">
                        <h2>🛒 Ваша корзина</h2>
                        <button onclick="cart.hideCart()" class="close-btn" aria-label="Закрыть">&times;</button>
                    </div>
                    <div class="cart-items" id="cart-items-container">
                        <!-- Товары будут здесь -->
                    </div>
                    <div class="cart-footer">
                        <div class="cart-total">
                            <strong>Итого: $<span id="cart-total-price">0.00</span></strong>
                        </div>
                        <button onclick="cart.checkout()" class="checkout-btn">Оформить заказ</button>
                    </div>
                </div>
            </div>
        `;

            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
    }

    updateCartIcon() {
        const cartIcon = document.getElementById('cart-icon');
        if (cartIcon) {
            const totalItems = this.getTotalItems();

            // Обновляем HTML иконки
            cartIcon.innerHTML = totalItems > 0 ?
                `🛒 <span class="cart-count">${totalItems}</span>` : '🛒';
        }
    }

    showNotification(message) {
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" aria-label="Закрыть уведомление">×</button>
        </div>
    `;

        document.body.appendChild(notification);

        // Автоматически удаляем через 3 секунды
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    showCart() {
        const modal = document.getElementById('cart-modal');
        modal.style.display = 'block';
        this.updateCartModal();
    }

    hideCart() {
        const modal = document.getElementById('cart-modal');
        modal.style.display = 'none';
    }

    updateCartModal() {
        const container = document.getElementById('cart-items-container');
        const totalPrice = document.getElementById('cart-total-price');

        if (this.items.length === 0) {
            container.innerHTML = '<p style="text-align: center;">Корзина пуста</p>';
            totalPrice.textContent = '0.00';
            return;
        }

        container.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price} × ${item.quantity}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-btn" onclick="cart.removeFromCart(${item.id})">Удалить</button>
                </div>
            </div>
        `).join('');

        totalPrice.textContent = this.getTotalPrice();
    }

    checkout() {
        if (this.items.length === 0) {
            alert('Корзина пуста!');
            return;
        }

        // Формируем данные для отправки
        const orderData = {
            date: new Date().toISOString(),
            items: this.items,
            total: this.getTotalPrice(),
            totalItems: this.getTotalItems()
        };

        // Создаем строку для поиска в Яндекс
        const searchQuery = `Заказ японских товаров: ${this.items.map(item =>
            `${item.name} (${item.quantity} шт.)`
        ).join(', ')}. Общая сумма: $${this.getTotalPrice()}`;

        // Кодируем для URL
        const encodedQuery = encodeURIComponent(searchQuery);

        // Отправляем в Яндекс (открываем в новой вкладке)
        window.open(`https://yandex.ru/search/?text=${encodedQuery}`, '_blank');

        // Очищаем корзину после оформления
        this.items = [];
        this.saveCart();
        this.updateCartIcon();
        this.updateCartModal();
        this.hideCart();

        alert('Заказ оформлен! Данные отправлены для обработки.');
    }
}

// Создаем глобальный объект корзины
const cart = new ShoppingCart();