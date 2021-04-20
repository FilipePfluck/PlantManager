import React from 'react'

import { useNavigation } from '@react-navigation/core'

import * as S from './styles'

import Button from '../../components/Button'


export function Confirmation (){
    const { navigate } = useNavigation()

    return(
        <S.Container>
            <S.Content>
                <S.Emoji>🙂</S.Emoji>
                <S.Title>Prontinho</S.Title>
                <S.Subtitle>
                    Agora vamos começar a cuidar das suas plantinhas 
                    com muito cuidado
                </S.Subtitle>
                <S.Footer>
                    <Button>
                        Começar
                    </Button>
                </S.Footer>
            </S.Content>
        </S.Container>
    )
}