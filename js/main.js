const nav = document.querySelector(".nav_ul")
const loginForm = document.querySelector("#login_form")

window.onload = init; 

function init() {

 changeNav();

 if(loginForm) {

    loginForm.addEventListener("submit", usersLogin)
 }
}


function changeNav( ){
    /*
localStorage.setItem("addcar_token", "testtest") */

  if(localStorage.getItem("addcar_token")) {
    nav.innerHTML = `
<li><a href="/index.html"><b>Startsida</b></a></li>
<li><a href="/cars.html"><b>Bilar</b></a></li>
<li> <a href="/login.html" id="logout_button"><b>Logga ut</b></a></li> 


    
    `

  } else {
        nav.innerHTML = `
    <li><a href="/index.html"><b>Startsida</b></a></li>
<li><a href="/login.html"><b>logga in</b></a></li>
<li><a href="/register .html"><b>Registrera</b></a></li>
    
    `
    }
let logout = document.querySelector("#logout_button")


if(logout) {
logout.addEventListener("click", () => {

    localStorage.removeItem("addcar_token")
    window.location.href = "login.html";
}

)

}
}

async function usersLogin(event)  {
    event.preventDefault();

    let userInput = document.getElementById("username").value;
    let passwordInput =  document.getElementById("password").value;

    if(!userInput || !passwordInput ) {
       console.log("användarnam eller lösenord kan inte vara tomt")
     return
    }
    
    let user = {
      username: userInput,
      password: passwordInput

    }
    try{
    const resp = await fetch ("http://127.0.0.1:3002/api/login", {
method : "POST",
headers:{
"content-type": "application/json"

} ,
body: JSON.stringify(user) 
    })
if(resp.ok) {
    const data = await resp.json();
  localStorage.setItem("addcar_token", data.token);

  window.location.href = "cars.html";

} else {

    throw error;
}

 


    } catch{
        console.log("fel användarnamn eller lösenord")

    }

}

