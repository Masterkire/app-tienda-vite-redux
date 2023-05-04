const estadoInicial = {
  productos: [
    { id: 1, nombre: "Producto A" },
    { id: 2, nombre: "Producto 2" },
    { id: 3, nombre: "Producto 3" },
    { id: 4, nombre: "Producto 4" },
  ],

  carrito: [],
};

// Reducer es una funcion que se va a encargar de administrarel estado global de nuestra app.
const reducer = (estado = estadoInicial, accion) => {
  switch (accion.type) {
    case "AGREGAR_PRODUCTO_AL_CARRITO":
      const { nombre, idProductoAAgregar } = accion;

      // Si el carrito no tiene elementos entonces agregamos uno.
      if (estado.carrito.length === 0) {
        return {
          ...estado,
          carrito: [{ id: idProductoAAgregar, nombre: nombre, cantidad: 1 }],
        };
      } else {
        // De otra forma tenemos que revisar que el carrito no tenga ya el producto agregado
        // Si ya lo tiene entonces queremos analizar su valor.
        // Si no tiene el producto  entonces lo agregamos.

        // Para poder editar el arreglo tenemos que clonarlo.
        const nuevoCarrito = [...estado.carrito];

        // Comprobamos si el carrito ya tiene el ID del producto a agregar.
        const yaEstaEnCarrito =
          nuevoCarrito.filter((productoDeCarrito) => {
            return productoDeCarrito.id === idProductoAAgregar;
          }).length > 0;

        // Si ya tiene el producto entonces lo tenemos que actualizar.
        if (yaEstaEnCarrito) {
          // Para ello tenemos que buscarlo, obtener su posicion en el arreglo.
          // y en base a su posicion ya actualizamos el valor.
          nuevoCarrito.forEach((productoDeCarrito, index) => {
            if (productoDeCarrito.id === idProductoAAgregar) {
              const cantidad = nuevoCarrito[index].cantidad;
              nuevoCarrito[index] = {
                id: idProductoAAgregar,
                nombre: nombre,
                cantidad: cantidad + 1,
              };
            }
          });
        } else {
          nuevoCarrito.push({
            id: idProductoAAgregar,
            nombre: nombre,
            cantidad: 1,
          });
        }

        return {
            ...estado,
            carrito: nuevoCarrito
        }
      }

    default:
      return estado;
  }
};

export default reducer;
