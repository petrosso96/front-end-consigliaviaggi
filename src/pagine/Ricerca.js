import React from 'react'

class Ricerca extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open:false,
            strutture: this.props.strutture
        }

    }

    render(){



        console.log(this.props)


        /*const listaStrutture = this.state.strutture.map((struttura) =>
        
           <ul>{struttura}</ul>
        
        );*/

        return(

            <div>
                Strutture
                <ul>
                   
                   
                    
                </ul>
            </div>


        );
    }


}

export default Ricerca