import {checkLogin} from "./authorization.js"

checkLogin();

let nameThisUser = sessionStorage.userName;
document.querySelector(".user").innerText = nameThisUser;

let exit = document.querySelector(".exit");
exit.addEventListener("click", () => {
    sessionStorage.removeItem("checkLogin");
    checkLogin();
});

let addTask = document.querySelector(".newTask");
let modal = document.querySelector(".modal-all");
addTask.addEventListener("click", () => {
    modal.classList.add("modal-active");
});

let modalX = document.querySelector(".modalX");
modalX.addEventListener("click", () => {
    modal.classList.remove("modal-active");
});


class Tasks {
    constructor (id, title, text, urgency){
        this.id = id;
        this.title = title;
        this.text = text;
        this.urgency = urgency;    
    }
}


let titleTask = document.getElementById("taskName"),
    textTask = document.getElementById("taskText"),
    selectModal = document.getElementById("selectModal"),
    modalNewTask = document.querySelector(".modalNewTask"),
    boardForToday = document.querySelector(".boardForToday"),
    boardForTheWeek = document.querySelector(".boardForWeek"),
    boardForTheMonth = document.querySelector(".boardForMonth");


if(!sessionStorage.allTasks){
    sessionStorage.allTasks = JSON.stringify([]);
}

modalNewTask.addEventListener("click", () => {

    if(textTask.value.length > 1 && selectModal.value != "urgency"){

        let generIDForTask = Date.now();

        let newTask = new Tasks(generIDForTask, titleTask.value, textTask.value, selectModal.value);
    
        let allTasks = JSON.parse(sessionStorage.allTasks);
        allTasks.push(newTask);
        sessionStorage.allTasks = JSON.stringify(allTasks);

        showTasks(allTasks);

        titleTask.value = "";
        textTask.value = "";
    };

    if (selectModal.value === "urgency"){
        selectModal.classList.add("option");
    }else if (selectModal.value != "urgency"){
        selectModal.classList.remove("option");
        selectModal.children[0].selected = true;
    };

});


function showTasks (arr) {
    boardForToday.innerHTML = boardForTheWeek.innerHTML = boardForTheMonth.innerHTML = "";
    arr.forEach(element => {
        let task = `<div class="task" id="${element.id}">
        <p class="titleTask">${element.title}</p>
        <p class="textTask">${element.text}</p>
        <div class="buttonTask">
            <select name="select" class="selectTask">
                <option value="urgency" selected disabled>Move</option>
                <option value="today" >Tasks for today</option>
                <option value="week" >Tasks for week</option>
                <option value="month" >Tasks for the month</option>
            </select>
            <input type="button" class="deleteTask" value="Delete">
        </div>
    </div>`;
    switch (element.urgency){
        case "today" : boardForToday.insertAdjacentHTML("beforeend", task);
        break
        case "week" : boardForTheWeek.insertAdjacentHTML("beforeend", task);
        break
        case "month" : boardForTheMonth.insertAdjacentHTML("beforeend", task);
        break
        default : console.error(error);
    }
    });

    
    deleteTheSelectedTask();
    moveSelectedTask();
}

let haveAllTasks = JSON.parse(sessionStorage.allTasks)

showTasks(haveAllTasks);


function deleteTheSelectedTask() {
    let deleteTask = document.getElementsByClassName("deleteTask");
    [...deleteTask].forEach(element => {
        element.addEventListener("click", (e) => {
            let i = e.target.parentElement.parentElement.id;
            let haveAllTasks = JSON.parse(sessionStorage.allTasks);
            let index = haveAllTasks.findIndex(item => item.id === parseInt(i));
            haveAllTasks.splice(index, 1);

            sessionStorage.allTasks = JSON.stringify(haveAllTasks);

            showTasks(haveAllTasks);
    })
    });
    
};


function moveSelectedTask(){
    let [...selectedTask] = document.getElementsByClassName("selectTask");
    selectedTask.forEach(element => {
        element.addEventListener("change", (e) => {
        let whereToMove = e.target.value;
        let i = e.target.parentElement.parentElement.id;

            let haveAllTasks = JSON.parse(sessionStorage.allTasks);

            let index = haveAllTasks.findIndex(item => item.id === parseInt(i));
            haveAllTasks[index].urgency = whereToMove;

            sessionStorage.allTasks = JSON.stringify(haveAllTasks);

            showTasks(haveAllTasks);
    })
    });
};
