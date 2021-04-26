import styled from 'styled-components/native'

import colors from '../../styles/colors'

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background-color: ${props => props.theme.colors.background};
`

export const Title = styled.Text`
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    color: ${props => props.theme.colors.heading};
`

export const Subtitle = styled.Text`
    text-align: center;
    font-size: 18px;
    padding: 0 20px;
    color: ${props => props.theme.colors.heading};
`

export const Button = styled.TouchableOpacity`
    background-color: ${props => props.theme.colors.green};
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    margin-bottom: 10px;
    height: 56px;
    width: 56px;
`

export const ButtonText = styled.Text`
    color: ${props => props.theme.colors.white};
    font-size: 24px;
`