var searchService = (function() {

    var data = jsonParser.rawData();


    pubSub.subscribe('jsonData', function(data) {
        pubSub.subscribe('searchInputValue', function(searchData) {
            var objectSet = [];
            var resultPath = data.d.ResultSet || '';

            beforeEach();
            searchResultText(searchData.searchTypeValue);

            for (var i = 0; i < resultPath.length; i++) {
                for (var a = 0; a < resultPath[i].Products.length; a++) {
                    var regex = new RegExp(searchData.searchTypeValue, "g");
                    if (resultPath[i].Products[a].Description.match(regex) !== null || resultPath[i].Products[a].DisplayName.match(regex) !== null) {
                        objectSet.push(resultPath[i].Products[a]);
                        break;
                    }

                }
            }

            pubSub.emit('searchResult', objectSet);
            pubSub.unsubscribe('searchResult', objectSet);
        })

    })

    var beforeEach = function() {
        clearDom('searchResult');
        clearDom('searchResultText');
    }

    var clearDom = function(id) {
        document.getElementById(id).innerHTML = '';
    }

    var searchResultText = function(searchValue) {

        var resultText = templateService.searchResultText();
        var resultTextNew = resultText.replace('%SearchResultText%', searchValue);
        var element = document.getElementById('searchResultText');
        element.insertAdjacentHTML('afterbegin', resultTextNew);

    }

    var searchResult = function() {

    }


})()