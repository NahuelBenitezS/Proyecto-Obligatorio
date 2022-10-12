const productCartID = JSON.parse(localStorage.getItem("productCartID"));
let cartArray = [];
let newProductsCart = [];

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
                    <td><input type="number" oninput="calcArticles(amount.value, ${articles.unitCost})" id="amount"></td>
                    <td>${articles.currency}  <label id="price"></label></td>
                </tr>
            </tbody>
        </table>
    </div>
    `

    document.getElementById("showCart").innerHTML = htmlContentToAppend; 
};

    // funcion para calcular el subtotal
   function calcArticles(amount, costArticle){
    const price = document.getElementById("price");
    const subtotal = amount * costArticle;
    price.innerHTML = subtotal;
   };

   function calcNewArticles(amount, costArticle, i){
    const price = document.getElementById(`price${i}`);
    const subtotal = amount * costArticle;
    price.innerHTML = subtotal;
   };

   function showNewProduct(i) {
    htmlContentToAppendNewProduct = "";

    htmlContentToAppendNewProduct = `
                <tr>
                    <th scope="row"><img src="${newProductsCart.images[0]}" style="max-width: 100px;"></th>
                    <td>${newProductsCart.name}</td>
                    <td>${newProductsCart.currency}  ${newProductsCart.cost}</td>
                    <td><input type="number" oninput="calcNewArticles(amount${i}.value,${newProductsCart.cost}, ${i})" id="amount${i}"></td>
                    <td>${newProductsCart.currency}<label id="price${i}"></label></td>
                </tr>
    `
    console.log(i);
    document.getElementById("tbody").innerHTML += htmlContentToAppendNewProduct;
   };


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
        }
    });
    }
});