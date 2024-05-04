const senha = document.getElementById("password");
const senhaConfirm = document.getElementById("password-confirm");
const errorMessageElement = document.getElementById("error-message");

function notEqual() {
    if (senha.value !== senhaConfirm.value) {
        errorMessageElement.textContent = "As senhas não são correspondem!";
    }
    else{
        errorMessageElement.textContent = ""
    }
}

notEqual();

document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    notEqual();
});
