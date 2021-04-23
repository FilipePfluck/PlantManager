import AsyncStorage from '@react-native-async-storage/async-storage'
import { format, differenceInHours,getHours } from 'date-fns'

import { PlantProps } from '../interfaces/plant'
import { getDifferenceInHours } from '../utils/getDifferenceInHours'

interface StoragePlantProps {
    [id: string]: {
        data: PlantProps
    }
}

export async function savePlant(plant: PlantProps): Promise<void>{
    try{    
        const data = await AsyncStorage.getItem('@plantmanager:plants')
        const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {}

        const newPlant = {
            [plant.id]: {
                data: plant
            }
        }

        await AsyncStorage.setItem('@plantmanager:plants', 
            JSON.stringify({...oldPlants, ...newPlant})
        )
    }catch(error){
        throw new Error(error)
    }
}

export async function loadPlant(): Promise<PlantProps[]> {
    try{    
        const data = await AsyncStorage.getItem('@plantmanager:plants')
        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}

        const plantsSorted = Object
            .keys(plants)
            .map(plant => {
                return {
                    ...plants[plant].data,
                    hour: format(
                        new Date(plants[plant].data.dateTimeNotification),
                        'HH:mm'
                    )
                }
            })
            .sort((a, b) => 
                getDifferenceInHours(new Date(a.dateTimeNotification))
                - getDifferenceInHours(new Date(b.dateTimeNotification))
            )

        return plantsSorted
    }catch(error){
        throw new Error(error)
    }
}