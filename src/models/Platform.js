define(['jquery', 'lib/Element'],function($, Element){

  var Platform = function(opts){

    var self = this;

    Element.call(this,opts, "Platform");

  }


  Platform.prototype = Object.create(Element.prototype, {
    moveRight: {
      value : function(){
        this.x += 10;
      }
    },
    moveLeft: {
      value : function(){
        this.x -= 10;
      }
    }
  });

  return Platform;

});
