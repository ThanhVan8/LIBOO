import axios from "axios";
import { loginBegin, loginFailure, loginSuccess} from './authSlice'
import { getUserBegin, getUserSuccess, getUserFailure, addReaderBegin, addReaderSuccess } from './readerSlice'
import { addBookBegin, addBookFailure, addBookSuccess, getBookBegin, getBookFailure, getBookSuccess } from "./bookSlice";

//auth
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

//readers
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

export const addReader = async (reader, accessToken, dispatch) => {
    dispatch(addReaderBegin());
    try{
        const res = await axios.post('http://localhost:8000/api/user', reader, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(addReaderSuccess(res.data));
    }catch(err){
        dispatch(addBookFailure())
        console.log(err.response.data);
    }
}


//books
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
        dispatch(addBookSuccess(res.data));
    }catch(err){
        dispatch(addBookFailure())
        console.log(err.response.data);
    }
}