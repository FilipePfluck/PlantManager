import styled from 'styled-components/native'

export const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: ${props => props.theme.colors.blue_light};
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 24px;
`

export const TipImage = styled.Image`
    width: 56px;
    height: 56px;

`

export const TipText = styled.Text`
    flex: 1;
    margin-left: 20px;
    color: ${props => props.theme.colors.blue};
    text-align: justify;
`