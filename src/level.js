define(['lib/Element','src/models/Block'],function(Element,Block){

  var colors = [
    '#f3bc13',
    '#d91313',
    '#4d9ad0',
    '#3a4aae',
    '#3ae03a',
    '#e34818',
    '#ef7c16'
  ];

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

    for( j = 0; j < 6; j++){
      for (var i = 500/25 - 1; i >= 0; i--) {
        new Block({
          x: 30 + i * 25,
          y: 30 + j * 25,
          width: 24,
          height: 24,
          color: colors[ Math.floor(Math.random()*colors.length) ]
        })
      }
    }

  }

})

