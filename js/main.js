//skapar variabler 
const nav = document.querySelector(".nav_ul")
const loginForm = document.querySelector("#login_form")
const carForm = document.querySelector("#addCar_form")
let carslist = document.querySelector(".ul_cars");
const regForm = document.querySelector("#register_form")
//skapar varible med en tom array 
let carsApi = [] 


//när sidan laddar kör function init
window.onload = init; 

function init() {
//när sidan läser in anropa function changeNav()
 changeNav();
//om carslist finns anropa function getcars()
 if(carslist) {

getCars();
 }
//om loginForm finns skapar addEventListener som på submit kallar function userlogin
 if(loginForm) {

    loginForm.addEventListener("submit", usersLogin)
 }
 //om carForm finns skapar addEventListener som på submit kallar function addCar
  if(carForm) {

    carForm.addEventListener("submit", addCar)
 }
 //om regForm finns skapar addEventListener som på submit kallar function regUser
 if(regForm){
     
   regForm.addEventListener("submit", regUser)
 }
}



//function som kollar om addcar_token finns i localstorage och skriver ut olika htmml beråend på det
function changeNav( ){


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
<li><a href="/register.html"><b>Registrera</b></a></li>
    
    `
    }
    //skapar variable
let logout = document.querySelector("#logout_button")

//om logout så kan man trycka på den för att ta bort addcar_token och sedan skicka den dig till login.html
if(logout) {
logout.addEventListener("click", () => {

    localStorage.removeItem("addcar_token")
    window.location.href = "login.html";
}

)

}
}
//function som gör att man kan logga in på sidan med ett post begären till ett api
async function usersLogin(event)  {
    // gör att form inte ladda om sidan
    event.preventDefault();
         // skapar varibler som tar input value 
    let userInput = document.getElementById("username").value;
    let passwordInput =  document.getElementById("password").value;

    if(!userInput || !passwordInput ) {
       console.log("användarnam eller lösenord kan inte vara tomt")
     return
    }
      // skapar ett object med username och password 
    let user = {
      username: userInput,
      password: passwordInput

    }
    try{  // gör ett post begäran till http://127.0.0.1:3002/api/login som är ett api i backend delen
    const resp = await fetch ("http://127.0.0.1:3002/api/login", {
method : "POST",
headers:{
"content-type": "application/json"

} ,

// skapar en Json sträng av user object
body: JSON.stringify(user) 
    })
if(resp.ok) {
    // om inloggning lyckas så skapas addcar_token i localStorage. skicka dig sen till cars.html
    const data = await resp.json();
  localStorage.setItem("addcar_token", data.response.token);

  window.location.href = "cars.html";

} else {

    throw error;
}
 
    } catch{
        console.log("fel användarnamn eller lösenord")
    }

}

//function som gör att man kan lägga till bil om du är inloggad och har addcar_token med ett post begären till ett api
async function addCar(event) {
   // gör att form inte ladda om sida
        event.preventDefault();
   // skapar varibler som tar input value 
    let carBrandInput = document.getElementById("carbrand").value;
    let carModelInput =  document.getElementById("carmodel").value;
   let  priceInput =  document.getElementById("price").value;
    let yearInput =  document.getElementById("year").value;

    if(!carBrandInput || !carModelInput ||!priceInput ||!yearInput ) {
       console.log("måste fylla i alla fält")
     return
    }
      // skapar ett object med carbrand,carmodel,price och year 
    let car = {
      carbrand: carBrandInput,
      carmodel: carModelInput,
      price:priceInput,
      year:yearInput

    }
   // skapar ett varibler som hämtar in addcar_token från localStorage
const token = localStorage.getItem("addcar_token")
    // gör ett post begäran och skicka med token till http://127.0.0.1:3002/api/cars som är ett api i backend delen
    try{
    const resp = await fetch ("http://127.0.0.1:3002/api/cars", {
method : "POST",
headers:{
"content-type": "application/json",
"Authorization": "Bearer " + token


} ,   // skapar en Json sträng av car object
body: JSON.stringify(car) 
    })
if(resp.ok) {
    const data = await resp.json();

    console.log(data);

} else {

    throw error;
}

 


    } catch (error){
        console.log("Något blev fel" + error );

    }
    
}

//function som hämtar data från http://127.0.0.1:3002/api/cars och lagra i tom array carsApi
async function getCars()  {
    const resp = await fetch("http://127.0.0.1:3002/api/cars")

    carsApi = await resp.json()

  


    loadCars()


}

/*function som skrivar ut data från carsApi i en lista och loppar igenom alla entries som finns.
Detta blir:

<section class="section_cars">
<ul class="ul_cars">
<li> Bilens märke:${car.carbrand}, modellen: ${car.carmodel}, kostar: ${car.price}, från år: ${car.year}. </li>

</ul>
</section>



*/
function loadCars() {
    let cars = carsApi

 console.log(cars)




 cars.forEach(car => {
 let liEl = document.createElement("li")
 let carInfoEl = document.createTextNode(`Bilens märke:${car.carbrand}, modellen: ${car.carmodel}, kostar: ${car.price}, från år: ${car.year}. `)
 carslist.appendChild(liEl)
liEl.appendChild(carInfoEl )

 })

}
//function som gör att man kan Registrera dig på sidan med ett post begären till ett api
async function regUser(event) {
    
 // gör att form inte ladda om sida
  event.preventDefault();
   // skapar varibler som tar input value 

    let regusenameInput = document.getElementById("username").value;
    let regpasswordInput =  document.getElementById("password").value;


    if(!regusenameInput || !regpasswordInput  ) {
       console.log("måste fylla i alla fält")
     return
    }
          // skapar ett object med username och password

    let reg = {
      username: regusenameInput,
      password: regpasswordInput
    }

// gör ett post begäran till http://127.0.0.1:3002/api/register som är ett api i backend delen
    try{
    const resp = await fetch ("http://127.0.0.1:3002/api/register", {
method : "POST",
headers:{
"content-type": "application/json",

} ,   // skapar en Json sträng av reg object
body: JSON.stringify(reg) 
    })
     // om Registrera skicka dig till login.html
if(resp.ok) {
    const data = await resp.json();

   window.location.href = "login.html";

} else {

    throw error;
}

 


    } catch (error){
        console.log("Något blev fel" + error );

    }




}
