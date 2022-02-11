import React,{useState,useEffect} from 'react';
import {View,Text,ScrollView,Button,Alert} from 'react-native';
import * as signalR from '@microsoft/signalr';

const App = () => {
    const [datas,setDatas] = useState([]);
    const url = 'https://7538-14-231-22-158.ngrok.io/chatHub';
useEffect(() => {
    let connection = new signalR.HubConnectionBuilder()
    .withUrl(url)
    .configureLogging(signalR.LogLevel.Debug)
    .build();

    connection.on("ReceiveMessage", (user,message) => {
        Alert.alert('icomming message from',user)
        const obj = {
            user:user,
            message:message
        }
        datas.push(obj);
        console.log('=====data here======',datas);
    });

    connection.start()
        .then(() => console.log('connected success'));
},[])


    return (
        <ScrollView style={{flex:1,}}>
            <Text>Hello</Text>
           {datas.map(data => {
               return(
                   <View style={{marginTop:20}}>
                        <Text>*Username:{data.user}</Text>
                        <Text>*Message:{data.message}</Text>
                   </View>
               )
           })}
        </ScrollView>
    )
}

export default App;