import React, { useContext, useEffect, Fragment } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import FirebaseContext from '../context/firebase/FirebaseContext'
import PedidosContext from '../context/pedidos/PedidosContext'

import {
    Container,
    Separator,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Body
} from 'native-base'
import globalStyles from '../styles/global'

const Menu = () => {

    // Context de firebase
    const { menu, getProducts } = useContext(FirebaseContext)

    // Context de pedido
    const { selectPlate } = useContext(PedidosContext)

    // Hook para redireccionar
    const navigation = useNavigation()

    useEffect(() => {
        getProducts()
    }, [])

    const showHeading = (category, idx) => {

        if (idx > 0) {
            const previousCategory = menu[idx - 1].category
            if (previousCategory !== category) {
                return (
                    <Separator style={styles.separator}>
                        <Text style={styles.separatorText}>{category}</Text>
                    </Separator>
                )

            }
        } else {
            return (
                <Separator style={styles.separator}>
                    <Text style={styles.separatorText}>{category}</Text>
                </Separator>
            )
        }

    }

    return (
        <Container style={globalStyles.container}>
            <Content style={{ backgroundColor: '#FFF' }}>
                <List>
                    {menu.map((plate, idx) => {
                        const { image, name, description, price, category, id } = plate

                        return (
                            <Fragment key={id}>
                                {showHeading(category, idx)}
                                <ListItem
                                    onPress={() => {

                                        // Eliminar propiedades del plato
                                        const { exist, ...plate2 } = plate
                                        selectPlate(plate2)
                                        navigation.navigate('DetallePlato')
                                    }}
                                >
                                    <Thumbnail large square source={{ uri: image }} />

                                    <Body>
                                        <Text>{name}</Text>
                                        <Text
                                            note
                                            numberOfLines={2}
                                        >
                                            {description}
                                        </Text>
                                        <Text>{price}</Text>
                                    </Body>
                                </ListItem>
                            </Fragment>
                        )
                    })}
                </List>

            </Content>
        </Container>
    )
}

export default Menu

const styles = StyleSheet.create({
    separator: {
        backgroundColor: '#000',
    },
    separatorText: {
        color: '#FFDA00',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})
