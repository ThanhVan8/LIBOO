import axios from "axios";
import { setCurrentAction, loginBegin, loginFailure, loginSuccess, registerBegin, registerFailure, registerSuccess } from './authSlice'

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginBegin());
    try {
        const res = await axios.post('http://localhost:8000/api/auth/login', user);
        dispatch(loginSuccess(res.data));
        toast.success('Login successfully!');
        navigate('/');
    } catch (err) {
        console.log(err.response.data);
        dispatch(loginFailure());
        toast.error('Login failed!');
    }
}

export const registerUser = async (user, dispatch) => {
    dispatch(registerBegin())
    try {
        await axios.post('http://localhost:8000/api/auth/register', user);
        dispatch(registerSuccess());
        dispatch(setCurrentAction('Sign In'))
        toast.success('Sign up successfully!');
    } catch (err) {
        dispatch(registerFailure());
        toast.error(err.response.data);
    }
}