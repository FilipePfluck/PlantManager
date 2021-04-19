import React from 'react'
import { Image } from 'react-native'

import Icon from 'react-native-vector-icons/Feather'

import watering from '../../assets/watering.png'

import * as S from './styles'

export const Welcome = () => {
    return(
        <S.Container>
            <S.Title>
                Gerencie {'\n'}
                suas plantas {'\n'}
                de forma fácil
            
            </S.Title>
            <Image source={watering}/>
            <S.Subtitle>
                Não esqueça mais de regar suas plantas. 
                Nós lembramos sempre que precisar
            </S.Subtitle>
            <S.Button activeOpacity={0.7}>
                <Icon name="chevron-right" size={24} color="#FFF"/>
            </S.Button>
        </S.Container>
    )
}