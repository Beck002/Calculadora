import React  from 'react';
import  {useReducer} from 'react';
import NumBoton from './NumBoton'
import OperacionBoton from './OperacionBoton';


export const ACCIONES = {
    LIMPIAR: 'limpiar',
    VER_RESULTADO:    'ver-resultado',
    BORRAR_DIGITO:    'borrar-digito',
    AGREGAR_DIGITO:   'agregar-digito',
    ELEGIR_OPERACION: 'elegir-operacion',
}

function reducer( state, { type, payload} ) {
    
    switch (type) {
        case ACCIONES.AGREGAR_DIGITO:

            if(state.sobrescribir){
                return{
                    ...state,
                    cuentaActual: payload.digito,
                    sobrescribir: false,
                }
            }
            if ( payload.digito === '0' && state.cuentaActual === '0') {
                return state
            }
            if ( payload.digito === '.' && state.cuentaActual.includes('.' )) {
                return state
            }

            return{
                ...state, 
                cuentaActual: `${ state.cuentaActual || ''}${payload.digito}`
            }
        
        case ACCIONES.ELEGIR_OPERACION: 

            if( state.cuentaActual == null && state.cuentaPrevia == null){
                return state
            }; 
            
            if(state.cuentaActual == null) {
                return{
                    ...state,
                    operacion: payload.operacion,
                }
            }

            if(state.cuentaPrevia == null ){

                return{
                    ...state,
                    operacion: payload.operacion, 
                    cuentaPrevia: state.cuentaActual,
                    cuentaActual: null,
                }
            }

            return{
                ...state,
                cuentaPrevia: evaluar(state),
                operacion: payload.operacion,
                cuentaActual: null

            }

            break;

        case ACCIONES.LIMPIAR: 
            return{}
        
        case ACCIONES.BORRAR_DIGITO: 

            if(state.sobrescribir){
                return{
                    ...state,
                    sobrescribir: false,
                    cuentaActual: null,
                }
            }
            if (state.cuentaActual == null) return state;
            if (state.cuentaActual.length === 1) {
                return{
                    ...state,
                    cuentaActual: null
                } 
            };
            return{
                ...state,
                cuentaActual: state.cuentaActual.slice(0,-1)
            } 


        case ACCIONES.VER_RESULTADO: 
            
            if(
                state.operacion    == null || 
                state.cuentaActual == null || 
                state.cuentaPrevia == null
            ){
                return state
            }

            return{
                ...state,
                sobrescribir: true,
                cuentaPrevia: null,
                operacion: null,
                cuentaActual: evaluar(state)

            }
        default:
            break;
    }
}

const evaluar = ({ cuentaActual, cuentaPrevia, operacion})=>{
    const prev = parseFloat(cuentaPrevia);
    const actual = parseFloat(cuentaActual);

    if (isNaN(prev) || isNaN(actual)) {
        return '';
    }
    
    let calculo = "";

    switch (operacion) {
        case "+":
            calculo = prev + actual;
            break;
        case "-":
            calculo = prev - actual;
            break;
    
        case "/":
            calculo = prev / actual;
            break;
    
        case "*":
            calculo = prev * actual;
            break;
    
        default:
            break;
    }

    return calculo.toString()

}


const PUNTOS_COMAS = new Intl.NumberFormat('es-us', {
    maximumFractionDigits: 0,
})

const formatoOperador = ( operador )=>{

    if( operador == null ) return
    const [ int, decimal ] = operador.split('.')
    if ( decimal == null) return PUNTOS_COMAS.format(int)
    return `${PUNTOS_COMAS.format(int)}.${decimal}`
} 

export const App = () => {

    
    const [{ cuentaPrevia, cuentaActual, operacion }, dispatch] = useReducer(reducer, {})

    return (

        <div className="calculadora-grid">
            <div className="output"> 
                <div className="cuentaPrevia">{formatoOperador(cuentaPrevia)}{operacion}</div>
                <div className="cuentaActual">{formatoOperador(cuentaActual)}</div> 
            </div>
            <button className="span-dos" onClick={()=> dispatch({type: ACCIONES.LIMPIAR})}>AC</button>
            <button onClick={()=> dispatch({type: ACCIONES.BORRAR_DIGITO})}>DEL</button>
            <OperacionBoton operacion="/" dispatch={dispatch}/>
            <NumBoton digito="1" dispatch={dispatch}/>
            <NumBoton digito="2" dispatch={dispatch}/>          
            <NumBoton digito="3" dispatch={dispatch}/>
            <OperacionBoton operacion="*" dispatch={dispatch}/>
            <NumBoton digito="4" dispatch={dispatch}/>
            <NumBoton digito="5" dispatch={dispatch}/>
            <NumBoton digito="6" dispatch={dispatch}/>
            <OperacionBoton operacion="+" dispatch={dispatch}/>
            <NumBoton digito="7" dispatch={dispatch}/>
            <NumBoton digito="8" dispatch={dispatch}/>
            <NumBoton digito="9" dispatch={dispatch}/>
            <OperacionBoton operacion="-" dispatch={dispatch}/>

            <NumBoton digito="." dispatch={dispatch}/>
            <NumBoton digito="0" dispatch={dispatch}/>
            <button className="span-dos" onClick={()=> dispatch({type: ACCIONES.VER_RESULTADO})} >=</button>
        </div>
    
    )
}
