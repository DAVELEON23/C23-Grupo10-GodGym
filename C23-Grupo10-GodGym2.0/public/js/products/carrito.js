window.addEventListener("load", function(){
    const contenedor = document.querySelector('.contenedor-card');
    contenedor.addEventListener('click', (e)=>{
        e.preventDefault()
        if(e.target.classList.contains('boton-carrito')){
            console.log(e.target.parentElement)
        }
       
    })

    console.log("llegando a la vista")
});

