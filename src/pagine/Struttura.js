import React,{useEffect,useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import Rating from '@material-ui/lab/Rating';
import EuroIcon from '@material-ui/icons/Euro';
import './Struttura.css'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import StarsIcon from '@material-ui/icons/Stars';
import { Button } from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      position:50,
      padding: '0px 0 50px 50px',
    },

  }));



export default function Struttura() {
    const classes = useStyles();
    let idStruttura = useParams();
    let history = useHistory();

    const [nomeStruttura,setNomeStruttura] = useState("");
    const [descrizioneStruttura,setDescrizioneStruttura] = useState("");
    const [categoriaStruttura,setCategoraStruttura] = useState("");
    const [prezzoStruttura,setPrezzoStruttura] = useState(-1);
    const [indirizzoStruttura,setIndirizzoStruttura] = useState({});
    const [ordineRecensioni,setOrdineRecensioni] = useState("recenti");
    const [recensioni,setRecensioni] = useState([]);
    const [mediaVotiStruttura,setMediaVotiStruttura] = useState(0);
    const [foto,setFoto] = useState('');
    const [isAdmin,setIsAdmin] = useState(false);






    const recuperaInfoStruttura = () =>{

        const url = "https://consigliaviaggi.herokuapp.com/all/"+idStruttura.id;
        console.log(url)

        axios.get(url)
        .then( response => {


            setNomeStruttura(response.data.nome);
            setDescrizioneStruttura(response.data.descrizione);
            setCategoraStruttura(response.data.categoria);
            setPrezzoStruttura(response.data.prezzo);
            setIndirizzoStruttura({
                via:response.data.indirizzo.via,
                civico:response.data.indirizzo.civico,
                city:response.data.indirizzo.city
            })
            setFoto(response.data.foto)

        })
    }

    const recuperaRecensioniStruttura = (ordine) => {

        const url = "https://consigliaviaggi.herokuapp.com/all/"+idStruttura.id+"/"+ordine;
        console.log(url)

        axios.get(url)
        .then( response => {

            setRecensioni(response.data);
            
        })
    }


    const getMediaValutazioniStruttura = (recensioniStruttura) =>{

        var mediaVoti = 0;
        var numeroDiRecensioni = 0
    
        

        recensioniStruttura.map(recensione => {
            
            mediaVoti = mediaVoti + recensione.voto;
            numeroDiRecensioni++;

        })


        setMediaVotiStruttura(mediaVoti/numeroDiRecensioni);


    }

    


    useEffect( ()=> { 

        recuperaInfoStruttura();
        recuperaRecensioniStruttura(ordineRecensioni);
        
        if(sessionStorage.getItem("admin") != null){
            setIsAdmin(true);
        }
        else{
            setIsAdmin(false);
        }

        

    }, [isAdmin] )

    useEffect( ()=> { 
        getMediaValutazioniStruttura(recensioni);

    }, [recensioni] )


    const modificaStruttura = () => {

        const datiStruttura = {
            nome:nomeStruttura,
            descrizione:descrizioneStruttura,
            categoria:categoriaStruttura,
            prezzo:prezzoStruttura,
            indirizzo:indirizzoStruttura,
            id:idStruttura.id,
            immagine:foto
        }

        history.push({
            pathname:"/admin/modificastruttura",
            state:{struttura:datiStruttura}
        })
    }

    const url = "url("+foto+")"


   
    return(

    <div className="immagine" style={{
        backgroundImage:url,backgroundRepeat: 'no-repeat',width:'1000px',height:'1000px',

    }}> 
        <h1> {nomeStruttura}    {isAdmin && (<Button onClick={modificaStruttura} variant="outlined">Modifica Struttura</Button>)}
        </h1>
        
        <div className="struttura__header">
        <h3>Recensioni ({recensioni.length}) </h3>
        <Rating name="voti-struttura"  value={mediaVotiStruttura} size="small" readOnly className="struttura__ratingStruttura"/>
        {prezzoStruttura > 0 &&(<Rating name="prezzo-struttura"  value={prezzoStruttura} size="small" icon={<EuroIcon/>} readOnly className="struttura__prezzoStruttura" />)
        }
        <br/>

    
        </div>
        {descrizioneStruttura}


        <div className="struttura__centro">
            
            <br/>
           
        </div>

        <div className="struttura__elencoRecensioni">
            <div className="struttura__headerElencoRecensioni">
            <h1>Recensioni:</h1>
            <FormControl className={classes.formControl}>
            <Select
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             value={ordineRecensioni}
             onChange={(e)=>{setOrdineRecensioni(e.target.value);recuperaRecensioniStruttura(e.target.value)}}
            >

          <MenuItem value={"recenti"}>Più Recenti</MenuItem>
          <MenuItem value={"menorecenti"}>Meno Recenti</MenuItem>
          <MenuItem value={"positive"}>Positive</MenuItem>
          <MenuItem value={"negative"}>Negative</MenuItem>
            </Select>
            </FormControl>
            <br/>
            </div>
            
            {recensioni.map((recensione,indice) =>{

              return(  <Recensione key={indice} value={recensione}/> )

                
            })}
            
        </div>
        
        
        
        
        
        </div>
    )

    
}

