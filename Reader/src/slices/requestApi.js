import axios from "axios";
import { setCurrentAction, loginBegin, loginFailure, loginSuccess, registerBegin, registerFailure, registerSuccess } from './authSlice'

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginBegin());
    try {
        const res = await axios.post('http://localhost:8000/api/auth/login', user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (err) {
        console.log(err.response.data);
        dispatch(loginFailure());
    }
}

export const registerUser = async (user, dispatch) => {
    dispatch(registerBegin())
    try {
        await axios.post('http://localhost:8000/api/auth/register', user);
        dispatch(registerSuccess());
        dispatch(setCurrentAction('Sign In'))
    } catch (err) {
        dispatch(registerFailure());
    }
}