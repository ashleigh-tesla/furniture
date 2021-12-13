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

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers')
    console.log(typeof productNumbers)

    productNumbers = parseInt(productNumbers)
    console.log(typeof productNumbers)

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.nav-icons span').textContent = productNumbers + 1
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.nav-icons span').textContent = 1
    }
    setItems(product)
}

function setItems(product) {

    let cartItems = localStorage.getItem('productsInCart')
    console.log("Inside Of SetItems Function")
    console.log("My Product Is", product)

    cartItems = JSON.parse(cartItems)
    console.log("My cartItems are", cartItems)

    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1
    } else {
        product.inCart = 1
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function totalCost(product) {
    console.log("The Product Price is", product.price)

    let cartCost = localStorage.getItem('totalCost')
    console.log("My CartCost Is", cartCost)
    console.log(typeof cartCost)

    if (cartCost != null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem('totalCost', cartCost + product.price)
    } else {
        localStorage.setItem("totalCost", product.price)
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)

    console.log(cartItems)

    let productContainer = document.querySelector(".cart-content")
    let cartCost = localStorage.getItem('totalCost')
    let productNumbers = localStorage.getItem('cartNumbers')

    if (cartItems && productContainer) {
        productContainer.innerHTML = ''
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `

            <div class="cart-box">
                        <img src="sofa/${item.tag}.jpg" alt="" style="width:40%; display:flex; justify-content:center; align-items:center; text-align:center;">
                        <div class="cart-text" style="width: 50%; place-items:center; text-align:center;">  
                            <h3>${item.name}</h3>
                            <span>$${item.price}</span>
                            <span>x ${item.inCart}</span>
                        </div>
                        <i class="bx bx-trash" style="width: 10%; display:flex; justify-content:center; align-items:center; text-align:center;"></i>
            </div>
            
            `
        })

        productContainer.innerHTML += `
            <div class="total">
                        <h3>${productNumbers} Items</h3>
                        <span>Total: $${cartCost}</span>
            </div>
            <a href="#" class="btn">Proceed To Pay</a>
            `
    }
}
onLoadCartNumbers()
displayCart()