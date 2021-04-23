import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'


import { Welcome } from '../screens/welcome'
import { UserIdentification } from '../screens/UserIdentification'
import { Confirmation } from '../screens/Confirmation'
import { PlantSelect } from '../screens/PlantSelect'
import { PlantSave } from '../screens/PlantSave'
import { MyPlants } from '../screens/MyPlants'

import { TabScreen } from '../screens/TabScreen'

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
        <StackRoutes.Screen 
            name="PlantSave" 
            component={PlantSave}
        />
        <StackRoutes.Screen 
            name="TabRoutes" 
            component={TabScreen}
        />
    </StackRoutes.Navigator>
)

export default AppRoutes