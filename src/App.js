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
import InformazioniUtente from './components/InformazioniUtente';
import { PrivateRouteUser,PrivateRouteAdmin } from './components/PrivateRoute';
import { CloudinaryContext } from "cloudinary-react";
import ModificaStruttura from './pagine/ModificaStruttura';

function App() {
  return (
    <>
    <CloudinaryContext cloudName="sasi46">
    <NavigationBar/>
    <Switch >
    
    <Route exact path="/struttura" component={Struttura}/>
    <Route exact path="/registrazione" component={FormRegistrazioneUtente}/>
    <Route exact path="/ricerca" component={Ricerca}/>
    <Route exact path="/lineeguida" component={LineeGuida}/>
    <Route exact path="/login" component={LoginPage}/>
    <Route exact path="/struttura/:id" children={<Struttura></Struttura>}/>

    <PrivateRouteUser exact path="/user/home" component={Home}></PrivateRouteUser>
    <PrivateRouteUser exact path="/user/informazioniUtente" component={InformazioniUtente}></PrivateRouteUser>
    <PrivateRouteAdmin exact path="/admin/aggiungistruttura" component={AggiungiStruttura}></PrivateRouteAdmin>
    <PrivateRouteAdmin exact path="/admin/modificastruttura" component={ModificaStruttura}></PrivateRouteAdmin>
    <Route  path="/" component={Home}/>
    
    </Switch>
    </CloudinaryContext>
    </>
  );
}

export default App;
