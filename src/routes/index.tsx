import React, { useEffect, useState } from 'react'
import { StatusBar, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import StackRoutes from './stack.routes'
import Load from '../components/Load'

import { useTheme } from '../context/ThemeContext'

const Routes = () => {
    const { theme, isLoadingTheme } = useTheme()
    
    const [isLoadingName, setIsLoadingName] = useState(true)
    const [shouldWelcome, setShouldWelcome] = useState(true)

    useEffect(()=>{
        AsyncStorage.getItem('@plantmanager:user').then(response => {
            console.log('response', response)
            if(response){
                setShouldWelcome(false)
            }
            setIsLoadingName(false)
        })
    },[])

    return (isLoadingTheme || isLoadingName) ? <Load/> : (
        <NavigationContainer>
            <StatusBar 
                barStyle={theme.title === 'dark' ? 'light-content' : "dark-content" }
                backgroundColor={theme.colors.background}
            />
            <SafeAreaView style={{flex: 1}}>
                <StackRoutes shouldWelcome={shouldWelcome}/>
            </SafeAreaView>
        </NavigationContainer>
    )
}

export default Routes