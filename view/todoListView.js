function TodoListView(myList) {
  this.myList = myList;
  this.todoListView = $("list-content");
  this.finishedListView = $("finished-list-content");
  this.todoView = $("todo-view");
  this.finishedView = $("finished-view");
  this.todoInput = $("input-content");

  for (let i = 0; i < myList.list.length; i++) {
    const item = myList.list[i];
    if (item.pending) {
      this.todoListView.appendChild(todoItemView(item));
    }
    else {
      this.finishedListView.appendChild(finishedDomItem(item));
    }
  }
  this.toggleView();
  this.bind();
}

TodoListView.prototype.bind = function() {
  $("button-add-item").addEventListener('click', _bind(this.addBtnListener, this));
  $("button-return").addEventListener('click', _bind(this.toggleView, this));
  $("button-view-finished").addEventListener('click', _bind(this.toggleView, this));

  this.todoInput.addEventListener('keypress', (e) => {
    _bind(this.addInputListener(e), this);
  });
}

TodoListView.prototype.toggleView = function() {
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

TodoListView.prototype.addBtnListener = function() {
  const content = this.todoInput.value;
  if (content.length === 0)
    alert('NOTHING TO ADD.');
  else{
    const item = new TodoItem(content);
    this.myList.addTask(item);
    const itemView = todoItemView(item);
    this.todoListView.appendChild(itemView);
    this.todoInput.value = "";
  }
}

TodoListView.prototype.addInputListener = function(e) {
  if(e.code !== 'Enter') return;
  this.addBtnListener();
}
