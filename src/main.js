require.config({
  baseUrl: "./",
  paths: {
    "jquery": 'lib/jquery'
  }
});

require(['jquery','lib/Key','src/level', 'src/models/Platform', 'lib/Element','src/models/Block','src/models/Ball','lib/Timer','lib/CollisionObserver','src/Store'],
  function($, Key, level, Platform, Element, Block, Ball, Timer, CollisionObserver, Store){

  var key = new Key();

  console.log(key);

  level();

  var balls = [

    new Ball({
      radius : 5,
      x : 160,
      y : 170,
      color : '#800',
      speed : [0,6]
    })

  ]

  var platform = new Platform({

    height : 10,
    width : 50,
    color : '#eee',
    x : 150,
    y : 240

  })

  balls.forEach(function(ball){
    new CollisionObserver(ball, Store.Block, {
      onCollision : function(e, t){
      t.destroy();
      },
      override : false
    });
    new CollisionObserver(ball, Store.Element);
    new CollisionObserver(ball, Store.Platform, {
      onCollision : function(e, t){
        e.speed[1] = -e.speed[1]
        var e_center = e.x + e.width / 2;
        var t_left = t.x;
        var t_right = t.x + t.width;
        var foo = ( e_center - t_left ) / ( t_right - t_left );
        console.log(foo);
        e.speed[0] = ( foo - 0.5 ) * 12;
      }
    });
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

