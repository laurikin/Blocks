define(['lib/EventTarget'],function( EventTarget ){

  var Counter = function(def){

    EventTarget.call(this);

    this.def = def;
    this.__score = def || 0;

  }

  Counter.prototype = Object.create(EventTarget.prototype,{

    decrement: {
      value: function(num){
        this.__score -= num || 1;
        this.__fire({ type: 'decrement' });
      }
    },
    increment: {
      value: function(num){
        this.__score += num || 1;
        this.__fire({ type: 'increment' });
      }
    },
    reset: {
      value: function(val){
        this.__score = val || this.def || 0;
        this.__fire({ type: 'reset' });
      }
    },
    score:{
      get: function(){ return this.__score; }
    },
    count:{
      get: function(){ return this.__score; }
    }
  });

  return Counter;

});
