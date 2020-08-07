import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import logo from '../images/Logo.svg';
import Menu from '@material-ui/core/Menu';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  menuNavigationBar:{

    position:"154px",
    size:"189px"
  },
  logo:{
    width: '250px',
    height:'70px',
  },  
  root: {
    flexGrow: 1,
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
  const [ricerca, setFieldRicerca] = React.useState('');
  const classes = useStyles();
  const menuIcon = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M2 13.5h14V12H2v1.5zm0-4h14V8H2v1.5zM2 4v1.5h14V4H2z"/></svg>


  const handleChange = (event) => {
    setFieldRicerca(event.target.value);
    
  };

  const ricercaStrutture = (nomeStruttura) => {
    console.log(nomeStruttura);

    const oggettoRicerca  = {

      nome:"Pizzeria la Notizia",
      city:null,
      categoria:null,  
      latitudine:-1,
      longitudine:-1,
      distanza:-1,
      prezzo:-1,
    }

    console.log(oggettoRicerca)


    axios.post(`http://localhost:8080/all/ricerca`, { oggettoRicerca })
    .then(res => {
      console.log(res);
      console.log(res.data);
      
    })
    

    clearField();
  };

  const keyPress = (e) => {
    if(e.keyCode === 13){
      ricercaStrutture(e.target.value)


      
    }

  }

  const clearField = () =>{ setFieldRicerca("") }

  return (
    <div className="NavigationBar">
      <AppBar position="static" color="inherit">
        <Toolbar >
        <img src={logo} alt="COnsiglia viaggi" className={classes.logo}></img>
        <IconButton edge="false" className={classes.menuButton} color="inherit" aria-label="menu">
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
              defaultValue=""
              id="ricerca"
              value={ricerca}
              onChange={handleChange}
              onEnter={ricercaStrutture}
              onKeyDown={keyPress}
              
            />
          <IconButton edge="false" className={classes.menuNavigationBar} color="inherit" aria-label="menu">
            <Menu></Menu>
            {menuIcon}
          </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
