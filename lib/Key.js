define([],function(){



  var Key = function() {

    this._pressed = {}

    this.LEFT = 37;
    this.UP = 38;
    this.RIGHT = 39;
    this.DOWN = 40;


    var self = this;
    window.addEventListener('keyup', function(event) { self.onKeyup(event); }, false);
    window.addEventListener('keydown', function(event) { self.onKeydown(event); }, false);

  };

  Object.defineProperties(Key.prototype,{
    isdown: {
      value: function(keyCode){
      return this._pressed[keyCode];
      }
    },
    onKeydown: {
      value : function(event) {
        this._pressed[event.keyCode] = true;
      }
    },
    onKeyup: {
      value :function(event) {
      delete this._pressed[event.keyCode];
      }
    }

  });

  return Key;

});
