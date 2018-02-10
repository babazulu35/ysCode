(function() {

    /**
     * @description call pageObjects set
     */
    var pageObjects = uiService.getPageObjects();
    var queryObjects = uiService.getQueryObjects();

    /**
     * @event bind searchResult
     */

    pubSub.subscribe("searchResult", searchResult);


    document.querySelector(pageObjects.searchButton).addEventListener('click', function() {
        var searchInput = uiService.getSearchInput();
        if (searchInput.searchTypeValue == '' || searchInput.searchTypeValue == undefined) {
            alert('Lütfen Aramak istediğinizi ürünün adını giriniz!');
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

        if (data == '') {
            var resultField = document.getElementById('searchResult');
            resultField.insertAdjacentHTML('beforeend', templateService.emptyResult());
        }

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

        var addToBasket = queryObjects.addToBasket;
        basketService.buttonCatchListener('add', uiService.getLoopedElementsId(addToBasket), 'q')

    }

})();