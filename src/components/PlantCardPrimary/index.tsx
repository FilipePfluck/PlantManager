import React from 'react'
import { Image } from 'react-native'

import { RectButtonProps } from 'react-native-gesture-handler'
import { SvgFromUri } from 'react-native-svg'

import * as S from './styles'

interface PlantProps extends RectButtonProps {
    data: {
        name: string
        photo: string
    }
}


const PlantCardPrimary: React.FC<PlantProps> = ({data, ...rest}) => {
    return(
        <S.Container {...rest}>
            <Image 
                source={{uri: data.photo}} 
                style={{height: 160, width: 160, borderRadius: 16}}
            />
            <S.TextContainer>
                <S.TextButton>{data.name}</S.TextButton>
            </S.TextContainer>
        </S.Container>
    )
}

export default PlantCardPrimary