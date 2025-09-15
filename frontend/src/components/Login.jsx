import React ,{useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  function capValue(e) {
    e.preventDefault();
    axios.post('/api/user/login', form)
      .then((res) => {
        console.log('Form submitted', form);
        alert(res.data.message);
        if (res.data.usertoken) {
          localStorage.setItem("token",res.data.usertoken);
          navigate('/');
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Invalid credentials or server error");
        navigate('/login');
      });
  }
  return (
    <Box>
    
    <div style={{textAlign:'center',marginTop:200}}>
            <div><h1>LOGIN</h1></div>
            <div><TextField
                  required
                  id="outlined-required"
                  label="email"
                   value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
                /></div>
                <br />
        <div><TextField
                  required
                  id="outlined-required"
                  label="Password"
                    value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
        </div>
        <br />
       
        <div>
            <Button variant="contained"  onClick={capValue}>Login</Button>
        </div>
        </div>
        </Box>
      
          
        
    
  )
}

export default Login
