import React from 'react'

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
            <SvgFromUri uri={data.photo} width={70} height={70}/>
            <S.TextButton>{data.name}</S.TextButton>
        </S.Container>
    )
}

export default PlantCardPrimary