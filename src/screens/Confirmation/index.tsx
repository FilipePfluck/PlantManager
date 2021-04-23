import React from 'react'

import { useNavigation, useRoute } from '@react-navigation/core'

import * as S from './styles'

import Button from '../../components/Button'

interface Params {
    title: string
    subtitle: string
    buttonTitle: string
    icon: 'smile' | 'hug'
    nextPage: string
}

const emojis = {
    hug: '🤗',
    smile: '🙂'
}

export function Confirmation (){
    const { navigate } = useNavigation()

    const route = useRoute()

    const {
        title,
        buttonTitle,
        icon,
        nextPage,
        subtitle
    } = route.params as Params

    return(
        <S.Container>
            <S.Content>
                <S.Emoji>{emojis[icon]}</S.Emoji>
                <S.Title>{title}</S.Title>
                <S.Subtitle>{subtitle}</S.Subtitle>
                <S.Footer>
                    <Button onPress={()=>{navigate(nextPage)}}>
                        {buttonTitle}
                    </Button>
                </S.Footer>
            </S.Content>
        </S.Container>
    )
}