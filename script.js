const getStrFromRecord = (parent) =>{
  let strOfRecord = parent.cells[0].innerText;
     for(let i = 1; i < parent.cells.length - 1; i++){
         strOfRecord = strOfRecord.concat(', ' +  parent.cells[i].innerText);
     }
     return strOfRecord;
}

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

const createButton = (className, text) =>{
  const button = document.createElement('button');          
  button.innerText=text;
  button.className=className;
  return button;
}

const performEditSubtask = (target) =>{
  const parent = upToUsingTagName(target, 'tr');
  createInputs(parent);
  const button = createButton ("b_add", "добавить");
  const p = target.parentElement;
  target.remove();
  p.insertAdjacentElement('afterbegin', button);
  
  button.addEventListener('click', {
    handleEvent(event) {
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

const createPopUp = (str) =>{

  const popup = document.createElement('div');
  popup.className = 'b-popup';
  
  const content = document.createElement('div');
  content.className = 'popup-content'
  
  const text = document.createElement('p');
  text.innerHTML = str;
  
  const button_close = document.createElement('button');
   button_close.innerHTML = 'закрыть';
   button_close.id = 'b_close';
   button_close.addEventListener('click', {
    handleEvent(event) {
        upToUsingClassName(event, 'b-popup').remove();
    }
  });

   content.appendChild(text);
   content.appendChild(button_close);
   popup.appendChild(content);
   return popup;

}

const performPopUpSubtask = (target) =>{
  const parent = upToUsingTagName(target, 'tr');
  const strOfRecord = getStrFromRecord(parent);
  
  document.getElementById('table').insertAdjacentElement('afterend', createPopUp(strOfRecord));
  
}

table.onclick = function(event){
  const target = event.target.closest(".b_show");
  if (target != null){
    performPopUpSubtask(target);
    return;
  }
  
  target = event.target.closest(".b_edit");
  if(target != null){
  performEditSubtask(target);
  return;
  }
}