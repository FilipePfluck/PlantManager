import styled from 'styled-components/native'

import { RectButton } from 'react-native-gesture-handler'

interface ContainerProps {
    isActive?: boolean
}

export const Container = styled(RectButton)<ContainerProps>`
    background-color: ${props => {
        return props.isActive 
            ? props.theme.colors.green_light
            : props.theme.colors.shape
    } };
    height: 40px;
    width: 76px;
    border-radius: 12px;
    margin-right: 8px;

    justify-content: center;
    align-items: center;
`

export const ButtonText = styled.Text<ContainerProps>`
    color: ${props => {
        return props.isActive 
            ? props.theme.colors.green_dark
            : props.theme.colors.heading
    }};
    font-weight: ${props => props.isActive ? 'bold' : 'normal'}

`