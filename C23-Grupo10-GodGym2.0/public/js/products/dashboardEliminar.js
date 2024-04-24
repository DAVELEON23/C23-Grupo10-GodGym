function deleteProduct(productId) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo!"
    }).then((result) => {
        if (result.isConfirmed) {
            // Enviar el formulario de eliminación
            document.querySelector(`form[action="/products/delete/${productId}?_method=DELETE"]`).submit();
        }
    });
}