import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container'
import Select from '@material-ui/core/Select';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import TextField from '@material-ui/core/TextField';
import FileUploader from '../components/FileUploader';
import Button from '@material-ui/core/Button'
import axios from 'axios';





export default function AggiungiStruttura() {

    const [categoriaStruttura, setCategoria] = React.useState('');
    const [prezzoStruttura, setPrezzo] = React.useState(0);
    const [nomeStruttura, setNome] = React.useState('');
    const [descrizioneStruttura, setDescrizione] = React.useState('');
    const [immagine, setImmagine] = React.useState(null);
    let indirizzoStruttura = {
      via: "",
      civico:-1,
      città: ""
    }
    const [isSelectedAttività, setIsSelectedAttività] = React.useState(false);

    const handleAggiungiStruttura = () => {

      const FormStruttura = {
        
        nome: nomeStruttura,
        descrizione:descrizioneStruttura,
        indirizzo:{
           via:indirizzoStruttura.via,
           civico:indirizzoStruttura.civico,
           city:indirizzoStruttura.città
           },
        categoria:categoriaStruttura,
        prezzo:prezzoStruttura,
        foto:immagine


      }

      console.log(FormStruttura)

      const axiosConfig = {

        headers:{
          'Authorization':"Basic YWRtaW46YWRtaW4=",


        }
      }

      axios.post(`http://localhost:8080/admin/aggiungistruttura`, {     

        nome: nomeStruttura,
        descrizione:descrizioneStruttura,
        indirizzo:{
           via:indirizzoStruttura.via,
           civico:indirizzoStruttura.civico,
           city:indirizzoStruttura.città
           },
        categoria:categoriaStruttura,
        prezzo:prezzoStruttura,
        foto:immagine

      }, axiosConfig)
      .then(res => {
        console.log(res);
        console.log(res.data);
  
      })
      
    }

    const handleFileUploadAggiungiStruttura = (File) => {

      setImmagine(File);


    }

    const handleChangeVia = (e) =>{

      indirizzoStruttura.via = e.target.value;
      

    }
    const handleChangeCivico = (e) =>{

      indirizzoStruttura.civico = e.target.valueAsNumber || e.target.value
      

    }
    const handleChangeCittà = (e) =>{

      indirizzoStruttura.città = e.target.value;
      

    }
    const handleChangeNome = (e) => {

      setNome(e.target.value)
    }
    const handleChangeDescrizione = (e) => {
      setDescrizione(e.target.value)
    }

    const handleChange = (e) =>{ 

        if(e.target.value === "piazza" || e.target.value === "spiaggia" ||
          e.target.value === "riservanaturale" || e.target.value === "borgo"||
          e.target.value === "luogodiculto" || e.target.value === "lago" ||
          e.target.value === "parconaturale" || e.target.value === "monumentostorico"||
          e.target.value === "stazioneferroviaria"
          ){
            setIsSelectedAttività(false);
          }
        else{
            setIsSelectedAttività(true);
        }
        setCategoria(e.target.value)
    }

    return(
        <Container>
        <div>
           <Container>
            <div>
                <h3>Categoria</h3>     
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={categoriaStruttura}
              onChange={handleChange}
            >
              <MenuItem value={''}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={"hotel"}>Hotel</MenuItem>
              <MenuItem value={"museo"}>Museo</MenuItem>
              <MenuItem value={"discoteca"}>Discoteca</MenuItem>
              <MenuItem value={"badandbreakfast"}>BadAndBreakfast</MenuItem>
              <MenuItem value={"tour"}>Tour</MenuItem>
              <MenuItem value={"ristorante"}>Ristorante</MenuItem>
              <MenuItem value={"negozio"}>Negozio</MenuItem>
              <MenuItem value={"palestra"}>Palestra</MenuItem>
              <MenuItem value={"parcotematico"}>Parco Tematico</MenuItem>
              <MenuItem value={"agriturismo"}>Agriturismo</MenuItem>
              <MenuItem value={"bar"}>Bar</MenuItem>

              <MenuItem value={"piazza"}>Piazza</MenuItem>
              <MenuItem value={"spiaggia"}>Spiaggia</MenuItem>
              <MenuItem value={"riservanaturale"}>Riserva Naturale</MenuItem>
              <MenuItem value={"borgo"}>Borgo</MenuItem>
              <MenuItem value={"luogodiculto"}>Luogo di Culto</MenuItem>
              <MenuItem value={"lago"}>Lago</MenuItem>
              <MenuItem value={"parconaturale"}>Parco Naturale</MenuItem>
              <MenuItem value={"monumentostorico"}>Monumento Storico</MenuItem>
              <MenuItem value={"stazioneferroviaria"}>Stazione Ferroviaria</MenuItem>              
            </Select>
            {isSelectedAttività === true && (
            
            <Box component="fieldset" mb={2} borderColor="transparent">
            <Typography component="legend">Range di Prezzo</Typography>
            <Rating
              name="simple-controlled"
              value={prezzoStruttura}
              max={5}
              onChange={(e) => {
                setPrezzo(e.target.value);
                
              }}
            />
          </Box>
            )}


            </div>
            </Container>
            <Container>
              <div>
                <h3>Nome</h3>
                <TextField id="standard-basic" label="Nome Struttura" onChange={handleChangeNome} />
              
              </div>

            </Container>
            <Container>
              <div>

                <h3>Descrizione</h3>

                <TextField
                   id="standard-textarea"
                    label="Descrizione Struttura"
                    placeholder="Placeholder"
                    multiline
                    onChange= {handleChangeDescrizione}
                />

              </div>

            </Container>
            <Container>
              <div>
                <FileUploader handleFileUpload = {handleFileUploadAggiungiStruttura}></FileUploader>
              </div>
            </Container>

            <Container>
              <div>
                <h3>Indirizzo</h3>

              <TextField id="via" label="Via" onChange={handleChangeVia}/>
              <TextField id="civico" type='number' label="Civico" onChange={handleChangeCivico}/>
              <TextField id="città" label="Città" onChange={handleChangeCittà}/>

              </div>
            </Container>

            <Button variant="outlined" onClick={handleAggiungiStruttura}>
              Invia
            </Button>
        </div>
        </Container>
    )
}