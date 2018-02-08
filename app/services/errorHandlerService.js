var errorHandlerService = (function() {


    return {
        inputError: function() {
            alert('ss');
            pubSub.subscribe('inputError', function(message) {

            })
        }
    }



})();