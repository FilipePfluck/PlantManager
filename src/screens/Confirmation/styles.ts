import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: space-around;
    padding: 16px;
    background-color: ${props => props.theme.colors.background};
`

export const Content = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
`

export const Emoji = styled.Text`
    font-size: 120px;
    margin-bottom: 24px;
`

export const Title = styled.Text`
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    color: ${props => props.theme.colors.heading};
    line-height: 36px;
    margin-bottom: 16px;
`

export const Subtitle = styled.Text`
    font-size: 18px;
    padding: 0 20px;
    color: ${props => props.theme.colors.text};
`

export const Footer = styled.View`
    width: 100%;
    padding: 0 54px;
`