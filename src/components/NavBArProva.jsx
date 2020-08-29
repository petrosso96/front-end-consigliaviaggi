import React from 'react';
import './NavBArProva.css';
import logo from '../images/Logo.svg';
import {Link} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import MenùNavBar from './MenùNavBar';


function NavBArProva() {
    return (
        <nav className="header">

            <Link to="/"><img className="header__logo" src={logo} alt="Consiglia viaggi"/></Link>
            
            <div className="header__search">
            <input type="text" className="header__searchInput"/>
            <SearchIcon className="header__searchIcon" />
            </div>

            <div className="headerNav">
                <MenùNavBar/>

            </div>


            
        </nav>
    )
}

export default NavBArProva
