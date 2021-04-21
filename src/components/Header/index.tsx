import React from 'react'

import * as S from './styles'

const Header: React.FC = () => {
    return(
        <S.Container>
            <S.TextContainer>
                <S.Greeting>Olá,</S.Greeting>
                <S.Username>Filipe</S.Username>
            </S.TextContainer>
            <S.Avatar source={{uri: 'https://avatars.githubusercontent.com/u/62773200?v=4'}}/>
        </S.Container>
    )
}

export default Header