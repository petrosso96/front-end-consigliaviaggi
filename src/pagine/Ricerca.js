import React,{useState} from 'react'
import { useEffect } from "react";
import { useLocation,Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import './Ricerca.css'


function Ricerca(props) {


    const [strutture,setStrutture] = useState(null)
    const location = useLocation();


    useEffect(() => {

        setStrutture(location.state.strutture); 
        console.log(strutture)

     }, [strutture]);


    if(strutture != null){

        return(
            <div >
                <ul classname="w3-ul w3-card-4" >
                {strutture.map((struttura,indice)=>{

                    return(<BannerStruttura key={indice} value={struttura}/>)
                })}
                </ul>
            
            
            </div>
        )

    }
    else{

        return(
            <div>
              <CircularProgress />
            
            
            </div>
        )


    }
}


function BannerStruttura(props){

    console.log(props.value)
    const urlStruttura = "/struttura/"+props.value.id
    


    return(
        <li>
            <Link to={urlStruttura}>
            <img src={props.value.foto} alt="immagine"></img>
            </Link>
            <h3>{props.value.nome}</h3>
            <p>{props.value.descrizione}</p>
           
        </li>
    );
}

export default Ricerca
