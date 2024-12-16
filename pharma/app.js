let cart = [];

// Fetch medicine data from JSON file
fetch('medicineData.json')
    .then(response => response.json())
    .then(data => {
        createMedicineCards(data);
    })
    .catch(error => console.error('Error fetching medicine data:', error));

// Render medicine cards
function createMedicineCards(data) {
    const sectionsContainer = document.getElementById('medicine-sections');
    for (const [category, medicines] of Object.entries(data)) {
        const section = document.createElement('div');
        section.classList.add('medicine-section');
        section.innerHTML = `<h2>${category}</h2>`;
        medicines.forEach(medicine => {
            const card = document.createElement('div');
            card.classList.add('medicine-card');
            card.innerHTML = `
                <img src="${medicine.image}" alt="${medicine.name}">
                <h3>${medicine.name}</h3>
                <p>Price: $${medicine.price}</p>
                <label>
                    Quantity:
                    <input type="number" id="quantity-${medicine.id}" value="1" min="0">
                </label>
                <button id="add-${medicine.id}">Add to Cart</button>
            `;
            section.appendChild(card);
           
            document.body.addEventListener('click', e => {
                if (e.target.id === `add-${medicine.id}`) {
                    const quantity = parseInt(document.getElementById(`quantity-${medicine.id}`).value);
                    console.log(quantity)
                    addToCart(medicine, quantity);
                }
            });
        });
        sectionsContainer.appendChild(section);
    }
}

// Add item to cart
function addToCart(medicine, quantity) {
    const existingItem = cart.find(item => item.id === medicine.id);
    if (existingItem) {
        console.log(existingItem)
    } else {
        cart.push({ ...medicine, quantity });
    }
    updateCartTable();
}

// Update cart table
function updateCartTable() {
    const cartTableBody = document.querySelector('#cart-table tbody');
    cartTableBody.innerHTML = '';
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price * item.quantity}</td>
            <td><button id="delete-${item.id}">Delete</button></td>
        `;
        cartTableBody.appendChild(row);
    });

    cartTableBody.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', e => {
            const id = parseInt(e.target.id.split('-')[1]);
            deleteFromCart(id);
        });
    });
}

// Delete item from cart
function deleteFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartTable();
}

// Save cart to localStorage when moving to cart page
document.getElementById('view-cart').addEventListener('click', () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'cart.html'; // Redirect to cart page
});
