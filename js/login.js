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


