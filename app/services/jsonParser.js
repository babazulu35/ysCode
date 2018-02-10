var jsonParser = (function() {

    /**
     * @private
     * @param {any} callback add object responseText to callBck 
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

    /**
     * @private
     */

    var getMenuData = function() {

        /**
         * @param {*} response callback data from loadJson function
         */
        loadJSON(function(response) {
            pubSub.emit("jsonData", JSON.parse(response));
        })

    }
    return {

        /**
         * @public
         */
        rawData: getMenuData
    }




})();