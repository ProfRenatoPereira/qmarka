// ##################################################################################################################################
// Show Products
// ##################################################################################################################################

import { conectApi } from "./conectaApi.js";

const productsList = document.querySelector("[data-products]");
let search = false;
async function showProducts(){
    search = false;
    productsList.innerHTML = "";
    try {
        const products = await conectApi.productsList();
        buildProductsPage(products.conexaoConvertida, productsList);
    } catch (error) {
        productsList.innerHTML = `${error} <br> Erro ao exibir a lista de produtos!`;
    }
}

function promotionalPrice(price, promotionalPrice) {
    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };
    if (price > promotionalPrice) {
        return {
            string: `<p class="discount">De ${formatCurrency(price)}</p>
                     <p class="product_price">por ${formatCurrency(promotionalPrice)}</p>`,
            Boolean: true
        };
    } else {
        return {
            string: `<p class="product_price">${formatCurrency(price)}</p>`,
            Boolean: false
        };
    }
}

function productsTags(product){
    if (product === true){
        return `<p class="product_tag01">NOVIDADE</p>`;
    } else {
        return "";
    }
}

function buildProductsPage(list, htmlComponent){
    let price;
    let tag;
    for (let i in list) {
        tag = productsTags(Boolean(list[i].tag01));
        price = promotionalPrice(parseFloat(list[i].product_price.replace(',', '.')), parseFloat(list[i].product_promotional_price.replace(',', '.')));
        const productBox = `<div class="product_card product_card_${i+1}}"> 
        <img class="product_image_mobile" src="${list[i].product_image_mobile}">
        <img class="product_image_tablet" src="${list[i].product_image_tablet}">
        <img class="product_image_desktop" src="${list[i].product_image_desktop}">
        <h4 class="product_label">${list[i].product_label}</h4>
        <p class="product_description">${list[i].product_description}</p>
        ${price.string}
        <div class="product_button_box">
        <button class="product_cto openModal" id="${list[i].id}"> Ver mais </button>
        ${tag}
        </div>
        </div>`;
        htmlComponent.innerHTML += productBox;
    }
}

showProducts();

// ##################################################################################################################################
// Search Feature
// ##################################################################################################################################

const inputSearch = document.querySelector("[data-search]");
const searchButton = document.querySelector("[data-search-button]");

inputSearch.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) { //Enter button
        if (!inputSearch.value || inputSearch.value == "") {
            if (search == true){
                event.preventDefault();
                showProducts();
            } else {
                event.preventDefault();
                return alert('Digite um valor para pesquisa!');
            }
        } else {
            event.preventDefault();
            searchProducts(inputSearch.value);
        }
    }
});

searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    if (!inputSearch.value || inputSearch.value == "") {
        if (search == true){
            showProducts();
            event.preventDefault();
        } else {

            return alert('Digite um valor para pesquisa!');
        }
    } else {
        searchProducts(inputSearch.value);
    }
});

const mobileSearch = document.querySelector("[data-search-mobile]");
const mobileSearchButton = document.querySelector("[data-search-mobile-button]");

mobileSearchButton.addEventListener("click", function(event) {
    event.preventDefault();
    if (!mobileSearch.value || mobileSearch.value == "") {
        if (search == true){
            showProducts();
            event.preventDefault();
        } else {
            return alert('Digite um valor para pesquisa!');
        }
    } else {
        searchProducts(mobileSearch.value);
    }
}); 

async function searchProducts(searchTerm){
    search = true;
    try {
        const products = await conectApi.searchProducts(searchTerm);
        if (products.conexaoConvertida == ""){
            productsList.style.textAlign = "center"
            productsList.innerHTML = `<h2><br><br> Nenhum resultado encontrado com o termo "${searchTerm}"`;
        } else {
            productsList.innerHTML = "";
            productsList.style.textAlign = "left"
            buildProductsPage(products.conexaoConvertida, productsList);
        }
    } catch (error) {
        productsList.innerHTML = `${error} <br> Erro ao exibir a lista de produtos!`;
    }
}

