import React from 'react'
import './Post.css'
import { Link } from 'react-router-dom'

function Post({ post }) {
    const PF='http://localhost:5000/images/'
    return (
        <>
            <div className='PostContainer'>
                <img src={PF+post.photo} style={{
                 height:"30vh",
                 width:"25vw"
                }} alt='none' />

                <Link className="link" to={`/posts/${post._id}`}>
                    <h2 className='heading'>
                        {post.title}
                    </h2>

                </Link>
                <div className='authorAndDate'>
                    <i className="authicon fas fa-pen"></i>
                    <span className='Author'>{post.username}</span>
                    <span className='Date'>{new Date(post.createdAt).toDateString()}</span>
                </div>
                <p className='desc'>
                    {post.description}
                </p>
            </div>
        </>

    )
}

export default Post
