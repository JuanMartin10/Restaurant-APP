import React, { useReducer } from 'react'

import PedidosReducer from './PedidosReducer'
import PedidosContext from './PedidosContext'
import {
    SELECCIONAR_PRODUCTO,
    CONFIRMAR_ORDENAR_PLATO,
    MOSTRAR_RESUMEN,
    ELIMINAR_PRODUCTO,
    PEDIDO_ORDENADO
} from '../../types'

const PedidosState = props => {

    // State inicial
    const initialState = {
        pedido: [],
        plate: null,
        total: 0,
        idpedido: ''
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

    // Elimina un articulo del carrito
    const eliminarProducto = id => {
        dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: id
        })
    }
    const pedidoRealizado = id => {
        dispatch({
            type: PEDIDO_ORDENADO,
            payload: id
        })
    }

    return (
        <PedidosContext.Provider
            value={{
                pedido: state.pedido,
                plate: state.plate,
                idpedido: state.idpedido,
                selectPlate,
                guardarPedido,
                mostrarResumen,
                eliminarProducto,
                pedidoRealizado
            }}
        >
            {props.children}
        </PedidosContext.Provider>
    )
}

export default PedidosState