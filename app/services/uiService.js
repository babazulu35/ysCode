var uiService = (function() {

    /**
     * @private
     */
    var pageObjects = {

        searchValue: '.search__product',
        searchButton: '.search__button',
        addToBasket: '.add_to_basket',
        openBasket: '.c-basket',
        closeBasket: '.c-basket__container--close'
    }

    var queryObjects = {
        addToBasket: '#searchResult li .searchResult .add_to_basket',
        updateBasketItem: '#basketItem li .searchResult .add_to_basket',
        deletBasketItem: '#basketItem li .searchResult .delete_basket_item'
    }

    /**
     * @private
     */
    var errorPageObjects = {
        inputError: '.error__input'
    }

    /**
     * @private
     * @returns querySelectorAll DOM Nodes Object
     * @param {*} querySelectorAll is querySelector path ex. #id .thisClass tagName
     */

    getLoopedElementsId = function(querySelectorAll) {

            var listSelector = document.querySelectorAll(querySelectorAll)
            var clickableElementSet = [];
            for (var i = 0; i < listSelector.length; i++) {
                var id = listSelector[i].id;
                if (clickableElementSet.indexOf(id) === -1) {
                    clickableElementSet.push(id);
                }
            }

            data = clickableElementSet.filter(function(el, pos) {
                return clickableElementSet.indexOf(el) == pos;
            });

            return data;

        },

        /**
         * @private
         * @returns input Value
         */

        getInputValue = function(elementId) {
            var getInput = document.getElementById(elementId).value;
            return getInput;
        }

    return {
        /**
         * 
         * @public
         * @returns input value
         */
        getSearchInput: function() {
            return {
                searchTypeValue: document.querySelector(pageObjects.searchValue).value,

            }
        },
        /**
         * 
         * @public
         * @returns pageObject data and make it public
         */
        getPageObjects: function() {
            return pageObjects;
        },
        /**
         * 
         * @public
         * @returns errorPageObject data and make it public
         */
        getErrorPageObjects: function() {
            return errorPageObjects;
        },

        /**
         * 
         * @public
         * @description remove the element from dom
         */

        removeElementFromDom: function(elementId) {
            var el = document.getElementById(elementId);
            el.remove();
        },
        /**
         * 
         * @public
         * @description remove the element from dom
         * @returns querySelectorAll DOM Nodes Object
         * @type Object
         */
        getLoopedElementsId: function(querqSelectorAll) {
            return getLoopedElementsId(querqSelectorAll);
        },

        inputValue: function(elementId) {
            return getInputValue(elementId)
        },

        getQueryObjects: function() {
            return queryObjects;
        }



    }



})();