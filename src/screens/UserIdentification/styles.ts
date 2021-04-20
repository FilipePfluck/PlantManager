import styled from "styled-components/native";

import { Platform } from 'react-native'

interface InputProps {
    isFocused: boolean
    isFilled: boolean
}

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: space-around;
    width: 100%;
`

export const Content = styled.KeyboardAvoidingView`
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: space-around;
`

export const Form = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0 54px;
    width: 100%;
`

export const Emoji = styled.Text`
    font-size: 44px;
    margin-bottom: 24px;
`

export const Input = styled.TextInput<InputProps>`
    border-bottom-width: 3px;
    border-bottom-color: ${props => {
        return props.isFocused || props.isFilled
            ? props.theme.colors.green 
            : props.theme.colors.gray
    }};
    width: 100%;
    font-size: 18px;
    margin-top: 50px;
    padding: 10px;
    text-align: center;
`

export const Text = styled.Text`
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    color: ${props => props.theme.colors.heading};
`