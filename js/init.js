const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const navbarNav = document.getElementById("navbarNav");
const mail = localStorage.getItem("user")
let indice = mail.indexOf("@"); // Busca el índice del @
const user = mail.substring(0, indice); // Cortar desde 0 hasta la aparición del primer @


let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


let liLogin = document.getElementById("login");

// boton de usuario
if (localStorage.getItem("user").length > 0){

  if(liLogin){
    liLogin.remove();
  }
  navbarNav.innerHTML += `<li class="nav-item" id="menu">
  <div class="dropdown">
  <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
  ${user}
  </a> 
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
    <li><a class="dropdown-item" href="index.html" id="logOut">Cerrar sesión</a></li>
  </ul>
</div></li>`;
  }

  // eliminar usuario y agregar link iniciar sesion
  logOut.addEventListener('click', function(){
    localStorage.removeItem("user");
    let menu = document.getElementById("menu");
    console.log("hola");
    menu.remove()
    navbarNav.innerHTML += `
    <li class="nav-item" id="login">
            <a class="nav-link" href="login.html">Iniciar sesion</a>
          </li>`;

  })