import React,{useEffect,useState} from 'react'
import axios from 'axios'
import './InformazioniUtente'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import DatePicker from 'react-date-picker';



  const useStyles = makeStyles((theme) => ({

    
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));


  const useStyles2 = makeStyles((theme) => ({
    root: {

      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }));


function InformazioniUtente(props) {
    const classes = useStyles();
    const url ="http://localhost:8080/user/"+"sasi43"//props.nomeUtente 
    const [dataDaVisualizzare, setDataDaVisualizzare] = React.useState("")


    const [nome, setNome] = useState("")
    const [cognome, setCognome] = useState("")
    const [nomeUtente, setNomeUtente] = useState("")
    const [email, setEmail] = useState("")
    const [sesso, setSesso] = useState("")
    const [dataDiNascita, setDataDiNascita] = useState(null)
    const [password, setPassword] = useState("")
    const [mostraCome, setMostraCome] = useState("")


    const [nomeDaModificare,setNomeDaModificare] = useState(false)
    const [cognomeDaModificare,setCognomeDaModificare] = useState(false)
    const [emailDaModificare,setEmailDaModificare] = useState(false)
    const [sessoDaModificare,setSessoDaModificare] = useState(false)
    const [dataDaModificare,setDataDaModificare] = useState(false)
    const [passwordDaModificare,setPasswordDaModificare] = useState(false)
    const [mostraComeDaModificare,setMostraComeDaModificare] = useState(false)





    const [fieldNome, setFieldNome] = useState("")
    const [fieldCognome, setFieldCognome] = useState("")
    const [fieldEmail, setFieldEmail] = useState("")
    const [fieldPassword, setFieldPassword] = useState("")
    const [fieldConfermaPassword, setFieldConfermaPassword] = useState("")


    


    const handleSetDataDiNascita = (e) => {setDataDiNascita(e)}


    const clearFieldNome = (e) => {

        setFieldNome("");
        setNomeDaModificare(false);
        
    }
    const clearFieldCognome = (e) => {

        setFieldCognome("");
        setCognomeDaModificare(false);
        
    }
    const clearFieldEmail = (e) => {

        setFieldEmail("");
        setEmailDaModificare(false);
        
    }
    const clearFieldSesso = (e) => {

        setSessoDaModificare(false);
        
    }
    const clearFieldData = (e) => {

        setDataDaModificare(false);
        
    }
    const clearFieldPassword = () => {

        setFieldPassword("")
        setPasswordDaModificare(false);
        clearFieldConfermaPassword();
        
    }
    const clearFieldConfermaPassword = () => {

        setFieldConfermaPassword("")
     
    }
    const clearMostraCome = () => {

        setMostraComeDaModificare(false)
     
    }

    const modificaNome = (e) =>{

            setNomeDaModificare(false)

            const urlAPI = "http://localhost:8080/user/nome/"+nomeUtente
            

            axios.put(urlAPI, fieldNome,{ headers:{
                "Content-type": "application/json",
                'Authorization':'Basic c2FzaTQzOkFiYzEyMzQ1NkA='
            }})
            .then(response => {

                console.log(response.data)
                setNome(fieldNome)
                

            })
        

    }

    const modificaCognome = (e) =>{

        setCognomeDaModificare(false)

        const urlAPI = "http://localhost:8080/user/cognome/"+nomeUtente
        

        axios.put(urlAPI, fieldCognome,{ headers:{
            "Content-type": "application/json",
            'Authorization':'Basic c2FzaTQzOkFiYzEyMzQ1NkA='
        }})
        .then(response => {

            console.log(response.data)
            setCognome(fieldCognome)
            
        })
    

    }


    const modificaEmail = (e) =>{

        setEmailDaModificare(false)

        const urlAPI = "http://localhost:8080/user/indirizzoEmail/"+nomeUtente
        

        axios.put(urlAPI, fieldEmail,{ headers:{
            "Content-type": "application/json",
            'Authorization':'Basic c2FzaTQzOkFiYzEyMzQ1NkA='
        }})
        .then(response => {

            console.log(response.data)
            setEmail(fieldEmail)
        
        })

    }

    const modificaSesso = (e) =>{

        setSessoDaModificare(false)

        const urlAPI = "http://localhost:8080/user/sesso/"+nomeUtente
        const body = JSON.stringify(sesso)
        

        axios.put(urlAPI, body,{ headers:{
            "Content-type": "application/json",
            'Authorization':'Basic c2FzaTQzOkFiYzEyMzQ1NkA='
        }})
        .then(response => {

            console.log(response.data)

        
        })

    }


    
    const modificaData = (e) =>{

        setDataDaModificare(false)

        const urlAPI = "http://localhost:8080/user/dataDiNascita/"+nomeUtente
        

        axios.put(urlAPI, dataDiNascita,{ headers:{
            "Content-type": "application/json",
            'Authorization':'Basic c2FzaTQzOkFiYzEyMzQ1NkA='
        }})
        .then(response => {

            console.log(response.data)

        
        })

    }

    const strcmp = (a, b) => {
        if(a === b) {
            return 0;
        }
    
        if (a > b) {
            return 1;
        }
    
        return -1;
    }
    
    



    const modificaPassword = (e) =>{

        setPasswordDaModificare(false)

        const urlAPI = "http://localhost:8080/user/password/"+nomeUtente


        if( strcmp(fieldPassword,fieldConfermaPassword) === 0 ){
        

        axios.put(urlAPI, fieldPassword,{ headers:{
            "Content-type": "application/json",
            'Authorization':'Basic c2FzaTQzOkFiYzEyMzQ1NkA='
        }})
        .then(response => {

            console.log(response.data)
            setPassword(fieldPassword)

        
        })
        .catch(error => {
            alert("Password non valida")
        })

        }else{

            alert("le due password non coincidono!")
        }

    }

    const getStringFromDate = (data) => {

        var anno = data.slice(0,4)
        var mese = data.slice(5,7)
        var giorno = data.slice (8,10)


        var nuovaData =  new Date(anno,mese,giorno)
        return nuovaData.toDateString()


    }

    const modificaMostraCome = () =>{

        setMostraComeDaModificare(false)

        const urlAPI = "http://localhost:8080/user/mostraCome/"+nomeUtente
        const body = JSON.stringify(mostraCome)
        

        axios.put(urlAPI, body,{ headers:{
            "Content-type": "application/json",
            'Authorization':'Basic c2FzaTQzOkFiYzEyMzQ1NkA='
        }})
        .then(response => {

            console.log(response.data)

        
        })

    }



    const recuperaInformazioniUtente =  (nomeUtente) => {

        axios.get(url,{
            headers:{
                'Authorization':'Basic c2FzaTQzOkFiYzEyMzQ1NkA='
            }
        })
        .then( response => {

           setNome(response.data.nome);
           setCognome(response.data.cognome);
           setNomeUtente(response.data.nomeUtente)
           setEmail(response.data.indirizzoEmail);
           setSesso(response.data.sesso);
           //setPassword("")
           setMostraCome(response.data.mostraCome);
           setDataDiNascita(response.data.dataDiNascita);
           var stringaData = getStringFromDate(response.data.dataDiNascita)
           setDataDaVisualizzare( stringaData )

           console.log(dataDaVisualizzare)

        }

        )


    }

    useEffect( ()=> {

        //const nomeUtente = props.nomeUtente;
        const nomeUtente = "sasi43"
        
        recuperaInformazioniUtente(nomeUtente);


        
    }, [] )



if(nome !== null && dataDiNascita !== null){

    return (
        
        <div className="infUtente__root">

            <h1>INFORMAZIONI PERSONALI</h1>

            <div className="infUtente__nome">
                Nome           {!nomeDaModificare && (<Button size="small" className={classes.margin} onClick={() =>{setNomeDaModificare(true)}}> Modifica </Button>)}{nomeDaModificare && (<> <Button size="small" className={classes.margin} onClick={modificaNome}> Salva </Button>  <Button size="small" className={classes.margin} onClick={clearFieldNome}> Annulla </Button>  </> ) }                                                    
                <br/> 
                {nomeDaModificare && (
                    <input type="text" placeholder="" value={fieldNome} onChange={(e)=> {setFieldNome(e.target.value)}}></input>
                )}
                {!nomeDaModificare &&(nome)}
                
            </div>

            <div className="infUtente__cognome">
                Cognome           {!cognomeDaModificare && (<Button size="small" className={classes.margin} onClick={() =>{setCognomeDaModificare(true)}}> Modifica </Button>)}{cognomeDaModificare && (<> <Button size="small" className={classes.margin} onClick={modificaCognome}> Salva </Button>  <Button size="small" className={classes.margin} onClick={clearFieldCognome}> Annulla </Button>  </> ) }                                                    
                <br/> 
                {cognomeDaModificare && (
                    <input type="text" placeholder="" value={fieldCognome} onChange={(e)=> {setFieldCognome(e.target.value)}}></input>
                )}
                {!cognomeDaModificare &&(cognome)}
                
            </div>

            <div className="infUtente__nomeUtente">
                Nome Utente                                                     
                <br/> 
                {nomeUtente}
                
            </div>


            <div className="infUtente__email">
                Indirizzo email           {!emailDaModificare && (<Button size="small" className={classes.margin} onClick={() =>{setEmailDaModificare(true)}}> Modifica </Button>)}{emailDaModificare && (<> <Button size="small" className={classes.margin} onClick={modificaEmail}> Salva </Button>  <Button size="small" className={classes.margin} onClick={clearFieldEmail}> Annulla </Button>  </> ) }                                                    
                <br/> 
                {emailDaModificare && (
                    <input type="text" placeholder="" value={fieldEmail} onChange={(e)=> {setFieldEmail(e.target.value)}}></input>
                )}
                {!emailDaModificare &&(email)}
                
            </div>


            <div className="infUtente__sesso">
                Sesso           {!sessoDaModificare && (<Button size="small" className={classes.margin} onClick={() =>{setSessoDaModificare(true)}}> Modifica </Button>)}{sessoDaModificare && (<> <Button size="small" className={classes.margin} onClick={modificaSesso}> Salva </Button>  <Button size="small" className={classes.margin} onClick={clearFieldSesso}> Annulla </Button>  </> ) }                                                    
                <br/> 
                {sessoDaModificare && (<>
                    <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                    <Select
                      native
                      value={sesso}
                      onChange={(e)=> {setSesso(e.target.value)}}
                      inputProps={{
                        name: 'age',
                        id: 'age-native-simple',
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value={"maschio"}>Maschio</option>
                      <option value={"femmina"}>Femmina</option>
                      <option value={"altro"}>Altro</option>
                    </Select></>
                    
                )}
                {!sessoDaModificare &&(sesso)}
                
            </div>

            <div className="infUtente__data">
                Data di Nascita           {!dataDaModificare && (<Button size="small" className={classes.margin} onClick={() =>{setDataDaModificare(true)}}> Modifica </Button>)}{dataDaModificare && (<> <Button size="small" className={classes.margin} onClick={modificaData}> Salva </Button>  <Button size="small" className={classes.margin} onClick={clearFieldData}> Annulla </Button>  </> ) }                                                    
                <br/> 
                {dataDaModificare && (
                    <DatePicker
                    format="y-MM-dd"
                    maxDate= {new Date()}
                    onChange = {(e) => {setDataDiNascita(e)}}

                    ></DatePicker>

                )}
                {!dataDaModificare &&(dataDaVisualizzare)}
                
            </div>

            <div className="infUtente__password">
                Password           {!passwordDaModificare && (<Button size="small" className={classes.margin} onClick={() =>{setPasswordDaModificare(true)}}> Modifica </Button>)}{passwordDaModificare && (<> <Button size="small" className={classes.margin} onClick={modificaPassword}> Salva </Button>  <Button size="small" className={classes.margin} onClick={clearFieldPassword}> Annulla </Button>  </> ) }                                                    
                <br/> 
                {passwordDaModificare && (
                    <>
                    <input type="password" placeholder="Password" value={fieldPassword} onChange={(e)=> {setFieldPassword(e.target.value)}}></input> <br/>
                    <input type="password" placeholder="Conferma Password" value={fieldConfermaPassword} onChange={(e)=> {setFieldConfermaPassword(e.target.value)}}></input>
                    </>

                )}
                {!passwordDaModificare &&("*************")}
                
            </div>

            <div className="infUtente__mostraCome">
                Mostra Come           {!mostraComeDaModificare && (<Button size="small" className={classes.margin} onClick={() =>{setMostraComeDaModificare(true)}}> Modifica </Button>)}{mostraComeDaModificare && (<> <Button size="small" className={classes.margin} onClick={modificaMostraCome}> Salva </Button>  <Button size="small" className={classes.margin} onClick={clearMostraCome}> Annulla </Button>  </> ) }                                                    
                <br/> 
                {mostraComeDaModificare && (<>
                    <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                    <Select
                      native
                      value={mostraCome}
                      onChange={(e)=> {setMostraCome(e.target.value)}}

                    >
                        <option aria-label="None" value="" />
                        <option value={"NOMECOMPLETO"}>Nome Completo</option>
                        <option value={"NOMEUTENTE"}>Nome Utente</option>
                        
                    </Select>
                    </>
                    

                )}
                {!mostraComeDaModificare &&(mostraCome)}
                
            </div>




            
            

        </div>
        
        
    )

}
else{

    return (

       

        <div >


        <CircularProgress  />
        
        </div>

       
    )
}


}

export default InformazioniUtente
