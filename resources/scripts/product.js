// product.js

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get("id");

    if (!bookId) {
        console.error("Book ID is missing in the URL.");
        return;
    }

    fetch("resources/database/books.json")
        .then(response => response.json())
        .then(data => {
            const book = data.find(b => b.id == bookId);
            if (!book) {
                console.error("Book not found.");
                return;
            }
            displayBookDetails(book);
        })
        .catch(error => console.error("Error loading book data:", error));
});

function displayBookDetails(book) {
    // Меняем заголовок страницы
    document.title = book.title;

    document.getElementById("bookTitle").textContent = book.title;
    document.getElementById("bookTitleBreadcrumb").textContent = book.title;
    document.getElementById("bookAuthor").textContent = book.author;
    document.getElementById("bookGenre").textContent = book.genre;
    document.getElementById("bookLanguage").textContent = book.language;
    document.getElementById("bookDescription").textContent = book.description;
    document.getElementById("bookPrice").textContent = book.price.toFixed(2) + "€";

    document.getElementById("bookStock").textContent =
        book.stock > 10 ? "In Stock > 10 pcs" : `In Stock ${book.stock} pcs`;

    document.getElementById("bookImage1").src = book.image1;
    document.getElementById("bookImage1").alt = book.title + " - Front Cover";
    document.getElementById("bookImage2").src = book.image2;
    document.getElementById("bookImage2").alt = book.title + " - Back Cover";
}
