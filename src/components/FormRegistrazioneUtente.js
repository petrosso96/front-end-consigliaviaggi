import React, { Component } from 'react';


class FormRegistrazioneUtente extends Component{

    constructor(props) {
        super(props);
        this.state = {
          sessoMaschio:false,
          sessoFemmina:false,
          sessoAltro:false

        };
        this.hanldeSessoMaschioChange = this.hanldeSessoMaschioChange.bind(this);
        this.hanldeSessoFemminaChange = this.hanldeSessoFemminaChange.bind(this);
        this.hanldeSessoAltroChange = this.hanldeSessoAltroChange.bind(this);

    }

    hanldeSessoMaschioChange(e) {
        this.setState({ sessoMaschio:!this.state.sessoMaschio })
    }

    hanldeSessoFemminaChange() {
        this.setState({ sessoFemmina:!this.state.sessoFemmina })
    }

    hanldeSessoAltroChange() {
        this.setState({ sessoAltro:!this.state.sessoAltro })
    }


    

  render(){
 
    return(

      <form>
          <label>
              Nome:
              <input type="text" name="nome" />
          </label>
          <label>
              Cognome:
              <input type="text" name="cognome"/>
          </label>
          <label>
              Indirizzo email:
              <input type="text" name="email"/>
          </label>
          <label>
              Nome Utente:
              <input type="text" name="nomeUtente"/>
          </label>
          <label>
              Password:
              <input type="text" name="password"/>
          </label>
          <label>
              Conferma Password:
              <input type="text" name="confermaPassword"/>
          </label>
          <label>
              Sesso:
              <input type="radio" name="maschio" value="maschio"  onChange={this.hanldeSessoMaschioChange}/>
              <input type="radio" name="femmina" value="femmina"  onChange={this.hanldeSessoFemminaChange}/>
              <input type="radio" name="altro" value="altro"      onChange={this.hanldeSessoAltroChange}/>
          </label>          

        </form>

    )
  }


}


export default FormRegistrazioneUtente;