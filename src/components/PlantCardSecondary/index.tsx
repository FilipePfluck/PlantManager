import React from 'react'
import { Animated, View } from 'react-native'

import { RectButtonProps } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import Icon from 'react-native-vector-icons/Feather'

import { SvgFromUri } from 'react-native-svg'

import * as S from './styles'

interface PlantProps extends RectButtonProps {
    data: {
        name: string
        photo: string
        hour: string
    }
    handleRemove: () => void
}


const PlantCardSecondary: React.FC<PlantProps> = ({data, handleRemove, ...rest}) => {
    return(
        <Swipeable
            overshootRight={false}
            renderRightActions={()=>(
                <Animated.View>
                    <View>
                        <S.Remove onPress={handleRemove}>
                            <Icon 
                                name="trash" 
                                size={32} 
                                color="#FFF"
                            />
                        </S.Remove>
                    </View>
                </Animated.View>
            )}
        >
            <S.Container {...rest}>
                <SvgFromUri uri={data.photo} width={52} height={52}/>
                <S.Title>{data.name}</S.Title>

                <S.Details>
                    <S.TimeLabel>Regar às</S.TimeLabel>
                    <S.Time>{data.hour}</S.Time>
                </S.Details>
            </S.Container>
        </Swipeable>
    )
}

export default PlantCardSecondary