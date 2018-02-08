var searchService = (function(jsonParser) {


    var data = jsonParser.rawData();



    pubSub.subscribe('searchInputValue', function(data) {
        alert(data.searchTypeValue);
    })




    pubSub.subscribe('jsonData', function(data) {
        console.log("Json DAta", data);
    })


})(jsonParser)