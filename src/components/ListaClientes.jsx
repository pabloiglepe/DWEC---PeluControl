import { useState } from 'react'


function ListaClientes({ clientesIniciales }) {
    const [paginaActual, setPaginaActual] = useState(1);
    const [clientesPorPagina, setClientesPorPagina] = useState(5);
    const [critOrdenacion, setCritOrdenacion] = useState({ clave: 'nombre', direccion: 'ascending' });


    const getClientesOrdenados = () => {
        let clientesOrdenados = [...clientesIniciales];
        if (critOrdenacion !== null) {
            clientesOrdenados.sort((a, b) => {
                const valorA = a[critOrdenacion.clave];
                const valorB = b[critOrdenacion.clave];

                if (valorA < valorB) {
                    return critOrdenacion.direccion === 'ascending' ? -1 : 1;
                }
                if (valorA > valorB) {
                    return critOrdenacion.direccion === 'ascending' ? 1 : -1;
                }
            })
        }
        return clientesOrdenados;
    }
    const clientesOrdenados = getClientesOrdenados();

    const manejadorCambioPagina = (numPagina) => {
        if (numPagina > 0 && numPagina <= numTotalPaginas) {
            setPaginaActual(numPagina);
        }
    }

    const manejadorResultPorPagina = (e) => {
        setClientesPorPagina(e.target.value);
        setPaginaActual(1);
    }

    const manejadorOrdenamiento = (clave) => {
        let direccion = 'ascending';
        if (critOrdenacion.clave === clave && critOrdenacion.direccion === 'ascending') {
            direccion = 'descending';
        }
        setCritOrdenacion({ clave, direccion });
    };

    const indicadorDeOrden = (clave) => {
        if (critOrdenacion.clave !== clave) return null;
        return critOrdenacion.direccion === 'ascending' ? '▲' : '';
    };


    const indiceUltimoCliente = paginaActual * clientesPorPagina;
    const indicePrimerCliente = indiceUltimoCliente - clientesPorPagina;
    const clientesDisponiblesPorpAgina = [3, 5, clientesIniciales.length];

    const clientesActuales = clientesOrdenados.slice(indicePrimerCliente, indiceUltimoCliente);

    const numTotalPaginas = Math.ceil(clientesIniciales.length / clientesPorPagina);

    return (
        <div>
            <h1>Lista completa de clientes: </h1>

            {/* RESULTADOS POR PÁGINA */}
            <div>
                <label htmlFor="clientesPorPagina"> Clientes por página: </label>
                <select id="clientesPorPagina" value={clientesPorPagina} onChange={manejadorResultPorPagina}>
                    {clientesDisponiblesPorpAgina.map((num) => (
                        <option key={num} value={num}>
                            {num === clientesIniciales.length ? `Todos (${num})` : num}
                        </option>
                    ))}
                </select>
            </div>

            {/* ENCABEZADO DE ORDENAMIENTO */}
            <div>
                <button onClick={() => manejadorOrdenamiento('nombre')} > Nombre {indicadorDeOrden('nombre')}</button>
                <button onClick={() => manejadorOrdenamiento('telefono')} > Teléfono {indicadorDeOrden('telefono')}</button>
            </div>


            {/* LISTA DE CLIENTES */}
            <ul>
                {clientesActuales.map((cliente) => (
                    <li key={cliente.id}>{cliente.nombre} - {cliente.telefono}</li>
                ))}
            </ul>

            {/* CONTROL DE PAGINACIÓN */}
            <div>
                <button onClick={() => manejadorCambioPagina(paginaActual - 1)} disabled={paginaActual === 1} >
                    &larr; Anterior
                </button>

                <span>
                    Página {paginaActual} de {numTotalPaginas}
                </span>

                <button
                    onClick={() => manejadorCambioPagina(paginaActual + 1)}
                    disabled={paginaActual === numTotalPaginas}>
                    Siguiente &rarr;
                </button>
            </div>
        </div>
    );
}

export default ListaClientes;