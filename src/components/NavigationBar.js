import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import FiltriPopUp from './FiltriPopUp'
import logo from '../images/Logo.svg';
import MenuNavBar from './MenùNavBar';


import axios from 'axios';
import { Container } from '@material-ui/core';
import Ricerca from '../pagine/Ricerca'
import { Redirect } from 'react-router-dom';





const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo:{
    width: '250px',
    height:'70px',
  },  

  menuButton: {
    marginRight: theme.spacing(50),
    
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    display: 'flex',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },

    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 30, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}
));

export default function NavigationBar() {
  const [isSearching, setIsSearching] = React.useState(false);
  const [ricerca, setFieldRicerca] = React.useState(null);
  const [nomeCity, setCity] = React.useState(null);
  const [prezzoStruttura, setPrezzo] = React.useState(-1);
  const [nomeCategoria, setCategoria] = React.useState(null);
  var risultatiRicerca = null;
  const classes = useStyles();
  const menuIcon = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M2 13.5h14V12H2v1.5zm0-4h14V8H2v1.5zM2 4v1.5h14V4H2z"/></svg>


  const handleChange = (event) => {
    setFieldRicerca(event.target.value);
    
  };

  const ricercaStrutture = (nomeStruttura) => {

    setIsSearching(true);


    axios.post(`http://localhost:8080/all/ricerca`, {       
      nome:ricerca,
      city:nomeCity,
      categoria:nomeCategoria,  
      latitudine:-1,
      longitudine:-1,
      distanza:-1,
      prezzo:prezzoStruttura, 
    })
    .then(res => {
      console.log(res);
      //console.log(res.data);
      risultatiRicerca = res.data;


      
    })
    

    clearField();
  };

  const keyPress = (e) => {
    if(e.keyCode === 13){//tasto invio 
      ricercaStrutture(e.target.value)

    }

  }


  const handleCityChangeNavigationBar  = (cityValue)=>{
    setCity(cityValue)
  }

  const handlePrezzoChangeNavigationBar = (prezzoValue) => {
    setPrezzo(prezzoValue)

  }

  const handleCategoriaChangeNavigationBar = (categoriaValue) => {
    setCategoria(categoriaValue)

  }


  const clearField = () =>{ setFieldRicerca("") }

  if( isSearching === false) {

  return (
    <nav className="NavigationBar">
      <AppBar position="static" color="inherit">
        <Toolbar >
        <img src={logo} alt="Consiglia viaggi" className={classes.logo}></img>
        <IconButton  className={classes.menuButton} color="inherit" aria-label="menu">
        </IconButton>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon></SearchIcon>

            </div>
            <InputBase
              type="text"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              id="ricerca"
              value={ricerca}
              onChange={handleChange}
              onKeyDown={keyPress}
            />
            <FiltriPopUp handleCityChange={handleCityChangeNavigationBar} handlePrezzoChange={handlePrezzoChangeNavigationBar} handleCategoriaChange={handleCategoriaChangeNavigationBar}></FiltriPopUp>
            
            </div>
            <MenuNavBar />
            
           
          

        </Toolbar> 
      </AppBar>

      {isSearching && (
      <Container>
        <Ricerca></Ricerca>
      </Container>
      )
    }



    </nav>


  

  );

  }



}
