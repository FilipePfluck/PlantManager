import React, { useCallback, useEffect, useState } from 'react'
import { Image } from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/core'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { Platform, Alert } from 'react-native'
import { format } from 'date-fns'
import Icon from 'react-native-vector-icons/Feather'

import { savePlant, StoragePlantProps, deletePlant } from '../../services/storage'

import Button from '../../components/Button'
import Tip from '../../components/Tip'
import WeekDayPicker from '../../components/WeekDayPicker'

import * as S from './styles'

import { PlantProps } from '../../interfaces/plant'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Params {
    plant: PlantProps
}

export function PlantSave (){
    const { navigate, goBack } = useNavigation()

    const route = useRoute()
    const { plant } = route.params as Params

    const [selectedDateTime, setSelectedDateTime] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)

    const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([])

    const [plantAlreadyExists, setPlantAlreadyExists] = useState(false)

    

    async function getPlantData(){
        const response = await AsyncStorage.getItem('@plantmanager:plants')
        if(response){
            const plants = JSON.parse(response) as StoragePlantProps

            const thisPlant = plants[plant.id]

            if(thisPlant){
                return {
                    date: new Date(thisPlant.data.dateTimeNotification),
                    weekdays: thisPlant.data.weekDays
                }
            }
        }    
    }

    useEffect(()=>{
        getPlantData().then(response => {
            if(response){
                if(response.date){
                    setSelectedDateTime(response.date)
                }
                if(response.weekdays){
                    setSelectedWeekdays(response.weekdays)
                }
                setPlantAlreadyExists(true)
            }
        })
    },[])

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
            const numberOfDays = plant.frequency.times

            if(plant.frequency.repeat_every === 'week'){
                if(selectedWeekdays.length !== numberOfDays){
                    Alert.alert(`por favor, selecione ${numberOfDays} dia${numberOfDays>1 ? 's' : ''}`)
                    return
                }
            }

            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime,
                weekDays: selectedWeekdays
            })

            navigate('Confirmation', {
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado',
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextPage: 'TabRoutes'
            })
        }catch{
            Alert.alert('Não foi possível salvar sua plantinha')
        }
    },[selectedDateTime, plant, selectedWeekdays])

    function handleRemove (plant: PlantProps){
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: async () => {
                    try{
                        await deletePlant(plant.id)
                        navigate('TabRoutes')
                    }catch (error){
                        Alert.alert('Não foi possível remover')
                    }
                }
            }
        ])
    }

    return(
        <S.Container
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 24}}
        >
            <S.PlantInfo>
                <Image
                    source={{uri: plant.photo}}
                    style={{height: 160, width: 160, borderRadius: 24}}
                />

                <S.PlantName>{plant.name}</S.PlantName>

                <S.PlantAbout>{plant.about}</S.PlantAbout>

                <Tip type="water">{plant.water_tips}</Tip>
                <Tip type="sun">{plant.sun_tips}</Tip>
            </S.PlantInfo>

            <S.Controllers>

                {plant.frequency.repeat_every === 'week' && (
                    <>
                        <S.AlertLabel>
                            Essa planta precisa ser 
                            regada {plant.frequency.times} vez{plant.frequency.times > 1 ? 'es' : ''} por
                            semana.
                        </S.AlertLabel>

                        <WeekDayPicker
                            selectedDays={selectedWeekdays}
                            setSelectedDays={setSelectedWeekdays}
                        />
                    </>
                )}

                {plant.frequency.repeat_every === 'day' && (
                    <S.AlertLabel>
                        Essa planta precisa ser regada todo dia
                    </S.AlertLabel>
                )}

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
                    Salvar planta
                </Button>
                { plantAlreadyExists && <Button onPress={()=>handleRemove(plant)} isDanger>
                    Deletar planta
                </Button>}
            </S.Controllers>
            <S.GoBackButton onPress={goBack}>
                <Icon name="chevron-left" color="#ccc" size={32}/>
            </S.GoBackButton>
        </S.Container>
    )
}