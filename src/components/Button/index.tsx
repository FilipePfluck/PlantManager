import React from 'react'

import { TouchableOpacityProps } from 'react-native'

import * as S from './styles'

interface ButtonProps extends TouchableOpacityProps {
    isDanger?: boolean
}

const Button: React.FC<ButtonProps> = ({children, disabled, isDanger=false, ...props}) => {
    return(
        <S.Container 
            activeOpacity={0.7}
            isDisabled={disabled}
            isDanger={isDanger}
            {...props} 
        >
            <S.Text>{children}</S.Text>
        </S.Container>
    )
}

export default Button