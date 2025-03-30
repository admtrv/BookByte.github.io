// admin-product.js

let bookId = null;

document.addEventListener("DOMContentLoaded", () => {
    bookId = new URLSearchParams(window.location.search).get("id");

    const breadcrumbTitle = document.getElementById("bookTitleBreadcrumb");
    const breadcrumbAction = document.getElementById("breadcrumbAction");
    const deleteBtn = document.getElementById("deleteProductBtn");
    const imagePreview = document.getElementById("imagePreview");

    if (bookId) {
        fetch("resources/database/books.json")
            .then(res => res.json())
            .then(data => {
                const book = data.find(b => b.id == bookId);
                if (!book) return console.error("Book not found");

                fillForm(book);

                document.getElementById("pageTitle").textContent = "Edit Product";
                document.title = "Edit Product";

                breadcrumbTitle.innerHTML = `
                    <a href="product.html?id=${book.id}" class="text-decoration-none text-dark">
                        ${book.title}
                    </a>`;
                breadcrumbAction.textContent = "Edit Product";
            })
            .catch(err => console.error("Error loading book:", err));
    } else {
        // New product
        document.getElementById("pageTitle").textContent = "New Product";
        document.title = "New Product";
        breadcrumbTitle.remove();
        breadcrumbAction.textContent = "New Product";


        deleteBtn.innerHTML = 'Cancel <i class="fas fa-times ms-2"></i>';
        imagePreview.innerHTML = "";
        imagePreview.appendChild(createAddImageButton());
    }

    document.getElementById("hiddenImageInput").addEventListener("change", handleNewImageUpload);
    document.getElementById("productForm").addEventListener("submit", handleSave);
    deleteBtn.addEventListener("click", handleDelete);
});


function fillForm(book) {
    document.getElementById("pageTitle").textContent = "Edit Product";
    document.title = "Edit Product";
    document.getElementById("bookTitleBreadcrumb").innerHTML = `
        <a href="product.html?id=${book.id}" class="text-decoration-none text-dark">
            ${book.title}
        </a>
    `;

    const setValue = (id, value) => document.getElementById(id).value = value;
    setValue("productTitle", book.title);
    setValue("productAuthor", book.author);
    setValue("productDescription", book.description);
    setValue("productPrice", book.price);
    setValue("productGenre", book.genre);
    setValue("productLanguage", book.language);

    const imagePreview = document.getElementById("imagePreview");
    imagePreview.innerHTML = "";

    [book.image1, book.image2].forEach(src => {
        if (src) imagePreview.appendChild(createImagePreview(src));
    });

    imagePreview.appendChild(createAddImageButton());
}

function createImagePreview(src) {
    const wrapper = document.createElement("div");
    wrapper.className = "position-relative border rounded overflow-hidden";
    Object.assign(wrapper.style, {
        width: "269px",
        height: "269px",
        flex: "0 0 auto"
    });

    const img = document.createElement("img");
    img.src = src;
    img.className = "w-100 h-100";
    img.style.objectFit = "cover";

    const delBtn = document.createElement("button");
    delBtn.innerHTML = `<i class="bi bi-x-lg"></i>`;
    delBtn.className = "btn btn-sm btn-danger position-absolute top-0 end-0 m-1";
    delBtn.addEventListener("click", () => wrapper.remove());

    wrapper.appendChild(img);
    wrapper.appendChild(delBtn);
    return wrapper;
}

function createAddImageButton() {
    const wrapper = document.createElement("div");
    wrapper.id = "addImageButton";
    wrapper.className = "d-flex align-items-center justify-content-center border border-2 border-secondary rounded";
    Object.assign(wrapper.style, {
        width: "269px",
        height: "269px",
        cursor: "pointer",
        flex: "0 0 auto"
    });

    const icon = document.createElement("i");
    icon.className = "bi bi-plus-lg fs-1 text-secondary";
    wrapper.appendChild(icon);

    wrapper.addEventListener("click", () => {
        document.getElementById("hiddenImageInput").click();
    });

    return wrapper;
}

function handleNewImageUpload(event) {
    const files = Array.from(event.target.files);
    const imagePreview = document.getElementById("imagePreview");
    const addButton = document.getElementById("addImageButton");

    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
            const preview = createImagePreview(e.target.result);
            imagePreview.insertBefore(preview, addButton);
        };
        reader.readAsDataURL(file);
    });
}

function handleSave(e) {
    e.preventDefault();
    if (bookId) {
        window.location.href = `product.html?id=${bookId}`;
    } else {
        window.location.href = "all-products.html";
    }
}

function handleDelete() {
    if (bookId) {
        window.location.href = "index.html";
    } else {
        window.location.href = "all-products.html";
    }
}
