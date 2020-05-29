import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Alert } from 'react-native'

import {
    Container,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Button,
    H1,
    Footer,
    FooterTab,
} from 'native-base'
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'

import PedidosContext from '../context/pedidos/PedidosContext'
import firebase from '../firebase'



const ResumenPedido = () => {

    const navigation = useNavigation()

    // Context de pedido
    const { pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } = useContext(PedidosContext)


    useEffect(() => {

        calcularTotal()
    }, [pedido])

    const calcularTotal = () => {
        let nuevoTotal = 0
        nuevoTotal = pedido.reduce((nuevoTotal, articulo) => (
            nuevoTotal + articulo.total, 0)
        )
        mostrarResumen(nuevoTotal)
    }
    // Redireccion al progreso del pedido
    const progresoPedido = () => {
        Alert.alert(
            'Revisa tu pedido',
            'Una vez que realizas tu pedido no podrás cambiarlo',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        // Crear un objeto
                        const pedidoObj = {
                            tiempoentrega: 0,
                            completado: false,
                            total: Number(total),
                            orden: pedido, //array
                            creado: Dat.now()
                        }

                        // Escribir en firebase
                        try {
                            const pedido = await firebase.db.collection('ordenes').add(pedidoObj)

                            pedidoRealizado(pedido.id)

                            navigation.navigate('ProgresoPedido')
                        } catch (error) {
                            console.log(error)
                        }
                    }
                },
                { text: 'Revisar', style: 'cancel' }
            ]
        )

    }
    const confirmarEliminacion = id => {
        Alert.alert(
            'Deseas elimianr este articulo?',
            'Una vez eliminado no se puede recuperar',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        // Eliminar del state
                        eliminarProducto(id)

                    }
                },
                { text: 'Cancelar', style: 'cancel' }
            ]
        )
    }
    return (
        <Container style={globalStyles.container}>
            <Content style={globalStyles.contain}>
                <H1 style={globalStyles.title}>Resumen Pedido</H1>

                {pedido.map((plate, idx) => {
                    const { cant, name, image, id, price } = plate
                    return (
                        <List key={id + idx}>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail large square source={{ uri: image }} />
                                </Left>

                                <Body>
                                    <Text>{name}</Text>
                                    <Text>Cantidad: {cant}</Text>
                                    <Text>Precio: {price}€</Text>
                                    <Button
                                        onPress={() => confirmarEliminacion(id)}
                                        full
                                        danger
                                        style={{ marginTop: 20 }}
                                    >
                                        <Text style={[globalStyles.buttonText, { color: '#FFF' }]}> </Text>
                                    </Button>
                                </Body>
                            </ListItem>
                        </List>
                    )
                })}
                <Text style={globalStyles.quantity}>Total a pagar: {total} €</Text>
                <Button
                    onPress={() => navigation.navigate('Menu')}
                    style={[globalStyles.button, { marginTop: 30 }]}
                    full
                    dark
                >
                    <Text style={[globalStyles.buttonText, { color: 'FFF' }]}>Ordenar Pedido</Text>
                </Button>

            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        onPress={() => progresoPedido()}
                        style={[globalStyles.button, { marginTop: 30 }]}
                        full
                    >
                        <Text style={globalStyles.buttonText}>Ordenar Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    )
}

export default ResumenPedido

const styles = StyleSheet.create({})
