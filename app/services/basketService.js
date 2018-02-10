var basketService = (function() {
    var addedItem = [];
    var resultItem = [];
    var basketData = [];
    var products = [];
    var basketQuantity;
    var pageObjects = uiService.getPageObjects();
    var quertObjects = uiService.getQueryObjects();

    /* Bind event */
    pubSub.subscribe('searchResult', searchResultProduct);
    pubSub.subscribe('basketMenu', basketMenu);
    pubSub.subscribe('basketProducts', basketProducts);


    function searchResultProduct(product) {

        resultItem.push(product);
    }
    /**
     * @param  {} emitedBasketProduct
     */
    function basketEmitData(emitedBasketProduct) {
        addedItem = emitedBasketProduct;
    }

    var addToBasket = function(data) {
        console.log("Ad basket data", data);
        for (var a = 0; a < resultItem.length; a++) {
            for (var i = 0; i < resultItem[a].length; i++) {

                if (resultItem[a][i].ProductId == data.id && data.quantity > 0) {
                    resultItem[a][i].Quantity = data.quantity;

                    var found = products.find(function(result) { return result.ProductId == resultItem[a][i].ProductId });

                    if (found) {
                        if (found.Quantity !== basketQuantity) {

                            /* Ürün aded güncellemesi Gelecek */
                            pubSub.emit('basketProductUpdate', found);

                        } else {
                            continue;
                        }
                        continue;
                    } else {
                        pubSub.emit('basketProducts', resultItem[a][i]);
                    }

                }

            }
        }
    }

    function basketProducts(addedProducts) {
        products.push(addedProducts);
        /*         pubSub.subscribe('basketProductUpdate', function(data) {
                    console.log("There is a Update", data);
                    var indexI = products.find(function(result) { result.ProductId === data.ProductId });
                    products.push(data);
                }) */

        console.log(products);
        var html, newHtml;
        html = templateService.productList2();

        var countViewSelector = document.getElementById('c-basket');

        document.getElementById('basketItem').innerHTML = '';

        for (var i = 0; i < products.length; i++) {
            newHtml = html.replace('%ProductName%', products[i].DisplayName);
            newHtml = newHtml.replace('%ProductId%', products[i].ProductId);
            newHtml = newHtml.replace('%ButtonId%', products[i].ProductId);
            newHtml = newHtml.replace('%InputId%', products[i].ProductId);
            newHtml = newHtml.replace('%ListId%', products[i].ProductId);
            newHtml = newHtml.replace('%DeleteId%', products[i].ProductId);
            newHtml = newHtml.replace('%Description%', products[i].Description);
            newHtml = newHtml.replace('%ProductPrice%', (parseInt(products[i].ListPrice) * parseInt(products[i].Quantity)).toFixed(2));
            newHtml = newHtml.replace('%Value%', products[i].Quantity);
            newHtml = newHtml.replace('%ButonText%', "GÜNCELLE");

            basketQuantity = products[i].Quantity;
            document.getElementById('basketItem').innerHTML += newHtml;



            countViewSelector.dataset.count = products.length;

        }

        var queryUpdateButton = quertObjects.updateBasketItem;
        var queryDeleteButton = quertObjects.deletBasketItem;
        buttonCatcher('update', uiService.getLoopedElementsId(queryUpdateButton), 'qb');
        buttonCatcher('delete', uiService.getLoopedElementsId(queryDeleteButton), 'l');

        // Remove Element From Dow if is Count 0 and Clicked Update
        //document.getElementById("l095ee32e-3ae5-4935-a1e5-2e20356c679d").innerHTML = '';

    }

    function buttonCatcher(action, data, idPrefix) {
        switch (action) {
            case 'add':
                for (var i = 0; i < data.length; i++) {
                    document.getElementById(data[i]).addEventListener('click', function() {

                        addToBasket({
                            id: this.getAttribute('id'),
                            quantity: uiService.inputValue(idPrefix + this.getAttribute('id'))
                        })
                    });
                };
                break;
            case 'update':

                console.log("on update");

                break;
            case 'delete':
                for (var i = 0; i < data.length; i++) {
                    console.log("delete")
                    document.getElementById(data[i]).addEventListener('click', function() {

                        uiService.removeElementFromDom('l' + this.getAttribute('id'));

                    });
                };
                break;

            default:
                'defualt';
        }

    }

    function basketMenu(flag) {
        switch (flag) {
            case "open":
                document.getElementById("basket").style.display = "block";
                pubSub.unsubscribe('basketMenu', flag);
                break;
            case "close":
                document.getElementById("basket").style.display = "none";
                pubSub.unsubscribe('basketMenu', flag);
                break;
        }
    }

    return {
        addToBasket: function(data) {
            addToBasket(data);
        },
        buttonCatcher: function(action, data, idPrefix) {
            buttonCatcher(action, data, idPrefix)
        }
    }





})();