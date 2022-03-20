import React from "react"

export default function Greetings(props){
    const {groupInfo, funcion} = props 
    const { grupo= 'Invitado', day } = groupInfo 
    console.log(props)
    console.log(groupInfo)
    console.log(grupo)
    console.log(day)
    return(
        <div>
            <button onClick={() => funcion(day, grupo)}>Greetings</button>
        </div>
    )
}
   
export function GoodBye() {
    return(
    <div>
        <h3>Nos vemos mañana </h3>
    </div>
    )
}