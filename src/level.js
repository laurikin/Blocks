define(['lib/Element','src/models/Block'],function(Element,Block){

  return function(){

    new Element({
      x: 0,
      y: 0,
      width: 30,
      height: 300,
      color: "#333"
    });

    new Element({
      x: 530,
      y: 0,
      width: 30,
      height: 300,
      color: "#333"
    });

    new Element({
      x: 30,
      y: 0,
      width: 500,
      height: 30,
      color: "#333"
    });

    new Element({
      x: 30,
      y: 270,
      width: 500,
      height: 30,
      color: "#333"
    });

    for( j = 0; j < 4; j++){
      for (var i = 500/25 - 1; i >= 0; i--) {
        (new Block({
          x: 30 + i * 25,
          y: 30 + j * 25,
          width: 22,
          height: 22
        })).view.css({ border : "solid 1px #dedede" })
      }
    }

  }

})
