import React, { useEffect, useState } from 'react'
import { Outlet, Navigate} from "react-router-dom"
import { useRefreshMutation } from "../auth/authApiSlice"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "./authSlice"
import Loading from '../../components/loading'
import Authorization from './../../components/pages/authorization/index';

const PersistLogin = () => {    
    const token = useSelector(selectCurrentToken)
    const [trueSuccess, setTrueSuccess] = useState(false)
    

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()    

    useEffect(() => {         
        const verifyRefreshToken = async () => {               
            try {                    
                await refresh()                 
                setTrueSuccess(true)
            }
            catch (err) {
                console.log(err)                    
            }
        }            
        if (!token && localStorage.getItem("token")) verifyRefreshToken()              
    }, [])

    let content
    if (!localStorage.getItem("token")) { 
        content = <Navigate to="/"/>
    } else if (isLoading) { 
        content = (
            <div className='container'>
                <div className='wrraper'>
                    <Loading/>
                </div>
            </div>
        )
    } else if (isError) { 
        content = <Authorization error={error}/>
    } else if (isSuccess && trueSuccess) { 
        content = <Outlet/>
    } else if (token && isUninitialized) { 
        content = <Outlet/>
    }
    return content
}
export default PersistLogin