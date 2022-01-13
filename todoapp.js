var myList, app;

myList = new TodoList('myList');
myList.loadFromLS();
app = new TodoListView(myList);
