require.config({
  baseUrl: "./",
  paths: {
    "jquery": 'lib/jquery'
  }
});

require(['jquery','src/Game','src/models/LifeWidget'],
  function( $, Game, LifeWidget ){

    var game = new Game();

    $(document).ready(function(){
      var lifeWidget = new LifeWidget(game.lives, $('#lives'));
    });

    $(document).on('keydown',function(e){
      if(e.keyCode === 32){
        if(game.state === "stopped"){
          game.prepare();
          game.start();
        }else if(game.state === "paused"){
          game.start();
        }else if(game.state === "playing"){
          game.pause();
        }
      }
    })

});

