import React from 'react'

import * as S from './styles'

const NoPlant: React.FC = ()=>{
    return(
        <S.Container>
            <S.Emoji>😢</S.Emoji>
            <S.Text>
                Parece que você não tem nenhuma planta cadastrada.
            </S.Text>
            <S.Text>
                Tente cadastrar uma na página "Nova planta"
            </S.Text>
        </S.Container>
    )
}

export default NoPlant