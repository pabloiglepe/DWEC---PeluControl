import { useState } from 'react'
import { arrayClientes } from '../assets/clientes';
import Busqueda from './Busqueda';
import '../styles/ListaClientes.css'
import FormularioCrearCliente from './FormularioCrearCliente';


function ListaClientes() {
    const [paginaActual, setPaginaActual] = useState(1);
    const [clientesPorPagina, setClientesPorPagina] = useState(5);
    const [critOrdenacion, setCritOrdenacion] = useState({ clave: 'nombre', direccion: 'ascending' });
    const [clientes, setClientes] = useState(arrayClientes);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const agregarCliente = (datosCliente) => {
        setClientes((clientesPrevios) => {
            const maxId = clientesPrevios.length > 0 ? Math.max(...clientesPrevios.map(c => c.id)) : 0;
            const nextId = maxId + 1;

            const nuevoCliente = {
                id: nextId,
                nombre: datosCliente.nombre,
                telefono: datosCliente.telefono,
            };

            const nuevosClientes = [...clientesPrevios, nuevoCliente];

            // Calculamos la última página
            const nuevoNumTotalPaginas = Math.ceil(nuevosClientes.length / clientesPorPagina);
            setPaginaActual(nuevoNumTotalPaginas);

            return nuevosClientes;
        });
    };

    const getClientesOrdenados = () => {
        let clientesOrdenados = [...clientes];
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
        setClientesPorPagina(Number(e.target.value));
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
    const clientesDisponiblesPorpAgina = [3, 5, clientes.length];

    const clientesActuales = clientesOrdenados.slice(indicePrimerCliente, indiceUltimoCliente);

    const numTotalPaginas = Math.ceil(clientes.length / clientesPorPagina);

    return (
        <div className="lista-clientes-contenedor">
            <header className="lista-clientes-header">
                <h1>PeluControl</h1>
                <button className="boton-primario" onClick={() => setMostrarFormulario(true)}>Añadir Cliente</button>
            </header>

            {mostrarFormulario && (
                <FormularioCrearCliente
                    guardarCliente={agregarCliente}
                    mostrarForm={setMostrarFormulario}
                />
            )}

            {/* RESULTADOS POR PÁGINA */}
            <div className="control-ordenamiento">
                <div>
                    <label htmlFor="clientesPorPagina"> Clientes por página: </label>
                    <select id="clientesPorPagina" value={clientesPorPagina} onChange={manejadorResultPorPagina}>
                        {clientesDisponiblesPorpAgina.map((num) => (
                            <option key={num} value={num}>
                                {num === clientes.length ? `Todos (${num})` : num}
                            </option>
                        ))}
                    </select>
                </div>


                {/* ENCABEZADO DE ORDENAMIENTO */}
                <div className="control-ordenamiento">
                    <span style={{ marginRight: '10px' }}>Ordenar por:</span>
                    <button onClick={() => manejadorOrdenamiento('nombre')} > Nombre {indicadorDeOrden('nombre')}</button>
                    <button onClick={() => manejadorOrdenamiento('telefono')} > Teléfono {indicadorDeOrden('telefono')}</button>
                </div>
            </div>

            {/* LISTA DE CLIENTES */}
            {/* <ul>
                {clientesActuales.map((cliente) => (
                    <li key={cliente.id}>{cliente.nombre} - {cliente.telefono}</li>
                ))}
            </ul> */}

            <table className="tabla-clientes">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {clientesActuales.length > 0 ? (
                        clientesActuales.map((cliente) => (
                            <tr key={cliente.id} className="fila-cliente">
                                <td>{cliente.nombre}</td>
                                <td>{cliente.telefono}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="sin-clientes">No hay clientes para mostrar en esta página.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* CONTROL DE PAGINACIÓN */}
            <div className="control-paginacion">
                <button onClick={() => manejadorCambioPagina(paginaActual - 1)} disabled={paginaActual === 1} >
                    &larr; Anterior
                </button>

                <span className="info-paginacion">
                    Página {paginaActual} de {numTotalPaginas}
                </span>

                <button onClick={() => manejadorCambioPagina(paginaActual + 1)} disabled={paginaActual === numTotalPaginas}>
                    Siguiente &rarr;
                </button>
            </div>


            
        </div>
    );
}

export default ListaClientes;