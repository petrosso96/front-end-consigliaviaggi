import React from 'react';
import './App.css';
import FormRegistrazioneUtente from'./components/FormRegistrazioneUtente'
import Home from './pagine/Home'
import {Route, Switch} from 'react-router-dom'
import Struttura from './pagine/Struttura';
import NavigationBar from './components/NavigationBar'
import Ricerca from './pagine/Ricerca';
import LineeGuida from './components/LineeGuida'
import AggiungiStruttura from './pagine/AggiungiStruttura';

function App() {
  return (
    <>
    <NavigationBar/>
    <Switch >
    <Route exact path="/" component={Home}/>
    <Route exact path="/struttura" component={Struttura}/>
    <Route exact path="/registrazione" component={FormRegistrazioneUtente}/>
    <Route exact path="/ricerca" component={Ricerca}/>
    <Route exact path="/lineeguida" component={LineeGuida}/>
    <Route exact path="/admin/aggiungistruttura" component={AggiungiStruttura}/>
    <Route component={Error}/>
    </Switch>

    </>
  );
}

export default App;
