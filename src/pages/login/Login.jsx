import "./login.scss"
import { useState } from "react"
import { login } from "../../redux/apiCalls";
import {useDispatch} from 'react-redux';
import {Box,Paper} from '@mui/material';
const Login = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const dispatch=useDispatch();
  const loginEvent=(e)=>{
    let user={
      email,
      password
    };
    e.preventDefault();
    login(dispatch,user);
  }
  return (
    <div className="container">
      <Box
      sx={{
        display: 'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
          m: 1,
          width: 600,
          height: 500,
          backgroundColor:'white',
          borderRadius:'10%'
       
      }}
    >
      <img src={'/assets/login.png'}/> 
      <span style={{fontSize:'30px',margin:'15px'}} >Admin Login
      </span>
      <div style={{padding:'10px',border:'1px solid lightgray',margin:'5px'}}>
      <input type="text" style={{border:'none',height:'25px',outline:'none'}} placeholder="Input Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      </div>
      <div style={{padding:'10px',border:'1px solid lightgray',margin:'15px'}}>
      <input type="text" style={{border:'none',height:'25px',outline:'none'}} placeholder="Input Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      </div>
      <button style={{padding:'10px',width:'20%',border:'none',fontWeight:'400',cursor:'pointer',fontSize:'15px',backgroundColor:'lightgray'}} onClick={loginEvent}>Login</button>
      
    </Box>
    </div>
  )
}

export default Login