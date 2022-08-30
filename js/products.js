const cat = localStorage.getItem("catID");
console.log(cat);
const ORDER_ASC_BY_COST = "AscCost";
const ORDER_DESC_BY_COST = "DescCost";
const ORDER_BY_PROD_REL = "Count.";
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;


//array donde se cargarán los datos recibidos:
let productsArray = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsList(){
    let htmlContentToAppend = "";
    
    for(let i = 0; i < productsArray.length; i++){   //array.products
        let product = productsArray[i]; //array.products

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
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

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

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
    });  // final filtro
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
