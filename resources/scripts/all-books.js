// all-books.js

document.addEventListener("DOMContentLoaded", function () {
    fetch("resources/database/books.json")
        .then(response => response.json())
        .then(data => loadProductGrid("products", data))
        .catch(error => console.error("Error loading book data:", error));
});

function createHorizontalProductCard(book) {
    return `
        <div class="col">
            <a href="product.html?id=${book.id}" class="text-decoration-none text-dark">
                <div class="card border-0 shadow-sm d-flex flex-row align-items-stretch p-3">
                    <img src="${book.image1}" class="img-fluid rounded" style="width: 220px; height: auto;" alt="${book.title}">
                    <div class="card-body d-flex flex-column justify-content-between p-3">
                        <div>
                            <h5 class="text-start text-primary fw-bold text-truncate mb-1" style="max-width: 200px;">${book.title}</h5>
                            <p class="test-start text-dark mb-3">${book.author}</p>
                        </div>
                        <p class="test-start text-secondary fw-bold mb-0">${book.price.toFixed(2)}€</p>
                    </div>
                </div>
            </a>
        </div>
    `;
}

function loadProductGrid(sectionId, books) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    let gridHTML = "<div class='row row-cols-1 row-cols-md-2 g-4'>";
    books.forEach(book => {
        gridHTML += createHorizontalProductCard(book);
    });
    gridHTML += "</div>";
    
    section.innerHTML = gridHTML;
}
