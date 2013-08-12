define([],function(){


  function Timer(settings)
  {
      this.settings = settings;
      this.timer = null;
      this.running = false;

      this.fps = settings.fps || 30;
      this.interval = function(){ return Math.floor(1000/this.fps); }
      this.timeInit = null;
  }

  Timer.prototype = {
      run: function()
      {
          if(this.running){

            var $this = this;

            this.settings.run();
            this.timeInit += this.interval();

            this.timer = setTimeout(
                function(){$this.run()},
                this.timeInit - (new Date).getTime()
            );

          }
      },

      start: function()
      {
          if(this.running === false)
          {
              console.log('Timer::start');
              this.timeInit = (new Date).getTime();
              this.running = true;
              this.run();
          }
      },

      stop: function()
      {
        console.log('Timer::stop');
        clearTimeout(this.timer);
        this.running = false;
      },
      increaseSpeed: function(num){
        this.fps = num
      }
  }

  return Timer

});


