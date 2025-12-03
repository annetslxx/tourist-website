class ShoppingCart {
    constructor() {

        // получаем из локального хранилища браузера переменную japanCart
        // items - добавленные в корзину товары
        this.items = JSON.parse(localStorage.getItem("japanCart")) || []
        this.init()
    }

    //
    init() {
        this.updateCartIcon() // обновляем иконку корзины
        this.setupCartModal() // создает окно корзины (по умолчанию скрыто)
    }

    addToCart(product) {
        const existingItem = this.items.find((item) => item.id === product.id)

        if (existingItem) {
            existingItem.quantity += 1
        } else {
            this.items.push({
                ...product, // ... - операция разыменования
                quantity: 1,
            })
        }

        this.saveCart()
        this.updateCartIcon() // обновляем иконку
        this.showNotification(`${product.name} added to cart!`) // уведомление
    }

    removeFromCart(productId) {
        this.items = this.items.filter((item) => item.id !== productId)
        this.saveCart()
        this.updateCartIcon()
        this.updateCartModal() // обновляем окно корзины
    }

    updateQuantity(productId, newQuantity) {
        if (newQuantity < 1) {
            this.removeFromCart(productId)
            return
        }

        const item = this.items.find((item) => item.id === productId)
        if (item) {
            item.quantity = newQuantity
            this.saveCart()
            this.updateCartModal()
        }
    }

    saveCart() {
        //localStorage - память браузера, которая помнит данные даже после закрытия сайта
        localStorage.setItem("japanCart", JSON.stringify(this.items))
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0)
    }

    getTotalPrice() {
        return this.items
            .reduce((total, item) => {
                const price = Number.parseFloat(item.price.replace("$", ""))
                return total + price * item.quantity
            }, 0)
            .toFixed(2)
    }

    setupCartModal() {
        // сравниваем страницу, на которой находимся со страницей туров
        const currentPage = window.location.pathname
        const isToursPage = currentPage.includes("tours.html") || currentPage.endsWith("tours")

        if (!isToursPage) {
            return
        }

        // если есть окно корзины, новое не создаем
        if (!document.getElementById("cart-modal")) {
            const modalHTML =
                // шаблон окна корзины
                `
            <div id="cart-modal" class="cart-modal">
                <div class="cart-modal-content">
                    <div class="cart-modal-header">
                        <h2>Shopping Cart</h2>
                        <button onclick="cart.hideCart()" class="close-btn" aria-label="Close">&times;</button>
                    </div>
                    <div class="cart-items" id="cart-items-container">
                        <!-- Items will be here -->
                    </div>
                    <div class="cart-footer">
                        <div class="cart-total">
                            <strong>Total: $<span id="cart-total-price">0.00</span></strong>
                        </div>
                        <button onclick="cart.checkout()" class="checkout-btn">Checkout</button>
                    </div>
                </div>
            </div>
        `
            // вставляем html код в конец страницы
            document.body.insertAdjacentHTML("beforeend", modalHTML)
        }
    }

    updateCartIcon() {
        const cartIcon = document.getElementById("cart-icon")
        if (cartIcon) {
            const totalItems = this.getTotalItems()
            cartIcon.innerHTML = totalItems > 0 ? `🛒 <span class="cart-count">${totalItems}</span>` : "🛒"
        }
    }

    showNotification(message) {
        const notification = document.createElement("div")
        notification.className = "cart-notification"
        notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" aria-label="Close">×</button>
        </div>
    `

        document.body.appendChild(notification)

        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove()
            }
        }, 3000)
    }

    showCart() {
        const modal = document.getElementById("cart-modal")
        modal.style.display = "block"
        this.updateCartModal()
    }

    hideCart() {
        const modal = document.getElementById("cart-modal")
        modal.style.display = "none"
    }

    updateCartModal() {
        const container = document.getElementById("cart-items-container")
        const totalPrice = document.getElementById("cart-total-price")

        if (this.items.length === 0) {
            container.innerHTML = '<p style="text-align: center;">Cart is empty</p>'
            totalPrice.textContent = "0.00"
            return
        }

        container.innerHTML = this.items
            .map(
                (item) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price} × ${item.quantity}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-btn" onclick="cart.removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `,
            )
            .join("")

        totalPrice.textContent = this.getTotalPrice()
    }

    checkout() {
        if (this.items.length === 0) {
            alert("Cart is empty!")
            return
        }

        const orderData = {
            date: new Date().toISOString(),
            items: this.items,
            total: this.getTotalPrice(),
            totalItems: this.getTotalItems(),
        }

        const searchQuery = `Japan merchandise order: ${this.items
            .map((item) => `${item.name} (${item.quantity} pcs)`)
            .join(", ")}. Total: $${this.getTotalPrice()}`

        const encodedQuery = encodeURIComponent(searchQuery)
        window.open(`https://yandex.ru/search/?text=${encodedQuery}`, "_blank")

        this.items = []
        this.saveCart()
        this.updateCartIcon()
        this.updateCartModal()
        this.hideCart()

        alert("Order submitted! Check your browser for details.")
    }
}

const cart = new ShoppingCart()
