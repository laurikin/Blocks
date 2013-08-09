require.config({
  baseUrl: "./",
  paths: {
    "jquery": 'lib/jquery'
  }
});

require(['jquery','src/level', 'src/models/Platform', 'lib/Element','src/models/Block','src/models/Ball','lib/Timer','lib/CollisionDetector','src/Store'],
  function($, level, Platform, Element, Block, Ball, Timer, CollisionDetector, Store){

  level();

  var balls = [

    new Ball({
      radius : 5,
      x : 160,
      y : 170,
      color : '#800',
      speed : [2,4]
    })

  ]

  var platform = new Platform({

    height : 10,
    width : 80,
    color : '#eee',
    x : 150,
    y : 240

  })

  balls.forEach(function(ball){
    (new CollisionDetector(ball, "Block", function(t){
      t.destroy();
    })).start();
    (new CollisionDetector(ball, "Element", function(t){
    })).start();
    (new CollisionDetector(ball, "Platform", function(t){
    })).start();
  })

  var timer = new Timer({
    fps : 30,
    run : function(){
      balls.forEach(function(ball){
        ball.move();
      });
    }
  })

  timer.start();

});

