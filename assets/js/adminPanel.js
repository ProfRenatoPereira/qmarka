// ##################################################################################################################################
// Show Products
// ##################################################################################################################################

import { conectApi } from "./conectaApi.js";

const htmlContent = document.querySelector("[data-products-container]");

async function makeProduct(){
    try {
        const products = await conectApi.productsList();
        buildProductsPage(products.conexaoConvertida);
    } catch (error) {
        htmlContent.innerHTML = `${error} <br> Erro ao exibir a lista de produtos!`;
    }
}

function buildProductsPage(products){
    let content = "";
    
    htmlContent.innerHTML = `
    <div class="adminPanel_right_components_titles">
    <h2>Editar</h2>
    <h2>imagem</h2>
    <h2>Titulo</h2>
    <h2>Preço</h2>
    <h2>Preço Promocional</h2>
    <h2>Categoria</h2>  
    <h2>Deletar</h2>
    </div>`;
    for (let index = 0; index < products.length; index++) {
        content = `<div class="adminPanel_right_components_product">
        <button><i class="fa-solid fa-file-pen fa-2xl edit_button" id="${products[index].id}"></i></button>
        <img class="adminPanel_right_components_image" src="${products[index].product_image_mobile}" alt="">
        <p>${products[index].product_label}</p>
        <p>R$${products[index].product_price}</p>
        <p>R$${products[index].product_promotional_price}</p>
        <p>${products[index].category}</p>
        <button><i class="fa-solid fa-trash fa-2xl delete_button" id="${products[index].id}" style="color: #ff0000;"></i></button>
        </div>`
        htmlContent.innerHTML += content;
    }
}

makeProduct();

// ##################################################################################################################################
// Search Products
// ##################################################################################################################################

const inputSearch = document.querySelector("[data-search]");
const searchButton = document.querySelector("[data-search-button]");

let search = false;

inputSearch.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) { //Enter button
        if (!inputSearch.value || inputSearch.value == "") {
            if (search == true){
                event.preventDefault();
                makeProduct();
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
            makeProduct();
            event.preventDefault();
        } else {

            return alert('Digite um valor para pesquisa!');
        }
    } else {
        searchProducts(inputSearch.value);
    }
});

async function searchProducts(searchTerm){
    search = true;
    try {
        const products = await conectApi.searchProducts(searchTerm);
        if (products.conexaoConvertida == ""){
            htmlContent.style.textAlign = "center"
            htmlContent.innerHTML = `<h2><br><br> Nenhum resultado encontrado com o termo "${searchTerm}"`;
        } else {
            htmlContent.innerHTML = "";
            htmlContent.style.textAlign = "left"
            buildProductsPage(products.conexaoConvertida);
        }
    } catch (error) {
        htmlContent.innerHTML = `${error} <br> Erro ao exibir a lista de produtos!`;
    }
}

// ##################################################################################################################################
// Buttons
// ##################################################################################################################################

const homeButton = document.querySelector(".adminPanel_button_home");
const insertProductButton = document.querySelector(".adminPanel_button_add");

homeButton.addEventListener("click", function(){
    window.location="index.html";
});

insertProductButton.addEventListener("click", function(){
    localStorage.removeItem("idEdit");
    window.location="adminInsert.html";
});

// ##################################################################################################################################
// Delete Feature
// ##################################################################################################################################

window.addEventListener("DOMContentLoaded", function () {
    deleteButtons();
    editButtons();
});

function deleteButtons(){
    
    htmlContent.addEventListener("click", async function (event) {
        
        if (event.target.classList.contains("delete_button")) {
            let idDelete = parseInt(event.target.getAttribute("id"));
            if (idDelete < 7){ // Validação para não deletar os 6 primeiros produtos de teste
                alert ("Produto marcado como TESTE não pode ser deletado!");
            } else {
                try {
                    const product = await conectApi.searchProductById(event.target.getAttribute("id"));
                    if (confirm ("Deletar o produto: "+product.conexaoConvertida.product_label+" ?")){
                        conectApi.deleteProduct(idDelete);
                        makeProduct();
                    }
                } catch (error) {
                    alert ("Erro inesperado aconteceu!");
                }
            } 
        }
    });
}

// ##################################################################################################################################
// Edit Feature (1/2) ... continues on insertProduct.js
// ##################################################################################################################################

function editButtons(){
    
    htmlContent.addEventListener("click", async function (event) {
        
        if (event.target.classList.contains("edit_button")) {
            let idEdit = parseInt(event.target.getAttribute("id"));
            if (idEdit < 7){ // Validação para não editar os 6 primeiros produtos de teste
                alert ("Produto marcado como TESTE não pode ser editado!");
            } else {
                // saving idEdit on localestorage
                localStorage.setItem('idEdit', idEdit);
                window.location="adminInsert.html";
            } 
        }
    });
}
