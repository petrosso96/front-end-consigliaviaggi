import React,{useEffect,useState} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import axios from 'axios'
import {  openUploadWidget } from "../servizi/cloudinaryService.js";



const useStyles = makeStyles((theme) => ({

    
    margin: {
      margin: theme.spacing(-10,0,0,30),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));


function ModificaStruttura() {
    const admin = JSON.parse(sessionStorage.getItem("admin"));
    const authentication = "Basic "+admin.authdata
    const classes = useStyles();  
    const location = useLocation();
    const [nomeStruttura,setNomeStruttura] = useState("");
    const [descrizioneStruttura,setDescrizioneStruttura] = useState("");
    const [categoriaStruttura,setCategoriaStruttura] = useState("");
    const [prezzoStruttura,setPrezzoStruttura] = useState(-1);
    const [indirizzoStruttura,setIndirizzoStruttura] = useState({});
    const [loading,setLoading] = useState(true);
    const [isSelectedAttività, setIsSelectedAttività] = useState(false);
    const [immagine,setImmagine] = useState('');



    



    const [nomeDaModificare,setNomeDaModificare] = useState(false)
    const [descrizioneDaModificare,setDescrizioneDaModificare] = useState(false)
    const [indirizzoDaModificare,setIndirizzoDaModificare] = useState(false)



    const [fieldNome, setFieldNome] = useState("")
    const [fieldDescrizione, setFieldDescrizione] = useState("")
    const [fieldVia, setFieldVia] = useState("")
    const [fieldCivico, setFieldCivico] = useState("")
    const [fieldCity, setFieldCity] = useState("")







    
    
 
    
    



    useEffect( ()=> { 
        console.log(location.state.struttura)
        setNomeStruttura(location.state.struttura.nome)
        setDescrizioneStruttura(location.state.struttura.descrizione)
        setCategoriaStruttura(location.state.struttura.categoria)
        setPrezzoStruttura(location.state.struttura.prezzo)
        setIndirizzoStruttura(location.state.struttura.indirizzo)
        setImmagine(location.state.struttura.immagine)



        if(location.state.struttura.categoria === "piazza" || location.state.struttura.categoria === "spiaggia" ||
        location.state.struttura.categoria === "riservanaturale" || location.state.struttura.categoria === "borgo"||
        location.state.struttura.categoria === "luogodiculto" || location.state.struttura.categoria === "lago" ||
        location.state.struttura.categoria === "parconaturale" || location.state.struttura.categoria === "monumentostorico"||
        location.state.struttura.categoria === "stazioneferroviaria"
          ){
              setIsSelectedAttività(false)
          }
          else{
              setIsSelectedAttività(true)
          }



        setLoading(false)
    }, [] )

    const handleCategoriaChange = (e) =>{

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
        setCategoriaStruttura(e.target.value)

    }

    const modificaCategoria = () => {

        const url = "http://localhost:8080/admin/struttura/categoria/"+location.state.struttura.id
        const body = JSON.stringify(categoriaStruttura)
        

        if(isSelectedAttività){

            
            axios.put(url,prezzoStruttura,{
                headers:{"Content-type": "application/json",
                          'Authorization':authentication}
            })
            .then((response)=>{

                
                
    
            })

            setIsSelectedAttività(false);

        }

        axios.put(url,body,{
            headers:{"Content-type": "application/json",
                      'Authorization':authentication}
        })
        .then((response)=>{
            console.log(response)
            alert("Categoria modificata con successo")
            

        })
    }

    const modificaNome = () =>{

        setNomeDaModificare(false)

        const url = "http://localhost:8080/admin/struttura/nome/"+location.state.struttura.id

 
        axios.put(url, fieldNome,{ headers:{
            "Content-type": "application/json",
            'Authorization':authentication
        }})
        .then((response)=>{
            console.log(response)
            alert("Nome modificato con successo")
        })       
    }

    const clearFieldNome = () => {

        setFieldNome("");
        setNomeDaModificare(false);
        
    }


    const modificaDescrizione = () =>{

        setDescrizioneDaModificare(false)

        const url = "http://localhost:8080/admin/struttura/descrizione/"+location.state.struttura.id

 
        axios.put(url, fieldDescrizione,{ headers:{
            "Content-type": "application/json",
            'Authorization':authentication
        }})
        .then((response)=>{
            console.log(response)
            alert("Descrizione modificata con successo")
        })       
    }

    const clearFieldDescrizione = () => {

        setFieldDescrizione("");
        setDescrizioneDaModificare(false);
        
    }

    const modificaImmagine = () =>{

        const url = "http://localhost:8080/admin/struttura/foto/"+location.state.struttura.id

        axios.put(url, immagine,{ headers:{
            "Content-type": "application/json",
            'Authorization':authentication
        }})
        .then((response)=>{
            console.log(response)
            alert("Immagine modificata con successo")
        })       
    }

    const beginUpload = tag => {
        const uploadOptions = {
          cloudName: "sasi46",
          tags: [tag],
          uploadPreset: "vmsgdepy"
        };
      
        openUploadWidget(uploadOptions, (error, photos) => {
          if (!error) {
            setImmagine(photos[0].url);
            modificaImmagine();
          } else {
            console.log(error);
          }
        })
    }


    const modificaIndirizzo = () => {

        const url = "http://localhost:8080/admin/struttura/indirizzo/"+location.state.struttura.id

        const body = {
            via:fieldVia,
            civico:fieldCivico,
            city:fieldCity
        }

        axios.put(url, body,{ headers:{
            "Content-type": "application/json",
            'Authorization':authentication
        }})
        .then((response)=>{
            console.log(response)
            alert("Indirizzo modificato con successo")
        }) 


    }

    const clearFieldsIndirizzo = () => {

        setFieldVia("");
        setFieldCivico("");
        setFieldCity("");
        setIndirizzoDaModificare(false);
        
    }




    if(!loading){

    return (
    
        <div><br/>
            <h2>CATEGORIA</h2>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={categoriaStruttura}
              onChange={handleCategoriaChange}
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
            <br/>
            {isSelectedAttività === true && (
             <>   
            <br/>
            <Box component="fieldset" mb={2} borderColor="transparent">
            <Typography component="legend">Range di Prezzo</Typography>
            <Rating
              name="simple-controlled"
              value={prezzoStruttura}
              max={5}
              onChange={(e) => {
                setPrezzoStruttura(e.target.value);
                
              }}
            />
          </Box>
             </>
            )}
            
            <Button onClick={modificaCategoria} variant="contained">Salva</Button>

            <br/>
            <br/>
            <br/>


            <h2>NOME</h2> {!nomeDaModificare && (<Button variant="contained" className={classes.margin} onClick={() =>{setNomeDaModificare(true)}}> Modifica </Button>)}{nomeDaModificare && (<> <Button variant="contained"  className={classes.margin} onClick={modificaNome}> Salva </Button>  <Button variant="contained"  className={classes.margin} onClick={clearFieldNome}> Annulla </Button>  </> ) }                                                    
                <br/> 
                {nomeDaModificare && (
                    <input type="text" placeholder="" value={fieldNome} onChange={(e)=> {setFieldNome(e.target.value)}}></input>
                )}
                {!nomeDaModificare &&(nomeStruttura)}


            <br/>
            <br/>
            <br/>


            <h2>DESCRIZIONE</h2> {!descrizioneDaModificare && (<Button variant="contained" className={classes.margin} onClick={() =>{setDescrizioneDaModificare(true)}}> Modifica </Button>)}{descrizioneDaModificare && (<> <Button variant="contained"  className={classes.margin} onClick={modificaDescrizione}> Salva </Button>  <Button variant="contained"  className={classes.margin} onClick={clearFieldDescrizione}> Annulla </Button>  </> ) }                                                    
                <br/> 
                {descrizioneDaModificare && (
                    <input type="text" placeholder="" value={fieldDescrizione} onChange={(e)=> {setFieldDescrizione(e.target.value)}}></input>
                )}
                {!descrizioneDaModificare &&(descrizioneStruttura)}

            <br/>
            <br/>
            <br/>

            <h2>IMMAGINE   <Button variant="contained" onClick={()=> beginUpload()}  >Modifica</Button></h2> 
            <br/>

            <img src={immagine} alt="immagine profilo" width="300" height="300"></img>
            
                
           
            <br/>
            <br/>
            <br/>


            <h2>INDIRIZZO</h2> {!indirizzoDaModificare && (<Button variant="contained" className={classes.margin} onClick={() =>{setIndirizzoDaModificare(true)}}> Modifica </Button>)}{indirizzoDaModificare && (<> <Button variant="contained"  className={classes.margin} onClick={modificaIndirizzo}> Salva </Button>  <Button variant="contained"  className={classes.margin} onClick={clearFieldsIndirizzo}> Annulla </Button>  </> ) }                                                    
                <br/> 
                {indirizzoDaModificare && (
                    <>
                    <input type="text" placeholder="" value={fieldVia} onChange={(e)=> {setFieldVia(e.target.value)}}></input>
                    <input type='number' placeholder="" value={fieldCivico} onChange={(e)=> {setFieldCivico(e.target.value)}}></input>
                    <input type="text" placeholder="" value={fieldCity} onChange={(e)=> {setFieldCity(e.target.value)}}></input>
                    </>


                )}
                {!indirizzoDaModificare &&(<h5>{indirizzoStruttura.via} {indirizzoStruttura.civico}, {indirizzoStruttura.city}</h5>)}


     





        
        
        
        
        
        </div>)

    }
    else{
      return (
        <div>
            <CircularProgress/>
            
        </div>
      )
    }
}

export default ModificaStruttura
