import styled from 'styled-components/native'

import { RectButton, RectButtonProps } from 'react-native-gesture-handler'


export const Container = styled(RectButton)`
    flex: 1;
    width: 100%;
    max-width: 45%;
    background-color: ${props => props.theme.colors.shape};
    border-radius: 24px;
    padding: 12px;
    align-items: center;
    margin: 10px;
`

export const TextButton = styled.Text`
    color: ${props => props.theme.colors.text};
    margin: 16px 0;
`