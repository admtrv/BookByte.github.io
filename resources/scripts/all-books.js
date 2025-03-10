document.addEventListener("DOMContentLoaded", function () {
    loadProductGrid("products");
});

function createHorizontalProductCard() {
    return `
        <div class="col">
            <a href="product.html" class="text-decoration-none text-dark">
                <div class="card border-0 shadow-sm d-flex flex-row align-items-stretch p-3">
                    <img src="resources/images/book.jpg" class="img-fluid rounded" style="width: 220px; height: auto;" alt="Book Cover">
                    <div class="card-body d-flex flex-column justify-content-between p-3">
                        <div>
                            <h5 class="fw-bold mb-1">Book</h5>
                            <p class="mb-3">Author</p>
                        </div>
                        <p class="fw-bold text-primary mb-0 mt-auto">12,51€</p>
                    </div>
                </div>
            </a>
        </div>
    `;
}

function loadProductGrid(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    let gridHTML = "<div class='row row-cols-1 row-cols-md-2 g-4'>";
    for (let i = 0; i < 6; i++) {
        gridHTML += createHorizontalProductCard();
    }
    gridHTML += "</div>";
    
    section.innerHTML = gridHTML;
}
