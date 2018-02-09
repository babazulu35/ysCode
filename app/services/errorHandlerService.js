var errorHandlerService = (function() {

    inputErrorMessage = function() {

        messageTemplate =
            `<span class="error__input">
                <i class="fas fa-info"></i> %InputErrorMessage%
            </span>`;
    }

    return {
        inputError: function() {
            return pubSub.emit('inputError', inputErrorMessage.messageTemplate);
        }
    }



})();