// ##################################################################################################################################
// SHOW PRODUCTS
// ##################################################################################################################################

import { conectApi } from "./conectaApi.js";
import { showProductsList } from "./showProducts.js";

const htmlPromotionalProducts = document.querySelector("[data-products-promotional]")

function getPromotionalProducts(products){
    let list = [];
    try{
        for (let i=0 ;i<products.conexaoConvertida.length;++i ){
            if ((parseFloat(products.conexaoConvertida[i].product_price.replace(',', '.')) > parseFloat(products.conexaoConvertida[i].product_promotional_price.replace(',', '.')))){
                list.push(products.conexaoConvertida[i]);
            }
        }
        if (list.length == 0){
            htmlPromotionalProducts.style.textAlign = "center"
            htmlPromotionalProducts.innerHTML = "Nenhum produto promocional no momento! Volte mais tarde.";
        } else {
            htmlPromotionalProducts.style.textAlign = "left"
            showProductsList.buildProductsPage(list, htmlPromotionalProducts);
        }
        
    }catch (error){
        htmlPromotionalProducts.innerHTML = "Erro ao exibir a lista de produtos";
    }
}

getPromotionalProducts(await conectApi.productsList());

// ##################################################################################################################################
// JS FOR MODAL AND SEARCH INITIALIZATION
// ##################################################################################################################################

window.addEventListener("DOMContentLoaded", function () {
    showProductsList.infoModalConstruct();
});

// ##################################################################################################################################
// SEARCH FEATURE
// ##################################################################################################################################

const inputSearch = document.querySelector("[data-search]");
const searchButton = document.querySelector("[data-search-button]");
let search = false;

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
        console.log(products.conexaoConvertida)
        if (products.conexaoConvertida == ""){
            htmlPromotionalProducts.style.textAlign = "center"
            htmlPromotionalProducts.innerHTML = `<h2><br><br> Nenhum resultado encontrado com o termo "${searchTerm}"`;
        } else {
            htmlPromotionalProducts.innerHTML = "";
            getPromotionalProducts(products);
        }
    } catch (error) {
        htmlPromotionalProducts.innerHTML = `${error} <br> Erro ao exibir a lista de produtos!`;
    }
}
