import axios from 'axios'
import React, { useState } from 'react'
import './loginandreg.css'

function Reg() {

    //states for register process
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    //function to register user
    const registerUser = async (e) => {
        // setError(false)
        e.preventDefault()
        try {
            const res = await axios.post('/auth/register', {
                username,
                email,
                password
            })
            console.log(res)
            alert("Registered SuccessFully !!! You can Login now ")
        }
        catch (err) {
            setError(true)
        }
    }



    return (
        <>
            <div>
                <div class="box">
                    <h2 id="head">Register</h2>
                    <form>
                        <input type="text" name="text" className="email"
                            onChange={e => setUsername(e.target.value)} placeholder="Username"
                             />
                        <div id="emailcheck"></div>
                        <input type="email" name="email" className="email"
                            onChange={e => setEmail(e.target.value)} placeholder="Email"
                            />
                        <div id="emailcheck"></div>
                        <input type="password" name="password" id="pass"
                            onChange={e => setPassword(e.target.value)} placeholder="Password"
                        />
                        {/* <i class="far fa-eye"></i> */}
                    </form>
                    <input type="button" onClick={registerUser} class="btn1" value="Register" />
                    {error ? (<span className="Msg">Error : Username or Email is already taken</span>)
                        : (<span className="Msg"></span>)}

                </div>

                <div class="topic">
                    <h1 class="sum"><a href="https://gomycode.com/TN-FR/home">GoMyCode</a></h1>
                    <hr />
                    <p id="parax">The ultimate resource to learn and share tech stuffs.
                        Everything you need, in one platform.</p>
                </div>
            </div>
        </>

    )
}

export default Reg
