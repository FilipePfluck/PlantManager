import React, {createContext, useCallback, useState, useContext, useEffect} from 'react'

import { Appearance } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { ThemeProvider as StyledProvider, DefaultTheme } from 'styled-components'

import dark from '../styles/themes/dark'
import light from '../styles/themes/light'

interface ThemeContextData {
    theme: DefaultTheme,
    toggleTheme():void,
    isLoadingTheme: boolean
}

export const ThemeContext = createContext({} as ThemeContextData)

export const ThemeProvider:React.FC = ({children}) => {

    const [theme, setTheme] = useState<DefaultTheme>(()=>{

        const colorScheme = Appearance.getColorScheme()

        return colorScheme === 'dark' ? dark : light
    })

    const [isLoadingTheme, setIsLoadingTheme] = useState(true)

    const toggleTheme = useCallback(()=>{
        setTheme(state => state.title === 'dark' ? light : dark)
    },[])

    useEffect(()=>{
        async function SaveTheme (){
            await AsyncStorage.setItem('@plantmanager:theme', JSON.stringify(theme))
        }

        if(!isLoadingTheme){
            SaveTheme()
        }
    },[theme])

    useEffect(()=>{
        AsyncStorage.getItem('@plantmanager:theme').then(response => {
            if(response) {
                setTheme(JSON.parse(response))
                setIsLoadingTheme(false)
            }
        })
    },[])

    return(
        <StyledProvider theme={theme as DefaultTheme}>
            <ThemeContext.Provider value={{theme, toggleTheme, isLoadingTheme}}>
                {children}          
            </ThemeContext.Provider>
        </StyledProvider>
    )
}

export function useTheme(): ThemeContextData {
    const context = useContext(ThemeContext)

    if(!context){
        throw new Error('useTheme must be used within an ThemeProvider')
    }

    return context
}