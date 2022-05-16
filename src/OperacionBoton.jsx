import React from 'react'
import { ACCIONES } from './App'


function OperacionBoton({dispatch, operacion}) {
  return (

    <button onClick={() =>{ dispatch({type: ACCIONES.ELEGIR_OPERACION, payload:{ operacion } })} }>
    {operacion}
    </button>

    )
}

export default OperacionBoton