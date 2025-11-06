import React from 'react'
import { useState } from 'react'

const clientesIniciales = [
    { id: 1, nombre: "Laura González", telefono: "644123123" },
    { id: 2, nombre: "Carlos Ruiz", telefono: "655321321" },
    { id: 3, nombre: "Marta Pérez", telefono: "699112233" },
];

function Busqueda() {
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
                    {clientesFiltrados.map((cliente) => (
                        <li key={cliente.id}>
                            {cliente.nombre} - {cliente.telefono}
                        </li>
                    ))}
                </ul>

                {/* Si no se encuentran clientes se muestra un mensaje indicándolo */}
                {clientesFiltrados.length === 0 && (
                    <p>No hay clientes que coincidan con la búsqueda.</p>
                )}
            </div>
        </div>
    );
}

export default Busqueda;