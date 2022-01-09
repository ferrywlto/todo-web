function TodoItem(arg) {
  this.content = arg;
  this.pending = true;
  this.birth = timeStamp();
}

TodoItem.Restore = function(obj) {
  _item = new TodoItem(obj.content);
  _item.pending = obj.pending;
  _item.birth = obj.birth;
  return _item;
}

TodoItem.prototype.finish = function() {
  this.pending = false;
  this.container.saveToLS();
}

TodoItem.prototype.remove = function() {
  if (this.container.list.indexOf(this) !== -1) {
    this.container.list.splice(this.container.list.indexOf(this), 1);
    this.container.saveToLS();
  }
}

TodoItem.prototype.setDomNode = function(domNode) {
  this.domNode = domNode;
}

TodoItem.prototype.setContainer = function(container) {
  this.container = container;
}
