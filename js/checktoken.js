"use strict"
// make it so if no token it rederect to login.html (it also make it so you canot view page without taoken this is included)
if(!localStorage.getItem("addcar_token")) {
  window.location.href = "login.html";
}

