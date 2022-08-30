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
  localStorage.setItem("user", JSON.stringify(mail.value)); // guardar mail en localstorage user
   window.location.assign("principal.html");
}


function handleCredentialResponse(response) {
   /*funcio codificar*/ 
     function decodeJwtResponse (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
  };
     const responsePayload = decodeJwtResponse(response.credential);

     console.log("ID: " + responsePayload.sub);
     console.log('Full Name: ' + responsePayload.name);
     console.log('Given Name: ' + responsePayload.given_name);
     console.log('Family Name: ' + responsePayload.family_name);
     console.log("Image URL: " + responsePayload.picture);
     console.log("Email: " + responsePayload.email);

     if (responsePayload.email.length > 0) {
      localStorage.setItem("user", JSON.stringify(responsePayload.email)); // guardar mail en localstorage user
      window.location.assign("principal.html");
     }
}