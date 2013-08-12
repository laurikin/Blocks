define(['jquery','src/view','src/config','src/Store','lib/EventTarget'],function($, viewfn, config, Store, EventTarget){

  var counter = 0;

  var setId = function(){
    return (function(){
      counter += 1;
      return counter;
    }());
  };

  var Element = function(opts, type){

    EventTarget.call(this);

    var $this = this;

    this.__id = setId();
    this.type = type || "Element"

    this.__attrs = (function(){
      var o = ( opts ? opts : {} );
      return {
        color : o.color || '#f00',
        x : o.x || 0,
        y : o.y || 0,
        width : o.width || 0,
        height : o.height || 0,
        speed : o.speed || [0,0],
      }
    }());

    this.view = viewfn(this.__attrs);

    if(this.view && config.container){
      config.container.appendChild(this.view[0]);
    }


    if(typeof Store[(this.type)] === "undefined"){
      Store[(this.type)] = [];
    }

    Store[(this.type)].push(this);

  }

  Element.prototype = Object.create(EventTarget.prototype, {
    move : {
      value : function(){
        this.__fire({ type: 'beforeMove' });
        this.x += this.speed[0];
        this.y += this.speed[1];
      }
    },
    destroy : {
      value : function() {
        this.view.remove();
        Store[(this.type)].forEach(function(element,index,array){
          if(element.id === this.id){
            array.splice(index,1);
          }
        },this);
     }
    },
    setAttribute : {
      value : function(attribute,cssAttribute,value) {
        this.__attrs[attribute] = value;
        this.view.css(cssAttribute, value);
        return this;
      }
    },
    id : {
      get : function() {
        return this.__id
      }
    },
    color : {
      get : function() {
        return this.__attrs.color;
      },
      set : function(value) {
        this.setAttribute('color','background-color',value);
      }
    },
    x : {
      get : function() {
        return this.__attrs.x;
      },
      set : function(value){
        this.setAttribute('x','left',value);
      }
    },
    y : {
      get : function() {
        return this.__attrs.y;
      },
      set : function(value){
        this.setAttribute('y','top',value);
      }
    },
    width : {
      get : function() {
        return this.__attrs.width;
      },
      set : function(value){
        this.setAttribute('width','width',value);
      }
    },
    height : {
      get : function() {
        return this.__attrs.height;
      },
      set : function(value){
        this.setAttribute('height','height',value);
      }
    },
    coordinates : {
      get : function() {
        return [ this.__attrs.x, this.__attrs.y ];
      },
      set : function(coordinates){
        this.x = coordinates[0];
        this.y = coordinates[1];
      }
    },
    speed : {
      get : function( value ) {
        return this.__attrs.speed;
      },
      set : function( value ) {
        this.__attrs.speed = value;
      }
    }
  });

  return Element;

});
