define([],function(){

  var LifeWidget = function(counter, container){

    var self = this;
    this.container = container;
    this.counter = counter;
    this.lives = this.counter.count || 3;
    this.divs = [];
    this.counter.addListener('increment',function(){ self.update() });
    this.counter.addListener('decrement',function(){ self.update() });
    this.counter.addListener('reset',function(){ self.update() });
    this.draw();

  }

  Object.defineProperties(LifeWidget.prototype,{
    update: {
      value: function(){
        this.lives = this.counter.count;
        this.draw.call(this);
        console.log("lives: " + this.lives);
      }
    },
    draw: {
      value: function(){
        this.container.empty();
        for (var i = this.divs.length - 1; i >= 0; i--) {
        };
        for (var i = this.lives - 1; i >= 0; i--) {
          this.container.append(this.div());
          this.divs.push(this.div());
        };
      }
    },
    div: {
      value: function(){
        var div = $(document.createElement('div'));
        div.css({
          'background-color' : '#f00',
          'width' : 15,
          'height' : 15,
          'border-radius' : '50%',
          'float' : 'left',
          'margin-right' : 5
        });
        return div;
      }
    }

  });

  return LifeWidget;

});
