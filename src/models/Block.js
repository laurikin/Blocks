define(['jquery', 'lib/Element'],function($, Element){

  var Block = function(opts){

    Element.call(this, opts, "Block");

  }


  Block.prototype = Object.create(Element.prototype, {

  });

  return Block;

});
