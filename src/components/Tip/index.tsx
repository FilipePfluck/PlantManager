import React from 'react'

import * as S from './styles'

import waterDrop from '../../assets/waterdrop.png'

const Tip: React.FC = ({children}) => {
    return(
        <S.Container>
            <S.TipImage source={waterDrop}/>
            <S.TipText> {children} </S.TipText>
        </S.Container>
    )
}

export default Tip