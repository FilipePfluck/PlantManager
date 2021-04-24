import styled from 'styled-components/native'

import { RectButton, RectButtonProps } from 'react-native-gesture-handler'


export const Container = styled(RectButton)`
    flex-direction: row;
    align-items: center;

    width: 100%;
    background-color: ${props => props.theme.colors.shape};
    border-radius: 24px;

    padding: 42px 18px;
    margin: 6px 0;
`

export const Title = styled.Text`
    font-size: 20px;
    flex: 1;
    margin-left: 10px;
    font-weight: bold;
    color: ${props => props.theme.colors.heading};
`

export const Details = styled.View`
    align-items: flex-end;
`

export const TimeLabel = styled.Text`
    font-size: 18px;
    color: ${props => props.theme.colors.body_light};
`

export const Time = styled.Text`
    margin-top: 4px;
    font-size: 18px;
    font-weight: bold;
    color: ${props => props.theme.colors.body_dark};
`

export const Remove = styled(RectButton)`
    width: 100px;
    height: 120px;
    background-color: ${props => props.theme.colors.red};
    margin-top: 15px;
    border-radius: 24px;
    justify-content: center;
    align-items: center;
    position: relative;
    right: 20px;
    padding-left: 16px;
`