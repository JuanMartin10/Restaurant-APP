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


const ResumenPedido = () => {


    // Context de pedido
    const { pedido, total, mostrarResumen } = useContext(PedidosContext)


    useEffect(() => {

        calcularTotal()
    }, [pedido])

    const calcularTotal = () => {
        let nuevoTotal = 0
        nuevoTotal = pedido.reduce((nuevoTotal, articulo) => (
            nuevoTotal + articulo.total, 0
        ))
        console.log(nuevoTotal)
    }
    return (
        <Container style={globalStyles.container}>
            <Content style={globalStyles.contain}>
                <H1 style={globalStyles.title}>Resumen Pedido</H1>

                {pedido.map(plate => {
                    const { cant, name, image, id, price } = plate
                    return (
                        <List key={id}>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail large square source={{ uri: image }} />
                                </Left>

                                <Body>
                                    <Text>{name}</Text>
                                    <Text>Cantidad: {cant}</Text>
                                    <Text>Precio: {price}€</Text>
                                </Body>
                            </ListItem>
                        </List>
                    )
                })}
            </Content>
            <Text style={globalStyles.quantity}>Total a pagar: {total} €</Text>
        </Container>
    )
}

export default ResumenPedido

const styles = StyleSheet.create({})
