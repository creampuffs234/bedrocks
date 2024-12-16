window.addEventListener('load', () => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    displayCart(cartData);
});

function displayCart(cartData) {
    const cartTableBody = document.querySelector('#cart-table tbody');
    let totalPrice = 0;

    cartData.forEach(item => {
        const row = document.createElement('tr');
        const itemTotalPrice = item.price * item.quantity;
        totalPrice += itemTotalPrice;
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${itemTotalPrice}</td>
        `;
        cartTableBody.appendChild(row);
    });

    document.getElementById('total-price').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
}

// Back to store button
document.getElementById('back-to-store').addEventListener('click', () => {
    window.location.href = 'page1.html';
});
