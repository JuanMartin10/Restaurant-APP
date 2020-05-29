import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Text, H1, H3, Button } from 'native-base'
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'
import PedidoContext from '../context/pedidos/PedidosContext'
import firebase from '../firebase'
import Countdown from 'react-countdown'

const ProgresoPedido = () => {

    const navigation = useNavigation()

    const { idpedido } = useContext(PedidoContext)

    const [tiempo, guardarTiempo] = useState(0)
    const [completado, guardarCompletado] = useState(false)

    useEffect(() => {
        const obtenerProducto = () => {
            firebase.db.collection('ordenes')
                .doc(idpedido)
                .onSnapshot(function (doc) {
                    guardarTiempo(doc.data().tiempoentrega)
                    guardarCompletado(doc.data().completado)
                })
        }
        obtenerProducto()

    }, [])
    const renderer = ({ minutes, seconds }) => {
        return (
            <Text style={StyleSheet.tiempo}>{minutes}:{seconds}</Text>
        )
    }
    return (
        <Container style={globalStyles.container}>
            <View style={[globalStyles.contain, { marginTop: 50 }]}>
                {tiempo === 0 && (
                    <>
                        <Text style={{ textAlign: 'center' }}>Hemos recibido tu orden...</Text>
                        <Text style={{ textAlign: 'center' }}>Estamos calculando el tiempo de entrega</Text>
                    </>
                )}

                {!completada && tiempo > 0 && (
                    <>
                        <Text style={{ textAlign: 'center' }}>Su orden estará lista en </Text>
                        <Text>
                            <Countdown
                                date={Date.now() + tiempo * 60000}
                                renderer={renderer}
                            />
                        </Text>
                    </>
                )}

                {completado && (
                    <>
                        <H1 style={styles.textoCompletado}> Orden Lista</H1>
                        <H3 style={styles.textoCompletado}>Porfavor, pase a recoger su pedido</H3>
                        <Button style={[globalStyles.button, { marginTop: 100 }]}
                            rounded
                            block
                            dark
                            onPress={() => navigation.navigate('NuevaOrden')}
                        >
                            <Text style={globalStyles.buttonText}>Comenzar una orden nueva</Text>
                        </Button>
                    </>
                )}
            </View>
        </Container>
    )
}

export default ProgresoPedido

const styles = StyleSheet.create({
    tiempo: {
        marginBottom: 20,
        fontSize: 30,
        textAlign: 'center',
        marginTop: 60,
    },
    textoCompletado: {
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20,
    }
})
