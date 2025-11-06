import { useState } from 'react'
import './App.css'
import ListaClientes from './components/ListaClientes';
import Busqueda from './components/Busqueda';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ListaClientes />
      <Busqueda />
    </>
  )
}

export default App;
