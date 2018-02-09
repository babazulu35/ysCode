(function() {

    /**
     * @description call pageObjects set
     */
    var pageObjects = uiService.getPageObjects();

    /**
     * @event bind searchResult
     */

    pubSub.subscribe("searchResult", searchResult);


    document.querySelector(pageObjects.searchButton).addEventListener('click', function() {
        var searchInput = uiService.getSearchInput();

        if (searchInput == '' || searchInput == undefined) {

            errorHandlerService.inputError();
            pubSub.subscribe('inputError', function(errorTemplate) {

            })
        } else {
            pubSub.emit('searchInputValue', searchInput)
        }
    });



    document.querySelector(pageObjects.openBasket).addEventListener('click', function() {
        pubSub.emit('basketMenu', 'open');
    });
    document.querySelector(pageObjects.closeBasket).addEventListener('click', function() {
        pubSub.emit('basketMenu', 'close');
    })

    function searchResult(data) {
        var html, newHtml;

        html = templateService.productList();

        for (var a = 0; a < data.length; a++) {
            newHtml = html.replace('%ProductName%', data[a].DisplayName);
            newHtml = newHtml.replace('%ProductId%', data[a].ProductId);
            newHtml = newHtml.replace('%ListId%', data[a].ProductId);
            newHtml = newHtml.replace('%ButtonId%', data[a].ProductId);
            newHtml = newHtml.replace('%InputId%', data[a].ProductId);
            newHtml = newHtml.replace('%Description%', data[a].Description);
            newHtml = newHtml.replace('%ProductPrice%', data[a].ListPrice);
            newHtml = newHtml.replace('%Value%', 0);
            newHtml = newHtml.replace('%ButonText%', "EKLE");
            document.getElementById('searchResult').innerHTML += newHtml;
        }

        var queryAllSelector = '#searchResult li .searchResult .add_to_basket';
        buttonCatcher(uiService.getLoopedElementsId(queryAllSelector));

    }

    function buttonCatcher(data) {

        for (var i = 0; i < data.length; i++) {
            document.getElementById(data[i]).addEventListener('click', function() {
                basketService.addToBasket({
                    id: this.getAttribute('id'),
                    quantity: uiService.inputValue('q' + this.getAttribute('id'))
                })
            });
        };
    }

})();