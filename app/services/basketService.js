var basketService = (function() {
    var addedItem = [];
    var resultItem = [];

    var basketMenuList = templateService.basketMenu();


    /* Bind event */
    pubSub.subscribe('searchResult', searchResultProduct);
    pubSub.subscribe('basketMenu', basketMenu)

    function searchResultProduct(product) {
        resultItem.push(product);
    }

    var addToBasket = function(id) {
        console.log("Addto Basket", resultItem);

    }

    searchProductFromresultItem = function(resultItem) {


    }

    openBasket = function() {

    }

    function basketMenu(flag) {
        switch (flag) {
            case "open":
                document.getElementById('l-container').insertAdjacentHTML('beforeend', basketMenuList);
                pubSub.unsubscribe('basketMenu', flag);
                var html, newHtml;
                html = templateService.productList();

                for (var a = 0; a < resultItem.length; a++) {
                    newHtml = html.replace('%ProductName%', resultItem[a].DisplayName);
                    newHtml = newHtml.replace('%ProductId%', resultItem[a].ProductId);
                    newHtml = newHtml.replace('%ButtonId%', resultItem[a].ProductId);
                    newHtml = newHtml.replace('%Description%', resultItem[a].Description);
                    newHtml = newHtml.replace('%ProductPrice%', resultItem[a].ListPrice)
                    document.getElementById('basketItem').innerHTML += newHtml;
                }
                break;
            case "close":
                var el = document.querySelector('.c-basket__container');
                el.parentNode.removeChild(el);
                break;
        }
    }


    return {
        addToBasket: function(id) {
            addToBasket(id);
        }
    }





})();