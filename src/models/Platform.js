define(['jquery', 'lib/Element'],function($, Element){

  var Platform = function(opts){

    var self = this;

    Element.call(this,opts, "Platform");

    $(document).on('keydown',function(e){
    console.log('keydown');
    switch(e.keyCode){
      case 37:
        self.x -= 10;
        break;
      case 39:
        self.x += 10;
        break;
    }

  });

  }


  Platform.prototype = Object.create(Element.prototype, {

  });

  return Platform;

});
