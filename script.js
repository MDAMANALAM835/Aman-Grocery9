let cart = [];

const cartButton = document.getElementById("cart-button");
const cartPanel = document.getElementById("cart-panel");
const closeCart = document.getElementById("close-cart");

cartButton.addEventListener("click", () => {
    cartPanel.classList.add("open");
});

closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("open");
});

// Add products to cart
document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();
    });

});

// Update cart
function updateCart() {

    const cartItems = document.getElementById("cart-items");

    let total = 0;
    let count = 0;

    cartItems.innerHTML = "";

    cart.forEach(item => {

        total += item.price * item.quantity;
        count += item.quantity;

        const row = document.createElement("p");

        row.textContent =
            `${item.name} × ${item.quantity} = ₹${item.price * item.quantity}`;

        cartItems.appendChild(row);

    });

    document.getElementById("total").textContent = total;
    document.getElementById("cart-count").textContent = count;

}

// Product search
document.getElementById("search").addEventListener("input", function() {

    const searchValue = this.value.toLowerCase();

    document.querySelectorAll(".product-card").forEach(card => {

        const name = card.dataset.name;

        card.style.display =
            name.includes(searchValue) ? "block" : "none";

    });

});

// Category filter
document.querySelectorAll(".categories button").forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

        document.querySelectorAll(".product-card").forEach(card => {

            const productCategory = card.dataset.category;

            card.style.display =
                category === "All" || category === productCategory
                ? "block" : "none";

        });

    });

});

// Demo checkout
document.getElementById("checkout").addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("This is a demo website. Real order processing is not connected yet.");

});