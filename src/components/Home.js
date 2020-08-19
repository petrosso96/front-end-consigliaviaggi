import React, { Component } from 'react';
import FiltriPopUp from './FiltriPopUp';

class Home extends Component{
    constructor(props) {

        super(props);

        this.state = {
            isSeenPopFiltri = false
        }

    }

    handlePopUpFiltri = () => {
        this.setState({
            isSeenPopFiltri: !this.state.isSeenPopFiltri
        });
    }

    render () {


        return(


            {this:state.isSeenPopFiltri ? <FiltriPopUp toggle={this.handlePopUpFiltri} /> : null}
        );
    }


}

export default Home;