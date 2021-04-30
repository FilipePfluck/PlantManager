import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background-color: #FFF;
    background-color: ${props => props.theme.colors.background};
`

export const PlantTitle = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: ${props => props.theme.colors.text};
    margin: 24px 0;
`

export const Plants = styled.View`
    flex: 1;
    width: 100%;
`