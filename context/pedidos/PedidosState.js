import React, { useReducer } from 'react'

import PedidosReducer from './PedidosReducer'
import PedidosContext from './PedidosContext'
import { SELECCIONAR_PRODUCTO } from '../../types'

const PedidosState = props => {

    // State inicial
    const initialState = {
        pedido: [],
        plate: null
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
    return (
        <PedidosContext.Provider
            value={{
                pedido: state.pedido,
                plate: state.plate,
                selectPlate
            }}
        >
            {props.children}
        </PedidosContext.Provider>
    )
}

export default PedidosState