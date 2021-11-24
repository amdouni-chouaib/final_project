import "./settings.css";
import react, { useState, useContext } from 'react'
import { Context } from '../context/Context'
import axios from 'axios'

export default function Settings() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { user } = useContext(Context)

  const handleUpdateUser = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put('/users/updateuser/'+ user._id, {
        userId:user._id,
        username,
        email,
        password
      })
      console.log("updated")
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(user.username)
  return (
    <>
      <div className="settings">
        <div className="settingsz">
          <div className="settingsTitle">
            <span className="settingsTitleUpdate">My Info</span>
          </div>
          <form className="settingsForm">
            <label>Username</label>
            <input type="text" placeholder={user.username} name="name"
              onChange={(e) => setUsername(e.target.value)} />
            <label>Email</label>
            <input type="email" placeholder={user.email} name="email"
              onChange={(e) => setEmail(e.target.value)} />
            <label>Password</label>
            <input type="password" placeholder="" name="password"
              onChange={(e) => setPassword(e.target.value)} />
            <button className="settingsSubmitButton"
              onClick={handleUpdateUser} type="submit">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

//For profile picture but lets not do this in this project
    // <div className="settingsPP">
    //          <img
    //           src="https://scontent.fpkr1-1.fna.fbcdn.net/v/t1.6435-9/67082403_924445121221621_4689287633560403968_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=174925&_nc_ohc=-qlP_K1TrH8AX_-ZSmG&_nc_oc=AQlbBE_44EV45Lu4ibink104c8M6kg7gV462XjuW57iHz4uJuAIvOPqMpCC_xDtOXLuj-bbRp1tJkhNM8I-_wHLk&_nc_ht=scontent.fpkr1-1.fna&oh=f88b150b9bab51bd5c5f5d3af9c7e661&oe=61903320"
    //           alt=""
    //         />
    //         <label htmlFor="fileInput">
    //           <i className="settingsPPIcon far fa-user"></i>{" "}
    //         </label>
    //         <input
    //           id="fileInput"
    //           type="file"
    //           style={{ display: "none" }}
    //           className="settingsPPInput"
    //         />