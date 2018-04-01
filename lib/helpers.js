import React from 'react'

import { View,Text,AsyncStorage } from 'react-native'
import {Permissions,Notifications} from 'expo'
const NOTIFICATION_STORAGE = '@udacicards:notifications'

export const getCardsLength = (questions)=>{
    if(questions.length === 0){
        return <Text>0 cards</Text>
    }else if(questions.length>1){
        return <Text>{questions.length} cards</Text>
    }else{
        return <Text>1 card</Text>
    }
}
function createNotification(){
    return{
        title:'Reminder to Study',
        body:'You have forgot to study today!',
        ios:{
            sound:true
        }
    }
}

export function setLocalNotification(){
    AsyncStorage.getItem(NOTIFICATION_STORAGE)
        .then(JSON.parse)
        .then(data=>{
            if(data=== null){
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status})=>{
                        if(status === 'granted'){
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time:tomorrow,
                                    repeat:'day'
                                }
                            )
                            AsyncStorage.setItem(NOTIFICATION_STORAGE,JSON.stringify(true))
                        }
                    })
            }
        })
}

export function clearLocalNotification(){
    return AsyncStorage.removeItem(NOTIFICATION_STORAGE)
        .then(Notifications.cancelAllScheduledNotificationsAsync())
}