const toDoForm = document.querySelector('.js-toDoForm'),
      toDoInput = toDoForm.querySelector('input'),
      toDolist = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';

let toDos = []; // const를 사용하면 값을 새로 넣어줄 수가 없으므로 let 형으로 바꿈

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    //console.dir(event.target);
    toDolist.removeChild(li);
    const changedToDos = toDos.filter(function(todo) {
        return todo.id != parseInt(li.id); 
    });
    toDos = changedToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    // localStorage는 string 타입밖에 저장을 못한다
    // JSON.stringify : 자바스크립트 object를 string 타입으로 바꿔줌
}

function paintToDo(text) {
    const li = document.createElement("li"); //li 생성
    const delBtn = document.createElement("button"); //button 생성
    const span = document.createElement("span"); 
    //span : 특별한 의미 없고 줄바꿈이 되지 않는 태그
    const newId = toDos.length+1;
    delBtn.innerText = "◈";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDolist.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(Event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = '';
    
}

function loadToDos() {
    const loadedtoDos = localStorage.getItem(TODOS_LS);
    //toDos를 전부 가져옴
    if(loadedtoDos != null) {
        const parsedToDos = JSON.parse(loadedtoDos);
        // string타입을 다시 object 타입으로 변경
        parsedToDos.forEach(function(toDo) { 
            paintToDo(toDo.text);
            // 변환된 toDos에 있는 각각의 개체들에 대해 paintToDo 함수 실행 
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();