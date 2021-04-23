import React, { useEffect, useState } from 'react'

import { FlatList, View, ActivityIndicator } from 'react-native'

import * as S from './styles'

import Header from '../../components/Header'
import EnviromentButton from '../../components/EnviromentButton'
import PlantCardPrimary from '../../components/PlantCardPrimary'
import Load from '../../components/Load'

import api from '../../services/api'
import { useNavigation } from '@react-navigation/core'

import { PlantProps } from '../../interfaces/plant'

interface EnvProps {
    key: string
    title: string
}

export function PlantSelect(){
    const { navigate } = useNavigation()

    const [environments, setEnvironments] = useState<EnvProps[]>([])
    const [plants, setPlants] = useState<PlantProps[]>([])
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
    const [environmentSelected, setEnvironmentSelected] = useState('all')
    const [loading, setLoading] = useState(true)
    
    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)
    const [loadedAll, setLoadedAll] = useState(false)

    function handleEnvironmentSelected(environment: string) {
        setEnvironmentSelected(environment)
    }

    async function fetchPlants() {
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)

        if(!data)
        return setLoading(true)

        if(!data[0]){
            setLoadedAll(true)
            setLoadingMore(false)
            return
        }

        if (page > 1) {
        setPlants(oldValue => [...oldValue, ...data])
        } else {
        setPlants(data)
        setFilteredPlants(data)
        }

        setLoading(false)
        setLoadingMore(false)
    }

    function handleFetchMore(distance: number) {
        if(loadedAll){
            return
        }

        if (distance < 1)
        return

        setLoadingMore(true)
        setPage(oldValue => oldValue + 1)
        fetchPlants()
    }

    useEffect(()=>{
        if (environmentSelected === 'all')
        return setFilteredPlants(plants)

        const filtered = plants.filter(plant => 
        plant.environments.includes(environmentSelected)
        )

        setFilteredPlants(filtered)
    },[environmentSelected, plants])

    useEffect(() => {
        async function fetchEnvironment() {
        const { data } = await api
        .get('plants_environments?_sort=title&_order=asc')

        setEnvironments([
            {
            key: 'all',
            title: 'Todos'
            },
            ...data
        ])
        }

        fetchEnvironment()
    }, [])

    useEffect(() => {
        fetchPlants()
    }, [])

    return loading ? <Load/> : (
        <S.Container>
            <S.Title>Em que ambiente</S.Title>
            <S.Subtitle>você quer colocar sua planta?</S.Subtitle>

            <View>
                <FlatList 
                    data={environments}
                    renderItem={({item})=>(
                        <EnviromentButton 
                            isActive={item.key === environmentSelected}
                            onPress={()=>handleEnvironmentSelected(item.key)}
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
                        <PlantCardPrimary 
                            data={item} 
                            onPress={()=>navigate('PlantSave', {plant: item})}
                        />
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