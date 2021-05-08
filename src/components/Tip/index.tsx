import React from 'react'

import * as S from './styles'

import waterDrop from '../../assets/waterdrop.png'
import sun from '../../assets/sun.png'

interface TipProps {
    type: 'water' | 'sun'
}

const Tip: React.FC<TipProps> = ({children, type}) => {
    return(
        <S.Container type={type}>
            {type === 'water' 
                ? <S.TipImage source={waterDrop}/> 
                : <S.TipImage source={sun}/>
            }
            <S.TipText type={type}> {children} </S.TipText>
        </S.Container>
    )
}

export default Tip