define(['lib/CollisionDetector'],function(CollisionDetector){

  var CollisionObserver = function(element, target, callbacks){


    this.callbacks = callbacks;
    this.element = element;
    this.target = target;
    this.detector = new CollisionDetector(element, target);

    var self = this;


    element.addListener('beforeMove', function(){

      var collision = self.detect();
      if(collision){
        self.runCallback.call(self, collision, self.callbacks );
      }
    });

  }

  Object.defineProperties(CollisionObserver.prototype,{
    detect : {
      value : function() {
        return this.detector.run();
      }
    },
    runCallback : {
      value : function(collision) {
        if(!this.callbacks){
          // console.log('__defaultCallback')
          this.__defaultCallback(collision.direction);
        }else{
          // console.log('onCallback')
          var callback = this.callbacks.onCollision
          if(this.callbacks.override === false){
            this.__defaultCallback(collision.direction);
          }
          this.callbacks.onCollision(this.element,collision.target);
        }
      }
    },
    __defaultCallback : {
      value : function(direction) {
        var el = this.element;
        if( direction === "left" || direction === "right" ){
          el.speed[0] = -el.speed[0];
        }else if( direction === "top" || direction === "bottom" ){
          el.speed[1] = -el.speed[1];
        }
      }
    }
  });

  return CollisionObserver;

});


