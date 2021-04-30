import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
    flex: 1;
    padding: 16px;
    background-color: ${props => props.theme.colors.background};
`

export const TextContainer = styled.View`
    padding: 10px;
    margin-bottom: 12px;
`

export const Title = styled.Text`
    font-size: 18px;
    color: ${props => props.theme.colors.text};
    font-weight: bold;
    line-height: 20px;
`

export const Subtitle = styled.Text`
    font-size: 18px;
    color: ${props => props.theme.colors.text};
    line-height: 20px;
`

export const PlantListContainer = styled.View`
    flex: 1;
    margin: 0;
    justify-content: center;
`