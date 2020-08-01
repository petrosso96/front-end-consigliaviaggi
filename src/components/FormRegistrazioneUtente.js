import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';


import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';



class FormRegistrazioneUtente extends Component{

    constructor(props) {

        super(props);

        this.state = {
          nomeUtente:"",
          nome:"",
          cognome:"",  
          indirizzoEmail:"",
          password:"",
          confermaPassword:"",
          sesso:"",
          city:"",
          dataDiNascita: new Date(),
          nomeError:"",
          cognomeError:"",
          nomeUtenteError:"",
          indirizzoEmailError:"",
          passwordError:"",
          cityError:""

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

            if(value === "maschio"){
                this.setState({
                    sesso:"maschio"
                }); 
            }
            else if(value === "femmina"){
                this.setState({
                    sesso:"femmina"
                });  
            }
            else{
                this.setState({
                    sesso:"altro"
                }); 
            }
        }
    }


    clearForm(){
        this.setState(this.statoIniziale);
    }

    handleSubmit(e) {
        e.preventDefault();

        const utente  = {

            nomeUtente:this.state.nomeUtente,
            nome:this.state.nome,
            cognome:this.state.cognome,  
            indirizzoEmail:this.state.indirizzoEmail,
            password:this.state.password,
            sesso:this.state.sesso,
            city:this.state.city,
            dataDiNascita:this.state.dataDiNascita,

        }

        console.log(utente);
  
        axios({
          method: "post",
          url: "http://localhost:8080/all/registrazione",
          data: utente
        })


        
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
              <input type="password" name="password" onChange={this.hanldeChange} value={this.state.password}/>
          </label>
          <br/>
          <label htmlFor="confermaPassword">
              Conferma Password:
              <input type="password" name="confermaPassword" onChange={this.hanldeChange} value={this.state.confermaPassword}/>
          </label>
          <br/>
          <label htmlFor="Sesso">
              Sesso:
              <input type="radio" name="sesso" onChange={this.hanldeChange} value="maschio" checked={this.state.sesso === "maschio"}/>
              <input type="radio" name="sesso" onChange={this.hanldeChange} value="femmina" checked={this.state.sesso === "femmina"}/>
              <input type="radio" name="sesso" onChange={this.hanldeChange} value="altro"     checked={this.state.sesso === "altro"}/>
          </label>
          <br/>
          <label htmlFor="Città">
              Città
              <input type="text" name="city" onChange={this.hanldeChange} value={this.state.city} />
          </label>
          <br/>
          <label htmlFor="Data di nascita">
              <DatePicker
              selected={this.state.dataDiNascita}
              onChange={this.handleDataChange}
              name="dataDiNascita"
              dateFormat="yyyy/MM/dd"
              />
          </label>
          <br/>
          <label>
              <input type="submit" value="Registrati" onClick={this.handleSubmit}/>
          </label>
          <input type="button" value="Annulla" onClick={this.clearForm}/>          

        </form>

    )
  }


}


export default FormRegistrazioneUtente;