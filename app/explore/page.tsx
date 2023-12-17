'use client'
//

import { useEffect, useState } from 'react'
import { postService } from '../../services/post.service.local'

export default function ExplorePage() {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        onGetPosts()
    }, [])

    async function onGetPosts() {
        try {
            const res = await postService.getPosts()
            setPosts(res)
        } catch (err) {
            console.log('Error loading posts')
            return
        }
    }

    return (
        <section className="explore-page">
            <h1>Hello explore</h1>
        </section>
    )
}