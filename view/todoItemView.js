//convert task item from model to dom element
//need myList for registering checkbox callback
function todoItemView(item) {
  const domItem = document.createElement('li');
  domItem.className = 'list-item';
  item.setDomNode(domItem);
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('click', getCheckboxListener(item));
  const text = document.createElement('span');
  text.innerHTML = item.content;

  domItem.appendChild(checkbox);
  domItem.appendChild(text);
  const timeStamp = document.createElement('span');
  timeStamp.className = 'time-stamp';
  timeStamp.innerHTML = "Created at " + item.birth;
  domItem.appendChild(timeStamp);
  const delButton = document.createElement('button');
  delButton.type = "button";
  delButton.className = 'btn-del';
  delButton.innerHTML = "X";

  delButton.addEventListener('click', getDeleteBtnListener(item));

  domItem.appendChild(delButton);

  return domItem;
}

function finishedDomItem(item) {
  const domItem = document.createElement('li');
  domItem.className = 'list-item';
  item.setDomNode(domItem);
  const text = document.createElement('span');
  text.innerHTML = item.content;

  domItem.appendChild(text);
  const timeStamp = document.createElement('span');
  timeStamp.className='time-stamp';
  timeStamp.innerHTML = "Created at " + item.birth;
  domItem.appendChild(timeStamp);
  const delButton = document.createElement('button');
  delButton.type = "button";
  delButton.className = 'btn-del';
  delButton.innerHTML = "X";

  delButton.addEventListener('click', getDeleteBtnListener(item));

  domItem.appendChild(delButton);

  return domItem;
}

function getCheckboxListener(item) {
  return function(){
    setTimeout(function(){
      item.finish();
      //remove from todo list in dom
      item.domNode.parentNode.removeChild(item.domNode);
      //add to finished list in dom
      const domItem = finishedDomItem(item);
      document.getElementById("finished-list-content").appendChild(domItem);

    }, 500);
  }
}

function getDeleteBtnListener(item) {
  return function(){
    item.remove();
    //remove from finished list
    item.domNode.parentNode.removeChild(item.domNode);
  }
}
