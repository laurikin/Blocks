require.config({
  baseUrl: "./",
  paths: {
    "jquery": 'lib/jquery'
  }
});

require(['jquery','src/Game'],
  function( $, Game ){

    var game = new Game();

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

