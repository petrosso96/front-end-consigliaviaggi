import React from 'react';
import './App.css';
import FormRegistrazioneUtente from'./components/FormRegistrazioneUtente'
import Home from './pagine/Home'
import {Route, Switch} from 'react-router-dom'
import Struttura from './pagine/Struttura';
import NavigationBar from './components/NavigationBar'


function App() {
  return (
    <>
    
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/struttura" component={Struttura}/>
    <Route exact path="/registrazione" component={FormRegistrazioneUtente}/>
    <Route component={Error}/>
    </Switch>

    </>
  );
}

export default App;
