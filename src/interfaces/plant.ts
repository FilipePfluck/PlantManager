export interface PlantProps {
    hour: string
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
    dateTimeNotification: Date
    weekDays: number[]
}