import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Image } from 'react-native'

import Icon from 'react-native-vector-icons/Feather'

import watering from '../../assets/watering.png'

import * as S from './styles'

export const Welcome = () => {
    const { navigate } = useNavigation()
    const handleNavigate = () => {
        navigate('Confirmation', {
            title: 'Atenção',
            subtitle: 'Nossa missão é apenas te lembrar de regar as plantas. Note que a frequência com que você deve regar pode variar conforme a estação e o clima da sua região. O melhor é ficar de olho na sua plantinha, ok?',
            buttonTitle: 'Entendi!',
            icon: 'thinking',
            nextPage: 'UserIdentification'
        })
    }

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
                onPress={handleNavigate}
            >
                <Icon name="chevron-right" size={24} color="#FFF"/>
            </S.Button>
        </S.Container>
    )
}