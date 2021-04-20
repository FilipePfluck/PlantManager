import styled from 'styled-components/native'

interface ContainerProps {
    isDisabled?: boolean | null | undefined
}

export const Container = styled.TouchableOpacity<ContainerProps>`
    background-color: ${props => {
        return props.isDisabled ? '#99DCB4' : props.theme.colors.green
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