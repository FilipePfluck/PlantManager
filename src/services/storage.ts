import AsyncStorage from '@react-native-async-storage/async-storage'
import { format, differenceInHours,getHours, getMinutes, getDay } from 'date-fns'

import * as Notifications from 'expo-notifications'
import { 
    CalendarTriggerInput, 
    DailyTriggerInput,
    WeeklyTriggerInput
} from 'expo-notifications'
import { Platform } from 'react-native'

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

        const hour = getHours(nextTime)
        const minute = getMinutes(nextTime)
        const weekday = getDay(nextTime)

        const { times, repeat_every } = plant.frequency
        
        const dailyTrigger: DailyTriggerInput = {
            hour,
            minute,
            repeats: true
        }

        const weeklyTrigger: WeeklyTriggerInput = {
            hour,
            minute,
            weekday,
            repeats: true
        }

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
            trigger: repeat_every === 'week' 
                ? weeklyTrigger 
                : dailyTrigger
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
        console.log(error)

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