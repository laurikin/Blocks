define(['jquery', 'lib/Element'],function($, Element){

  var Ball = function(opts){

    Element.call(this,opts, "Ball");

    var o = ( opts ? opts : {} );

    this.radius = o.radius || 10;

    this.width = this.radius * 2
    this.height = this.radius * 2

    this.view.css({
      'border-radius' : '50%'
    });

  }

  Ball.prototype = Object.create(Element.prototype, {

  });

  return Ball;

});
