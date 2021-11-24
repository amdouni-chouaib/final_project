import React, { useState, useEffect } from 'react'
// import cover from './cover.jpg'
import './Home.css'
import Posts from './Posts'
import { useLocation } from 'react-router'
import axios from 'axios'

function Home() {
    const location = useLocation()
    const { search } = location
    console.log(search)
    const [post, setPost] = useState([]);
    useEffect(() => {
        const getOneSinglePost = async () => {
            try {
                const responsePost = await axios.get('/posts/' + search)
                console.log(responsePost.data)
                setPost(responsePost.data)
            } catch (error) {
                console.log(error)
            }

        }
        getOneSinglePost();
    }, [search])
    return (
        <>
            <div className='container'>
                <div className='contents'>
                    <h1 className='Heading'>
                        What Is Blog 
                    </h1>
                    <p className='homepara'>A blog or blog is a type of website - or part of a website - used for the periodic and regular publication of personal articles, generally brief, reporting on a news item around a particular topic.</p>
                </div>
                <div className="bg"></div>

            </div>
            {/* <div className="posts">Posts</div> */}
            <Posts />
            <footer className="foot">
                Copyright © 2020-2021 Asma&Chouaib. All rights reserved.
            </footer>
        </>

    )
}

export default Home
