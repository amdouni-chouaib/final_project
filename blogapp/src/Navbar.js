import './Navbar.css'
import { Context } from './context/Context'
import { useContext } from 'react'
import React from 'react'
import {
    Link
} from "react-router-dom";

function Navbar() {
    const { user, dispatch } = useContext(Context)
    // const user=false


    //function for loging out user
    const logoutUser = () => {
        dispatch({ type: "LOGOUT"})
    }
    return (
        <>
            <div className='Nav'>
               
                <div className='cpart'>
                    <ul>
                        <li><Link className="link" to="/home">Home</Link></li>
                        <li><Link className="link" to="/posts">Posts</Link></li>
                        {user ?
                              <li><Link className="link" to="/create">Add Post</Link></li> : (
                                <li><Link className="link" to="/login">Login</Link></li>
                            )}
                      
                        {!user && <li><Link className="link" to="/reg">SignUp</Link></li>}
                        {user ?
                            (<li><Link className="link" to="/settings">My Account</Link></li>) : (
                                <li></li>
                            )}
                        {user ?
                            (<li style={{cursor:"pointer"}} onClick={logoutUser}>Logout</li>) : (
                                <li></li>
                            )}

                    </ul>
                </div>
                <div className='rpart'>
                    <i className="searchIcon fas fa-search"></i>
                    <input type="text" name="search"  id="srch" placeholder="search here"/>

                </div>
            </div>
        </>

    )
}

export default Navbar
