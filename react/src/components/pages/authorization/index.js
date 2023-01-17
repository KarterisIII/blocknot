import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './../../button';
import './style.scss'

const Authorization = (props) => {
    const {error} = props
    const navigate = useNavigate()

    const logIn = () => {
        localStorage.removeItem('token')
        navigate('/')       
    }

    return (
        <div className='container'>
            <div className='wrraper'>
                <div className='auth'>
                    <div className='content'>
                        <div className='content-body'>
                            <div className='content-header'>
                                <h4>{error.data?.message} </h4>
                            </div>
                            <div className='content-footer'>                                                                
                                <Button 
                                    handleClick={logIn}>
                                    Авторизоваться
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>                                    
            </div>
        </div>
    )
}
export default Authorization