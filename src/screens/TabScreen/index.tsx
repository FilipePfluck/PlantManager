import React from 'react'

import * as S from './styles'

import Header from '../../components/Header'

import Tabs from '../../routes/tab.routes'

export function TabScreen() {
    return(
        <S.Container>
            <S.HeadingContainer>
                <Header/>
            </S.HeadingContainer>
            <Tabs/>
        </S.Container>
    )
}