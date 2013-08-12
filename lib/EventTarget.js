define([],function(){

  var EventTarget = function() {
    Object.defineProperty(this, "__listeners", {
      value : {}
    });
  };


  Object.defineProperties(EventTarget.prototype,{
    addListener: {
      value : function(type, listener) {

        if(typeof this.__listeners[type] === "undefined") {
          this.__listeners[type] = [];
        }

        this.__listeners[type].push(listener);
      },
      enumerable : true
    },
    __fire : {
      value : function(evtObj) {

        if (typeof evtObj.type === "undefined") {
          throw new Error("Event object has no type");
        }

        if (typeof evtObj.target === "undefined") {
          evtObj.target = this;
        }

        var listeners = this.__listeners[evtObj.type];

        if (typeof listeners === "undefined") {
          return;
        }

        listeners.forEach(function(__listener){
          __listener.call(this, evtObj);
        },this)
      }
    },
    removeListener: {
      value: function(type, listener) {
        var listeners = this.__listeners[type];

        if (typeof listeners === "undefined") {
          return;
        }

        listeners.forEach(function(__listener){
          if(__listener === listener) {
            listeners.splice(i, 1);
          }
        });
      },
      enumerable : true
    }
  });

  return EventTarget

});


