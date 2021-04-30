import React from 'react'

import * as S from './styles'

import waterDrop from '../../assets/waterdrop.png'

interface TipProps {
    type: 'water' | 'sun'
}

const Tip: React.FC<TipProps> = ({children, type}) => {
    return(
        <S.Container type={type}>
            <S.TipImage source={waterDrop}/>
            <S.TipText type={type}> {children} </S.TipText>
        </S.Container>
    )
}

export default Tip