const productID = localStorage.getItem("productID");
const puntuacion = document.getElementById("puntuacion");
const opinion = document.getElementById("opinion");
//array donde se cargarán los datos recibidos:
let productsInfoArray = [];
let commentsArray = [];



function showProductsInfo(){
    let htmlContentToAppend = "";

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
                         ${productinfo.images.map((ima) => {
                          return `<div class="col"><img src="${ima}" alt="product image" class="img-thumbnail"></div>`
                         }).join(" ")}  
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    
}

// inicio comments
function showcomments(){
    let htmlContentToAppend = "";
    let scoretemplate = [0,1,2,3,4];

    for(let i = 0; i < commentsArray.length; i++){ 
        let comment = commentsArray[i]; //array.comments
        let commentScore = comment.score
        htmlContentToAppend += `
        <div class="list-group-item">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                            <h5>`+ comment.user + ` - ` + comment.dateTime + `
                            ${scoretemplate.map((item, index) => {
                                if( index < commentScore){
                                    return `<span class="fa fa-star checked"></span>`
                                } else {
                                    return `<span class="fa fa-star"></span>`
                                }
                            }).join(" ")}</h5> 
                            <p> `+ comment.description +`</p> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `

        document.getElementById("comments").innerHTML = htmlContentToAppend; 
    }
}

// inicio form
function enviar(){
    const date = new Date(); // fecha
    const [month, day, year, hour, minutes, seconds] = [date.getMonth(), date.getDate(), date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds()];
    
    const fecha = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    
    let htmlContentToAppend = "";
    let scoretemplate = [0,1,2,3,4];

    htmlContentToAppend += `
        <div class="list-group-item">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                            <h5>`+ user + ` - ` + fecha + `
                            ${scoretemplate.map((item, index) => {
                                if( index < puntuacion.value ){
                                    return `<span class="fa fa-star checked"></span>`
                                } else {
                                    return `<span class="fa fa-star"></span>`
                                }
                            }).join(" ")}</h5> 
                            <p> `+ opinion.value +`</p> 
                        </div>
                    </div>
                </div>
            </div>
        </div>`

        document.getElementById("comments").innerHTML += htmlContentToAppend; 
}

//final form

// final comments

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsInfoArray = resultObj.data; 
            showProductsInfo();
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            commentsArray = resultObj.data; 
            console.log(commentsArray);
            showcomments();
        }
    });
});