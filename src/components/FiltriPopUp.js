import React from 'react';
import Popup from "reactjs-popup";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import Checkbox  from './CheckboxCategoria';
import FormFiltriStyle from './FormFiltri.css'





class FiltriPopUp extends React.Component {

    constructor(props) {
      super(props);
      this.state = { 
          open: false,
          city:null,
          distanza:-1,
          prezzo:-1,
          categoria:[
            {id: 1, label:"Hotel",value:"hotel", isChecked:false},
            {id: 2, label:"Museo",value:"museo", isChecked:false},
            {id: 3, label:"Discoteca",value:"discoteca", isChecked:false},
            {id: 4, label:"B&B",value:"badandbreakfast", isChecked:false},   
            {id: 5, label:"Tour",value:"tour", isChecked:false},
            {id: 6, label:"Ristorante",value:"ristorante", isChecked:false},
            {id: 7, label:"Negozio",value:"negozio", isChecked:false},
            {id: 8, label:"Palestra",value:"palestra", isChecked:false}, 
            {id: 9, label:"Parco Tematico",value:"parcotematico", isChecked:false},
            {id: 10, label:"Agriturismo",value:"agriturismo", isChecked:false},
            {id: 11, label:"Bar",value:"bar", isChecked:false},
            {id: 12, label:"Piazza",value:"piazza", isChecked:false},   
            {id: 13, label:"Spiaggia",value:"spiaggia", isChecked:false},
            {id: 14, label:"Riserva Naturale",value:"riservanaturale", isChecked:false},
            {id: 15, label:"Borgo",value:"borgo", isChecked:false},
            {id: 16, label:"Luogo di Culto",value:"luogodiculto", isChecked:false},  
            {id: 17, label:"Lago",value:"lago", isChecked:false},
            {id: 18, label:"Parco Naturale",value:"parconaturale", isChecked:false},
            {id: 19, label:"Monumento Storico",value:"monumentostorico", isChecked:false},
            {id: 20, label:"Stazione Ferroviaria",value:"stazioneferroviaria", isChecked:false},                                                     
          ],          
        };
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.handleCityChange = this.handleCityChange.bind(this);
      this.handleOpen = this.handleOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.setPrezzo = this.setPrezzo.bind(this);
      this.handleCategoriaChecked = this.handleCategoriaChecked.bind(this);
    }
    openModal() {
      this.setState({ open: true });
    }

    closeModal() {
      this.setState({ open: false });

    }


  handleClose() {
      this.setState({
          open:false
      })
      


  }
  
  handleOpen() {
  
      this.setState({
          open:true
      })
      
  }

  setPrezzo(e) {
    var prezzoValue = e.target.value;
    this.setState({
      prezzo:prezzoValue
    })
    this.props.handlePrezzoChange(prezzoValue);
  }

  handleCategoriaChecked(event){
    let categorie = this.state.categoria
    categorie.forEach(elementoCategoria => {
       if(elementoCategoria.value === event.target.value){
        elementoCategoria.isChecked =  event.target.checked
        this.setState({
          categoria : event.target.value
        })
        this.props.handleCategoriaChange(elementoCategoria.value)
        
       }
       else{
         if(event.target.checked === true){
            elementoCategoria.isChecked =  !event.target.checked
         }
       }
    })
    this.setState({categoria: categorie})
  
  }

   handleCityChange(event){
     var cityValue = event.target.value;
     this.setState({
       city:cityValue
     })
     this.props.handleCityChange(cityValue);

   }


  
    render() {
      return (
        <div>
          <Button variant="contained" onClick={this.openModal}>
            FILTRI
          </Button>
          <Popup open={this.state.open}  closeOnDocumentClick onClose={this.closeModal}> 

          <div >
          <div>
            <TextField
              label="Città"
              id="outlined-margin-none"
              variant="outlined"
              onChange = {this.handleCityChange}
            />
  
          <div/>
          <div>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={this.open}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              value={this.state.prezzo}
              onChange={this.setPrezzo}
             >
              <MenuItem value={-1}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1} ><EuroSymbolIcon/></MenuItem>
              <MenuItem value={2} ><EuroSymbolIcon/><EuroSymbolIcon/></MenuItem>
              <MenuItem value={3} ><EuroSymbolIcon/><EuroSymbolIcon/><EuroSymbolIcon/></MenuItem>
              <MenuItem value={4} ><EuroSymbolIcon/><EuroSymbolIcon/><EuroSymbolIcon/><EuroSymbolIcon/></MenuItem>
              <MenuItem value={5} ><EuroSymbolIcon/><EuroSymbolIcon/><EuroSymbolIcon/><EuroSymbolIcon/><EuroSymbolIcon/></MenuItem>
            </Select>
          </div>
          <div >
            <ol className={FormFiltriStyle.categoria}>
              {
                this.state.categoria.map((singolaCategoria) => {
                  return (<Checkbox handleCheckChieldElement={this.handleCategoriaChecked}{...singolaCategoria} />)
                })
              }
            </ol>
          </div>
          
          </div>
        </div>

            {this.props.categoria}
        
          </Popup>
        </div>
      );
    }
}

export default FiltriPopUp;

