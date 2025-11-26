import { useState } from 'react'
import '../styles/Busqueda.css'


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
        <div className="busqueda-contenedor">
            <h2 className="busqueda-titulo">Busca al cliente que quieres encontrar: </h2>

            <div className="input-grupo">
                <input type="text" value={campoBusqueda} onChange={cambioInput} placeholder='🔎'/>
            </div>

            <div className="resultados-seccion">
                <h3 className="resultados-titulo">Resultado de la búsqueda:</h3>
                {clientesFiltrados.length > 0 ? (
                    clientesFiltrados.map((cliente) => (
                        <div key={cliente.id} className="tarjeta-cliente">
                            <span className="cliente-nombre">
                                {cliente.nombre}
                            </span>
                            <span className="cliente-telefono">
                                📞 {cliente.telefono}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="mensaje-vacio">
                        No hay clientes que coincidan con la búsqueda.
                    </p>
                )}
            </div>
        </div>
    );
}

export default Busqueda;