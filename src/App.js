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
import { LoginPage } from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute'
import NavBArProva from './components/NavBArProva';
import InformazioniUtente from './components/InformazioniUtente';

function App() {
  return (
    <>
    <NavigationBar/>
    <Switch >
    
    <Route exact path="/struttura" component={Struttura}/>
    <Route path="/user/utente" component={InformazioniUtente}/>

    <Route exact path="/registrazione" component={FormRegistrazioneUtente}/>
    <Route exact path="/ricerca" component={Ricerca}/>
    <Route exact path="/lineeguida" component={LineeGuida}/>
    <Route exact path="/login" component={LoginPage}/>
    <Route exact path="/admin/aggiungistruttura" component={AggiungiStruttura}></Route>
    <Route  path="/" component={Home}/>
    
    </Switch>

    </>
  );
}

export default App;
