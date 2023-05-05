const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

const login = `${days[new Date().getDay()]}`;
const password = `${new Date().getDate() < 10 ? "0" + (new Date().getDate()) : new Date().getDate()}${(new Date().getMonth() + 1) < 10 ? ("0" + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1)}${new Date().getFullYear()}`;

console.log(login);
console.log(password);

function checkLogo (patternLogo, value){
   return patternLogo.test(value);
}

try{
    let userName = document.getElementById("userName");
    let nameEnter = "";
    let userLogin = document.getElementById("userLogin");
    let userPassword = document.getElementById("userPassword");
    let buttonLogin = document.getElementById("buttonLogin");
    
    userName.addEventListener("change", (event) => {
        if(event.target.value.length > 2){
            userName.classList.remove("checkFalse");
            userName.classList.add("checkTrue");
            nameEnter = event.target.value;
        }else{
            userName.classList.remove("checkTrue");
            userName.classList.add("checkFalse");
        }
    });


    userLogin.addEventListener("change", (event) => {
        if(checkLogo(new RegExp("^"+login+"$"), event.target.value)){
            userLogin.classList.remove("checkFalse");
            userLogin.classList.add("checkTrue");
        }else{
            userLogin.classList.remove("checkTrue");
            userLogin.classList.add("checkFalse");
        }
    });

    userPassword.addEventListener("change", (event) => {
        if(checkLogo(new RegExp("^"+password+"$"), event.target.value)){
            userPassword.classList.remove("checkFalse");
            userPassword.classList.add("checkTrue");
        }else{
            userPassword.classList.remove("checkTrue");
            userPassword.classList.add("checkFalse");
        }
    });


    buttonLogin.addEventListener("click", () => {
        if(nameEnter.length > 2 && checkLogo(new RegExp("^"+login+"$"), userLogin.value) && checkLogo(new RegExp("^"+password+"$"), userPassword.value)){
            sessionStorage.checkLogin = true;
            sessionStorage.userName = nameEnter;
            document.location = "./board/board.html"; 
        }else{
            userLogin.classList.add("checkFalse");
            userPassword.classList.add("checkFalse");
        }
    });

}catch(error) {
}

 export  function checkLogin () {
        if(document.location.pathname === "/timeManagement/") {
            return
        }

        if (!sessionStorage.checkLogin) {
            document.location = "/timeManagement/";
        }
    }

checkLogin();

