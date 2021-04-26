import React, { useCallback } from 'react'

import * as S from './styles'

interface WeekDayPickerProps {
    selectedDays: number[],
    setSelectedDays: React.Dispatch<React.SetStateAction<number[]>>
}

const WeekDayPicker: React.FC<WeekDayPickerProps> = ({selectedDays, setSelectedDays}) => {
    const toggleSelectedDay = useCallback((day: number)=>{
        setSelectedDays(state => {
            if(state.includes(day)){
                return state.filter(d => d !== day)
            }else{
                return [...state, day]
            }
        })
    },[])

    return(
        <S.Container>
            <S.DayContainer
                onPress={()=>toggleSelectedDay(0)}
                isSelected={selectedDays.includes(0)}
            >
                <S.DayText>D</S.DayText>
            </S.DayContainer>
            <S.DayContainer
                onPress={()=>toggleSelectedDay(1)}
                isSelected={selectedDays.includes(1)}
            >
                <S.DayText>S</S.DayText>
            </S.DayContainer>
            <S.DayContainer
                onPress={()=>toggleSelectedDay(2)}
                isSelected={selectedDays.includes(2)}
            >
                <S.DayText>T</S.DayText>
            </S.DayContainer>
            <S.DayContainer
                onPress={()=>toggleSelectedDay(3)}
                isSelected={selectedDays.includes(3)}
            >
                <S.DayText>Q</S.DayText>
            </S.DayContainer>
            <S.DayContainer
                onPress={()=>toggleSelectedDay(4)}
                isSelected={selectedDays.includes(4)}
            >
                <S.DayText>Q</S.DayText>
            </S.DayContainer>
            <S.DayContainer
                onPress={()=>toggleSelectedDay(5)}
                isSelected={selectedDays.includes(5)}
            >
                <S.DayText>S</S.DayText>
            </S.DayContainer>
            <S.DayContainer
                onPress={()=>toggleSelectedDay(6)}
                isSelected={selectedDays.includes(6)}
            >
                <S.DayText>S</S.DayText>
            </S.DayContainer>
            
        </S.Container>
    )
}

export default WeekDayPicker