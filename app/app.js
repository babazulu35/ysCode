(function() {
    jsonParser.rawData();

    document.getElementById("butt").addEventListener("click", function(event) {});

    pubSub.subscribe("jsonData", function(data) {

        var resultPath = data.d.ResultSet || '';

        for (var i = 0; i < resultPath.length; i++) {
            document.getElementById('searchResult').innerHTML += '<li>' + resultPath[i].CategoryDisplayName + '</li>';
        }

    });

    pubSub.subscribe("searchResult", function(data) {

        var resultPath = data.d.ResultSet || '';

        for (var i = 0; i < resultPath.length; i++) {
            document.getElementById('searchResult').innerHTML += '<li> big Results' + resultPath[i].CategoryDisplayName + '</li>';
        }

    });


})();