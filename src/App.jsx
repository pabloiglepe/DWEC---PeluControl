import { useEffect, useState } from 'react'
import './App.css'
import ListaClientes from './components/ListaClientes';
import { arrayClientes } from './assets/clientes';
import Busqueda from './components/Busqueda';


function App() {
  const [clientes, setClientes] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // PONER EN TRUE PARA MOSTRAR EL MENSAJE DE ERROR
    const fallo = false;

    const timerCargaCliente = setTimeout(() => {
      if (fallo) {
        setError(true);
      } else {
        setClientes(arrayClientes);
      }

      setCargando(false);
    }, 2000);

    return (() => {
      clearTimeout(timerCargaCliente);
    });

  }, [arrayClientes]);

  if (error) {
    return (
      <div>
        Error al cargar los datos
      </div>
    );
  }

  if (cargando) {
    return (
      <div>
        Cargando clientes...
      </div>
    );
  }

  return (
    <>
      <div className="main">

        <div className="section">
          <ListaClientes />
        </div>

        <div className="section">
          <Busqueda clientesIniciales={clientes} />
        </div>
      </div>
    </>
  )
}

export default App;
