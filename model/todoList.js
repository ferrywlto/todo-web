function TodoList(name) {
  this.name = name;
  this.list = [];
}

TodoList.prototype.addTask = function(item) {
  item.setContainer(this);
  this.list.push(item);
  this.saveToLS();
}

TodoList.prototype.loadFromLS = function () {
  //.container property and the functions need to be reset
  const plainList = JSON.parse(localStorage.getItem(this.name) || '[]');
  this.list = [];
  for (let i = 0; i < plainList.length; i++){
    const item = TodoItem.Restore(plainList[i], this);
    item.setContainer(this);
    this.list.push(item);
  }

  return this;
}

TodoList.prototype.saveToLS = function () {
  const plainList = [];
  for (let i = 0; i < this.list.length; i++){
    plainList.push({
      "content": this.list[i].content,
      "pending": this.list[i].pending,
      "birth": this.list[i].birth
    });
  }

  localStorage.setItem(this.name, JSON.stringify(plainList));
  return this;
}
