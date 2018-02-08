(function() {



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

    pubSub.subscribe("jsonData", function(data) {
        var html, newHtml;
        var resultPath = data.d.ResultSet || '';
        html = '<li id="%ProductId%"><div class="searchResult"><div class="avatar"> <img src="https://picsum.photos/g/100/?random" alt=""></div><div class="info"><span class="product-title">%ProductName%</span><div class="product-detail"> %Description% </div><div class="product-price"><span>Fiyatı: %ProductPrice%</span></div><div class="add-product"><i class="fas  fa-minus"></i> <div data-quantity="20"></div><i class="fas fa-plus"></i><button id="%ButtonId%" class="add_to_basket button">EKLE</button></div></div></div></li>';
        for (var i = 0; i < resultPath.length; i++) {
            for (var a = 0; a < resultPath[i].Products.length; a++) {
                newHtml = html.replace('%ProductName%', resultPath[i].Products[a].DisplayName);
                newHtml = newHtml.replace('%ProductId%', resultPath[i].Products[a].ProductId);
                newHtml = newHtml.replace('%ButtonId%', resultPath[i].Products[a].ProductId);
                newHtml = newHtml.replace('%Description%', resultPath[i].Products[a].Description);
                newHtml = newHtml.replace('%ProductPrice%', resultPath[i].Products[a].ListPrice)
                document.getElementById('searchResult').innerHTML += newHtml;
            }

        }

        document.querySelector(pageObjects.addToBasket).addEventListener('click', function() {
            console.log(this.getAttribute('id'));
            basketService.addToBasket(this.getAttribute('id'));

        })

    });




})();