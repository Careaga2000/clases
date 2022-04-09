import React, {useState} from "react"
import { StyleSheet, View, Text} from "react-native"
import { ListItem , Icon} from "react-native-elements"
import Modal from "../Modal"
import ChangeDisplayNameForm from "./ChangeDisplayNameForm"

export default function AccountOptions(props){
    const {userInfo, toastRef, setReloadUserInfo} = props
    const [showModal,setShowModal] = useState(false)
    const [renderComponent,setRenderComponent] = useState(null)

    const selectedComponent = (key) =>{
        switch(key){
            case 'displayName':
                setRenderComponent(
                    <ChangeDisplayNameForm
                        displayName={userInfo.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo ={setReloadUserInfo}
                    />
                )
                setShowModal(true)
                break
            case 'displayEmail':
                setRenderComponent(<Text>Cambiando email</Text>)
                setShowModal(true)
                break
            case 'displayPassword':
                setRenderComponent(<Text>Cambiando password </Text>)
                setShowModal(true)
                break
            default:
                setRenderComponent(null)
                setShowModal(false)
                break
        }
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
                    <ListItem.Chevron/>
                </ListItem>
            ))}
            {renderComponent &&(
            <Modal isVisible={showModal} setIsVisible={setShowModal}>
                {renderComponent}
            </Modal>
            )}
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