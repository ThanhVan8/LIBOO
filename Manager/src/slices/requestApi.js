import axios from "axios";
import { loginBegin, loginFailure, loginSuccess} from './authSlice'

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginBegin());
    try {
        const res = await axios.post('http://localhost:8000/api/auth/login', user);
        if (res.data.admin === true) {
            dispatch(loginSuccess(res.data));
            navigate('/');
        }
        else {
            dispatch(loginFailure());
        } 
        
    } catch (err) {
        console.log(err.response.data);
        dispatch(loginFailure());
    }
}

export const getAllUsers = async (accessToken, dispatch) => {
    try{
        const res = await axios.get('http://localhost:8000/api/user',{
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
    }catch(err){
        console.log(err.response.data);
    }
}