// home-books.js

document.addEventListener("DOMContentLoaded", function () {
    fetch("resources/database/books.json")
        .then(response => response.json())
        .then(data => {
            loadBooks("bestsellers", data);
            loadBooks("newcomers", data);
            loadBooks("trending", data);
        })
        .catch(error => console.error("Error loading book data:", error));
});

function createBookCard(book) {
    return `
        <li class="list-inline-item me-4 p-2">
            <a href="product.html?id=${book.id}" class="text-decoration-none text-dark">
                <div class="card border-0 shadow-sm" style="width: 255px;">
                    <div class="card-body p-3 text-center"> 
                        <img src="${book.image1}" class="img-fluid rounded mx-auto d-block mb-2" style="max-width: 225px;" alt="${book.title}">
                        <h6 class="text-start text-primary fw-bold mb-1 text-truncate" style="max-width: 220px;">${book.title}</h6>
                        <p class="text-start text-dark mb-1">${book.author}</p>
                        <p class="text-start text-secondary fw-bold mb-0">${book.price.toFixed(2)}€</p>
                    </div>
                </div>
            </a>
        </li>
    `;
}


function loadBooks(sectionId, books) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    let shuffledBooks = [...books].sort(() => 0.5 - Math.random()).slice(0, 7);
    let booksHTML = shuffledBooks.map(book => createBookCard(book)).join("");

    section.innerHTML = booksHTML;
}
