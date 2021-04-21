import React, { useCallback, useEffect, useState } from 'react'

import { FlatList, View, ActivityIndicator } from 'react-native'

import * as S from './styles'

import Header from '../../components/Header'
import EnviromentButton from '../../components/EnviromentButton'
import PlantCardPrimary from '../../components/PlantCardPrimary'
import Load from '../../components/Load'

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
    const [selectedEnvironment, setSelectedEnvironment] = useState('all')

    const [plants, setPlants] = useState<PlantProps[]>([])
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])

    const [loading, setLoading] = useState(true)

    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)
    const [loadedAll, setLoadedAll] = useState(false)

    const handleSelectEnvironment = useCallback((env: string)=>{
        setSelectedEnvironment(env)
    },[])

    const fetch = ()=>{
        api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)
            .then(response => {
                if(!response.data)
                return setLoading(true)

                if(page>1){
                    setPlants(state => [state, ...response.data])
                }else{
                    setPlants(response.data)
                    setFilteredPlants(response.data)
                }

                setLoading(false)
                setLoadingMore(false)
            })
    }

    const handleFetchMore = (distance: number)=>{
        if(distance < 1) return

        setLoadingMore(true)
        setPage(state => state + 1)

        fetch()
    }

    useEffect(()=>{
        console.log('a')
    },[handleFetchMore])

    useEffect(()=>{
        if(selectedEnvironment === 'all'){
            setFilteredPlants(plants)
            return
        }

        const filtered = plants.filter(plant => {
            return plant.environments.includes(selectedEnvironment)
        })

        setFilteredPlants(filtered)
    },[plants, selectedEnvironment])

    useEffect(()=>{
        api.get('plants_environments').then(response => {
            setEnvironments([{
                key: 'all',
                title: 'Todos'
            },...response.data])
        })
    }, [])

    useEffect(()=>{
        fetch()
    },[])

    return loading ? <Load/> : (
        <S.Container>
            <Header/>

            <S.Title>Em que ambiente</S.Title>
            <S.Subtitle>você quer colocar sua planta?</S.Subtitle>

            <View>
                <FlatList 
                    data={environments}
                    renderItem={({item})=>(
                        <EnviromentButton 
                            isActive={item.key === selectedEnvironment}
                            onPress={()=>handleSelectEnvironment(item.key)}
                        >
                            {item.title}
                        </EnviromentButton>
                    )}
                    keyExtractor={item => item.key}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginVertical: 24,
                        height: 40,
                        paddingBottom: 5,
                        justifyContent: 'center'
                    }}
                />
            </View>

            <S.PlantListContainer>
                <FlatList 
                    data={filteredPlants}
                    renderItem={({item})=>(
                        <PlantCardPrimary data={item}></PlantCardPrimary>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{marginTop: 16}}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({distanceFromEnd}) => 
                        handleFetchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMore 
                            ? <ActivityIndicator color="#32B768"/>
                            : <></>
                    }
                />
            </S.PlantListContainer>
        </S.Container>
    )
}