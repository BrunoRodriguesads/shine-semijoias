document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o contador do carrinho na página de produtos
    if (document.getElementById('cart-count')) {
        updateCartCount();
    }

    // Atualiza o carrinho na página do carrinho
    if (document.getElementById('cart-items')) {
        updateCart();
    }
});

function addToCart(name, price, image) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({ name, price, image });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    updateCartCount();
}

function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cartItems.length;
    }
}

function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;
    
    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <div>
                <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px;">
                <p>${item.name}</p>
                <p>R$ ${item.price.toFixed(2)}</p>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        totalPrice += item.price;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function checkout() {
    alert('Compra finalizada com sucesso!');
    localStorage.removeItem('cartItems');
    updateCart();
}
