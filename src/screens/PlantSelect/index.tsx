import React, { useCallback, useEffect, useState } from 'react'

import { FlatList } from 'react-native'

import * as S from './styles'

import Header from '../../components/Header'
import EnviromentButton from '../../components/EnviromentButton'
import PlantCardPrimary from '../../components/PlantCardPrimary'

import api from '../../services/api'

interface EnvProps {
    key: string
    title: string
}

interface PlantProps {
    id: string
    name: string
    about: string
    water_tips: string
    photo: string
    environments: string[]
    frequency: {
        times: number
        repeat_every: string
    }
}

export function PlantSelect(){
    const [environments, setEnvironments] = useState<EnvProps[]>([])
    const [plants, setPlants] = useState<PlantProps[]>([])

    useEffect(()=>{
        api.get('plants_environments').then(response => {
            setEnvironments([{
                key: 'all',
                title: 'todos'
            },...response.data])
        })
    }, [])

    useEffect(()=>{
        api.get('plants').then(response => {
            setPlants(response.data)
        })
    },[])

    return(
        <S.Container>
            <Header/>

            <S.Title>Em quem ambiente</S.Title>
            <S.Subtitle>você quer colocar sua planta?</S.Subtitle>

            <FlatList 
                data={environments}
                renderItem={({item})=>(
                    <EnviromentButton>{item.title}</EnviromentButton>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginVertical: 24,
                    height: 40,
                    paddingBottom: 5,
                    justifyContent: 'center'
                }}
            />

            <S.Title>asdasdas</S.Title>

            <S.PlantListContainer>
                <FlatList 
                    data={plants}
                    renderItem={({item})=>(
                        <PlantCardPrimary data={item}></PlantCardPrimary>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{marginTop: 16}}
                    numColumns={2}
                />
            </S.PlantListContainer>
        </S.Container>
    )
}