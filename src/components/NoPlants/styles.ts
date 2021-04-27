import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    padding: 8px;
`

export const Text = styled.Text`
    font-size: 22px;
    color: ${props => props.theme.colors.text};
    text-align: center;
    margin-bottom: 8px;
`

export const Emoji = styled.Text`
    font-size: 64px;
    margin-bottom: 16px;
`