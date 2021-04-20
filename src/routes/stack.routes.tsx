import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'


import { Welcome } from '../screens/welcome'
import { UserIdentification } from '../screens/UserIdentification'
import { Confirmation } from '../screens/Confirmation'

const StackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => (
    <StackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: "#FFF"
            }
        }}
    >
        <StackRoutes.Screen 
            name="welcome" 
            component={Welcome}
        />
        <StackRoutes.Screen 
            name="UserIdentification" 
            component={UserIdentification}
        />
        <StackRoutes.Screen 
            name="Confirmation" 
            component={Confirmation}
        />
    </StackRoutes.Navigator>
)

export default AppRoutes