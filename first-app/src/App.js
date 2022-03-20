import React, {useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
// import Greetings from './components/Greetings'

function App() {
  const [stateClass, setStateClass] = useState(true)
  const [contar, setContar] = useState(0)

  useEffect(() => {
    console.log('Total: ' + contar)
  }, [contar])
//   const objeto = {
//     grupo: 'Octavo A Informática',
//     day: 'miércoles'
//   }
//   const saludo = (d, g) => {
//     //alert('Excelente '+ d + ''+ g)
//     alert(`Excelente ${d} ${g}`)
// }

const iniciarTerminar = () => {
  setStateClass(!stateClass)
  setContar(contar + 1)
}
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/*<Greetings groupInfo={objeto} funcion ={saludo}/> */}
        <h2>La clase ha {stateClass? 'Iniciado':'Terminado'}</h2>
        <h3>Clicks: {contar} </h3>
        <button onClick={iniciarTerminar}> iniciar/Terminar</button>
      </header>
    </div>
  );
}

export default App;