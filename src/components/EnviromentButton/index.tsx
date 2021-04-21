import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import * as S from './styles'

interface EnviromentButtonProps extends RectButtonProps {
    isActive?: boolean
}

const EnviromentButton: React.FC<EnviromentButtonProps> = ({isActive=false, children}) => {
    return(
        <S.Container isActive={isActive}>
            <S.ButtonText isActive={isActive}>{children}</S.ButtonText>
        </S.Container>
    )
}

export default EnviromentButton