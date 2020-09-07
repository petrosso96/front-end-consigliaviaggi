import React from 'react'
import './BannerStruttura.css'
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';

function BannerStruttura(props) {

    

    return (
        <div className="struttura">
            <h3>{props.struttura.nome}</h3>


            <img source={"immagine"} alt="foto"></img>
            <div className="struttura__rating">
                

                

               
                
            </div>
    
            
        </div>
    );
}

export default BannerStruttura
