window.onload = function() {
    const form = document.querySelector('.form-producto');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombreInput = document.querySelector('#actividad');
        const descripcionInput = document.querySelector('#informacion');
        const imagenInput = document.querySelector('#imagen');
        const precioInput = document.querySelector('#precio');

        // Limpiar mensajes de error anteriores
        resetError(nombreInput);
        resetError(descripcionInput);
        resetError(imagenInput);
        resetError(precioInput);

        // Validación del nombre
        if (nombreInput.value.length < 5) {
            mostrarError(nombreInput, 'El nombre debe tener al menos 5 caracteres.');
        }

        // Validación de la descripción
        if (descripcionInput.value.length < 20) {
            mostrarError(descripcionInput, 'La descripción debe tener al menos 20 caracteres.');
        }

        // Validación de la imagen
        const allowedExtensions = /\.(jpg|jpeg|png|gif)$/i;
        const imagenValor = imagenInput.value.trim().toLowerCase();
        const imagenDefault = '/images/default.webp';

        if (imagenValor && imagenValor !== imagenDefault && !allowedExtensions.test(imagenValor)) {
            mostrarError(imagenInput, 'La imagen debe ser un archivo válido (JPG, JPEG, PNG, GIF).');
        }

        // Validación del precio
        if (precioInput.value.trim() === '') {
            mostrarError(precioInput, 'El precio no debe estar vacío.');
        }

        // Si hay errores, no enviar el formulario
        if (form.querySelectorAll('.error-message').length > 0) {
            return;
        }

        // Si todas las validaciones pasan, enviar el formulario
        form.submit();
    });

    function mostrarError(input, mensaje) {
        const divError = document.createElement('div');
        divError.classList.add('error-container');

        const small = document.createElement('small');
        small.classList.add('error-message');
        small.textContent = mensaje;
        divError.appendChild(small);

        input.parentNode.appendChild(divError);
    }

    function resetError(input) {
        const divError = input.parentNode.querySelector('.error-container');
        if (divError) {
            divError.remove();
        }
    }
};