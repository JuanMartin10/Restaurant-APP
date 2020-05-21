import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import NuevaOrden from './views/NuevaOrden'
import DetallePlato from './views/DetallePlato'
import FormularioPlato from './views/FormularioPlato'
import Menu from './views/Menu'
import ProgresoPedido from './views/ProgresoPedido'
import ResumenPedido from './views/ResumenPedido'

import FirebaseState from './context/firebase/FirebaseState'
import PedidosState from './context/pedidos/PedidosState'


const Stack = createStackNavigator()

const App = () => {
  return (
    <>
      <FirebaseState>
        <PedidosState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#FFDA00'
                },
                headerTitleStyle: {
                  fontWeight: 'bold'
                },
                headerTintColor: '#000'
              }}
            >

              <Stack.Screen
                name="NuevaOrden"
                component={NuevaOrden}
                options={{
                  title: 'Nueva Orden'
                }}
              />

              <Stack.Screen
                name="Menu"
                component={Menu}
                options={{
                  title: 'Nuestro Menu'
                }}
              />

              <Stack.Screen
                name="DetallePlato"
                component={DetallePlato}
                options={{
                  title: 'Detalle Plato'
                }}
              />

              <Stack.Screen
                name="FormularioPlato"
                component={FormularioPlato}
                options={{
                  title: 'Ordenar Plato'
                }}
              />

              <Stack.Screen
                name="ResumenPedido"
                component={ResumenPedido}
                options={{
                  title: 'Resumen Pedido'
                }}
              />

              <Stack.Screen
                name="ProgresoPedido"
                component={ProgresoPedido}
                options={{
                  title: 'Progreso del pedido'
                }}
              />


            </Stack.Navigator>
          </NavigationContainer>
        </PedidosState>

      </FirebaseState>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
