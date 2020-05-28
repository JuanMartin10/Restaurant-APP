import {
    SELECCIONAR_PRODUCTO,
    CONFIRMAR_ORDENAR_PLATO
} from '../../types'

export default (state, action) => {
    switch (action.type) {
        case SELECCIONAR_PRODUCTO:
            return {
                ...state,
                plate: action.payload
            }
        case CONFIRMAR_ORDENAR_PLATO:
            return {
                ...state,
                pedido: [...state.pedido, action.payload]
            }
        default:
            return state
    }
}