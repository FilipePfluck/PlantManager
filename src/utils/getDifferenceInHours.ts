import { 
    differenceInHours,
    getHours, 
    getDay,
    nextMonday, 
    nextTuesday, 
    nextWednesday, 
    nextThursday, 
    nextFriday, 
    nextSaturday, 
    nextSunday 
} from 'date-fns'

interface functionProps {
    dateTimeNotification: Date
    weekdays: number[]
}

export function getDifferenceInHours ({ dateTimeNotification, weekdays}: functionProps){
    const waterHour = getHours(dateTimeNotification)
    const hour = getHours(Date.now())

    let difference

    difference = waterHour - hour

    if(difference < 0){
        difference+=24
    }

    if(weekdays){
        const todayWeekDay = getDay(Date.now())+1
 
        let nextWeekDay = weekdays[0]

        weekdays.forEach((day, index) => {
            if(index !== 0){
                let dif1 = day - todayWeekDay
                if(dif1 < 0){
                    dif1 += 7
                } 

                let dif2 = day - nextWeekDay
                if(dif2 < 0){
                    dif2 += 7
                }

                if(dif1 < dif2){
                    nextWeekDay = day
                }
            }
        })
        
        let nextWeekDayDate

        const now = Date.now()

        switch(nextWeekDay){
            case 1: nextWeekDayDate = nextSunday(now); break
            case 2: nextWeekDayDate = nextMonday(now); break
            case 3: nextWeekDayDate = nextTuesday(now); break
            case 4: nextWeekDayDate = nextWednesday(now); break
            case 5: nextWeekDayDate = nextThursday(now); break
            case 6: nextWeekDayDate = nextFriday(now); break
            case 7: nextWeekDayDate = nextSaturday(now); break
            default: nextWeekDayDate = nextSunday(now); break
        }

        difference += differenceInHours(nextWeekDayDate, now)
    }

    console.log('difference:',difference)

    return difference
}

/* export function getDifferenceInHours (date: Date){
    const waterHour = getHours(date)
    const hour = getHours(Date.now())

    let difference = waterHour - getHours(Date.now())

    if(difference < 0){
        difference+=24
    }

    return difference
} */