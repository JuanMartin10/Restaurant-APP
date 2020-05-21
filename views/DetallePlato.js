import React, { useContext } from 'react'
import { StyleSheet, Image } from 'react-native'
import {
    Container,
    Content,
    Footer,
    FooterTab,
    Button,
    H1,
    Text,
    Body,
    Card,
    CardItem,

} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global'

import PedidosContext from '../context/pedidos/PedidosContext'

const DetallePlato = () => {
    // Context de pedido
    const { plate } = useContext(PedidosContext)
    const { name, image, description, price } = plate

    const navigation = useNavigation()

    return (
        <Container style={globalStyles.container}>
            <Content style={globalStyles.contain}>
                <H1 style={globalStyles.title}>{name}</H1>

                <Card>
                    <CardItem>
                        <Body>
                            <Image style={globalStyles.image} source={{ uri: image }} />
                            <Text style={{ marginTop: 20 }}>{description}</Text>
                            <Text style={globalStyles.quantity}>Precio: {price} €</Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>

            <Footer>
                <FooterTab>
                    <Button style={globalStyles.button}
                        onPress={() => navigation.navigate('FormularioPlato')}
                    >
                        <Text style={globalStyles.buttonText}>
                            Ordenar Platos
                        </Text>
                    </Button>
                </FooterTab>
            </Footer>

        </Container>
    )
}

export default DetallePlato

const styles = StyleSheet.create({})
