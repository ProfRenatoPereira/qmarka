// ###################################
// JS FOR HAMBURGUER MENU
// ###################################

const menu_button = document.querySelector('.hamb');
const menu_image_bars = document.querySelector('.fa-bars');
const close_menu_button = document.querySelector('.fa-x');
const menu_links = document.querySelector('.hamb_menu')

menu_button.addEventListener('click', hambOpen());

close_menu_button.addEventListener('click', hambOpen());

function hambOpen(){
    hambMenuShow(menu_links);
    hambMenuShow(menu_button);
}

function hambMenuShow(context){
    context.classList.toggle('active');
}

// ###################################
// JS FOR NEWSLETTER MODAL
// ###################################

const newsletterButton = document.querySelector('.newsletter_button');
let newsModal = document.getElementById("modal_newsletter");
const newsCloseButton = document.getElementsByClassName("news_close")[0];
const newsletterInput = document.querySelector(".newsletter_input");
const newsletterError = document.querySelector(".newsletter_error_alert");

newsletterButton.addEventListener("click", function(event) {
  event.preventDefault();
  if (validateEmail(newsletterInput.value)){
    if (newsletterInput.classList.contains("newsletter_input_error")) { newsletterInput.classList.remove("newsletter_input_error"); }
    newsletterError.style.display = "none";
    newsModal.style.display = "block";
    newsletterInput.value = "";
  } else {
    newsletterInput.classList.add("newsletter_input_error");
    newsletterError.style.display = "block";
    alert("Email inválido!");
  }
});

function validateEmail(email){
  var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
  if (reg.test(email)) {
    return true; }
  else {
    return false;
  }
}

newsCloseButton.addEventListener("click", function() {
  newsModal.style.display = "none";
});

window.addEventListener("click", function(event) {
if (event.target == news_modal) {
  newsModal.style.display = "none";
}
});
