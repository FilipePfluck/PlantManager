import { RectButton } from 'react-native-gesture-handler'
import styled, { css } from 'styled-components/native'
import { transparentize } from 'polished'

interface DayProps {
    isSelected: boolean
}

interface DayTextProps {
    isSelected: boolean
}

export const Container = styled.View`
    width: 100%;
    background-color: ${props => props.theme.colors.shape};
    border-radius: 16px;
    padding: 16px;
    
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    margin-bottom: 16px;
`

export const DayContainer = styled(RectButton)<DayProps>`
    height: 36px;
    width: 36px;
    border-radius: 18px;
    background-color: ${props => {
        return props.isSelected 
            ? transparentize(0.4,props.theme.colors.green_dark)
            : props.theme.colors.shape
        }
    };
    align-items: center;
    justify-content: center;
`

export const DayText = styled.Text<DayTextProps>`
    color: ${props => {
        return props.isSelected 
            ? props.theme.colors.green
            : props.theme.colors.text
    }};
    font-weight: ${props => {
        return props.isSelected 
            ? 'bold'
            : 'normal'
    }};
    font-size: 18px;
    opacity: 1;
`