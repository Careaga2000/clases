import React from "react"
import {createStackNavigator} from '@react-navigation/stack'
import Login from "../screens/Account/Login"
import Register from "../screens/Account/Register"
import Account from "./../screens/Account/Account"

const Stack = createStackNavigator()
export default function AccountStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='account'
                component={Account}
                options={{title: 'Cuenta'}}
            />
            <Stack.Screen
                name="login"
                component={Login}
                options={{title: 'Inicie Sesión'}}
            />
             <Stack.Screen
                name="register"
                component={Register}
                options={{title: 'Registro'}}
            />
        </Stack.Navigator>
    )
}