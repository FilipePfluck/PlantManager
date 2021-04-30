import styled from 'styled-components/native'

interface TipProps {
    type: 'water' | 'sun'
}

export const Container = styled.View<TipProps>`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: ${props => {
        return props.type === 'water' 
            ? props.theme.colors.blue_light
            : props.theme.colors.yellow_light
    }};
    border-radius: 16px;
    padding: 16px;
    margin-top: 16px;
`

export const TipImage = styled.Image`
    width: 56px;
    height: 56px;

`

export const TipText = styled.Text<TipProps>`
    flex: 1;
    margin-left: 20px;
    color: ${props => {
        return props.type === 'water' 
            ? props.theme.colors.blue
            : props.theme.colors.yellow
    }};
    font-size: 16px;
`