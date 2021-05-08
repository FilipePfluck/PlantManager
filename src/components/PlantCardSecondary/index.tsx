import React, { useMemo } from 'react'
import { Image } from 'react-native'

import { RectButtonProps } from 'react-native-gesture-handler'

import * as S from './styles'

interface PlantProps extends RectButtonProps {
    data: {
        name: string
        photo: string
        hour: string,
        weekDays: number[]
    }
    handleRemove: () => void
}

const PlantCardSecondary: React.FC<PlantProps> = ({data, handleRemove, ...rest}) => {
    const formatedWeekdays = useMemo(()=>{
        let text = ''

        const days = [
            'Dom',
            'Seg',
            'Ter',
            'Qua',
            'Qui',
            'Sex',
            'Sáb'
        ]

        if(data.weekDays[0]){
            data.weekDays.forEach((day, index) => {
                text += `${index > 0 ? ', ' : ''}${days[day-1]}`
            })
        }else{
            text = 'Todo dia'
        }

        return text
    },[data])

    return(
        
            <S.Container {...rest}>
                <Image 
                    source={{uri: data.photo}} 
                    style={{height: 100, width: 100, borderRadius: 16}}
                />
                <S.TextContainer>
                    <S.Title>{data.name}</S.Title>
                    <S.Details>
                        <S.TimeLabel>{formatedWeekdays}</S.TimeLabel>
                        <S.Time>às {data.hour}</S.Time>
                    </S.Details>
                </S.TextContainer>
            </S.Container>
        
    )
}

export default PlantCardSecondary