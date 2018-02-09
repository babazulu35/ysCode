var basketService = (function() {
    var addedItem = [];
    var resultItem = [];
    var basketData = [];
    var products = [];
    var basketQuantity;
    var pageObjects = uiService.getPageObjects();

    /* Bind event */
    pubSub.subscribe('searchResult', searchResultProduct);
    pubSub.subscribe('basketMenu', basketMenu);
    pubSub.subscribe('basketProducts', basketProducts);


    function searchResultProduct(product) {

        resultItem.push(product);
    }

    function basketEmitData(emitedBasketProduct) {
        addedItem = emitedBasketProduct;
    }

    var addToBasket = function(data) {

        for (var a = 0; a < resultItem.length; a++) {
            for (var i = 0; i < resultItem[a].length; i++) {

                if (resultItem[a][i].ProductId == data.id && data.quantity > 0) {
                    resultItem[a][i].Quantity = data.quantity;

                    var found = products.find(function(result) { return result.ProductId == resultItem[a][i].ProductId });

                    if (found) {
                        if (found.Quantity !== basketQuantity) {

                            /* Ürün aded güncellemesi Gelecek */

                        } else {
                            continue;
                        }
                    } else {
                        pubSub.emit('basketProducts', resultItem[a][i]);
                    }

                }

            }
        }
    }

    function basketProducts(addedProducts) {
        products.push(addedProducts);

        var html, newHtml;
        html = templateService.productList();

        var countViewSelector = document.getElementById('c-basket');


        newHtml = html.replace('%ProductName%', addedProducts.DisplayName);
        newHtml = newHtml.replace('%ProductId%', addedProducts.ProductId);
        newHtml = newHtml.replace('%ButtonId%', addedProducts.ProductId);
        newHtml = newHtml.replace('%InputId%', addedProducts.ProductId);
        newHtml = newHtml.replace('%Description%', addedProducts.Description);
        newHtml = newHtml.replace('%ProductPrice%', (parseInt(addedProducts.ListPrice) * parseInt(addedProducts.Quantity)).toFixed(2));
        newHtml = newHtml.replace('%Value%', addedProducts.Quantity);
        newHtml = newHtml.replace('%ButonText%', "GÜNCELLE");

        basketQuantity = addedProducts.Quantity;
        document.getElementById('basketItem').innerHTML += newHtml;
        countViewSelector.dataset.count = products.length;


        console.group("Basket Menu");
        console.log("===== Added Products ====", addedProducts)

    }

    function basketMenu(flag) {
        switch (flag) {
            case "open":
                document.getElementById("basket").style.display = "block";
                pubSub.unsubscribe('basketMenu', flag);
                break;
            case "close":
                document.getElementById("basket").style.display = "none";
                break;
        }
    }

    return {
        addToBasket: function(data) {
            addToBasket(data);
        }
    }





})();