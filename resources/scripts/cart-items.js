document.addEventListener("DOMContentLoaded", function () {
    loadCartItems();
});

const cartItems = [
    { id: 1, title: "Book", price: 2.67, quantity: 1, stock: "> 10" },
    { id: 2, title: "Book", price: 2.75, quantity: 1, stock: "2" },
    { id: 3, title: "Book", price: 4.25, quantity: 1, stock: "7" }
];

function loadCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    cartItems.forEach((item, index) => {
        const isLimitedStock = item.stock !== "> 10";
        cartItemsContainer.innerHTML += `
            <div class="d-flex align-items-center p-3 ${index === 1 ? 'bg-light' : ''}" id="cart-item-${item.id}">
                <a href="product.html" class="text-decoration-none">
                    <img src="resources/images/book.jpg" class="rounded me-3" width="80" height="80" alt="Book">
                </a>
                <div class="me-auto">
                    <a href="product.html" class="text-decoration-none text-dark">
                        <span class="fw-bold fs-4">${item.title}</span>
                    </a>
                    <div class="text-muted fw-bold fs-6">In Stock ${item.stock} pcs</div>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-outline-dark btn-sm me-2" onclick="updateQuantity(${item.id}, -1, ${isLimitedStock ? item.stock : 'null'})">-</button>
                    <span id="qty-${item.id}" class="mx-2 d-inline-block text-center border border-dark rounded px-2" style="min-width: 40px;">${item.quantity}</span>
                    <button class="btn btn-outline-dark btn-sm ms-2" onclick="updateQuantity(${item.id}, 1, ${isLimitedStock ? item.stock : 'null'})">+</button>
                </div>
                <button class="btn btn-outline-danger btn-sm ms-3" onclick="removeItem(${item.id})">
                    <i class="bi bi-x-lg"></i>
                </button>
                <span class="ms-3 text-primary fw-bold">${item.price.toFixed(2)}€</span>
            </div>
        `;
    });

    updateTotal();
}

function updateQuantity(itemId, change, maxStock) {
    const item = cartItems.find(item => item.id === itemId);
    if (!item) return;

    const newQty = item.quantity + change;
    if (newQty >= 1 && (item.stock === "> 10" || newQty <= parseInt(item.stock))) {
        item.quantity = newQty;
        document.getElementById(`qty-${item.id}`).textContent = newQty;
    }

    updateTotal();
}

function removeItem(itemId) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        document.getElementById(`cart-item-${itemId}`).remove();
    }

    updateTotal();
}

function updateTotal() {
    let total = 0;
    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });

    document.getElementById("total-price").textContent = total.toFixed(2) + "€";
}
