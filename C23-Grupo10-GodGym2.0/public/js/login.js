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
            alerta.innerHTML += "<li>El campo password es obligatorio</li>";
            password.classList.add("invalid");
        }
    });
    formulario.addEventListener('submit',function(e){
        Swal.fire("bienvenido!"); 
    })
   
});
console.log("llego a la terminal?")





/*window.onload = function(){
    
    const formulario = document.querySelector('form.formulario-login');
    //const inputPassword = document.querySelector('#password')

    const todosImput = document.querySelectorAll('.input');
    const listaErrores = document.querySelector('div.errores ul');
    const errores = {};

    const isEmpty = function(elemento){
        return elemento.value == "";
    };

    const addError = function (elemento, msj) {
        errores[elemento.name] = msj;
        const child = document.querySelector(`#Error${elemento.name}`);
        const tag = document.createElement("li");
        tag.id = `Error${elemento.name}`;
        tag.innerText = msj;
        child ? listaErrores.replaceChild(tag, child) : listaErrores.appendChild(tag);
      };

    const removeError = function (elemento) {
    delete errores[elemento.name];
    const child = document.querySelector(`#Error${elemento.name}`);
    child ? contenedor.removeChild(child) : null;
  };

    const validate = function(elemento){
        if(isEmpty(elemento)){
            addError(elemento,`El campo ${elemento.name} no puede estar vacio`);
            return
        }
        removeError(elemento);
        return
    }
    const inputEmail = document.querySelector('#email');
    inputEmail.focus();
    


    formulario.addEventListener('submit',function(e){
        todosImput.forEach(elemento =>{
            validate(elemento);
        })
        if(Object.keys(errores).length > 0){
            e.preventDefault();
        }
    })

    
}
console.log('esto es un archico del front')*/