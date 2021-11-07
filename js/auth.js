const buttonAuth = document.querySelector(".button-auth");
const buttonOut = document.querySelector(".button-out");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const loginForm = document.querySelector("#loginForm");
const buttonLogin = document.querySelector(".button-login");
const inputLogin = document.querySelector("#login");
const inputPassword = document.querySelector("#password");
const userName = document.querySelector(".user-name");

const login = (user) => {
  buttonAuth.style.display = "none";
  buttonOut.style.display = "block";
  userName.style.display = "block";
  userName.textContent = user.login;
  modalAuth.style.display = "none";
};

const logout = (user) => {
  buttonAuth.style.display = "block";
  buttonOut.style.display = "none";
  userName.style.display = "none";
  userName.textContent = "";
  modalAuth.style.display = "none";

  localStorage.removeItem("user");
};

buttonAuth.onclick = () => {
  modalAuth.style.display = "flex";
};

closeAuth.onclick = () => {
  modalAuth.style.display = "none";
};

buttonOut.onclick = () => {
  logout();
};

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const user = {
    login: inputLogin.value,
    password: inputPassword.value,
  };

  if (!user.login) {
    Swal.fire({
      icon: "warning",
      title: "Уупс...",
      html: "Вы не заполнили поле <b>Login</b>",
      timer: 5000,
    });
  } else {
    localStorage.setItem("user", JSON.stringify(user));
    login(user);
  }
});

if (localStorage.getItem("user")) {
  login(JSON.parse(localStorage.getItem("user")));
}
