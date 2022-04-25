import {loginSuccess,loginFailure,loginStart,logOut} from '../redux/userRedux';
import { userRequest } from '../makeRequest';
// import { useNavigate } from 'react-router-dom';
export const login=async(dispatch,user)=>{
    dispatch(loginStart());
try{
    const res= await userRequest.post('/auth/login',user)
    dispatch(loginSuccess(res.data));
    // setTimeout(()=>{
    //     navigate('/');
    // },1000)
}
catch(err){
dispatch(loginFailure());
}
}
export const logout=async(navigate,dispatch)=>{
    dispatch(logOut());
    localStorage.setItem(('persist:root').user,null);
    navigate('/');

}