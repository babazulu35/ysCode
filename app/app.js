(function() {


    var serchResult = searchService.searchResultData();


    var pageObjects = uiService.getPageObjects();
    document.querySelector(pageObjects.searchButton).addEventListener('click', function() {

        var searchInput = uiService.getInput();
        if (searchInput === '' || searchInput === undefined) {
            errorHandlerService.inputError();
            pubSub.emit('inputError', searchInput);
        } else {
            pubSub.emit('searchInputValue', searchInput)
        }

    })

    pubSub.subscribe("searchResult", function(data) {
        var html, newHtml;
        console.log(data);
        html = '<li id="%ProductId%"><div class="searchResult"><div class="avatar"> <img src="https://picsum.photos/g/100/?random" alt=""></div><div class="info"><span class="product-title">%ProductName%</span><div class="product-detail"> %Description% </div><div class="product-price"><span>Fiyatı: %ProductPrice%</span></div><div class="add-product"><i class="fas  fa-minus"></i> <div data-quantity="20"></div><i class="fas fa-plus"></i><button id="%ButtonId%" class="add_to_basket button">EKLE</button></div></div></div></li>';
        for (var a = 0; a < data.length; a++) {
            newHtml = html.replace('%ProductName%', data[a].DisplayName);
            newHtml = newHtml.replace('%ProductId%', data[a].ProductId);
            newHtml = newHtml.replace('%ButtonId%', data[a].ProductId);
            newHtml = newHtml.replace('%Description%', data[a].Description);
            newHtml = newHtml.replace('%ProductPrice%', data[a].ListPrice)
            document.getElementById('searchResult').innerHTML += newHtml;
        }



        document.querySelector(pageObjects.addToBasket).addEventListener('click', function() {
            console.log(this.getAttribute('id'));
            basketService.addToBasket(this.getAttribute('id'));

        })

    });





})();