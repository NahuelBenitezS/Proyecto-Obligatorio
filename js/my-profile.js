let email = document.getElementById("email");
let formPerfil = document.getElementById("formPerfil");
let firstName = document.getElementById("firstName");
let secondName = document.getElementById("secondName");
let firstSurname = document.getElementById("firstSurname");
let secondSurname = document.getElementById("secondSurname");
let phone = document.getElementById("phone");
let imgProfile = document.getElementById("imgProfile");
let img = document.getElementById("img");
let data = {};
datauser = JSON.parse(localStorage.getItem(user));
email.value = localStorage.getItem("user");

// mostrar datos guardados
if (datauser !== null) {
  firstName.value = datauser.firstName;
  secondName.value = datauser.secondName;
  firstSurname.value = datauser.firstSurname;
  secondSurname.value = datauser.secondSurname;
  phone.value = datauser.phone;
  //imagen del gmail
  img.src = localStorage.getItem("image");
  if (datauser.imgProfile !== "") {
    img.src = datauser.imgProfile;
  } else {
  }
}

formPerfil.addEventListener("submit", saveChanges);

// guardar datos en el localStorage con el nombre de usuario
function saveChanges() {
  data.firstName = firstName.value;
  data.secondName = secondName.value;
  data.firstSurname = firstSurname.value;
  data.secondSurname = secondSurname.value;
  data.phone = phone.value;
  data.email = email.value;

  reader.readAsDataURL(imgProfile.files[0]);

 
}
const reader = new FileReader();
reader.onloadend = function (event) {
    data.imgProfile = event.target.result;
    img.src = event.target.result;
    localStorage.setItem(user, JSON.stringify(data));
  };
