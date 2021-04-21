import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
    flex: 1;
    padding: 16px;
`

export const Title = styled.Text`
    font-size: 18px;
    color: ${props => props.theme.colors.heading};
    font-weight: bold;
    line-height: 20px;
    margin-top: 16px;
`

export const Subtitle = styled.Text`
    font-size: 18px;
    color: ${props => props.theme.colors.heading};
    line-height: 20px;
`

export const PlantListContainer = styled.View`
    flex: 1;
    margin: 0;
    justify-content: center;
`