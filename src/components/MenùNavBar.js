import React,{useEffect} from 'react'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link} from 'react-router-dom';
import {userService} from '../servizi/user.service.js'




const ITEM_HEIGHT = 48;

export default function MenùNavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState(sessionStorage.getItem('user'));
  const [isLogged, setIsLogged] = React.useState(false)

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseLogOut = () => {
    
    setAnchorEl(null);
    userService.logout();

    
  }

  useEffect( ()=> {


    if(sessionStorage.getItem('user') !== null){

      setIsLogged(true)

    }
    else{

      setIsLogged(false)
    }
    
  }, user )







  if(isLogged){
    return (
      <div >
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
  

            <Link to="/user/informazioniUtente"><MenuItem key={"InformazioniUtente"} onClick={handleClose}>
              Informazioni Utente
            </MenuItem>
            </Link>
            <Link to="/lineeguida"><MenuItem key={"Lineeguida"} onClick={handleClose}>
              Linee Guida
            </MenuItem>
            </Link>
            <Link to="/"><MenuItem key={"LogOut"} onClick={handleCloseLogOut}>
              Log out
            </MenuItem>
            </Link>
            
          
        </Menu>
      </div>
    );




  }
  else{

  return (
    <div >
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >

          <Link to="/login"><MenuItem key={"Login"} onClick={handleClose}>
            Login
          </MenuItem>
          </Link>
          <Link to="/registrazione"><MenuItem key={"Registrazione"} onClick={handleClose}>
            Registrazione
          </MenuItem>
          </Link>
          <Link to="/lineeguida"><MenuItem key={"Lineeguida"} onClick={handleClose}>
            Linee Guida
          </MenuItem>
          </Link>
          
        
      </Menu>
    </div>
  );

      }
}