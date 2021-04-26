import styled from 'styled-components/native'

import { getBottomSpace } from 'react-native-iphone-x-helper'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.ScrollView`
    padding: 16px;
    position: relative;
    background-color: ${props => props.theme.colors.background};
`

export const PlantInfo = styled.View`
    flex: 1;
    padding: 50px 30px;
    align-items: center;
    justify-content: center;
    padding: 30px 10px;
`

export const PlantName = styled.Text`
    font-weight: bold;
    color: ${props => props.theme.colors.heading};
    font-size: 24px;
    margin-top: 16px;
`

export const PlantAbout = styled.Text`
    color: ${props => props.theme.colors.heading};
    font-size: 18px;
    margin-top: 8px;
    text-align: center;

    margin-bottom: 24px;
`

export const Controllers = styled.View`
    padding-bottom: ${getBottomSpace() || '20px'};
`

export const TipContainer = styled.View`
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

export const AlertLabel = styled.Text`
    text-align: center;
    color: ${props => props.theme.colors.heading};
    margin: 16px 0;
`

export const DateTimeButton = styled(RectButton)`
    flex-direction: row;
    background-color: ${props => props.theme.colors.shape};
    border-radius: 16px;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    width: 100%;
`

export const DateTimeButtonText = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.colors.heading};
`

export const DateText = styled.Text`
    font-size: 32px;
    font-weight: bold;
    color: ${props => props.theme.colors.heading};
`

export const GoBackButton = styled.TouchableOpacity`
    position: absolute;
    top: 16px;
    left: 16px;
`