(function() {


    var pageObjects = uiService.getPageObjects();

    /* Binders */
    pubSub.subscribe("searchResult", searchResult);

    document.querySelector(pageObjects.searchButton).addEventListener('click', function() {

        var searchInput = uiService.getInput();

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

    var closeIcon = document.querySelector(pageObjects.closeBasket);
    if (closeIcon) {
        closeIcon.addEventListener('click', function() {
            pubSub.emit('basketMenu', 'close');
        });
    }


    function searchResult(data) {
        var html, newHtml;
        html = templateService.productList();

        for (var a = 0; a < data.length; a++) {
            newHtml = html.replace('%ProductName%', data[a].DisplayName);
            newHtml = newHtml.replace('%ProductId%', data[a].ProductId);
            newHtml = newHtml.replace('%ButtonId%', data[a].ProductId);
            newHtml = newHtml.replace('%InputId%', data[a].ProductId);
            newHtml = newHtml.replace('%Description%', data[a].Description);
            newHtml = newHtml.replace('%ProductPrice%', data[a].ListPrice);
            newHtml = newHtml.replace('%Value%', 0);
            newHtml = newHtml.replace('%ButonText%', "EKLE");
            document.getElementById('searchResult').innerHTML += newHtml;



        }
        var selector = document.querySelectorAll('li .searchResult .add_to_basket')
        var buttonSet = []
        for (var i = 0; i < selector.length; i++) {
            var id = selector[i].id;
            if (buttonSet.indexOf(id) === -1) {
                buttonSet.push(id);
            }
        }
        data = buttonSet.filter(function(el, pos) {
            return buttonSet.indexOf(el) == pos;
        })

        buttonCatcher(data);
    }

    function getElementValue(id) {
        var inputs = document.getElementById('q' + id);
        return inputs.value;

    }

    function buttonCatcher(data) {
        for (var i = 0; i < data.length; i++) {
            document.getElementById(data[i]).addEventListener('click', function() {
                basketService.addToBasket({ id: this.getAttribute('id'), quantity: getElementValue(this.getAttribute('id')) })
            });
        };
    }

})();