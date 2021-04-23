import React from 'react'

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

import { MyPlants } from '../screens/MyPlants'
import { PlantSelect } from '../screens/PlantSelect'
import { View } from 'react-native'

const { Navigator, Screen } = createMaterialTopTabNavigator()

function Tabs(){
    return(

        <Navigator
        tabBarOptions={{
            style: {
                elevation: 0,
                shadowOpacity: 0,
                height: 64,
                borderWidth: 0,
                borderColor: "#fff",
                backgroundColor: "#fff"
            },
            tabStyle: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 0,
            },
            iconStyle: {
                flex: 0,
                width: 20,
                height: 20,         
            },
            labelStyle: {
                fontSize: 13,
                fontWeight: 'bold',
                marginLeft: 16,
            },
            indicatorStyle: {
                backgroundColor: '#32B768',
                height: 4
            },
            activeTintColor: "#32B768",
            inactiveTintColor: "#999591",
        }}

            swipeEnabled
            tabBarPosition='bottom'

        >
            <Screen 
                name="a" 
                component={PlantSelect}
                options={{
                    tabBarLabel:"Nova planta"
                }}
            />
            <Screen 
                name="b" 
                component={MyPlants}
                options={{
                    tabBarLabel:"Minhas plantas"
                }}
            />
        </Navigator>

    )
}

export default Tabs