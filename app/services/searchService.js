var searchService = (function(jsonParser) {


    var data = jsonParser.rawData();
    var searchWord = '';


    pubSub.subscribe('jsonData', function(data) {
        pubSub.subscribe('searchInputValue', function(searchData) {
            alert(searchData.searchTypeValue);
            console.log("On Searc Result");
            console.log(searchData.searchTypeValue);
            var resultPath = data.d.ResultSet || '';
            for (var i = 0; i < resultPath.length; i++) {
                for (var a = 0; a < resultPath[i].Products.length; a++) {
                    //Seçilmiş Menü (Kebap)
                    var rgxp = new RegExp(searchData.searchTypeValue, "g");
                    if (resultPath[i].Products[a].DisplayName.match(rgxp)) {
                        console.log("Event");
                        console.log("Burası", resultPath[i].Products[a].DisplayName);
                        pubSub.unsubscribe('jsonData', data);
                        pubSub.emit('searchResult', resultPath[i].Products[a])
                    } else {
                        console.log("Kayıt Yok");
                    }

                }
            }
        })

    })




    var searchResult = function() {


    }

    return {
        searchResultData: searchResult
    }








})(jsonParser)