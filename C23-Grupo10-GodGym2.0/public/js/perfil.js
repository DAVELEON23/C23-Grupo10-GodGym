window.addEventListener("load", function () {

    const nombre = document.querySelector("#nombre");
    const apellido = document.querySelector('#apellido');
    const email = document.querySelector('#email');
    
    const formulario = document.querySelector(".formulario-register");

    const validarNombre = () => {
        const fieldValue = nombre.value.trim();
        if (fieldValue.length === 0) {
            mostrarError(nombre, `${nombre.name} es requerido`);
        } else if (!entre(fieldValue.length, 5, 10)) {
            mostrarError(nombre, `${nombre.name} debe tener entre 5 y 10 caracteres`);
        } else {
            ocultarError(nombre);
        }
    };

    const validarApellido = () => {
        const fieldValue = apellido.value.trim();
        if (fieldValue.length === 0) {
            mostrarError(apellido, `${apellido.name} es requerido`);
        } else {
            ocultarError(apellido);
        }
    };

    const validarEmail = () => {
        const fieldValue = email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (fieldValue.length === 0) {
            mostrarError(email, `${email.name} es requerido`);
        } else if (!emailRegex.test(fieldValue)) {
            mostrarError(email, `Ingrese un ${email.name} válido`);
        } else {
            ocultarError(email);
        }
    };


    const mostrarError = (campo, mensaje) => {
        campo.classList.add("invalid");
        campo.nextElementSibling.classList.add("errores");
        campo.nextElementSibling.innerText = mensaje;
    };

    const ocultarError = (campo) => {
        campo.classList.remove("invalid");
        campo.nextElementSibling.classList.remove("errores");
        campo.nextElementSibling.innerText = "";
    };

    const entre = (value, min, max) => {
        return value >= min && value <= max;
    };

    nombre.addEventListener("blur", validarNombre);
    apellido.addEventListener("blur", validarApellido);
    email.addEventListener("blur", validarEmail);
    
  console.log("llegando a la vista")
  console.log(" esto es perfil js ")
});
