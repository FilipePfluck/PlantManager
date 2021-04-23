import React from 'react'

import { RectButtonProps } from 'react-native-gesture-handler'
import { SvgFromUri } from 'react-native-svg'

import * as S from './styles'

interface PlantProps extends RectButtonProps {
    data: {
        name: string
        photo: string
        hour: string
    }
}


const PlantCardSecondary: React.FC<PlantProps> = ({data, ...rest}) => {
    return(
        <S.Container {...rest}>
            <SvgFromUri uri={data.photo} width={52} height={52}/>
            <S.Title>{data.name}</S.Title>

            <S.Details>
                <S.TimeLabel>Regar às</S.TimeLabel>
                <S.Time>{data.hour}</S.Time>
            </S.Details>
        </S.Container>
    )
}

export default PlantCardSecondary