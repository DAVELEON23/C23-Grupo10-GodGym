window.addEventListener("load",function(){

const nombre = document.querySelector("#nombre");
const apellido = document.querySelector('[name=apellido]');
const email = document.querySelector('[name=email]');
const password = document.querySelector('[name=password]');
const formulario = document.querySelector(".formulario-register");

const validacion = (e) => {
    const field = e.target;
    const fieldValue = e.target.value;
    if(fieldValue.trim().length === 0){
        field.classList.add("invalid");
        field.nextElementSibling.classList.add("errores");
        field.nextElementSibling.innerText = `${field.name} es requerido`

    }else{
        field.classList.remove("invalid");
        field.nextElementSibling.classList.remove("errores");
        field.nextElementSibling.innerText = "";
    }
}

const validacionEmail =  e => {
    const field = e.target;
    const fieldValue = e.target.value;
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (fieldValue.trim().length > 5 && !regex.test(fieldValue)) {
        field.classList.add("invalid");
        field.nextElementSibling.classList.add("errores");
        field.nextElementSibling.innerText = " Ingrese un formato de email valido"

    }else{
        field.classList.remove("invalid");
        field.nextElementSibling.classList.remove("errores");
        field.nextElementSibling.innerText = ""
    }
  }

nombre.addEventListener("blur",validacion);

apellido.addEventListener("blur",validacion);

 email.addEventListener("blur",validacion);

 //email.addEventListener("input",validacionEmail)

 password.addEventListener("blur",validacion);



})