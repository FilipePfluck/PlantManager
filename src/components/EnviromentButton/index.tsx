import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import * as S from './styles'

interface EnviromentButtonProps extends RectButtonProps {
    isActive?: boolean
}

const EnviromentButton: React.FC<EnviromentButtonProps> = ({isActive=false, children, ...rest}) => {
    return(
        <S.Container isActive={isActive} {...rest}>
            <S.ButtonText isActive={isActive}>{children}</S.ButtonText>
        </S.Container>
    )
}

export default EnviromentButton