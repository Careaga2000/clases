import React,{useState} from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import firebase from "firebase";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function ChangeDisplayPassword(props){
    const {toastRef, setShowModal} = props
    const [error, setError] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [newDisplayPassword, setNewDisplayPassword] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(null)    
    const [repeatNewDisplayPassword, setRepeatNewDisplayPassword] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    
const reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword)
        return user.reauthenticateWithCredential((cred))
}   

const onChangePasswordPress = () =>{
    if(!currentPassword){
        setError('Escribe el password actual.')
    }else{
    reauthenticate(currentPassword).then(()=>{
        if(!newDisplayPassword || !repeatNewDisplayPassword){            
            setError('Rellena los campos')   
        }   else if(newDisplayPassword.length < 6){
            setError('El password debe tener al menos 6 caracteres')
        }   else if(newDisplayPassword !== repeatNewDisplayPassword){
            setError('Los password deben coincidir.')
        }
        else{
            setIsLoading(true)    
        firebase
        .auth()
        .currentUser.updatePassword(newDisplayPassword).then(() =>{            
            setIsLoading(false)
            setShowModal(false)
            toastRef.current.show({
                type: 'success',
                position: 'top',
                text1: 'Password',
                text2: 'Se ha cambiado el password.',
                visibilityTime: 3000
            })
            
        }).catch((error)=>{
            setError(error.message)
            setIsLoading(false)            
        })
    }
    }).catch((error) => {
        setErrorCurrentPassword(error.message)
    })
    
    setError(null)
    setErrorCurrentPassword(null)    
}
}


    return(
        <KeyboardAwareScrollView>
        <View style={styles.view}>
            <Input
                
                placeholder="Current Password"
                
                containerStyle={styles.input}                
                rightIcon={{
                    type:'material-community',
                    name:'lock',
                    color: '#c2c2c2'
                }}
                errorMessage={errorCurrentPassword}
                secureTextEntry={true}
                onChange={(e)=>setCurrentPassword(e.nativeEvent.text)}
            />
            <Input
                defaultValue={''}
                placeholder="Password"
                containerStyle={styles.input}
                rightIcon={{
                    type:'material-community',
                    name:'lock',
                    color: '#c2c2c2'
                }}
                
                secureTextEntry={true}
                onChange={(e)=>setNewDisplayPassword(e.nativeEvent.text)}
            />
            <Input
                placeholder="Repeat Password"
                containerStyle={styles.input}
                rightIcon={{
                    type:'material-community',
                    name:'lock',
                    color: '#c2c2c2'
                }}
                secureTextEntry={true}
                errorMessage={error}
                onChange={(e)=>setRepeatNewDisplayPassword(e.nativeEvent.text)}
            />
            <Button
                title='Cambiar Password'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onChangePasswordPress}
                loading={isLoading}
            />
        </View>
        </KeyboardAwareScrollView>       
    )
}

const styles = StyleSheet.create({
    input:{
        marginBottom: 10
    },
    view:{
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    btnContainer:{
        marginTop:20,
        width: '95%'
    },
    btn:{
        backgroundColor: '#00a680'
    }
})