window.addEventListener("load", function(){
    const formulario = document.querySelector('form.formulario-login');
    const email = document.querySelector("#email");
    const password =  document.querySelector("#password");
    const alerta = document.querySelector("div.errores ul");
    
    email.focus();

    function validarEmail() {
        const expReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return expReg.test(email.value);
    }

    function mostrarError(mensaje) {
        alerta.innerHTML += "<li>" + mensaje + "</li>";
        email.classList.add("invalid");
        password.classList.add("invalid")
    }

    function limpiarErrores() {
        alerta.innerHTML = "";
        email.classList.remove("invalid");
        password.classList.remove("invalid");
    }

    email.addEventListener("blur", function(e){
        limpiarErrores();
        if(email.value.trim() === ""){
            mostrarError("El campo email es obligatorio");
        } else if (!validarEmail()) {
            mostrarError("El formato del email es inválido");
        }
    });

    password.addEventListener("blur", function(e){
        limpiarErrores();
        if(password.value.trim() === ""){
            //alerta.innerHTML += "<li>El campo password es obligatorio</li>";
            //password.classList.add("invalid");
            mostrarError("El campo password es obligatorio")
        }
    });
    // formulario.addEventListener('submit',function(e){
    //     Swal.fire("bienvenido!"); 
    // })
   
});
console.log("llego a la terminal?")

