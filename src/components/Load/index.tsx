import React from 'react'

import LottieView from 'lottie-react-native'

import loadAnimation from '../../assets/load.json'

import * as S from './styles'

const Load = ()=>{
    return(
        <S.Container>
            <S.Animation 
                source={loadAnimation}
                autoPlay
                loop
            />
        </S.Container>
    )
}

export default Load