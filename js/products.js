const products = [
    {
        id: 1,
        name: "Traditional Yukata",
        price: "$89.99",
        image: "../storage/product1.jpg",
        description: "Authentic Japanese cotton yukata",
    },
    {
        id: 2,
        name: "Sake Set",
        price: "$45.50",
        image: "../storage/product2.jpg",
        description: "Traditional Japanese sake serving set",
    },
    {
        id: 3,
        name: "Bamboo Tea Set",
        price: "$67.00",
        image: "../storage/product3.jpg",
        description: "Handcrafted bamboo tea ceremony set",
    },
    {
        id: 4,
        name: "Origami Paper Pack",
        price: "$12.99",
        image: "../storage/product4.jpg",
        description: "100 sheets of traditional origami paper",
    },
    {
        id: 5,
        name: "Japanese Cookbook",
        price: "$24.99",
        image: "../storage/product5.jpg",
        description: "Authentic Japanese recipes",
    },
    {
        id: 6,
        name: "Travel Guide Book",
        price: "$18.50",
        image: "../storage/product6.jpg",
        description: "Complete Japan travel guide",
    },
    {
        id: 7,
        name: "Kimono Silk Scarf",
        price: "$35.00",
        image: "../storage/product7.jpg",
        description: "Silk scarf with traditional patterns",
    },
    {
        id: 8,
        name: "Matcha Tea Powder",
        price: "$22.99",
        image: "../storage/product8.jpg",
        description: "Premium ceremonial grade matcha",
    },
    {
        id: 9,
        name: "Japanese Lantern",
        price: "$28.50",
        image: "../storage/product9.jpg",
        description: "Decorative paper lantern",
    },
    {
        id: 10,
        name: "Samurai Keychain",
        price: "$8.99",
        image: "../storage/product10.jpg",
        description: "Traditional samurai design keychain",
    },
    {
        id: 11,
        name: "Bonsai Kit",
        price: "$39.99",
        image: "../storage/product11.jpg",
        description: "Beginner bonsai growing kit",
    },
    {
        id: 12,
        name: "Japanese Incense Set",
        price: "$15.75",
        image: "../storage/product12.jpg",
        description: "Traditional Japanese incense collection",
    },
]

function renderProducts() {
    const container = document.getElementById("products-container")
    if (!container) return

    container.className = "products-grid"
    container.innerHTML = ""

    products.forEach((product) => {
        const productHTML =
            // изменяемая строка
            `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">${product.price}</p>
                    <p class="product-description">${product.description}</p>
                    <button class="btn-primary" onclick="cart.addToCart(${JSON.stringify(product).replace(/"/g, "&quot;")})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `
        container.innerHTML += productHTML
    })
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", renderProducts)
