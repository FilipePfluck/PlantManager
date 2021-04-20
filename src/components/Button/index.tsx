import React from 'react'

import { TouchableOpacityProps } from 'react-native'

import * as S from './styles'

const Button: React.FC<TouchableOpacityProps> = ({children, disabled, ...props}) => {
    return(
        <S.Container activeOpacity={0.7} {...props} isDisabled={disabled}>
            <S.Text>{children}</S.Text>
        </S.Container>
    )
}

export default Button