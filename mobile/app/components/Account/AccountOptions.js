import React from "react"
import { StyleSheet, View, Text} from "react-native"
import { ListItem , Icon} from "react-native-elements"

export default function AccountOptions(props){
    const {userInfo, toastRef} = props
    const selectedComponent = (key) =>{
        console.log('click')
        console.log(key)
    }
    const menuOptions = generateOptions(selectedComponent)

    return (
        <View>
            {menuOptions.map((menu, index)=>(
                <ListItem key={index} bottomDivider onPress={menu.onPress}>
                    <Icon name = {menu.IconNAmeLeft}/>
                    <ListItem.Content>
                        <ListItem.Title>{menu.title}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            ))}
        </View>
    )
}

function generateOptions(selectedComponent){
    return[
        {
            title: 'Cambiar nombre y apellidos',
            IconNAmeLeft: 'account-circle',
            onPress: ()=> selectedComponent('displayName')
        },
        {
            title: 'Cambiar email',
            IconNAmeLeft: 'drafts',
            onPress: ()=> selectedComponent('displayEmail')
        },
        {
            title: 'Cambiar password',
            IconNAmeLeft: 'lock',
            onPress: ()=> selectedComponent('displayPassword')
        },
    ]
}