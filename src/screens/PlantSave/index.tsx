import React, { useCallback, useEffect, useState } from 'react'
import { SvgFromUri } from 'react-native-svg'
import { useNavigation, useRoute } from '@react-navigation/core'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { Platform, Alert } from 'react-native'
import { isBefore, format } from 'date-fns'
import Icon from 'react-native-vector-icons/Feather'

import { savePlant, loadPlant } from '../../services/storage'

import Button from '../../components/Button'
import Tip from '../../components/Tip'

import * as S from './styles'

import waterDrop from '../../assets/waterdrop.png'

import { PlantProps } from '../../interfaces/plant'

interface Params {
    plant: PlantProps
}

export function PlantSave (){
    const route = useRoute()
    const { plant } = route.params as Params

    const [selectedDateTime, setSelectedDateTime] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)

    useEffect(()=>{
        console.log(selectedDateTime)
    },[selectedDateTime])

    const { navigate, goBack } = useNavigation()

    const handleChangeTime = useCallback(
        (event: Event, dateTime: Date | undefined)=>{
            if(Platform.OS === 'android'){
                setShowDatePicker(false)
            }

            if(dateTime){
                setSelectedDateTime(dateTime)
            }
        }
    ,[])
    
    const handleSave = useCallback(async()=>{
        try{
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            })

            navigate('Confirmation', {
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado',
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextPage: 'MyPlants'
            })
        }catch{
            Alert.alert('Não foi possível salvar sua plantinha')
        }
    },[selectedDateTime, plant])

    useEffect(()=>{
        console.log(Platform.OS === 'android' && showDatePicker)
    },[showDatePicker])

    return(
        <S.Container>
            <S.PlantInfo>
                <SvgFromUri 
                    uri={plant.photo}
                    height={150}
                    width={150}
                />

                <S.PlantName>{plant.name}</S.PlantName>

                <S.PlantAbout>{plant.about}</S.PlantAbout>
            </S.PlantInfo>

            <S.Controllers>
                <Tip>{plant.water_tips}</Tip>

                <S.AlertLabel>
                    Escolha o melhor horário para ser lembrado
                </S.AlertLabel>

                {((Platform.OS === 'android' && showDatePicker) 
                || Platform.OS !== 'android')&& (
                    <DateTimePicker
                        value={selectedDateTime}
                        mode="time"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleChangeTime}
                    />
                )}

                {Platform.OS === 'android' && (
                    <S.DateTimeButton 
                        onPress={()=>setShowDatePicker(state => !state)}
                    >
                        <S.DateText>
                            {format(selectedDateTime, 'HH:mm')}
                        </S.DateText>
                        <S.DateTimeButtonText>
                            Selecionar horário
                        </S.DateTimeButtonText>
                    </S.DateTimeButton>
                )}

                <Button onPress={handleSave}>
                    Cadastrar planta
                </Button>
            </S.Controllers>
            <S.GoBackButton onPress={goBack}>
                <Icon name="chevron-left" color="#ccc" size={32}/>
            </S.GoBackButton>
        </S.Container>
    )
}