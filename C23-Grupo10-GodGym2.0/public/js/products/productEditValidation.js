        document.addEventListener('DOMContentLoaded', function() {
        
        
            const form = document.querySelector('.form-producto');

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const nombre = document.querySelector('#actividad');
            const descripcion = document.querySelector('#informacion');
            const imagen = document.querySelector('#imagen');
            const precio = document.querySelector('#precio');

            // Limpiar mensajes de error anteriores
            resetError(nombre);
            resetError(descripcion);
            resetError(imagen);
            resetError(precio);

            // Validación del nombre
            if (nombre.value.length < 5) {
                mostrarError(nombre, 'El nombre debe tener al menos 5 caracteres.');
            }

            // Validación de la descripción
            if (descripcion.value.length < 20) {
                mostrarError(descripcion, 'La descripción debe tener al menos 20 caracteres.');
            }

            // Validación de imagen
            const allowedExtensions = /\.(jpg|jpeg|png|gif)$/i;
            const imagenValor = imagen.value.trim().toLowerCase();
            const imagenDefault = '/images/default.webp';

            if (imagenValor && imagenValor !== imagenDefault && !allowedExtensions.test(imagenValor)) {
                mostrarError(imagen, 'La imagen debe ser un archivo válido (JPG, JPEG, PNG, GIF).');
            }

            // Validación del precio
            if (precio.value.trim() == 0) {
                mostrarError(precio, 'Debes colocar un precio!');
            }

            // Si hay errores, no enviar el formulario
            if (form.querySelectorAll('.error-container').length > 0) {
                return;
            }

            // Si todo esta ok, enviar formulario
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
    });

