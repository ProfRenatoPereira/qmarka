import { conectApi } from "./conectaApi.js";

const image = document.querySelector("[data-image]");
const imageMobile = document.querySelector("[data-image-mobile]");
const promotionalCheckbox = document.querySelector("[data-promotional-checkbox]");
const promotionalPrice = document.querySelector("[data-promotional-area]");
const addButton = document.querySelector("[data-add-product]");
const editbutton = document.querySelector("[data-edit-product]");

// product infos:
const name = document.querySelector("[data-name]");
const imageurl = document.querySelector("[data-image-url]");
const category = document.querySelector("[data-category]");
const description = document.querySelector("[data-description]");
const seller = document.querySelector("[data-seller]");
const price = document.querySelector("[data-price]");
const pricePromo = document.querySelector("[data-promotional-price]");
const color = [
    document.querySelector("[data-color-01]"),
    document.querySelector("[data-color-02]"),
    document.querySelector("[data-color-03]")
];
const size = [
    document.querySelector("[data-size-01]"),
    document.querySelector("[data-size-02]"),
    document.querySelector("[data-size-03]"),
    document.querySelector("[data-size-04]"),
    document.querySelector("[data-size-05]")
];

imageurl.addEventListener("focusout", showimage());

function showimage(){
    image.style.backgroundImage = "url("+imageurl.value+")";
    imageMobile.style.backgroundImage = "url("+imageurl.value+")";
}

promotionalCheckbox.addEventListener("click", showPromoPrice());

function showPromoPrice(){
    if (promotionalCheckbox.checked){
        promotionalPrice.style.display = "block"
    } else {
        promotionalPrice.style.display = "none"
    }
}

addButton.addEventListener("click", function(){
    if (name.value == "" || price.value == ""){
        alert ("Por favor preencha os campos corretamente!");
    } else { 
        conectApi.insertProduct(
            (imageurl.value === "") ? "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg" : imageurl.value,
            name.value,
            (description.value === "") ? "Produto teste" : description.value,
            price.value,
            (pricePromo.value === "") ? price.value : pricePromo.value,
            (seller.value === "") ? "Riachuelo" : seller.value,
            category.value,
            "true",
            (color[0].value === "") ? "Black" : color[0].value,
            (color[1].value === "") ? "White" : color[1].value,
            (color[2].value === "") ? "Blue" : color[2].value,
            (size[0].value === "") ? "P" : size[0].value,
            (size[1].value === "") ? "PP" : size[1].value,
            (size[2].value === "") ? "M" : size[2].value,
            (size[3].value === "") ? "G" : size[3].value,
            (size[4].value === "") ? "GG" : size[4].value,
        )
        alert ("cadastrado com sucesso!");
    }
});

// ##################################################################################################################################
// Buttons
// ##################################################################################################################################

const homeButton = document.querySelector(".adminPanel_button_home");

homeButton.addEventListener("click", function(){
    window.location="index.html";
});

// ##################################################################################################################################
// Edit feature (2/2) ... part 1 on adminPanel.js
// ##################################################################################################################################

let idEdit;

// retrieving idEdit from localstorage
if (!localStorage["idEdit"]){
    localStorage['idEdit']="";
    editbutton.classList.add("display_none");
    addButton.classList.remove("display_none");
}else{
    idEdit = localStorage.getItem("idEdit");
    addButton.classList.add("display_none");
    editbutton.classList.remove("display_none");
    fillForms(idEdit);
};

async function fillForms(id){
    try {
        const product = await conectApi.searchProductById(id);
        imageurl.value = product.conexaoConvertida.product_image_mobile;
        name.value = product.conexaoConvertida.product_label;
        description.value = product.conexaoConvertida.product_description;
        price.value = product.conexaoConvertida.product_price;
        pricePromo.value = product.conexaoConvertida.product_promotional_price;
        if (price.value > pricePromo.value){
            promotionalCheckbox.checked=true;
            showPromoPrice();
        }
        seller.value = product.conexaoConvertida.seller_info;
        category.value = product.conexaoConvertida.category;
        color[0].value = product.conexaoConvertida.color[0].name;
        color[1].value = product.conexaoConvertida.color[1].name;
        color[2].value = product.conexaoConvertida.color[2].name;
        size[0].value = product.conexaoConvertida.size[0].name;
        size[1].value = product.conexaoConvertida.size[1].name;
        size[2].value = product.conexaoConvertida.size[2].name;
        size[3].value = product.conexaoConvertida.size[3].name;
        size[4].value = product.conexaoConvertida.size[4].name;
        showimage();
    } catch (error){
        alert ("Ocorreu um erro!");
    }
}

editbutton.addEventListener("click", function(){
    conectApi.editProduct(
        idEdit,
        (imageurl.value === "") ? "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg" : imageurl.value,
        name.value,
        (description.value === "") ? "Produto teste" : description.value,
        price.value,
        (pricePromo.value === "") ? price.value : pricePromo.value,
        (seller.value === "") ? "Riachuelo" : seller.value,
        category.value,
        "true",
        (color[0].value === "") ? "Black" : color[0].value,
        (color[1].value === "") ? "White" : color[1].value,
        (color[2].value === "") ? "Blue" : color[2].value,
        (size[0].value === "") ? "P" : size[0].value,
        (size[1].value === "") ? "PP" : size[1].value,
        (size[2].value === "") ? "M" : size[2].value,
        (size[3].value === "") ? "G" : size[3].value,
        (size[4].value === "") ? "GG" : size[4].value
    )
    alert ("Editado com sucesso!");
});
