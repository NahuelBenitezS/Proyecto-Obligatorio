const productID = localStorage.getItem("productID");

//array donde se cargarán los datos recibidos:
let productsInfoArray = [];


function showProductsInfo(){
    let htmlContentToAppend = "";
    console.log(productsInfoArray);

        let productinfo = productsInfoArray; 
        
        htmlContentToAppend += `
        <div class="">
            <div class="row">
                <div class="">
                    <div class=" w-100 justify-content-between">
                        <div class="mb-1">
                        <br>
                        <h1>`+ productinfo.name + `</h1> 
                        <br>
                        <hr>
                        <h5>Precio</h5>
                        <p> `+ productinfo.currency + ` &nbsp;` + productinfo.cost +`</p> 
                        <h5>Descipción</h5>
                        <p> `+ productinfo.description +`</p> 
                        <h5>Categoría</h5>
                        <p> `+ productinfo.category +`</p> 
                        <h5>Cantidad de Vendidos</h5>
                        <p> `+ productinfo.soldCount +`</p> 
                        <h5>Imágenes ilustrativas</h5>
                        <div class="row">
                        <div class="col"><img src="` + productinfo.images[0] + `" alt="product image" class="img-thumbnail"></div>
                        <div class="col"><img src="` + productinfo.images[1] + `" alt="product image" class="img-thumbnail"></div>
                        <div class="col"><img src="` + productinfo.images[2] + `" alt="product image" class="img-thumbnail"></div>
                        <div class="col"><img src="` + productinfo.images[3] + `" alt="product image" class="img-thumbnail"></div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    
}



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsInfoArray = resultObj.data; 
            showProductsInfo();
        }
    });
});