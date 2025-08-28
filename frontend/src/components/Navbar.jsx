import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const removeToken=()=>{
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
        
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ProductApp
          </Typography>
        {!token && (
          <> <Link to="/login"><Button color="inherit" style={{color:'white'}}>Login</Button></Link> 
       </>
        )

        }
         <Link to="/"><Button color="inherit"style={{color:'white'}}>Home</Button></Link> 
       {token && (
        <>
         <Link to="/add"><Button color="inherit"style={{color:'white'}}>Add Product</Button></Link>  
        <Button color="inherit"style={{color:'white'}} onClick={removeToken}>Logout</Button></>
       )

       }
        </Toolbar>
      </AppBar>
    </Box>
    
  )
}

export default Navbar
