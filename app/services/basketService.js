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
                        if (found.Quantity !== currentQuantity) {
                            /**
                             * @param  {} found.ProductId updateId
                             * @param  {} found.Quantity new Quantity value
                             */
                            updateBasketItem(found.ProductId, found.Quantity);

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
    var updateBasketItem = function(updateThisData, updateData) {

        var updatedBasketItem = products;
        updatedBasketItem.Updated = true;

        for (var i = 0; i < updatedBasketItem.length; i++) {
            if (updatedBasketItem[i].ProductId == updateThisData) {
                updatedBasketItem[i].Quantity = updateData;
            }
        }

        pubSub.emit('basketProducts', updatedBasketItem);


    }

    var deleteBasketItem = function(data, itemId) {
        var basketList = data;
        basketList.Updated = true;

        for (var i = 0; i < basketList.length; i++) {
            if (basketList[i].ProductId == itemId) {
                basketList.splice(i, 1);

            }
        }
        //products = [];
        pubSub.emit('basketProducts', basketList);

    }

    function basketProducts(addedProducts) {
        var html, newHtml;
        var countViewSelector = document.getElementById('c-basket');

        if (addedProducts.Updated === true) {
            delete addedProducts.Updated;
            products = addedProducts;
        } else {
            products.push(addedProducts);
        }

        html = templateService.productList2();

        document.getElementById('basketItem').innerHTML = '';
        countViewSelector.dataset.count = products.length;

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

            currentQuantity = products[i].Quantity;
            document.getElementById('basketItem').innerHTML += newHtml;

        }

        var queryUpdateButton = quertObjects.updateBasketItem;
        var queryDeleteButton = quertObjects.deletBasketItem;
        buttonCatchListener('update', uiService.getLoopedElementsId(queryUpdateButton), 'b');
        buttonCatchListener('delete', uiService.getLoopedElementsId(queryDeleteButton), 'del');

    }

    function buttonCatchListener(action, data, idPrefix) {
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
                for (var i = 0; i < data.length; i++) {

                    document.getElementById(data[i]).addEventListener('click', function() {

                        var selectedId = removePrefixer(idPrefix, this.getAttribute('id'));

                        updateBasketItem(selectedId, uiService.inputValue('inp' + selectedId));
                    });
                }
                break;
            case 'delete':
                for (var i = 0; i < data.length; i++) {
                    document.getElementById(data[i]).addEventListener('click', function() {
                        var selectedId = removePrefixer(idPrefix, this.getAttribute('id'));
                        deleteBasketItem(products, selectedId);

                    });
                };
                break;
            default:
                'default';
        }
    }

    function removePrefixer(prefixer, data) {
        return data.slice(prefixer.length);
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
        buttonCatchListener: function(action, data, idPrefix) {
            buttonCatchListener(action, data, idPrefix)
        },
        checkIfisExist: function(productId) {
            checkIfisExist(productId)
        }
    }





})();