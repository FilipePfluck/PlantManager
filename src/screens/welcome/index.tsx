import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Image } from 'react-native'

import Icon from 'react-native-vector-icons/Feather'

import watering from '../../assets/watering.png'

import * as S from './styles'

export const Welcome = () => {
    const { navigate } = useNavigation()

    return(
        <S.Container>
            <S.Title>
                Gerencie {'\n'}
                suas plantas de{'\n'}
                forma fácil
            
            </S.Title>
            <Image source={watering}/>
            <S.Subtitle>
                Não esqueça mais de regar suas plantas. 
                Nós lembramos sempre que precisar
            </S.Subtitle>
            <S.Button 
                activeOpacity={0.7} 
                onPress={()=>{navigate('UserIdentification')}}
            >
                <Icon name="chevron-right" size={24} color="#FFF"/>
            </S.Button>
        </S.Container>
    )
}