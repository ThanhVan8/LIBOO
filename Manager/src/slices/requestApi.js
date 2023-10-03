import axios from "axios";
import { loginBegin, loginFailure, loginSuccess} from './authSlice'
import { getUserBegin, getUserSuccess, getUserFailure, addReaderBegin, addReaderSuccess, updateReaderBegin, updateReaderSuccess, updateReaderFailure, deleteUserBegin, deleteUserSuccess, deleteUserFailure,
    deleteReaderBegin, deleteReaderSuccess, deleteReaderFailure 
} from './readerSlice'
import { addBookBegin, addBookFailure, addBookSuccess, deleteBookBegin, deleteBookFailure, deleteBookSuccess, getBookBegin, getBookFailure, getBookSuccess, 
    updateBookBegin, updateBookFailure, updateBookSuccess 
} from "./bookSlice";

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

export const updateReader = async (user, id, accessToken, dispatch) => {
    dispatch(updateReaderBegin());
    try{
        const res = await axios.put('http://localhost:8000/api/user/'+ id, user, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(updateReaderSuccess(res.data));
    }catch(err) {
        dispatch(updateReaderFailure())
        console.log(err.response.data);
    }
}

export const deleteReader = async (accessToken, dispatch, id) => {
    dispatch(deleteReaderBegin());
    try{
        const res = await axios.delete('http://localhost:8000/api/user/'+ id, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(deleteReaderSuccess(res.data));
    }catch(err) {
        dispatch(deleteReaderFailure())
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

export const updateBook = async (book, id, accessToken, dispatch) => {
    dispatch(updateBookBegin());
    try{
        const res = await axios.put('http://localhost:8000/api/book/'+ id, book, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(updateBookSuccess(res.data));
    }catch(err) {
        dispatch(updateBookFailure())
        console.log(err.response.data);
    }
}

export const deleteBook = async (accessToken, dispatch, id) => {
    dispatch(deleteBookBegin());
    try{
        const res = await axios.delete('http://localhost:8000/api/book/'+ id, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(deleteBookSuccess(res.data));
    }catch(err) {
        dispatch(deleteBookFailure())
        console.log(err.response.data);
    }
}