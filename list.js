$ = function(_id) {
  return document.getElementById(_id);
}
_bind = function(func, that) {
  return function() {
    func.call(that);
  }
}

function TodoView(myList) {
  this.myList = myList;
  this.todoListView = $("list-content");
  this.finishedListView = $("finished-list-content");
  this.todoView = $("todo-view");
  this.finishedView = $("finished-view");
  this.todoInput = $("input-content");

  for (let i = 0; i < myList.list.length; i++) {
    const item = myList.list[i];
    if (item.pending) {
      this.todoListView.appendChild(todoDomItem(item));
    }
    else {
      this.finishedListView.appendChild(finishedDomItem(item));
    }
  }
  this.toggleView();
  this.bind();
}

TodoView.prototype.bind = function() {
  $("button-add-item").addEventListener('click', _bind(this.addBtnListener, this));
  $("button-return").addEventListener('click', _bind(this.toggleView, this));
  $("button-view-finished").addEventListener('click', _bind(this.toggleView, this));

  this.todoInput.addEventListener('keypress', (e) => {
    _bind(this.addInputListener(e), this);
  });
}

TodoView.prototype.toggleView = function() {
  if (this._state === "todo") {
    this.todoView.className = "hidden";
    this.finishedView.className = "";
    this._state = "finished";
  }
  else {
    this.todoView.className = "";
    this.finishedView.className = "hidden";
    this._state = "todo";
  }
}

TodoView.prototype.addBtnListener = function() {
  const content = this.todoInput.value;
  if (content.length === 0)
    alert('NOTHING TO ADD.');
  else{
    const item = new todoItem(content);
    this.myList.addTask(item);
    const domItem = todoDomItem(item);
    this.todoListView.appendChild(domItem);
    this.todoInput.value = "";
  }
}

TodoView.prototype.addInputListener = function(e) {
  if(e.code !== 'Enter') return;
  this.addBtnListener();
}
