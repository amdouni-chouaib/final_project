import React from 'react'
import Sidebar from './Sidebar'
import ShowFullPost from './ShowFullPost'
import './SinglePost.css'

function SinglePost() {
    return (
        <>
            <div className='PostFlex'>
                <ShowFullPost/>
                <Sidebar/>
            </div>
        </>

    )
}

export default SinglePost
