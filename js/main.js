const nav = document.querySelector(".nav_ul")

window.onload = init; 

function init() {

 changeNav();

}


function changeNav( ){
//localStorage.setItem("addcar_token", "testtest")

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


