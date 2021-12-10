// Menu Toggle
const menu = document.querySelector('.menu-icon')
const navbar = document.querySelector('.navbar')

menu.onclick = () => {
    navbar.classList.toggle('active')
    cart.classList.remove('open')
    menu.classList.toggle("move")
    login.classList.remove('vula')
}

//Cart Toggle
let cart = document.querySelector('.cart')

document.querySelector('#cart-icon').onclick = () => {
    navbar.classList.remove('active')
    cart.classList.toggle('open')
    menu.classList.remove("move")
    login.classList.remove('vula')

}

// Login Form Toggle
const login = document.querySelector('.login-form')
const userIcon = document.querySelector('#user-icon')

userIcon.onclick = () => {
    login.classList.toggle('vula')
    navbar.classList.remove('active')
    cart.classList.remove('open')
    menu.classList.remove("move")
}

// On Click On Menu Links Removed Menu
window.onscroll = () => {
    navbar.classList.remove('active')
    menu.classList.remove('move')
}

// Change Header Background Color And Shadow On Scroll
let header = document.querySelector('header')

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0)
})

// Scroll Top
const scrollTop = document.querySelector('.scroll-top')

window.addEventListener('scroll', () => {
    scrollTop.classList.toggle('active', window.scrollY > 0)
})