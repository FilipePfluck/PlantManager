import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'


import { Welcome } from '../screens/welcome'
import { UserIdentification } from '../screens/UserIdentification'
import { Confirmation } from '../screens/Confirmation'
import { PlantSave } from '../screens/PlantSave'

import { TabScreen } from '../screens/TabScreen'

const StackRoutes = createStackNavigator()

interface RouteProps {
    shouldWelcome: boolean
}

const AppRoutes: React.FC<RouteProps> = ({shouldWelcome}) => (
    <StackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: "#FFF"
            }
        }}
    >
        {!shouldWelcome && (
            <StackRoutes.Screen 
                name="TabRoutes" 
                component={TabScreen}
            />
        )}

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
        <StackRoutes.Screen 
            name="PlantSave" 
            component={PlantSave}
        />

        {shouldWelcome && <StackRoutes.Screen 
            name="TabRoutes" 
            component={TabScreen}
        />}
    </StackRoutes.Navigator>
)

export default AppRoutes