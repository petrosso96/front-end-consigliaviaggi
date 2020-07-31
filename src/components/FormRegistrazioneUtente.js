import React, { Component } from 'react';
import DatePicker from 'react-datepicker';


import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';



class FormRegistrazioneUtente extends Component{

    constructor(props) {

        super(props);

        this.state = {
          nome:"",
          cognome:"",
          nomeUtente:"",  
          indirizzoEmail:"",
          password:"",
          confermaPassword:"",
          gender:"",
          cittàDiProvenienza:"",
          dataDiNascita: new Date()

        };

        this.statoIniziale = this.state;


        this.hanldeChange = this.hanldeChange.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleDataChange(date) {
        this.setState({
            dataDiNascita:date
        })
    }

    hanldeChange(e){ 
        const {name, value, type} = e.target;

        if (type !== "radio"){
            
            this.setState({
                [name]:value
            });
        }
        else{

            if(name === "maschio"){
                this.setState({
                    gender:"maschio"
                }); 
            }
            else if(name === "femmina"){
                this.setState({
                    gender:"femmina"
                });  
            }
            else{
                this.setState({
                    gender:"altro"
                }); 
            }
        }
    }


    clearForm(){
        this.setState(this.statoIniziale);
    }

    handleSubmit(e) {
        this.clearForm();
      }

    

  render(){
 
    return(

      <form>
          <label htmlFor="nome">
              Nome:
              <input type="text" name="nome" onChange={this.hanldeChange} value={this.state.nome} />
          </label>
          <br/>
          <label htmlFor="cognome">
              Cognome:
              <input type="text" name="cognome" onChange={this.hanldeChange} value={this.state.cognome}/>
          </label>
          <br/>
          <label htmlFor="indirizzoEmail">
              Indirizzo email:
              <input type="text" name="indirizzoEmail" onChange={this.hanldeChange} value={this.state.indirizzoEmail}/>
          </label>
          <br/>
          <label htmlFor="nomeUtente">
              Nome Utente:
              <input type="text" name="nomeUtente" onChange={this.hanldeChange} value={this.state.nomeUtente}/>
          </label>
          <br/>
          <label htmlFor="Password" >
              Password:
              <input type="text" name="password" onChange={this.hanldeChange} value={this.state.password}/>
          </label>
          <br/>
          <label htmlFor="confermaPassword">
              Conferma Password:
              <input type="text" name="ConfermaPassword" onChange={this.hanldeChange} value={this.state.confermaPass}/>
          </label>
          <br/>
          <label htmlFor="Sesso">
              Sesso:
              <input type="radio" name="maschio" onChange={this.hanldeChange} value="maschio" checked={this.state.gender === "maschio"}/>
              <input type="radio" name="femmina" onChange={this.hanldeChange} value="femmina" checked={this.state.gender === "femmina"}/>
              <input type="radio" name="altro" onChange={this.hanldeChange} value="altro"     checked={this.state.gender === "altro"}/>
          </label>
          <br/>
          <label htmlFor="Data di nascita">
              <DatePicker
              selected={this.state.dataDiNascita}
              onChange={this.handleDataChange}
              name="dataDiNascita"
              dateFormat="dd/MM/yyyy"
              />
          </label>
          <br/>
          <label>
              <input type="submit" value="Registrati"/>
          </label>
          <input type="button" value="Annulla" onClick={this.clearForm}/>          

        </form>

    )
  }


}


export default FormRegistrazioneUtente;