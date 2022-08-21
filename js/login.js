const ingresar = document.getElementById("ingresar");
const password = document.getElementById("password");
const mail = document.getElementById("email");
const mail_error = document.getElementById("email_error");
const pass_error = document.getElementById("pass_error");

function login() {
  if (mail.value.length <= 0) {
   mail.style.border = "1px solid red";
   mail_error.style.display = "block";
   return;
  }
  if (password.value.length <= 0) {
    password.style.border = "1px solid red";
    pass_error.style.display = "block";
    return;
  }
   window.location.assign("principal.html");
}


function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  if (profile.getEmail().value.length > 0) {
    window.location.assign("principal.html");
   }
}