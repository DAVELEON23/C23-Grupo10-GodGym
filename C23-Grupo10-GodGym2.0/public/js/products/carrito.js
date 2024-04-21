window.addEventListener("load", function(){
   


    // Selecciona todos los checkboxes
    const checkboxes = document.querySelectorAll('.check');
    
    // Selecciona el elemento donde se mostrará el total
    const totalPrecio = document.querySelector('.total');
    
    // Selecciona la lista de compra
    const listaProductos = document.querySelector('.lista-productos');

    // Añade un event listener a cada checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            let total = 0;
            let lista = '';

            // Recorre todos los checkboxes para sumar los precios de los seleccionados
            checkboxes.forEach(cb => {
                if (cb.checked) {
                    total += parseFloat(cb.getAttribute('data-precio'));
                    lista += `<li>${cb.getAttribute('data-producto')}</li>`;
                }
            });

            // Muestra el total en el elemento correspondiente
            totalPrecio.textContent = total.toFixed();
            
            // Muestra la lista de productos seleccionados
            listaProductos.innerHTML = lista;
        });
    });


 
})
document.querySelector('.boton-finalizar-compra').addEventListener('click', function() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: "¿Estás seguro que te queres suscribir?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, me suscribo!",
        cancelButtonText: "No, me equivoque",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
                title: "¡Ahora estas suscripto a GOD GYM!",
                text: "Tu compra se ha realizado con éxito.",
                icon: "success"
            });

            // Redirige a otra vista después de 3 segundos
            setTimeout(() => {
                window.location.href = "http://localhost:3000/";
            }, 3000);
            
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "Tu compra ha sido cancelada :)",
                icon: "error"
            });
        }
    });
});
