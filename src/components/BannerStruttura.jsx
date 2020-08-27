import React from 'react'
import './BannerStruttura.css'
import StarRatings from 'react-star-ratings'

function BannerStruttura(strutture) {
    return (
        <div className="struttura">
            <p>{"nome"}</p>
            <p className="struttura__">
                
            </p>

            <img source={"immagine"} alt="foto"></img>
            <div className="struttura__rating">
                {
                    <StarRatings
                    numberOfStars={3}
                    name='rating'
                    rating = {3}
                    starRatedColor= "red"
                    starDimension="20px"
                  />
                }

                {console.log(strutture[0])}
                
            </div>
    
            
        </div>
    );
}

export default BannerStruttura
