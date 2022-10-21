const productCartID = JSON.parse(localStorage.getItem("productCartID"));
let cartArray = [];
let newProductsCart = [];
let standar = document.getElementById("tipoEnvio3");
let express = document.getElementById("tipoEnvio2");
let premium = document.getElementById("tipoEnvio1");
const htmlSubtotal = document.getElementById("subtotalFinal");
let envioTotal = document.getElementById("envioTotal");

function showCart(){
    let htmlContentToAppend = "";
    const articles = cartArray.articles[0]
    const costArticle = articles.unitCost;
    htmlContentToAppend = `
    <div class="row">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Costo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Subtotal</th>
                </tr>
            </thead>
            <tbody id="tbody">
                <tr>
                    <th scope="row"><img src="${articles.image}" style="max-width: 100px;"></th>
                    <td>${articles.name}</td>
                    <td>${articles.currency}  ${articles.unitCost}</td>
                    <td><input type="number" oninput="calcArticles(amount.value, ${articles.unitCost})" id="amount" value="1";></td>
                    <td>${articles.currency}<label id="price">${articles.unitCost}</label></td>
                </tr>
            </tbody>
        </table>
    </div>
    `

    document.getElementById("showCart").innerHTML = htmlContentToAppend; 
};

 let subtotalFinal = 0;



    // funcion para calcular el subtotal
   function calcArticles(amount, costArticle){
    const price = document.getElementById("price");
    const subtotal = amount * costArticle;
    price.innerHTML = subtotal;
    sumSubtotal ();
   };

   function calcNewArticles(amount, costArticle, i, moneda){
    const price = document.getElementById(`price${i}`);
    let costo = 0;
    if (moneda === "UYU") {costo = costArticle / 40} else {costo = costArticle};
    let subtotal = amount * costo;
    price.innerHTML = subtotal;
    sumSubtotal ();
   };

 



   // funcion para sumar todos los subtotales
   function sumSubtotal(){
    const priceHTML = parseFloat(document.getElementById("price").innerHTML);
    subtotalFinal = priceHTML;
    

    for(let i = 0; i < productCartID.length; i++){
    const priceiHTML = parseFloat(document.getElementById(`price${i}`).innerHTML);
    subtotalFinal += priceiHTML;  

    
    htmlSubtotal.innerHTML = subtotalFinal;
    
    //COSTO DE ENVIO POR DEFECTO
    if (standar.checked){
        envioTotal.innerHTML = parseFloat(htmlSubtotal.innerHTML) * parseFloat(standar.value);
    }
    console.log(parseFloat(htmlSubtotal.innerHTML));

    document.getElementById("total").innerHTML = parseFloat(htmlSubtotal.innerHTML) + parseFloat(envioTotal.innerHTML)

    }
   }
  
   //COSTO DE ENVIO
   standar.addEventListener('change', envio);
   express.addEventListener('change', envio);
   premium.addEventListener('change', envio);

   function envio(){
       if (standar.checked){
           envioTotal.innerHTML = parseFloat(htmlSubtotal.innerHTML) * parseFloat(standar.value);
           document.getElementById("total").innerHTML = parseFloat(htmlSubtotal.innerHTML) + parseFloat(envioTotal.innerHTML)
       }
       if (express.checked){
            envioTotal.innerHTML = parseFloat(htmlSubtotal.innerHTML) * parseFloat(express.value);
           document.getElementById("total").innerHTML = parseFloat(htmlSubtotal.innerHTML) + parseFloat(envioTotal.innerHTML)
       }
       if (premium.checked){
            envioTotal.innerHTML = parseFloat(htmlSubtotal.innerHTML) * parseFloat(premium.value);
           document.getElementById("total").innerHTML = parseFloat(htmlSubtotal.innerHTML) + parseFloat(envioTotal.innerHTML)
       }
   };

   document.getElementById("total").innerHTML



   function showNewProduct(i) {
    htmlContentToAppendNewProduct = "";

    htmlContentToAppendNewProduct = `
                <tr>
                    <th scope="row"><img src="${newProductsCart.images[0]}" style="max-width: 100px;"></th>
                    <td>${newProductsCart.name}</td>
                    <td id="dolar${i}">${newProductsCart.currency}  ${newProductsCart.cost}</td>
                    <td><input type="number" oninput="calcNewArticles(amount${i}.value,${newProductsCart.cost}, ${i}, '${newProductsCart.currency}')" id="amount${i}" value="1"></td>
                    <td>USD<label id="price${i}">${newProductsCart.cost}</label></td>
                </tr>
    `
    document.getElementById("tbody").innerHTML += htmlContentToAppendNewProduct;
   };

   //funcion cambio a dolar
   function dolar(i){
    if (newProductsCart.currency == "UYU") 
    {document.getElementById(`dolar${i}`).innerHTML = "USD" + " " + (newProductsCart.cost / 40);
    document.getElementById(`price${i}`).innerHTML = (newProductsCart.cost / 40)
    }
    
};
   
    // INICIO DISABLE MODAL

    let tarjeta = document.getElementById("tarjeta");
    let numberAccount = document.getElementById("numberAccount");
    let transeferncia = document.getElementById("transeferncia");
    let numeroDeCalle = document.getElementById("numeroDeCalle");
    let vencimiento = document.getElementById("vencimiento");
    let calle = document.getElementById("calle");

    tarjeta.addEventListener('click', () => {
        console.log("hola");
        numberAccount.setAttribute("disabled","");
        numeroDeCalle.removeAttribute("disabled");
        vencimiento.removeAttribute("disabled");
        calle.removeAttribute("disabled");
    })

    transeferncia.addEventListener('click', () => {
        numeroDeCalle.setAttribute("disabled","");
        vencimiento.setAttribute("disabled","");
        calle.setAttribute("disabled","");
        numberAccount.removeAttribute("disabled");
    })

    // FIN DISABLE MODAL



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL + "25801" + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cartArray = resultObj.data; 
            showCart();
        }
    });

    for(let i = 0; i < productCartID.length; i++){ 
    getJSONData(PRODUCT_INFO_URL + productCartID[i] + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            newProductsCart = resultObj.data; 
            showNewProduct(i);
            dolar(i);
            sumSubtotal();
            
        }
    });
    }
});