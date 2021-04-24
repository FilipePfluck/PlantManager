import AsyncStorage from '@react-native-async-storage/async-storage'
import { format, differenceInHours,getHours } from 'date-fns'

import * as Notifications from 'expo-notifications'

import { PlantProps } from '../interfaces/plant'
import { getDifferenceInHours } from '../utils/getDifferenceInHours'

export interface StoragePlantProps {
    [id: string]: {
        data: PlantProps,
        notificationId: string
    }
}

export async function deletePlant(id: string): Promise<void>{
    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}
    
    await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId)

    delete plants[id]

    await AsyncStorage.setItem(
        '@plantmanager:plants',
        JSON.stringify(plants)
    )
}

export async function savePlant(plant: PlantProps): Promise<void>{
    try{    
        const nextTime = new Date(plant.dateTimeNotification)
        const now = new Date()

        const { times, repeat_every } = plant.frequency
        if(repeat_every === 'week'){
            const interval = Math.trunc(7 / times)
            nextTime.setDate(now.getDate() + interval)
        }else{
            nextTime.setDate(nextTime.getDate() + 1)
        }

        const seconds = Math.abs(
            Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
        )

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Heeey',
                body: `Está na hora de cuidar da sua ${plant.name}`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    plant
                }
            },
            trigger: {
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true
            }
        })

        const data = await AsyncStorage.getItem('@plantmanager:plants')
        const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {}

        const newPlant = {
            [plant.id]: {
                data: plant,
                notificationId
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