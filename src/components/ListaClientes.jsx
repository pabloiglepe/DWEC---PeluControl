import React from 'react'
import { useState } from 'react'

function ListaClientes() {
    
    // ARRAY DE CLIENTES
    const clientesIniciales = [
        { id: 1, nombre: "Laura González", telefono: "644123123" },
        { id: 2, nombre: "Carlos Ruiz", telefono: "655321321" },
        { id: 3, nombre: "Marta Pérez", telefono: "699112233" },
    ];


    return (
        <div>
            {/* LISTA COMPLETA DE CLIENTES */}
            <h1>Lista completa de clientes: </h1>
            <ul>
                {clientesIniciales.map((cliente) => (
                    <li key={cliente.id}>{cliente.nombre} - {cliente.telefono}</li>
                ))}
            </ul>
        </div>
    );
}

export default ListaClientes;