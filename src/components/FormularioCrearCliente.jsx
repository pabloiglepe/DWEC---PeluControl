import { useState } from "react";
import '../styles/FormularioCrearCliente.css'


function FormularioCrearCliente({ guardarCliente, mostrarForm }) {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        telefono: ''
    });

    const [error, setError] = useState('');
    const [errorCampos, setErrorCampos] = useState({});

    const validarCampos = (nombre, telefono) => {
        let esValido = true;
        const errores = {};

        if (nombre.length === 0) {
            errores.nombre = "El nombre es obligatorio";
            esValido = false;
        }

        const telefonoNumerico = telefono.replace(/[^0-9]/g, '');

        if (telefonoNumerico.length === 0) {
            errores.telefono = "El telefono es obligatorio";
            esValido = false;
        }

        if (telefonoNumerico.length < 9) {
            errores.telefono = "El telefono debe tener al menos 9 digitos y ser numérico";
            esValido = false;
        }

        setErrorCampos(errores)
        return esValido;
    }

    const manejadorCambio = (e) => {
        const { name, value } = e.target;
        setDatosForm(datosPrevios => ({
            ...datosPrevios,
            [name]: value
        }));
        setErrorCampos(prev => ({ ...prev, [name]: '' }));
        setError('')
    }

    const manejadorEnvio = (e) => {
        e.preventDefault();

        const nombreSanitizado = datosForm.nombre.trim();
        const telefonoSanitizado = datosForm.telefono.trim();

        const datosClientes = {
            nombre: nombreSanitizado,
            telefono: telefonoSanitizado,
        }

        if (!validarCampos(nombreSanitizado, telefonoSanitizado)) {
            setError('Por favor, corrige los errores en el formulario.');
            return; 
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

                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Nombre completo"
                        value={datosForm.nombre}
                        onChange={manejadorCambio} />

                    {errorCampos.nombre && <p className="error-campo">{errorCampos.nombre}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="telefono">Teléfono:</label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        placeholder="Ej: 644123123"
                        value={datosForm.telefono}
                        onChange={manejadorCambio} />

                    {errorCampos.telefono && <p className="error-campo">{errorCampos.telefono}</p>}

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