import React from 'react'
import { useState } from 'react'


function Busqueda({ clientesIniciales }) {
    const [campoBusqueda, setCampoBusqueda] = useState("");

    const cambioInput = (e) => {
        setCampoBusqueda(e.target.value);
    }

    const clientesFiltrados = clientesIniciales.filter((cliente) => {
        const terminoBuscado = campoBusqueda.toLowerCase();

        // Si el campo de búsqueda está vacío no se muestra ningún cliente
        if (terminoBuscado === "") {
            return false;
        }

        const nombreCliente = cliente.nombre.toLowerCase();
        const telefonoCliente = cliente.telefono.toLowerCase();

        return (nombreCliente.includes(terminoBuscado) || telefonoCliente.includes(terminoBuscado));
    });

    return (
        <div>
            <h2>Busca al cliente que quieres encontrar: </h2>
            <input type="text" value={campoBusqueda} onChange={cambioInput} />

            <div>
                <h3>Resultado de la búsqueda:</h3>
                <ul>
                    {clientesFiltrados.length > 0 ? (
                        clientesFiltrados.map((cliente) => (
                            <li key={cliente.id}>
                                {cliente.nombre} - {cliente.telefono}
                            </li>
                        ))
                    ) : (
                        <p>
                            No hay clientes que coincidan con la búsqueda.
                        </p>
                    )}
                </ul>

            </div>
        </div>
    );
}

export default Busqueda;