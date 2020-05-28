import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Image, Alert } from 'react-native'

import {
    Container,
    Content,
    Form,
    Button,
    H1,
    Text,
    Body,
    Card,
    Icon,
    CardItem,
    Input,
    Grid,
    Col,
    Footer,
    FooterTab
} from 'native-base'
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'

import PedidosContext from '../context/pedidos/PedidosContext'


const FormularioPlato = () => {
    // State de las cantidades
    const [cant, setCant] = useState(1)
    const [total, setTotal] = useState(0)

    const navigation = useNavigation()
    useEffect(() => {
        calculateTotal()
    }, [cant])

    // Context
    const { plate, guardarPedido } = useContext(PedidosContext)
    const { price } = plate

    // Calcula el total del plato * cantidad
    const calculateTotal = () => {
        const totalPay = price * cant
        setTotal(totalPay)
    }



    const decrOne = () => {
        if (cant > 1) {

            const newCant = parseInt(cant) - 1
            setCant(newCant)
        }

    }

    const incrOne = () => {
        const newCant = parseInt(cant) + 1
        setCant(newCant)
    }

    const confirmOrder = () => {
        Alert.alert(
            '¿Deseas confirmar tu pedido?',
            'Un pedido confirmado ya no se podrá modificiar',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        // Almacenar el pedido al pedido principal
                        const pedido = {
                            ...plate,
                            cant,
                            total
                        }
                        guardarPedido(pedido)
                        //Navegar al resumen
                        navigation.navigate('ResumenPedido')
                    }
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        )
    }

    return (
        <Container>
            <Content>
                <Form>
                    <Text style={globalStyles.title}>Cantidad</Text>
                </Form>
                <Grid>
                    <Col>
                        <Button
                            props
                            dark
                            style={{ height: 80, justifyContent: 'center' }}
                            onPress={() => decrOne()}>
                            <Text style={{ fontSize: 40 }}>-</Text>
                        </Button>
                    </Col>

                    <Col>
                        <Input
                            style={{ textAlign: 'center', fontSize: 20 }}
                            value={cant.toString()}
                            keyboardType="numeric"
                            onChangeText={(cant) => calculateCant(cant)}
                        />
                    </Col>

                    <Col>
                        <Button
                            props
                            dark
                            style={{ height: 80, justifyContent: 'center' }}
                            onPress={() => incrOne()}>

                            <Text style={{ fontSize: 40 }}>+</Text>
                        </Button>
                    </Col>
                </Grid>
                <Text style={globalStyles.quantity}>Total: {total}€</Text>
            </Content>

            <Footer>
                <FooterTab>
                    <Button style={globalStyles.button}
                        onPress={() => confirmOrder()}
                    >
                        <Text style={globalStyles.buttonText}>
                            Agregar al pedido
                        </Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    )
}

export default FormularioPlato

const styles = StyleSheet.create({})
