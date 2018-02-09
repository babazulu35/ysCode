(function() {


    var pageObjects = uiService.getPageObjects();

    /* Binders */
    pubSub.subscribe("searchResult", searchResult);

    document.querySelector(pageObjects.searchButton).addEventListener('click', function() {

        var searchInput = uiService.getInput();

        if (searchInput == '' || searchInput == undefined) {
            console.log("Empty alanda");
            errorHandlerService.inputError();
            pubSub.subscribe('inputError', function(errorTemplate) {
                console.log("ErroTemplate", errorTemplate);
            })
        } else {
            pubSub.emit('searchInputValue', searchInput)
        }

    });



    document.querySelector(pageObjects.openBasket).addEventListener('click', function() {
        pubSub.emit('basketMenu', 'open');
    });


    function searchResult(data) {
        var html, newHtml;
        html = templateService.productList();

        for (var a = 0; a < data.length; a++) {
            newHtml = html.replace('%ProductName%', data[a].DisplayName);
            newHtml = newHtml.replace('%ProductId%', data[a].ProductId);
            newHtml = newHtml.replace('%ButtonId%', data[a].ProductId);
            newHtml = newHtml.replace('%Description%', data[a].Description);
            newHtml = newHtml.replace('%ProductPrice%', data[a].ListPrice)
            document.getElementById('searchResult').innerHTML += newHtml;


        }

        console.log(document.querySelector('.add-product button'));
    }


    function items() {
        console.log("Asdsa");
    }







    /*         document.querySelector('.add_to_basket.button').addEventListener('click', function() {
                console.log("Clik");
                console.log("This", this);

                basketService.addToBasket(this.getAttribute('id'));

            }) */







})();