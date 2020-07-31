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
    <NavigationBar/>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/struttura" component={Struttura}/>
    <Route component={Error}/>
    </Switch>

    </>
  );
}

export default App;
