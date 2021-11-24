import React, { useState, useContext } from 'react'
import './create.css'
import { Context } from '../context/Context'
import axios from 'axios'


function Create() {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [file, setFile] = useState('')
    const { user } = useContext(Context)

    // console.log(title,desc)

    const publishPost = async (e) => {
        e.preventDefault()
        const newPost = {
            username: user.username,
            title,
            description: desc
        }
        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            //date is used here to create a unique name
            data.append("name", filename)
            data.append("file", file)
            newPost.photo = filename
            try {
                await axios.post('/upload', data)
            } catch (error) {
                console.log("error")
            }
        }
        const resp = await axios.post('/posts/createpost', newPost)
        window.location.replace(`/posts/${resp.data._id}`)
    }

    return (
        <>
            <div>

                {file && <img className='uploadimg'
                    src={URL.createObjectURL(file)} alt="" />}

                <form className='formInput'>

                    <label htmlFor="fileInput">
                        <i class="plus fas fa-plus"></i>
                    </label>
                    <input type="file" name="file" id="fileInput"
                        onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} />
                    {/* title and description of our post */}
                    <input type="text" name="title" id="title"
                        onChange={e => setTitle(e.target.value)} placeholder='Enter Title' />
                    <textarea name="textarea" id="tarea" cols="30" rows="10"
                        onChange={e => setDesc(e.target.value)} placeholder='
                     Description'></textarea>
                    <input className="btnn" onClick={publishPost} type="submit" value="Publish" />
                </form>
            </div>
        </>

    )
}

export default Create
