const upToUsingClassName = (el, className) =>{
  el = el.target.closest(".popup-content");
  while (el) {
    el = el.parentNode;
    if (el.className && el.className == className) {
      return el;
    }
  }
 return null;
}

const upToUsingTagName = (el, tagName) =>{
  tagName = tagName.toLowerCase();
  while (el && el.parentNode) {
    el = el.parentNode;
    if (el.tagName && el.tagName.toLowerCase() == tagName) {
      return el;
    }
  }
 return null;
}

const createInputs = (parent) =>{
  for(let i = 0; i < parent.cells.length - 1; i++){
    parent.cells[i].innerText = "";
    const input = document.createElement('input');
    input.type='text';
    parent.cells[i].appendChild(input);
  }
}

const consistsOfEmptyInput = (parent) =>{
  for(let i = 0; i < parent.cells.length - 1; i++){
    if(parent.cells[i].firstChild.value == "")
      return true;
  }
  return false;
}

const setValueFromInputs = (parent) =>{
  for(let i = 0; i < parent.cells.length - 1; i++){
    parent.cells[i].innerText = parent.cells[i].firstChild.value;
  }
}

const createButton =(className, text) =>{
  const button = document.createElement('button');          
  button.innerText=text;
  button.className=className;
  return button;
}


table.onclick = function(event){
  const target = event.target.closest(".b_edit");

  if(target != null){
    const parent = upToUsingTagName(target, 'tr');
    createInputs(parent);

    const button = createButton ("b_add", "добавить");
    const p = target.parentElement;
    target.remove();
    p.insertAdjacentElement('afterbegin', button);
    
    button.addEventListener('click', {
      handleEvent(event) {
        debugger;
        if(consistsOfEmptyInput(parent)){
          alert("Есть пустая строка");
          return;
        }

        setValueFromInputs(parent);
        
        const p = event.target.parentElement;
        event.target.remove();
        p.insertAdjacentElement('afterbegin', createButton("b_edit", "изменить"));
      }
    });
  }
}