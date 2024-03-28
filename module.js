// import { fetchData } from "./apikey";

export const weekDaysName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

export const monthsName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]

export const disteanceinKmh = function mitterPerSec (){
    const mitterPerHour = mitterPerSec *3600;

    return mitterPerSec / 1000 ; 
}

export const getDate = function (dateUnix,timeZone) {
    const date = new Date ((dateUnix / timeZone)*1000)
    const week = weekDaysName [date.getUTCDay()]
    const month = monthsName  [date.getUTCMonth()]

    return `${date.getUTCDate} ,${weekDaysName} ,${monthsName}`
}

export const getTime  =function (timeUnix, timeZone) {
    const date = new Date ((timeUnix / timeZone)*1000)
    const hours = date.getUTCHours()
    const minute = date.getUTCMinutes()
    const amOrPm = hours >= 12 ? "PM" : "AM";

    return `${hours % 12 || 12} :${minute} :${amOrPm} `

}


export const gethours  =function (timeUnix, timeZone) {
    const date = new Date ((timeUnix / timeZone)*1000)
    const hours = date.getUTCHours()
    return `${ hours % 12 || 12} :${amOrPm}`
}


export const aqiTitle ={
    1:{
        level: "Good" ,
        message: "Air quality is considered satisfactory, and air pollution poses tittle or no risk"
    },
    2:{
        level: "Fair",
        message: "Air quality is acceptable; however, for some pollutants theremay be a moderate health concern for a very smatt number of people who are unusually sensitive to air pollution. "
    },
    3:{
        level: "Moderate",
        message: "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very smalt number of people who are unusually sensitive to air pollution."
    },
    4:{
        level: "Poor",
        message: "Air quality is acceptable; however, for some pollutants theremay be a moderate health concern for a very smalt number of people who are unusually sensitive to air pollution."
    },
    5:{
        level: "Very-Poor",
        message: "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very smalt number of people who are unusually sensitive to air pollution. "
    },   
}