function Recensione(props){

    const [nomeAutore,setNomeAutore] = useState("");
    const [isDisableLikeButton,setIsDisableLikeButton] = useState(true)
    const [isDisableDislikeButton,setIsDisableDislikeButton] = useState(true)
    const [numeroLike,setNumeroLike] = useState(props.value.likes);
    const [numeroDislike,setNumeroDislike] = useState(props.value.dislikes);
    const [rankingUtente,setRankingUtente] = useState(props.value.autore.rank)

    const recensioneID = props.value.id;
    var utente;

    var autenticazione ;
    

    const aggiungiLike = (id) => {


        const url = "https://consigliaviaggi.herokuapp.com/user/"+id+"/addLike"
    
        axios.put(url,"",{
            headers:{
                'Authorization':autenticazione,
                "Content-type": "application/json",
                
            }
        }).then(response=>{


            console.log(response)
            setNumeroLike(numeroLike+1)

            
        }).catch(error => {
            
        })

        setIsDisableLikeButton(true)
        setIsDisableDislikeButton(false)
    
    
    }

    const aggiungiDislike = (id) =>{

        const url = "https://consigliaviaggi.herokuapp.com/user/"+id+"/addDislike"
    
        axios.put(url,"",{
            headers:{
                'Authorization':autenticazione,
                "Content-type": "application/json",
                
            }
        }).then(response=>{

            setNumeroDislike(numeroDislike+1)

        }).catch(error =>{
            console.log(error)
        })

        setIsDisableLikeButton(false)
        setIsDisableDislikeButton(true)
    


    }

    
    

    useEffect(()=>{

        if(props.value.autore.mostraCome === "NOMEUTENTE"){

            setNomeAutore(props.value.autore.nomeUtente)


        }else{

            setNomeAutore(props.value.autore.nome+" "+props.value.autore.cognome)


        }


        if(JSON.parse(sessionStorage.getItem('user') )!= null){

            setIsDisableLikeButton(false);
            setIsDisableDislikeButton(false);
            utente = JSON.parse(sessionStorage.getItem('user'));
            autenticazione = "Basic "+window.btoa(utente.username+':'+utente.password);

        }
        else{
           

            setIsDisableLikeButton(true)
            setIsDisableDislikeButton(true)

        }


    },[nomeAutore])



    return(
        <div>
        <div className="struttura__recensione">
            <h4>{nomeAutore}  {rankingUtente}   <StarsIcon/></h4> 
            <Rating name="voti-recensione"  value={props.value.voto} size="small" readOnly className="struttura__ratingRecensione"/>


        </div>
        {props.value.descrizione}<br/><br/>
        <h5> <IconButton disabled={isDisableLikeButton} onClick={() =>{aggiungiLike(recensioneID)}} > <ThumbUpAltIcon/></IconButton> : {numeroLike}   
             <IconButton disabled={isDisableDislikeButton} onClick={()=>{aggiungiDislike(recensioneID)}} ><ThumbDownIcon/></IconButton>: {numeroDislike}
        </h5>
        <br/>
        
        </div>
        
    )
}
