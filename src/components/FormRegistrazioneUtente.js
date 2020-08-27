import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';

import '@fortawesome/fontawesome-free/css/all.min.css'; 
import'bootstrap-css-only/css/bootstrap.min.css'; 
import'mdbreact/dist/css/mdb.css';


import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import {MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBInput } from 'mdbreact';


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


        this.handleChange = this.handleChange.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }






    handleDataChange(date) {
        this.setState({
            dataDiNascita:date
        })
    }

    handleChange(event){ 
        const {name, value} = event.target;

        if(value === "maschio"){this.setState({sesso:"maschio"})}
        else if(value === "femmina"){this.setState({sesso:"femmina"})}
        else if(value === "altro"){this.setState({sesso:"altro"})}
        else{

        this.setState(
            {
                [name]:value
               
            });

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


  
        axios({
          method: "post",
          url: "http://localhost:8080/all/registrazione",
          data: utente
        })
        .then(res => {
          console.log(res);
          console.log(res.data);
    
        })


        
      }

    

render(){

    return (
        <MDBContainer size="lg" >
          <MDBRow>
            <MDBCol md='8'>
              <MDBCard
                className='card-image'
                style={{
                  width: '25',
                  
                }}
              >
                <div className='text-white rgba-stylish-strong py-5 px-5 z-depth-4'>
                  <div className='text-center'>
                    <h3 className='white-text mb-5 mt-4 font-weight-bold'>
                      <strong>BENVENUTO SU CONSIGLIA VIAGGI</strong>
                    </h3>
                  </div>
                  <MDBInput
                    icon="signature"
                  
                    label='Nome'
                    group
                    type='text'
                    validate
                    name="nome"
                    onChange={this.handleChange}
                    value={this.state.nome}
                    labelClass='white-text'
                  />
                  <MDBInput
                         icon="signature"
                    label='Cognome'
                    group
                    type='text'
                    validate
                    labelClass='white-text'
                    name="cognome"
                    onChange={this.handleChange}
                    value={this.state.cognome}
                  />
                  <MDBInput
                         icon="signature"
                    label='Nome Utente'
                    group
                    type='text'
                    validate
                    labelClass='white-text'
                    name="nomeUtente"
                    onChange={this.handleChange}
                    value={this.state.nomeUtente}
                  />
                  <MDBInput
                    icon='envelope'
                    label='Indirizzo Email'
                    group
                    type='email'
                    validate
                    labelClass='white-text'
                    name="indirizzoEmail"
                    onChange={this.handleChange}
                    value={this.state.indirizzoEmail}
                  />
                  <MDBInput
                    icon="unlock-alt"
                    label='Password'
                    group
                    type='password'
                    validate
                    labelClass='white-text'
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    
                  />
                  <MDBInput
                    icon="unlock-alt"
                    label='Conferma Password'
                    group
                    type='password'
                    validate
                    labelClass='white-text'
                    name="confermaPassword"
                    onChange={this.handleChange}
                    value={this.state.confermaPassword}
                  />    
                  <MDBInput
                    icon="city"
                    label='Città di provenienza'
                    group
                    type='text'
                    validate
                    labelClass='white-text'
                    name="city"
                    onChange={this.handleChange}
                    value={this.state.city}

                    
                  />


                  <select onChange={this.handleChange} className="browser-default custom-select">
                  <option >Sesso</option>
                    <option  value="maschio">Maschio</option>
                    <option  value="femmina">Femmina</option>
                    <option  value="altro">Altro</option>
                  </select>  

                  
                  <DatePicker
                   selected={this.state.dataDiNascita}
                    onChange={this.handleDataChange}
                    name="dataDiNascita"
                    dateFormat="yyyy/MM/dd"
                    className="DatePickerRegistrazione"
                  />
                 
        

            
                  <div className='md-form pb-3'>
                    
                  </div>
                  <MDBRow className='d-flex align-items-center mb-4'>
                    <div className='text-center mb-3 col-md-12'>
                      <MDBBtn
                        color='success'
                        rounded
                        type='button'
                        className='btn-block z-depth-1'
                        onClick={this.handleSubmit}
                      >
                        Registrati
                      </MDBBtn>
                    </div>
                  </MDBRow>
                  <MDBCol md='12'>
                    <p className='font-small white-text d-flex justify-content-end'>
                      Hai un account?
                      <a href='/login' className='green-text ml-1 font-weight-bold'>
                        Log in
                      </a>
                    </p>
                  </MDBCol>
                </div>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

    );
      
    }
    


}






export default FormRegistrazioneUtente;





