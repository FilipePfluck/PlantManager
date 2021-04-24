import React, { useEffect, useState } from 'react'
import { FlatList, Alert } from 'react-native'

import { PlantProps } from '../../interfaces/plant'
import { deletePlant, loadPlant, StoragePlantProps } from '../../services/storage'

import { getDifferenceInHours } from '../../utils/getDifferenceInHours'

import Load from '../../components/Load'
import Tip from '../../components/Tip'
import PlantCardSecondary from '../../components/PlantCardSecondary'

import * as S from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function MyPlants () {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([])
    const [loading, setLoading] = useState(true)
    const [nextWatering, setNextWatering] = useState('')

    async function loadStorageData (){
        const plantsStoraged = await loadPlant()

        const firstPlant = plantsStoraged[0]
        
        if(!firstPlant){
            setNextWatering(`Nenhuma planta para regar`)
    
            setMyPlants(plantsStoraged)
            setLoading(false)

            return
        }

        const waterDate = new Date(firstPlant.dateTimeNotification)

        const difference = getDifferenceInHours(waterDate)

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
        const firstPlant = myPlants[0]

        if(!firstPlant){
            setNextWatering(`Nenhuma planta para regar`)
    
            setLoading(false)

            return
        }

        const waterDate = new Date(firstPlant.dateTimeNotification)

        const difference = getDifferenceInHours(waterDate)

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
    
    },[myPlants])

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

                        setMyPlants(state => state.filter(p => {
                            return p.id !== plant.id
                        }))
                    }catch (error){
                        Alert.alert('Não foi possível remover')
                    }
                }
            }
        ])
    }

    useEffect(()=>{
        loadStorageData()
    },[])

    return loading ? <Load/> : (
        <S.Container>
            <Tip>{nextWatering}</Tip>
            <S.PlantTitle>Suas plantas</S.PlantTitle>
            <S.Plants>
                <FlatList
                    data={myPlants}
                    keyExtractor={item => item.id}
                    renderItem={({item})=>(
                        <PlantCardSecondary
                            data={item}
                            handleRemove={() => handleRemove(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </S.Plants>
        </S.Container>
    )
}