import React, { useState } from "react"
import { StyleSheet, View, Text } from "react-native"
import { Avatar } from "react-native-elements"
import firebase from "firebase"
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import Loading from '../Loading'

export default function InfoUser(props){
    const {userInfo, toastRef, setReloadUserInfo} = props
    const {uid, photoURL, displayName,email} = userInfo
    const [loading, setIsLoading] = useState(false)
    // const {userInfo: {photoURL, displayName, email}, toastRef } = props
    //const {photoURL, displayName, email} = userInfo
    // console.log(photoURL)
    // console.log(displayName)
    // console.log(email)

    const changeAvatar= async()=>{
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        console.log(resultPermissions.permissions.mediaLibrary)
        const resultPermissionsCamera = resultPermissions.permissions.mediaLibrary.status

        if(resultPermissionsCamera === 'denied'){
            toastRef.current.show({
                type: 'info',
                position: 'top',
                text1: 'Permissions',
                text2: 'Es necesario aceptar los permisos de la galeria :c',
                visibilityTime: 3000,
            })
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing:true,
                aspect:[4,3]     
            })
            console.log(result)
            if (result.cancelled){
                toastRef.current.show({
                    type: 'Info',
                    position: 'top',
                    text1: 'Cancelled',
                    text2: 'No elegiste avatar de la galeria',
                    visibilityTime: 3000,
                })
            } else{
                setIsLoading(true)
                uploadImage(result.uri).then(()=>{
                    console.log('Imagen dentro de firebase')
                    updatePhotoUrl()
                setIsLoading(false)
                }).catch(()=>{
                    toastRef.current.show({
                        type: 'Error',
                        position: 'top',
                        text1: 'Firebase error',
                        text2: 'Error al actualizar el avatar',
                        visibilityTime: 3000,
                    })
                })
            }
        }
    }

    const uploadImage = async (uri) => {
        console.log(uri)
        const response = await fetch(uri)
        console.log(JSON.stringify(response))
        const blob = await response.blob()
        console.log(JSON.stringify(blob))
        const ref = firebase.storage().ref().child(`avatar/${uid}`)
        return ref.put(blob)
    }
        const updatePhotoUrl = () =>{
            firebase.storage().ref(`avatar/${uid}`).getDownloadURL().then(async(response)=>{
                console.log(response)
                const update = {photoURL: response}
                await firebase.auth().currentUser.updateProfile(update)
                console.log('Imagen actualizada')

                setReloadUserInfo(true)
            })
        }

    return(
        <View style={styles.viewUserInfo}>
            <Avatar
                title="Care"
                rounded
                size='large'
                onPress={changeAvatar}
                containerStyle={styles.userInfoAvatar}
                source={
                    photoURL ? {uri:photoURL} : require ('../../../assets/Img/avatar-default.jpg')
                }
            />
            <View>
                <Text style={styles.displayName}>
                    {displayName ? displayName : 'Invitado'}
                </Text>
                <Loading isVisible = {loading} text = 'Cargando...'/>
                <Text> {email ? email : 'Entrada por SSO'}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        paddingTop: 30,
        paddingBottom: 30,
        
    },
userInfoAvatar:{
    marginTop: 20,
    backgroundColor: '#00a680',
},
displayName:{
    fontWeight:'bold',
    paddingBottom: 5,
}
})