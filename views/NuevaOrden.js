import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Button, Text } from 'native-base'
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'

const NuevaOrden = () => {

    const navigation = useNavigation()

    return (
        <Container style={globalStyles.container}>
            <View style={[globalStyles.contain, styles.contain]}>
                <Button
                    rounded
                    block
                    style={globalStyles.button}
                    onPress={() => navigation.navigate('Menu')}
                >
                    <Text style={globalStyles.buttonText}>Crear nueva orden</Text>
                </Button>
            </View>
        </Container>
    )
}

export default NuevaOrden

const styles = StyleSheet.create({
    contain: {
        flexDirection: 'column',
        justifyContent: 'center'
    }
})
