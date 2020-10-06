import React,{useEffect,useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import BannerStruttura from '../components/BannerStruttura';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom';
import './Home.css'


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(10),
        width: theme.spacing(25),
        height: theme.spacing(25),
      },
    },
  }));

export default function Home() {
    const classes = useStyles();

    const [struttureRigaSuperiore, setStruttureRigaSuperiore] = useState(null);
    const [struttureRigaInferiore, setStruttureRigaInferiore] = useState(null);

    const categorie = [
      {id: 1, label:"Hotel",value:"hotel"},
      {id: 2, label:"Museo",value:"museo"},
      {id: 3, label:"Discoteca",value:"discoteca"},
      {id: 4, label:"B&B",value:"badandbreakfast"}   , 
      {id: 5, label:"Tour",value:"tour"},
      {id: 6, label:"Ristorante",value:"ristorante"},
      {id: 7, label:"Negozio",value:"negozio"},
      {id: 8, label:"Palestra",value:"palestra"}  ,
      {id: 9, label:"Parco Tematico",value:"parcotematico"} ,
      {id: 10, label:"Agriturismo",value:"agriturismo"},
      {id: 11, label:"Bar",value:"bar"} ,
      {id: 12, label:"Piazza",value:"piazza"}    ,
      {id: 13, label:"Spiaggia",value:"spiaggia"},
      {id: 14, label:"Riserva Naturale",value:"riservanaturale"},
      {id: 15, label:"Borgo",value:"borgo"},
      {id: 16, label:"Luogo di Culto",value:"luogodiculto"}  ,
      {id: 17, label:"Lago",value:"lago"} ,
      {id: 18, label:"Parco Naturale",value:"parconaturale"},
      {id: 19, label:"Monumento Storico",value:"monumentostorico"},
      {id: 20, label:"Stazione Ferroviaria",value:"stazioneferroviaria" } ,                                                
    ];

    const recuperaRigaStruttureSuperiore = (categoriaStruttura) =>{

      
      axios.post(`https://consigliaviaggi.herokuapp.com/all/ricerca`,{       
        nome:null,
        city:null,
        categoria:categoriaStruttura,  
        latitudine:-1,
        longitudine:-1,
        distanza:-1,
        prezzo:-1, 
      })
      .then(response =>{
        

        setStruttureRigaSuperiore(response.data)
        
         
      })
      .catch(error =>{
        console.log(error)
      })

    }


    const recuperaRigaStruttureInferiore = (categoriaStruttura) =>{

      
      axios.post(`https://consigliaviaggi.herokuapp.com/all/ricerca`,{       
        nome:null,
        city:null,
        categoria:categoriaStruttura,  
        latitudine:-1,
        longitudine:-1,
        distanza:-1,
        prezzo:-1, 
      })
      .then(response =>{
        

        setStruttureRigaInferiore(response.data)
        
         
      })
      .catch(error =>{
        console.log(error)
      })

    }

    useEffect(() => {



      recuperaRigaStruttureSuperiore("ristorante")    

      
      recuperaRigaStruttureInferiore("hotel")


      
    },[]);



    if(struttureRigaSuperiore != null && struttureRigaInferiore != null){

      
    return(
      

      

        

        <div className={classes.root}> 


        { struttureRigaSuperiore.map( (struttura) =>{

            const paginaStruttura = "/struttura/"+struttura.id

          return (<Link to={paginaStruttura}> <Paper elevation={15}> <BannerStruttura struttura={struttura} /></Paper> </Link>)
        }
        )}

        
        { struttureRigaInferiore.map( (struttura) =>{

             const paginaStruttura = "/struttura/"+struttura.id

          return (<Link to={paginaStruttura}> <Paper elevation={15}> <BannerStruttura struttura={struttura} /></Paper> </Link>)
        }
        )}
    

        </div>          
 

      

       
      


    )

      }else{

        return (

       

          <div >
  
  
          <CircularProgress  />
          
          </div>
  
         
      )
      }

}

