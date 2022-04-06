import React, {useState, useRef, useEffect} from "react"
import {View, Text, StyleSheet} from 'react-native'
import firebase from "firebase"
import Toast from "react-native-toast-message"
import { Button } from "react-native-elements"
import InfoUser from "../../components/Account/InfoUser"

export default function UserLogged(){
    const [userInfo, setUserInfo] = useState(null)
    const toastRef = useRef()
    useEffect(()=>{
        (async()=>{
           const user= await firebase.auth(). currentUser
           setUserInfo(user)
        })()
    }, [])
    return(
        <View style={StyleSheet.viewUserinfo}>
            {userInfo&&<InfoUser userInfo={userInfo}/>}
            <Text> AccountOptions...</Text>
            <Button 
                title='Cerrar sesión' 
                containerStyle={styles.boton}
                buttonStyle={styles.titulo}
                onPress={()=>firebase.auth().signOut()}/>
                <Toast ref={toastRef}/>
        </View>
    )
}
const styles = StyleSheet.create({
    viewUserinfo:{
        minHeight: '100%',
        backgroundColor: '#f2f2f2'
    },
    boton:{
        marginTop:30,
        borderRadius: 0,
        backgroundColor: '#00a680',
        borderTopWidth: 1,
        borderTopColor: '#e3e3e3',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        paddingTop: 10,
        paddingBottom: 10
    },
    titulo:{
        backgroundColor: '#00a680'

    }
})