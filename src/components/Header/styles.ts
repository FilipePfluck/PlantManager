import styled from 'styled-components/native'

import { Platform } from 'react-native'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    margin-top: ${Platform.OS === 'ios' ? getStatusBarHeight() : 0};
`

export const TextContainer = styled.View`

`

export const Greeting = styled.Text`
    font-size: 32px;
    color: ${props => props.theme.colors.heading};
    line-height: 36px;
`

export const Username = styled.Text`
    font-size: 32px;
    font-weight: bold;
    color: ${props => props.theme.colors.heading};
    line-height: 36px;
`

export const Avatar = styled.Image`
    height: 72px;
    width: 72px;
    border-radius: 36px;
`

