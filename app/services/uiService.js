var uiService = (function() {


    var pageObjects = {

        searchValue: '.search__product',
        searchButton: '.search__button',
        addToBasket: '.add_to_basket',
        openBasket: '.c-basket',
        closeBasket: '.c-basket-close'
    }

    var errorPageObjects = {
        inputError: '.error__input'
    }




    return {
        /**
         * 
         * 
         * @returns input value
         */
        getInput: function() {
            return {
                searchTypeValue: document.querySelector(pageObjects.searchValue).value
            }
        },
        /**
         * 
         * 
         * @returns pageObject data and make it public
         */
        getPageObjects: function() {
            return pageObjects;
        },

        getErrorPageObjects: function() {
            return errorPageObjects;
        }

    }



})();