$ = function(_id) {
    return document.getElementById(_id);
  }
  _bind = function(func, that) {
    return function() {
      func.call(that);
    }
  }