import React, { useEffect, useState } from 'react'
import { FlatList, Text } from 'react-native'

import { formatDistance, format, getHours, getMinutes, differenceInHours } from 'date-fns'
import { pt } from 'date-fns/locale'

import { PlantProps } from '../../interfaces/plant'
import { loadPlant } from '../../services/storage'

import Header from '../../components/Header'
import Tip from '../../components/Tip'
import PlantCardSecondary from '../../components/PlantCardSecondary'

import * as S from './styles'

export function MyPlants () {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([])
    const [loading, setLoading] = useState(true)
    const [nextWatering, setNextWatering] = useState('')

    async function loadStorageData (){
        const plantsStoraged = await loadPlant()

        const firstPlant = plantsStoraged[0]

        const waterDate = new Date(firstPlant.dateTimeNotification).getTime()

        const waterHour = getHours(waterDate)

        //const difference = differenceInHours(waterHour, getHours(Date.now()))

        let difference = waterHour - getHours(Date.now())

        if(difference < 0){
            difference+=24
        }

        let nextTime 

        if(difference === 0){
            nextTime = 'a alguns minutos'
        }

        if(difference === 1){
            nextTime = 'a uma hora'
        }

        if(difference > 1){
            nextTime = `a ${difference} horas`
        }

        setNextWatering(`Regue sua ${firstPlant.name} daqui ${nextTime}`)
    
        setMyPlants(plantsStoraged)
        setLoading(false)
    }

    useEffect(()=>{
        loadStorageData()
    },[])

    return(
        <S.Container>
            <Header/>
            <Tip>{nextWatering}</Tip>
            <S.Plants>
                <S.PlantTitle>Suas plantas</S.PlantTitle>
                <FlatList
                    data={myPlants}
                    keyExtractor={item => item.id}
                    renderItem={({item})=>(
                        <PlantCardSecondary
                            data={item}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flex: 1}}
                />
            </S.Plants>
        </S.Container>
    )
}