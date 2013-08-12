define([],function(){

  var CollisionDetector = function(element, targets){

    if(!element){
      throw new Error('CollisionDetector: No element defined');
    }

    this.element = element;
    this.targets = targets;

  }

  Object.defineProperties(CollisionDetector.prototype,{
    direction : {
      value : function(target){

        var self = this.element;
        var element = target;

        var destination = [ self.x + self.speed[0], self.y + self.speed[1] ];

        var self_old_bottom = self.y + self.height,
        self_old_top = self.y,
        self_old_left = self.x,
        self_old_right = self.x + self.width;

        // console.log("self_old_top : " + self_old_top);
        // console.log("self_old_bottom : " + self_old_bottom);
        // console.log("self_old_left : " + self_old_left);
        // console.log("self_old_right : " + self_old_right);

        var self_bottom = destination[1] + self.height,
        self_top = destination[1],
        self_left = destination[0],
        self_right = destination[0] + self.width;

        // console.log("self_top : " + self_top);
        // console.log("self_bottom : " + self_bottom);
        // console.log("self_left : " + self_left);
        // console.log("self_right : " + self_right);

        var element_bottom = element.y + element.height,
        element_top = element.y,
        element_left = element.x,
        element_right = element.x + element.width;

        // console.log("element_top : " + element_top);
        // console.log("element_bottom : " + element_bottom);
        // console.log("element_left : " + element_left);
        // console.log("element_right : " + element_right);

        var collidedFromLeft = function(){
          return self_old_left < element_left && self_right >= element_left
        }

        var collidedFromRight = function(){
          return self_old_left >= element_right && self_left < element_right
        }

        var collidedFromTop = function(){
          return self_old_bottom < element_top && self_bottom >= element_top
        }

        var collidedFromBottom = function(){
          return self_old_top >= element_bottom && self_top < element_bottom
        }

        if(collidedFromBottom()){
          return "bottom"
        }else if(collidedFromTop()){
          return "top";
        }else if(collidedFromLeft()){
          return "left";
        }else if(collidedFromRight()){
          return "right";
        }

      }
    },
    collision : {
      value : function(){
        var element = this.element;
        var targets = this.targets;
        var element_destination = [ element.x + element.speed[0], element.y + element.speed[1] ];

        var len = targets.length;

        var element_bottom = element_destination[1] + element.height,
        element_top = element_destination[1],
        element_left = element_destination[0],
        element_right = element_destination[0] + element.width;

        for (var i = len - 1; i >= 0; i--) {

          var target_bottom = targets[i].y + targets[i].height,
          target_top = targets[i].y,
          target_left = targets[i].x,
          target_right = targets[i].x + targets[i].width;

          // console.log("e_top : " + element_top);
          // console.log("e_bottom : " + element_bottom);
          // console.log("e_left : " + element_left);
          // console.log("e_right : " + element_right);

          // console.log("target_top : " + target_top);
          // console.log("target_bottom : " + target_bottom);
          // console.log("target_left : " + target_left);
          // console.log("target_right : " + target_right);

          // console.log(element_bottom < target_top);
          // console.log(element_top > target_bottom);
          // console.log(element_right < target_left);
          // console.log(element_left > target_right);

          if(targets[i].id !== element.id){
            if( element_bottom < target_top || element_top > target_bottom || element_right < target_left || element_left > target_right ){
            }else{
              return targets[i];
            }
          }
        }
        return false;
      }
    },
    run : {
      value : function(){
        var target = this.collision();
        if( !target ){
          return false;
        }else{
          return { target: target, direction: this.direction(target) }
        }
      }
    }

  });

  return CollisionDetector;

});



