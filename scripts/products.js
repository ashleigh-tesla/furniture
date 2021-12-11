let carts = document.querySelectorAll('.add-cart')

let products = [{
        name: 'Grey Couch',
        tag: 'greycouch',
        price: 150,
        inCart: 0
    },
    {
        name: 'Black Couch',
        tag: 'blackcouch',
        price: 150,
        inCart: 0
    },
    {
        name: 'White Couch',
        tag: 'whitecouch',
        price: 150,
        inCart: 0
    },
    {
        name: 'Coffee Couch',
        tag: 'coffeecouch',
        price: 150,
        inCart: 0
    },
    {
        name: 'Gray Couch',
        tag: 'graycouch',
        price: 150,
        inCart: 0
    },
    {
        name: 'Crimson Couch',
        tag: 'crimsoncouch',
        price: 150,
        inCart: 0
    },
    {
        name: 'Brown Couch',
        tag: 'browncouch',
        price: 150,
        inCart: 0
    },
    {
        name: 'Brownleather Couch',
        tag: 'brownleathercouch',
        price: 150,
        inCart: 0
    },
    {
        name: 'Blue Couch',
        tag: 'bluecouch',
        price: 150,
        inCart: 0
    },
    {
        name: 'Milkywhite Couch',
        tag: 'milkywhitecouch',
        price: 150,
        inCart: 0
    },
    {
        name: 'Standard Couch',
        tag: 'standardcouch',
        price: 150,
        inCart: 0
    },
    {
        name: 'Olive Couch',
        tag: 'olivecouch',
        price: 150,
        inCart: 0
    },
]
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i])
        totalCost(products[i])
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

    if (cartItems && productContainer) {
        productContainer.innerHTML = ''
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price},00</div>
            <div class="quantity">
                <ion-icon name="arrow-back-circle-outline" onclick="decNumber()"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="arrow-forward-circle-outline" onclick="incNumber()"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart * item.price},00
            </div>  
            `
        })
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                Basket Total
            </h4>
            <h4 class="basketTotal">
            $${cartCost},00
            </h4>
            `
    }
}
onLoadCartNumbers()
displayCart()