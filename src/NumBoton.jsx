import React from 'react'
import { ACCIONES } from './App'

// Botones de Digitos 1-2-3-4-5-6-7-8-9-0-.

export function NumBoton({ dispatch, digito}) {
  return (
    <button onClick={() =>{ dispatch({type: ACCIONES.AGREGAR_DIGITO, payload:{digito} })} }>
        {digito}
    </button>
    )
}

export default NumBoton