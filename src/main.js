require.config({
  baseUrl: "./",
  paths: {
    "jquery": 'lib/jquery'
  }
});

require(['jquery','lib/Key','src/level', 'src/models/Platform', 'lib/Element','src/models/Block','src/models/Ball','lib/Timer','lib/CollisionDetector','src/Store'],
  function($, Key, level, Platform, Element, Block, Ball, Timer, CollisionDetector, Store){

  var key = new Key();

  console.log(key);

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
        if(key.isdown(key.LEFT)){
          platform.moveLeft();
        }
        if(key.isdown(key.RIGHT)){
          platform.moveRight();
        }
      });
    }
  })

  timer.start();

});