// ##################################################################################################################################
// Search from category buttons
// ##################################################################################################################################

let categoryButton = document.getElementsByClassName("category_button");

for (let i = 0; i < categoryButton.length; i++) {
    categoryButton[i].addEventListener("click", function(event) {
        event.preventDefault();
        searchProducts(categoryButton[i].innerHTML);
    });
}

// ##################################################################################################################################
// JS FOR MODAL
// ##################################################################################################################################

const modalBox = document.querySelector(".modal_outer_content");

window.addEventListener("DOMContentLoaded", infoModalConstruct());

function infoModalConstruct(){
    let modal = document.getElementById("modal");
    let closeButton = document.getElementsByClassName("close")[0];
    const productContainer = document.querySelector(".products_container")

    productContainer.addEventListener("click", async function (event) {
        if (event.target.classList.contains("openModal")) {
            event.preventDefault();
            try {
                const product = await conectApi.searchProductById(event.target.getAttribute("id"));
                constructModal(product.conexaoConvertida, modalBox);
            } catch (error) {
                modalBox.innerHTML = `${error.statusConexao} <br> Erro ao exibir a lista de produtos!`;
            }
            modal.style.display = "block";
        }
    });
    
    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
    });
    
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

function constructModal(product, htmlComponent){
    let price = promotionalPrice(parseFloat(product.product_price.replace(',', '.')), parseFloat(product.product_promotional_price.replace(',', '.')));
    let tag = productsTags(Boolean(product.tag01));
    const productBox = `<div class="modal_product_image_large_screens">
        <img src="${product.product_image_tablet}" alt="${product.product_image_alt}" class="modal_product_image_large">
    </div>

    <div class="modal_inner_content_superior">
        <img src="${product.product_image_mobile}" alt="${product.product_image_alt}" class="modal_product_image">
        <h2 class="modal_product_name">${product.product_label}</h2>
        <p class="modal_product_details">${product.product_description}</p>
        <hr class="modal_hr">
        ${price.string}
        <p class="modal_seller_info">vendido e entregue por ${product.seller_info}</p>
        <hr class="modal_hr_2">
        <h3 class="modal_product_variation">Cor:</h3>
        <div class="modal_radio_button">
            <div class="radio-wrapper">
                <input type="radio" name="color" value="opcao1" checked>
                <label class="radio-type-label">${product.color[0].name}</label>
            </div>
            <div class="radio-wrapper">
                <input type="radio" name="color" value="opcao2">
                <label class="radio-type-label">${product.color[1].name}</label>
            </div>
            <div class="radio-wrapper">
                <input type="radio" name="color" value="opcao3">
                <label class="radio-type-label">${product.color[2].name}</label>
            </div>
        </div>
        <hr class="modal_hr_2">
        <h3 class="modal_product_variation">Tamanho:</h3>
        <div class="modal_radio_button">
            <div class="radio-wrapper">
                <input type="radio" name="size" value="opcao1" checked>
                <label class="radio-type-label">${product.size[0].name}</label>
            </div>
            <div class="radio-wrapper">
                <input type="radio" name="size" value="opcao2">
                <label class="radio-type-label">${product.size[1].name}</label>
            </div>
            <div class="radio-wrapper">
                <input type="radio" name="size" value="opcao4">
                <label class="radio-type-label">${product.size[2].name}</label>
            </div>
            <div class="radio-wrapper">
                <input type="radio" name="size" value="opcao5">
                <label class="radio-type-label">${product.size[3].name}</label>
            </div>
            <div class="radio-wrapper">
                <input type="radio" name="size" value="opcao6">
                <label class="radio-type-label">${product.size[4].name}</label>
            </div>
        </div>
        <div class="product_button_box">
        <button class="add_to_cart_button">Adicionar à sacola</button>
        ${tag}
        </div>
    </div>`;
    htmlComponent.innerHTML = productBox;
}

// ##################################################################################################################################
// Export functions
// ##################################################################################################################################

export const showProductsList = {
    promotionalPrice,
    productsTags,
    buildProductsPage,
    infoModalConstruct,
    constructModal
}
