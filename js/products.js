const cat = localStorage.getItem("catID");
const ORDER_ASC_BY_COST = "AscCost";
const ORDER_DESC_BY_COST = "DescCost";
const ORDER_BY_PROD_REL = "Precio.";
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
const search = document.querySelector(".Search-input");


//array donde se cargarán los datos recibidos:
let productsArray = [];
let productsArrayInit = [];


function setProductId(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsList(){
    let htmlContentToAppend = "";
    
    for(let i = 0; i < productsArray.length; i++){   //array.products
        let product = productsArray[i]; //array.products

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

        htmlContentToAppend += `
        <div onclick="setProductId(${product.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name + ` - USD ` + product.cost +`</h4> 
                        <p> `+ product.description +`</p> 
                        </div>
                        <small class="text-muted">` + product.soldCount + ` Vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `

            }
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }
}



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData("https://japceibal.github.io/emercado-api/cats_products/"+ cat +".json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data.products;
            productsArrayInit = resultObj.data.products;
            showProductsList();
        }
    });

    // inicio filtro
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_REL);
    });

    // limpiar inicio
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    // limpiar final

    // inicio filtrar por min y max
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    }); 
    // final filtrar por min y max
    
});

function sortAndShowProducts(sortCriteria, productsArrays){
    currentSortCriteria = sortCriteria;

    if(productsArrays != undefined){
        productsArray = productsArrays;
    }

    productsArray = sortProducts(currentSortCriteria, productsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_REL){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

 // final filtro
//INICIO BUSCADOR
search.addEventListener('input', filterSearch);

function filterSearch(e){
    
    /* filtrar por nombre y por descripcion */
    const resultSearch = productsArray.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.description.toLowerCase().includes(e.target.value.toLowerCase()));
    
    if(e.target.value.length >= 0){
        productsArray = resultSearch;
        showProductsList();
        productsArray = productsArrayInit;
    
    }

}

//FINAL BUSCADOR