const productsListEl = document.querySelector(".products-content");
const popularListEl = document.querySelector(".popular-content");
const seeMoreBtn = document.querySelector(".see-more-btn");
const viewMoreBtn = document.querySelector(".view-more-btn");

seeMoreBtn.addEventListener('click', () => {
    popularListEl.scrollIntoView({ behavior: "smooth" })
})
viewMoreBtn.addEventListener('click', () => {
    productsListEl.scrollIntoView({ behavior: "smooth" })
})