import React, {useState, useRef, useEffect} from "react"
import {View, Text, StyleSheet} from 'react-native'
import firebase from "firebase"
import Toast from "react-native-toast-message"
import { Button } from "react-native-elements"
import InfoUser from "../../components/Account/InfoUser"
import AccountOptions from "../../components/Account/AccountOptions"

export default function UserLogged(){
    const [userInfo, setUserInfo] = useState(null)
    const [reloadUserInfo, setReloadUserInfo] = useState(false)
    const toastRef = useRef()

    useEffect(()=>{
        (async()=>{
           const user= await firebase.auth(). currentUser
           setUserInfo(user)
        })()
    setReloadUserInfo(false)
    }, [reloadUserInfo])
    return(
        <View style={styles.viewUserInfo}>
            {userInfo&&(<InfoUser userInfo={userInfo} toastRef={toastRef} setReloadUserInfo={setReloadUserInfo}/>)}
            <AccountOptions userInfo = {userInfo} toastRef={toastRef} setReloadUserInfo={setReloadUserInfo}/>
            <Button 
            containerStyle={styles.btnCointainerSignOut}
            buttonStyle={styles.btnSignOut}
            title='Cerrar sesión' onPress={()=>firebase.auth().signOut()}/>
            <Toast ref={toastRef}/>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
      minHeight:'100%',
      backgroundColor: '#f2f2f2'  
    },
    btnCointainerSignOut:{
        marginTop:30,
        marginLeft: 10,
        borderTopWidth:1,
        borderTopColor: '#e3e3e3',
        borderBottomWidth: 1,
        borderBottomColor: '#e4e4e4',
        paddingTop: 10,
        paddingBottom:10,
        width: '95%',
        
    },
    btnSignOut:{
        backgroundColor: '#00a680',
        textAlign: "center"
    }
})