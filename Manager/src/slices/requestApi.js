import axios from "axios";
import { loginBegin, loginFailure, loginSuccess} from './authSlice'
import { getUserBegin, getUserSuccess, getUserFailure } from './readerSlice'
import { addBookBegin, getBookBegin, getBookFailure, getBookSuccess } from "./bookSlice";


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
    dispatch(getUserBegin());
    try{
        const res = await axios.get('http://localhost:8000/api/user',{
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(getUserSuccess(res.data));
    }catch(err){
        dispatch(getUserFailure());
    }
}

export const getAllBooks = async (accessToken, dispatch) => {
    dispatch(getBookBegin());
    try{
        const res = await axios.get('http://localhost:8000/api/book',{
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(getBookSuccess(res.data));
    }catch(err){
        dispatch(getBookFailure());
    }
}

export const addBook = async (book, accessToken, dispatch) => {
    dispatch(addBookBegin());
    try{
        const res = await axios.post('http://localhost:8000/api/book', book, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
    }catch(err){
        console.log(err.response.data);
    }
}