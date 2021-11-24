import React, { useState, useEffect, useContext } from 'react'
import './ShowFullPost.css'
import { useLocation } from 'react-router'
import axios from 'axios'
import { Context } from '../context/Context'

function ShowFullPost() {
    const PF = 'http://localhost:5000/images/'   //public folder for images
    const location = useLocation()
    const path = location.pathname.split('/')[2];

    const [post, setPost] = useState([])

    // states for updating the post
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [updatemode, setUpdatemode] = useState(false)
    // const [updated, setUpdated] = useState(false)

    useEffect(() => {
        const getOneSinglePost = async () => {
            try {
                const responsePost = await axios.get('/posts/getpost/' + path)
                setPost(responsePost.data)
                //the responsepost values will be the required title in our update fields
                setTitle(responsePost.data.title)
                setDescription(responsePost.data.description)

            } catch (error) {
                console.log(error)
            }
        }
        getOneSinglePost();
    }, [path])


    //deleting Post
    const { user } = useContext(Context)
    const handleDeletePost = async (req, res) => {
        try {
            await axios.delete('/posts/deletepost/' + path, {
                //i used path here because i already extracted that path which is id
                data: { username: user.username }
                //for delete data should be written 
            })
            window.location.replace('/home')

        } catch (error) {
            console.log(error)
        }
    }

    //updating the post
    const updatePost = async (req, res) => {
        // setUpdated(true)
        try {
            await axios.put('/posts/updatepost/' + path, {
                username: user.username,
                title,
                description
            })
            window.location.reload()
            // setUpdatemode(false)

        } catch (error) {
            console.log(error)
        }
    }

    // created and edited dates of posts
    let createdDate = new Date(post.createdAt).toDateString()
    let editedDate = new Date(post.updatedAt).toDateString()

    return (
        <>
            <div className='postCompo'>
                <div className='SPostContainer'>
                    <img
                        src={PF + post.photo} alt='none' />
                    {updatemode ? (<input type="text"
                        onChange={(e) => setTitle(e.target.value)} autoFocus={true} value={title} name="" id="title" />) :
                        <h2 className='heading'>
                            {post.title}
                        </h2>
                    }
                    <div className='SauthorAndDate'>
                        <div className='info'>
                            <i className="authicon fas fa-pen"></i>
                            <span className='SAuthor'>{post.username}</span>
                            <i className="sicons far fa-clock"></i> 
                            <span className='SDate'>{createdDate }</span>                 
                            <i className="sicons fas fa-user-edit"></i>
                            <span className='SDate'>{editedDate}</span> 
                        </div>

                        {(post.username === user.username) && <div className='icons'>
                            <i onClick={() => setUpdatemode(true)} className="ei edit fas fa-edit"></i>
                            <i onClick={handleDeletePost} className="di fas fa-trash-alt"></i>
                        </div>}

                    </div>

                    {updatemode ? (<input type="text"
                        onChange={(e) => setDescription(e.target.value)} value={description} name="" id="title" />) :
                        (<p className='sdesc'>
                            {post.description}
                        </p>)
                    }
                    {updatemode && <input style={{ width: "10vw" }} type="button" onClick={updatePost} id="sub" className="btn" value="Save" />}

                </div>
            </div>
        </>
    )
}

export default ShowFullPost
