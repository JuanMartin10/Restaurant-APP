import React, { useReducer } from 'react'

import PedidosReducer from './PedidosReducer'
import PedidosContext from './PedidosContext'
import {
    SELECCIONAR_PRODUCTO,
    CONFIRMAR_ORDENAR_PLATO,
    MOSTRAR_RESUMEN
} from '../../types'

const PedidosState = props => {

    // State inicial
    const initialState = {
        pedido: [],
        plate: null,
        total: 0
    }

    // useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(PedidosReducer, initialState)

    // Seleciona el producto que el usuario desea ordenar
    const selectPlate = (plate) => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: plate
        })
    }

    // Cuando el usuario confirma el plato
    const guardarPedido = pedido => {
        dispatch({
            type: CONFIRMAR_ORDENAR_PLATO,
            payload: pedido
        })
    }

    // Muestra el total a pagar en el resumen
    const mostrarResumen = total => {
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total
        })
    }

    return (
        <PedidosContext.Provider
            value={{
                pedido: state.pedido,
                plate: state.plate,
                selectPlate,
                guardarPedido,
                mostrarResumen
            }}
        >
            {props.children}
        </PedidosContext.Provider>
    )
}

export default PedidosState