// cart-items.js

document.addEventListener("DOMContentLoaded", function () {
    fetch("resources/database/books.json")
        .then(response => response.json())
        .then(data => {
            loadCartItems(data);
        })
        .catch(error => console.error("Error loading book data:", error));
});

function loadCartItems(books) {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    const cartItems = [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
        { id: 3, quantity: 1 }
    ];

    let cartData = [];

    cartItems.forEach((cartItem) => {
        const book = books.find(b => b.id === cartItem.id);
        if (!book) return;

        const isLimitedStock = book.stock <= 10;
        const itemHTML = `
            <div class="d-flex align-items-center p-3" id="cart-item-${book.id}">
                
                <a href="product.html?id=${book.id}" class="text-decoration-none">
                    <img src="${book.image1}" class="rounded me-3" width="80" height="80" alt="${book.title}">
                </a>

                <div class="me-auto">

                    <a href="product.html?id=${book.id}" class="text-decoration-none text-primary">
                        <span class="fw-bold">${book.title}</span>
                    </a>

                    <div class="text-muted">In Stock ${book.stock > 10 ? '> 10' : book.stock} pcs</div>

                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm fw-bold" style="min-width: 30px;" onclick="updateQuantity(${book.id}, -1, ${isLimitedStock ? book.stock : 'null'})">-</button>

                    <span id="qty-${book.id}" class="d-inline-block text-center" style="min-width: 40px;">${cartItem.quantity}</span>

                    <button class="btn btn-sm fw-bold" style="min-width: 30px;" onclick="updateQuantity(${book.id}, 1, ${isLimitedStock ? book.stock : 'null'})">+</button>
                </div>

                <button class="btn btn-outline-danger btn-sm ms-3" onclick="removeItem(${book.id})">
                    <i class="bi bi-x-lg"></i>
                </button>
                <span class="ms-3 text-secondary fw-bold">${book.price.toFixed(2)}€</span>
            </div>
        `;
        cartItemsContainer.innerHTML += itemHTML;
        cartData.push({ id: book.id, quantity: cartItem.quantity });
    });

    localStorage.setItem("cart", JSON.stringify(cartData));
    updateTotal();
}

function updateQuantity(itemId, change, maxStock) {
    const qtyElement = document.getElementById(`qty-${itemId}`);
    let currentQty = parseInt(qtyElement.textContent);
    let newQty = currentQty + change;

    if (newQty >= 1 && (!maxStock || newQty <= maxStock)) {
        qtyElement.textContent = newQty;
        updateCartInStorage(itemId, newQty);
    }

    updateTotal();
}

function removeItem(itemId) {
    document.getElementById(`cart-item-${itemId}`).remove();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateTotal();
}

function updateCartInStorage(itemId, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = quantity;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateTotal() {
    let total = 0;
    document.querySelectorAll("#cart-items > div").forEach(cartItem => {
        let priceElement = cartItem.querySelector(".text-secondary.fw-bold");
        let quantityElement = cartItem.querySelector("span[id^='qty-']");

        if (priceElement && quantityElement) {
            let price = parseFloat(priceElement.textContent.replace("€", ""));
            let quantity = parseInt(quantityElement.textContent);

            if (!isNaN(price) && !isNaN(quantity)) {
                total += price * quantity;
            }
        }
    });

    document.getElementById("total-price").textContent = total.toFixed(2) + "€";
}

