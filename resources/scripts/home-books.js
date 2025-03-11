document.addEventListener("DOMContentLoaded", function () {
    loadBooks("bestsellers");
    loadBooks("newcomers");
    loadBooks("trending");
});

function createBookCard() {
    return `
        <li class="list-inline-item me-4 p-2">
            <a href="product.html" class="text-decoration-none text-dark">
                <div class="card border-0 shadow-sm" style="width: 255px;">
                    <div class="card-body p-3 text-center"> 
                        <img src="resources/images/book.jpg" class="img-fluid rounded mx-auto d-block mb-2" style="max-width: 225px;" alt="Book Cover">
                        <p class="text-start text-primary fw-bold mb-1">Book</p>
                        <p class="text-start text-dark mb-1">Author</p>
                        <p class="text-start text-primary fw-bold mb-0">12.51€</p>
                    </div>
                </div>
            </a>
        </li>
    `;
}

function loadBooks(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    let booksHTML = "";
    for (let i = 0; i < 7; i++) {  
        booksHTML += createBookCard();
    }

    section.innerHTML = booksHTML;
}
