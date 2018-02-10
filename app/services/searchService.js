var searchService = (function() {

    var data = jsonParser.rawData();

    /**
     * @param {*} data emited JsonData event
     */
    pubSub.subscribe('jsonData', function(data) {

        /**
         * @param {*} searchData emited input search value  event
         */

        pubSub.subscribe('searchInputValue', function(searchData) {
            var objectSet = [];
            var resultPath = data.d.ResultSet || '';

            beforeEach();


            for (var i = 0; i < resultPath.length; i++) {
                for (var a = 0; a < resultPath[i].Products.length; a++) {
                    var regex = new RegExp(searchData.searchTypeValue.toLowerCase(), "g");
                    if (resultPath[i].Products[a].Description.toLowerCase().match(regex) !== null || resultPath[i].Products[a].DisplayName.toLowerCase().match(regex) !== null) {
                        objectSet.push(resultPath[i].Products[a]);
                        break;
                    }

                }
            }
            searchResultText(searchData.searchTypeValue, objectSet.length);

            pubSub.emit('searchResult', objectSet);
        })

    })

    /**
     * @return clearDom Function
     */

    var beforeEach = function() {
        clearDom('searchResult');
        clearDom('searchResultText');
    }

    /**
     * 
     * @param {*} id DOM's added id
     * @description clear added dom elements from DOM
     */

    var clearDom = function(id) {
        document.getElementById(id).innerHTML = '';
    }

    /**
     * 
     * @param {*} searchValue searchValue from input
     * @param {*} resultCount count of Search Result Length
     */

    var searchResultText = function(searchValue, resultCount) {

        var resultText = templateService.searchResultText();
        var resultTextNew = resultText.replace('%SearchResultText%', searchValue);
        var resultTextNew = resultTextNew.replace('%ResultCount%', resultCount);
        var element = document.getElementById('searchResultText');
        element.insertAdjacentHTML('afterbegin', resultTextNew);

    }


})()