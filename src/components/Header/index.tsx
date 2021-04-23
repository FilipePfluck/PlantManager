import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {useEffect, useState} from 'react'

import * as S from './styles'

const Header: React.FC = () => {
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
            <S.Avatar source={{uri: 'https://avatars.githubusercontent.com/u/62773200?v=4'}}/>
        </S.Container>
    )
}

export default Header