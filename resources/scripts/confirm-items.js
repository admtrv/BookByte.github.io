// confirm-item.js

document.addEventListener("DOMContentLoaded", function () {
    fetch("resources/database/books.json")
        .then(response => response.json())
        .then(books => {
            loadOrderSummary(books);
        })
        .catch(error => console.error("Error loading book data:", error));
});

function loadOrderSummary(books) {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    const cartItems = [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
        { id: 3, quantity: 1 }
    ];

    let total = 0;

    cartItems.forEach((cartItem, index) => {
        const book = books.find(b => b.id === cartItem.id);
        if (!book) return;

        // Убираем mb-3 у последнего элемента
        const marginClass = index === cartItems.length - 1 ? "" : "mb-2";

        const itemHTML = `
            <div class="d-flex align-items-center ${marginClass}">
                <img src="${book.image1}" class="rounded me-3" width="60" height="60" alt="${book.title}">
                <div class="me-auto">
                    <span class="text-dark fw-bold">${book.title}</span>
                </div>
                <span class="text-secondary fw-bold">${(book.price * cartItem.quantity).toFixed(2)}€</span>
                <span class="text-muted ms-2">x ${cartItem.quantity}</span>
            </div>
        `;
        cartItemsContainer.innerHTML += itemHTML;
        total += book.price * cartItem.quantity;
    });

    const deliveryMethod = "AlzaBox Bratislava - Šancová 112";
    const deliveryPrice = 1.80;

    const paymentMethod = "Online Payment";
    const paymentPrice = 0;

    document.getElementById("delivery-method").textContent = deliveryMethod;
    document.getElementById("delivery-price").textContent = `${deliveryPrice.toFixed(2)}€`;

    document.getElementById("payment-method").textContent = paymentMethod;
    document.getElementById("payment-price").textContent = paymentPrice === 0 ? "No Charge" : `${paymentPrice.toFixed(2)}€`;

    total += deliveryPrice;
    document.getElementById("total-price").textContent = `${total.toFixed(2)}€`;
}
