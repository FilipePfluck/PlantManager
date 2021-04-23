import { getHours } from 'date-fns'

export function getDifferenceInHours (date: Date){
    const waterHour = getHours(date)
    const hour = getHours(Date.now())

    let difference = waterHour - getHours(Date.now())

    if(difference < 0){
        difference+=24
    }

    return difference
}