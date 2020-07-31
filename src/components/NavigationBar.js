import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { FaAlignRight } from "react-icons/fa";
import Logo from '../images/Logo.svg'

export default class NavigationBar extends Component{
    
    state={
        isOpen:false
    }

    handleToogle = () => {
        this.setState({isOpen:!this.state.isOpen})
    }


    render(){
        return(
            <nav className="navbar">
                <div className="nav-center">
                  <div className="nav-header">
                    <Link to = "/">
                        <img src={Logo} alt="Logo" style={{height:50}}/>
                    </Link>
                    <button type="button" className="nav-btn" onClick={this.handleToogle}>
                        <FaAlignRight className="nav-icon"/>
                    </button>
                  </div>
                    <ul className={this.state.isOpen ? "nav-links show-nav": "nav-links" }>
                        <li>
                        </li>
                        <li>
                        </li>
                    </ul>
                </div>
            </nav>
        );        
    }
}