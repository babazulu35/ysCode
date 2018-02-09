var jsonParser = (function() {
    /**
     * 
     * 
     * @param {any} callback  
     */
    var loadJSON = function(callback) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'app/services/menuData.json', true);
        xobj.onreadystatechange = function() {
            if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
            }

        };
        xobj.send(null);
    }
    var getMenuData = function() {
        loadJSON(function(response) {
            pubSub.emit("jsonData", JSON.parse(response));
        })

    }
    return {
        rawData: getMenuData
    }




})();