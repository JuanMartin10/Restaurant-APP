import React, { useReducer } from 'react'

import firebase from '../../firebase'
import FirebaseReducer from './FirebaseReducer'
import FirebaseContext from './FirebaseContext'

import { OBTENER_PRODUCTOS_EXITO } from '../../types'
import _ from 'lodash'

const FirebaseState = props => {
    // State inicial
    const initialState = {
        menu: []

    }

    // useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(FirebaseReducer, initialState)

    // Funcion que se ejecuta para traer los productos de la bd
    const getProducts = () => {


        // Consultar firebase
        firebase.db
            .collection('products')
            .where('exist', '==', true) //Trae solos los que el exist es true
            .onSnapshot(handleSnapshot)

        function handleSnapshot(snapshot) {
            console.log(snapshot)
            let plates = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })

            // Ordenar por categoria con lodash
            plates = _.sortBy(plates, 'category')

            // Hay resultados de la base de datos
            dispatch({
                type: OBTENER_PRODUCTOS_EXITO,
                payload: plates
            })
        }
    }

    return (
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase,
                getProducts
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState