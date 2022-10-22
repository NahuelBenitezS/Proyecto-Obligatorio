let productCartID = JSON.parse(localStorage.getItem("productCartID"));
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
                <tr id="${articles.id}">
                    <th scope="row"><img src="${articles.image}" style="max-width: 100px;"></th>
                    <td>${articles.name}</td>
                    <td>${articles.currency}  ${articles.unitCost}</td>
                    <td><input type="number" oninput="calcArticles(amount.value, ${articles.unitCost})" id="amount" value="1"; class="form-control" style="width: 50px;" min="1"></td>
                    <td>${articles.currency}<label id="price">${articles.unitCost}</label></td>
                    <td><button type="button"  onclick="deleteArticle(${articles.id}, ${articles.unitCost})" class="btn btn-danger">Eliminar</button></td>
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

    //SUMA DEL ENVIO
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



   // funcion para agregar nuevos productos
   function showNewProduct(i) {
    htmlContentToAppendNewProduct = "";

    htmlContentToAppendNewProduct = `
                <tr id="${newProductsCart.id}">
                    <th scope="row"><img src="${newProductsCart.images[0]}" style="max-width: 100px;"></th>
                    <td>${newProductsCart.name}</td>
                    <td id="dolar${i}">${newProductsCart.currency}  ${newProductsCart.cost}</td>
                    <td><input type="number" oninput="calcNewArticles(amount${i}.value,${newProductsCart.cost}, ${i}, '${newProductsCart.currency}')" id="amount${i}" value="1" class="form-control" style="width: 50px;" min="1"></td>
                    <td>USD<label id="price${i}">${newProductsCart.cost}</label></td>
                    <td><button type="button"  onclick="deleteNewArticle(${newProductsCart.id}, ${i})" class="btn btn-danger">Eliminar</button></td>
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
    let numberCard = document.getElementById("numberCard");
    let vencimiento = document.getElementById("vencimiento");
    let codeSeg = document.getElementById("codeSeg");
    let btnSelect = document.getElementById("btnSelect");
    let textMetodo = document.getElementById("textMetodo");
    let textInvalid = document.getElementById("textInvalid");

    tarjeta.addEventListener('click', () => {
        console.log("hola");
        numberAccount.setAttribute("disabled","");
        numberCard.removeAttribute("disabled");
        vencimiento.removeAttribute("disabled");
        codeSeg.removeAttribute("disabled");
    })

    transeferncia.addEventListener('click', () => {
        numberCard.setAttribute("disabled","");
        vencimiento.setAttribute("disabled","");
        codeSeg.setAttribute("disabled","");
        numberAccount.removeAttribute("disabled");
    })

    function confirmFormaPago() {
        if ( tarjeta.checked === false && transeferncia.checked === false){
            btnSelect.classList.remove("is-valid");
            btnSelect.classList.add("is-invalid");
        } else {
            btnSelect.classList.remove("is-invalid");
            btnSelect.classList.add("is-valid");
        }

        // transeferncia esta checkeada
        if ( transeferncia.checked === true){
            btnSelect.classList.remove("is-invalid");
            btnSelect.classList.add("is-valid");
            textMetodo.innerHTML = "Transferencia bancaria";

            if (numberAccount.value.length <= 0){
                textInvalid.innerHTML = "Ingrese Numero de cuenta";
            }else {
                textInvalid.innerHTML = "";
            }
        }

        // tarjeta esta checkeada 
        if ( tarjeta.checked === true){
            btnSelect.classList.remove("is-invalid");
            btnSelect.classList.add("is-valid");
            textMetodo.innerHTML = "Tarjeta de crédito";

            if (numberCard.value.length <= 0 || vencimiento.value.length <= 0|| codeSeg.value.length <= 0){
                textInvalid.innerHTML = "Ingrese todo los datos";
            }else {
                textInvalid.innerHTML = "";
            }
            
        }

        
      }
    

    // FIN DISABLE MODAL

      // FUNCION BORRAR ARTICULO
      function deleteArticle(idArticle, costo){
        document.getElementById(idArticle).remove();
        subtotalFinal -= costo;
        htmlSubtotal.innerHTML = subtotalFinal;
      }

      function deleteNewArticle(idArticle, costo){
        const priceiHTML = parseFloat(document.getElementById(`price${costo}`).innerHTML);
        subtotalFinal -= priceiHTML;
        htmlSubtotal.innerHTML = subtotalFinal;
        productCartID = productCartID.filter((item) => item !== idArticle);
        localStorage.setItem('productCartID', JSON.stringify(productCartID));
        document.getElementById(idArticle).remove();
        
      }
      

    function showAlertSuccess() {
        document.getElementById("alert-success").classList.add("show");
      }

    (function () {
        'use strict'
      
        var forms = document.querySelectorAll('.needs-validation')
      
        Array.prototype.slice.call(forms)
          .forEach(function (form) {
            form.addEventListener('submit', function (event) {
              if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
                confirmFormaPago()
                tarjeta.setAttribute('onclick', 'confirmFormaPago()')
                transeferncia.setAttribute('onclick', 'confirmFormaPago()')
              } else {showAlertSuccess()}
    
              
              form.classList.add('was-validated')
            }, false)
          })
      })()

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