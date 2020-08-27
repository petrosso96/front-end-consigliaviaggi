import React,{useEffect,useState} from 'react'
import axios from 'axios'
import './InformazioniUtente'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));


function InformazioniUtente(props) {
    const classes = useStyles();

    const [datiUtente,setDatiUtente] = useState({
        nome: "",
        cognome:"",
        nomeUtente:"",//props.nomeUtente
        indirizzoEmail:"",
        sesso:'',
        dataDiNascita:null,
        password:"",
        mostraCome:""
    });
    const [nomeDaModificare,setNomeDaModificare] = useState(false)
    const [cognomeDaModificare,setCognomeDaModificare] = useState(false)
    const url ="http://localhost:8080/user/"+"sasi43"//props.nomeUtente 
    const [fieldNome, setFieldNome] = useState("")
    const [fieldCognome, setFieldCognome] = useState("")
    const [nome, setNome] = useState("")


    const clearFieldNome = (e) => {

        setFieldNome("");
        setNomeDaModificare(false);
        
    }
    const clearFieldCognome = (e) => {

        setFieldCognome("");
        setCognomeDaModificare(false);
        
    }

    const modificaNome = (e) =>{

            setNomeDaModificare(false)

            const urlAPI = "http://localhost:8080/user/nome/"+datiUtente.nomeUtente
            

            axios.put(urlAPI, fieldNome,{ headers:{
                "Content-type": "application/json",
                'Authorization':'Basic c2FzaTQzOkFiYzEyMzQ1NkA='
            }})
            .then(response => {

                console.log(response.data)
                setDatiUtente({nome:fieldNome})
                

            })
        

    }

    const modificaCognome = (e) =>{

        setCognomeDaModificare(false)

        const urlAPI = "http://localhost:8080/user/nome/"+datiUtente.nomeUtente
        

        axios.put(urlAPI, fieldCognome,{ headers:{
            "Content-type": "application/json",
            'Authorization':'Basic c2FzaTQzOkFiYzEyMzQ1NkA='
        }})
        .then(response => {

            console.log(response.data)
            setDatiUtente({cognome:cognomeDaModificare})
            

        })
    

}



    const recuperaInformazioniUtente =  (nomeUtente) => {

        axios.get(url,{
            headers:{
                'Authorization':'Basic c2FzaTQzOkFiYzEyMzQ1NkA='
            }
        })
        .then( response => {

            setDatiUtente({
                nome:response.data.nome,
                cognome:response.data.cognome,
                indirizzoEmail:response.data.indirizzoEmail,
                sesso:response.data.sesso,
                dataDiNascita:response.data.dataDiNascita,
                password:"",
                mostraCome:response.data.mostraCome

            })
        }

        )


    }

    useEffect( ()=> {

        //const nomeUtente = props.nomeUtente;
        const nomeUtente = "sasi43"
        
        recuperaInformazioniUtente(nomeUtente);


        
    }, [] )



if(datiUtente !== null){

    return (
        
        <div className="infUtente__root">

            <h1>INFORMAZIONI PERSONALI</h1>

            <div className="infUtente__nome">
                Nome           {!nomeDaModificare && (<Button size="small" className={classes.margin} onClick={() =>{setNomeDaModificare(true)}}> Modifica </Button>)}{nomeDaModificare && (<> <Button size="small" className={classes.margin} onClick={modificaNome}> Salva </Button>  <Button size="small" className={classes.margin} onClick={clearFieldNome}> Annulla </Button>  </> ) }                                                    
                <br/> 
                {nomeDaModificare && (
                    <input type="text" placeholder="" value={fieldNome} onChange={(e)=> {setFieldNome(e.target.value)}}></input>
                )}
                {!nomeDaModificare &&(datiUtente.nome)}
                
            </div>

            <div className="infUtente__cognome">
                Cognome           {!cognomeDaModificare && (<Button size="small" className={classes.margin} onClick={() =>{setCognomeDaModificare(true)}}> Modifica </Button>)}{cognomeDaModificare && (<> <Button size="small" className={classes.margin} onClick={modificaCognome}> Salva </Button>  <Button size="small" className={classes.margin} onClick={clearFieldCognome}> Annulla </Button>  </> ) }                                                    
                <br/> 
                {cognomeDaModificare && (
                    <input type="text" placeholder="" value={fieldCognome} onChange={(e)=> {setFieldCognome(e.target.value)}}></input>
                )}
                {!cognomeDaModificare &&(datiUtente.cognome)}
                
            </div>

            
            

        </div>
        
        
    )

}
else{

    return (

        <div>
            ATTENDI


        </div>
    )
}


}

export default InformazioniUtente
