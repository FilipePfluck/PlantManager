import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {useEffect, useState} from 'react'
import { Switch } from 'react-native'

import { useTheme } from '../../context/ThemeContext'

import * as S from './styles'

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme()

    const [name, setName] = useState('')

    useEffect(()=>{
        AsyncStorage.getItem('@plantmanager:user').then(response => {
            setName(response || '')
        })
    },[])

    return(
        <S.Container>
            <S.TextContainer>
                <S.Greeting>Olá,</S.Greeting>
                <S.Username>{name}</S.Username>
            </S.TextContainer>
            <Switch
                trackColor={{ false: "#767577", true: "#6fd99a" }}
                thumbColor={theme.title === 'light' ? "#32B768" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleTheme}
                value={theme.title === 'light' ? true : false}
            />
        </S.Container>
    )
}

export default Header