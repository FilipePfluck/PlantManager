import React, { useEffect, useState } from 'react'

import { FlatList, ActivityIndicator } from 'react-native'

import * as S from './styles'

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

    const [plants, setPlants] = useState<PlantProps[]>([])
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
    const [loading, setLoading] = useState(true)
    
    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)
    const [loadedAll, setLoadedAll] = useState(false)

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
        /* if (environmentSelected === 'all')
        return setFilteredPlants(plants)

        const filtered = plants.filter(plant => 
        plant.environments.includes(environmentSelected)
        ) */

        setFilteredPlants(plants)
    },[plants])

    useEffect(() => {
        fetchPlants()
    }, [])

    return loading ? <Load/> : (
        <S.Container>
            <S.TextContainer>
                <S.Title>Selecione uma planta</S.Title>
                <S.Subtitle>Nós vamos te lembrar de regar ela</S.Subtitle>
            </S.TextContainer>

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
                            ? <ActivityIndicator color="#32B768" size={24}/>
                            : <></>
                    }
                />
            </S.PlantListContainer>
        </S.Container>
    )
}