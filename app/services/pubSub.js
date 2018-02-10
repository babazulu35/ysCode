var pubSub = {
    pubsub: {},

    /**
     * @description subscriber to emited event 
     */

    subscribe: function(eventName, fn) {
        this.pubsub[eventName] = this.pubsub[eventName] || [];
        this.pubsub[eventName].push(fn);

    },

    /**
     * @description unsubscribe to subscribed event 
     */

    unsubscribe: function(eventName, fn) {
        if (this.pubsub[eventName]) {
            for (var i = 0; i < this.pubsub[eventName].length; i++) {
                if (this.pubsub[eventName][i] === fn) {
                    this.pubsub[eventName].splice(i, 1);
                    break;
                }
            };

        }
    },

    /**
     * @description publish events
     */

    emit: function(eventName, data) {

        if (this.pubsub[eventName]) {
            this.pubsub[eventName].forEach(function(fn) {
                fn(data);
            });
        }
    }
};