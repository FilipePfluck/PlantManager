import styled from 'styled-components/native'

interface ContainerProps {
    isDisabled?: boolean | null | undefined
    isDanger?: boolean
}

export const Container = styled.TouchableOpacity<ContainerProps>`
    background-color: ${props => {
        return props.isDanger
            ? props.theme.colors.red
            : props.isDisabled 
                ? props.theme.colors.green_light 
                : props.theme.colors.green
    }};
    height: 56px;
    border-radius: 16px;
    justify-content: center;
    align-items: center;
    padding: 16px;
    width: 100%;
    margin-top: 32px;
`

export const Text = styled.Text`
    font-size: 16px;
    color: ${props => props.theme.colors.white}
`