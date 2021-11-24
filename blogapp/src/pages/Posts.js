
import React, { useState, useEffect } from 'react'
import Post from './Post'
import './Posts.css'
import axios from 'axios'

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPostsFunc = async () => {
            try {
                const response = await axios.get('/posts')
                setPosts(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getPostsFunc();
    }, []);
    return (
        <>
            <div className='AllPosts'>
                {posts.map((p)=>(
                      <Post post={p}/>
                ))}
            </div>
        </>

    )
}

export default Posts
