define(['jquery', 'src/models/Block', 'src/models/Ball','src/models/Platform','lib/Timer','lib/CollisionObserver','src/Store','src/level','lib/Key','lib/Counter'],
  function($, Block, Ball, Platform, Timer, CollisionObserver, Store, level, Key, Counter){

  function Game(settings){

    var self = this;

    this.state = "stopped";

    this.lives = new Counter(3);

    this.addedRows = 0;

    this.ball =  new Ball({
      radius : 5,
      x : 230,
      y : 170,
      color : '#800',
    });

    this.platform = new Platform({
      height : 10,
      width : 50,
      color : '#eee',
      x : 205,
      y : 240
    });

    this.counter = new Counter();

    this.key = new Key();

    this.timer = new Timer({
      fps : 30,
      run : function(){
        // console.log('running');
        var key = self.key;
        var ball = self.ball;
        var platform = self.platform;
        if(self.miss()){
          console.log(self.lives.count);
          if(self.lives.count === 0){
            console.log('gameOver');
            self.stop();
          }else{
            self.lives.decrement();
            self.startWithNewBall();
          }
        }
        ball.move();
        if(key.isdown(key.LEFT)){
          platform.moveLeft();
        }
        if(key.isdown(key.RIGHT)){
          platform.moveRight();
        }

        $('#score').text(self.counter.score);
      }
    });

    new CollisionObserver(this.ball, Store.Block, {
      onCollision : function(e, t){
       t.destroy();
       self.counter.increment(10);
      },
      override : false
    });
    new CollisionObserver(this.ball, Store.Element);
    new CollisionObserver(this.ball, Store.Platform, {
      onCollision : function(e, t){
        e.speed[1] = -e.speed[1]
        var e_center = e.x + e.width / 2;
        var t_left = t.x;
        var t_right = t.x + t.width;
        var foo = ( e_center - t_left ) / ( t_right - t_left );
        e.speed[0] = ( foo - 0.5 ) * 12;
        if(self.timeToAddBlocks()){
          level.addRow();
          self.addedRows += 1;
          if(self.gameOver()){
            self.stop();
          }
        }
      }
    });
  }

  Object.defineProperties( Game.prototype,{
    prepare : {
      value : function() {
        this.clear();
        level.build();
        this.reset();
      }
    },
    start : {
      value : function() {
        this.state = "playing";
        this.timer.start();
        // console.log(this.state);
        $('#start-screen').fadeOut();
        $('#pause-screen').fadeOut();
      }
    },
    pause : {
      value : function() {
        this.state = "paused";
        // console.log(this.state);
        this.timer.stop();
        $('#pause-screen').fadeIn();
      }
    },
    stop : {
      value : function() {
        this.state = "stopped";
        // console.log(this.state);
        this.timer.stop();
        $('#start-screen').fadeIn();
      }
    },
    miss: {
      value : function() {
        if(this.ball.y > this.platform.y + 30 || this.ball.x < 0 || this.ball.x > 600){
          return true;
        }
      }
    },
    startWithNewBall: {
      value : function() {
        var $this = this;
        var start = this.timer.start;
        this.reset();
        this.timer.stop();
        setTimeout( function(){$this.timer.start();} , 500 );
      }
    },
    gameOver: {
      value : function() {
        return Store.Block.some(function(block){
          console.log('GAME OVER!');
          if( block.y >= 210 ) { return true; }
        });
      }
    },
    reset: {
      value : function() {
        this.ball.coordinates = [230,170];
        this.ball.speed = [0,5];
        this.platform.coordinates = [205,240];
      }
    },
    clear: {
      value : function() {
        if(Store.Block){
          this.counter.reset();
          this.addedRows = 0;
          this.lives.reset();
          for (var i = Store.Block.length - 1; i >= 0; i--) {
            Store.Block[i].destroy();
          }
        }
      }
    },
    timeToAddBlocks : {
      value : function() {
        if( Math.floor(this.counter.score / 300) > this.addedRows){
          return true;
        }else{
          return false;
        }
      }
    }
  });

  return Game;

});


