import React from 'react'
import './BannerStruttura.css'

function BannerStruttura(props) {

    console.log(props.struttura.foto)

    

    return (
        <div className="struttura">
            <h3>{props.struttura.nome}</h3>


           <img src={props.struttura.foto}  width="250" height="250"/>

    
            
        </div>
    );
}

export default BannerStruttura
