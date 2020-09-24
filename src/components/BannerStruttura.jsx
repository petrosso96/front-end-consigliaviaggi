import React from 'react'
import './BannerStruttura.css'

function BannerStruttura(props) {

    console.log(props.struttura.foto)

    

    return (
        <div className="struttura">
            <h3>{props.struttura.nome}</h3>


            <img source={props.struttura.foto} alt="foto" style={{width: "40px;"}}></img>

    
            
        </div>
    );
}

export default BannerStruttura
