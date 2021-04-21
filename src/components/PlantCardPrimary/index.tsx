import React from 'react'

import { RectButtonProps } from 'react-native-gesture-handler'

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
            <S.TextButton>{data.name}</S.TextButton>
        </S.Container>
    )
}

export default PlantCardPrimary