import React from 'react'

import * as S from './styles'

import waterDrop from '../../assets/waterdrop.png'
import sun from '../../assets/sun.svg'

import Svg, {Use, Image, SvgFromXml} from 'react-native-svg'

interface TipProps {
    type: 'water' | 'sun'
}

const Tip: React.FC<TipProps> = ({children, type}) => {
    return(
        <S.Container type={type}>
            {type === 'water' 
                ? <S.TipImage source={waterDrop}/> 
                : <Svg width="56" height="56">
                    <Image href={sun} />
                </Svg>
            }
            <S.TipText type={type}> {children} </S.TipText>
        </S.Container>
    )
}

export default Tip