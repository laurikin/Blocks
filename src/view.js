define(['jquery'],function($){

  return function(opts){

    var view = $(document.createElement('div'));

    var o = ( opts ? opts : {} );

    view.css({
      position : "absolute",
      left : o.x || 0,
      top : o.y || 0,
      width : o.width || 0,
      height : o.height || 0,
      'background-color' : o.color || '#f00'
    });

    return view;
  };

});
