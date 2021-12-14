{
    /* <div class="cart-box">
    <img src="sofa/${item.tag}.jpg" alt="" style="width:40%; display:flex; justify-content:center; align-items:center; text-align:center;">
    <div class="cart-text" style="width: 50%; place-items:center; text-align:center;">  
        <h3>${item.name}</h3>
        <span>$${item.price}</span>
        <div><i class='bx bx-minus-circle decrease'></i><span>   ${item.inCart}   </span><i class='bx bx-plus-circle increase'></i></div>
    </div>
    <i class="bx bx-trash erase" style="width: 10%; display:flex; justify-content:center; align-items:center; text-align:center; cursor:pointer;"></i>
    </div> */
}

// productContainer.innerHTML += `
// <div class="total">
//             <h3>${productNumbers} Items</h3>
//             <span>Total: $${cartCost},00</span>
// </div>
// <a href="#" class="btn">Proceed To Pay</a>
// `










let carts = document.querySelectorAll('.add-cart')

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', (e) => {
        e.preventDefault()
        cartNumbers(products[i])
        totalCost(products[i])
        displayCart()
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')

    if (productNumbers) {
        document.querySelector('.nav-icons span').textContent = productNumbers
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers)

    if (action) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.nav-icons span').textContent = productNumbers - 1;
        console.log("action running");
    } else if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.nav-icons span').textContent = productNumbers + 1
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.nav-icons span').textContent = 1
    }
    setItems(product)
}

function setItems(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)

    if (cartItems != null) {
        let currentProduct = product.tag;
        if (cartItems[currentProduct] == undefined) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        }
        cartItems[currentProduct].inCart += 1
    } else {
        product.inCart = 1
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function totalCost(product, action) {
    let cartCost = localStorage.getItem('totalCost')

    if (action) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost - product.price);
    } else if (cartCost != null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem('totalCost', cartCost + product.price)
    } else {
        localStorage.setItem("totalCost", product.price)
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)

    let productContainer = document.querySelector(".cart-content")

    let cartCost = localStorage.getItem('totalCost')
    cartCost = parseInt(cartCost);
    let productNumbers = localStorage.getItem('cartNumbers')

    if (cartItems && productContainer) {
        productContainer.innerHTML = ''
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `  

            
            <div class="product" style=''>
                <img src="./sofa/${item.tag}.jpg" alt="" style="">
                <span class="sm-hide">${item.name}</span>
                <i class="bx bx-trash erase" style="cursor:pointer;"></i>
            </div>
            <div class="price sm-hide" style=''>$${item.price},00</div>
            <div class="quantity" style=''>
                <i class='bx bx-minus-circle decrease' style='cursor:pointer;'></i>
                    <span>${item.inCart}</span>
                <i class='bx bx-plus-circle increase' style='cursor:pointer;'></i>
            </div>      
            <div class="total" style=''>$${item.inCart * item.price},00</div>
            
            
            `
        })


        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total </h4>
                <h4 class="basketTotal">$${cartCost},00</h4>
            </div>
            <a href="#" class="btn basketTotalBtn"  onclick="alert('Thank You For Shopping With Us')">Proceed To Pay</a>
            `
        deleteButtons();
        manageQuantity();
    }
}






function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            if (cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}








function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product .erase');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g, '').trim();

            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}
onLoadCartNumbers()
displayCart()