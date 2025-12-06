import { useState } from "react";
import '../styles/FormularioCrearCliente.css'


function FormularioCrearCliente({ guardarCliente, mostrarForm }) {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        telefono: ''
    });

    const [error, setError] = useState('');

    const manejadorCambio = (e) => {
        const { name, value } = e.target;
        setDatosForm(datosPrevios => ({
            ...datosPrevios,
            [name]: value
        }));
        setError('');
    }

    const manejadorEnvio = (e) => {
        e.preventDefault();

        const nombreSanitizado = datosForm.nombre.trim();
        const telefonoSanitizado = datosForm.telefono.trim();

        if (!nombreSanitizado || !telefonoSanitizado) {
            setError("Debes rellenar el nombre y el teléfono");
        }


        const datosClientes = {
            nombre: nombreSanitizado,
            telefono: telefonoSanitizado,
        }


        guardarCliente(datosClientes);
        setDatosForm({
            nombre: '',
            telefono: ''
        });
        mostrarForm(false);
    }

    return (
        <div className="formulario-modal-overlay">
            <form className="formulario-crear-cliente" onSubmit={manejadorEnvio}>
                <h3>Nuevo Cliente</h3>

                {error && <p className="mensaje-error">{error}</p>}

                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Nombre completo"
                        required
                        value={datosForm.nombre}
                        onChange={manejadorCambio}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="telefono">Teléfono:</label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        placeholder="Ej: 644123123"
                        required
                        value={datosForm.telefono}
                        onChange={manejadorCambio} />
                </div>

                <div className="form-actions">
                    <button type="submit" className="boton-guardar">
                        Guardar Cliente
                    </button>
                    <button
                        type="button"
                        className="boton-cancelar"
                        onClick={() => mostrarForm(false)}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );

}

export default FormularioCrearCliente;