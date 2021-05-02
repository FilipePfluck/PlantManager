import AsyncStorage from '@react-native-async-storage/async-storage'
import { format, getHours, getMinutes, getDay } from 'date-fns'

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
        notifications: string[]
    }
}

export async function deletePlant(id: string): Promise<void>{
    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}
    
    for(let notification of plants[id].notifications){
        await Notifications.cancelScheduledNotificationAsync(notification)
    }

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

        const notifications = []

        if(repeat_every === 'week'){
            for(let day of plant.weekDays){

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
                        hour,
                        minute,
                        weekday: day,
                        repeats: true
                    }
                })

                notifications.push(notificationId)
            }
        }

        if(repeat_every === 'day'){
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
                    hour,
                    minute,
                    repeats: true
                }
            })

            notifications.push(notificationId)
        }

        const data = await AsyncStorage.getItem('@plantmanager:plants')
        const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {}

        const newPlant = {
            [plant.id]: {
                data: plant,
                notifications
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
                /* getDifferenceInHours(new Date(a.dateTimeNotification))
                - getDifferenceInHours(new Date(b.dateTimeNotification)) */
                getDifferenceInHours({
                    dateTimeNotification: new Date(a.dateTimeNotification),
                    weekdays: a.weekDays
                })
                - getDifferenceInHours({
                    dateTimeNotification: new Date(b.dateTimeNotification),
                    weekdays: b.weekDays
                })
            )

        return plantsSorted
    }catch(error){
        throw new Error(error)
    }
}