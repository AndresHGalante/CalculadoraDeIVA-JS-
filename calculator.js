document.addEventListener('DOMContentLoaded', function () {
    let recuperarCarrito = JSON.parse(localStorage.getItem('listaProductos'));
    let listaOrdenada = document.getElementById('listaObjetos');
    let agregarBtn = document.getElementById('agregarBtn');
    let borrarBtn = document.getElementById('borrarBtn');

    if (recuperarCarrito) {
        recuperarCarrito.forEach(function (elemento) {
            let elementoAntiguo = document.createElement('li');
            elementoAntiguo.textContent = `${elemento.nombre} - Precio sin IVA: $${elemento.precio} - Precio con IVA (21%): $${elemento.precioIva}`;
            listaOrdenada.appendChild(elementoAntiguo);
        });
    }

    function Producto(nombre, precio, precioIva) {
        this.nombre = nombre;
        this.precio = precio;
        this.precioIva = precioIva;
    }

    let carrito = [];

    function mostrarNotificacion() {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Su producto fue agregado',
            showConfirmButton: false,
            timer: 1500
        });
    }

    function agregarProducto() {
        let objetoInput = document.getElementById('objetoInput');
        let precioInput = document.getElementById('precioInput');

        let objetoTexto = objetoInput.value;
        let precioSinIVA = parseFloat(precioInput.value);

        if (objetoTexto === '' || isNaN(precioSinIVA)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, ingrese un objeto y un precio válido.'
            });
            return;
        }

        let iva = 1.21;
        let objetoIva = JSON.stringify(iva);
        let ivaRecuperado = JSON.parse(objetoIva);

        let precioConIVA = (precioSinIVA * ivaRecuperado).toFixed(2);
        let nuevoProducto = new Producto(objetoTexto, precioSinIVA, precioConIVA);

        carrito.push(nuevoProducto);

        localStorage.setItem('listaProductos', JSON.stringify(carrito));

        mostrarNotificacion();

        let nuevoElemento = document.createElement('li');
        nuevoElemento.textContent = `${objetoTexto} - Precio sin IVA: $${precioSinIVA.toFixed(2)} - Precio con IVA (21%): $${precioConIVA}`;
        listaOrdenada.appendChild(nuevoElemento);

        objetoInput.value = '';
        precioInput.value = '';
    }

    function borrarLista() {
        listaOrdenada.innerHTML = '';

        localStorage.removeItem('listaProductos');

        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'La lista de productos ha sido borrada',
            showConfirmButton: false,
            timer: 1500
        });
    }

    agregarBtn.addEventListener('click', agregarProducto);
    borrarBtn.addEventListener('click', borrarLista);
});