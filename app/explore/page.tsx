'use client'
//

import { useEffect, useState } from 'react'
import { postService } from '../../services/post.service.local'
import ExploreList from '@/cmps/ExploreList'
import { Post } from '../../typings'

export default function ExplorePage() {
    const [posts, setPosts] = useState([])

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
        <section className="explore-page flex flex-col items-center">
            <ExploreList posts={posts} />
        </section>
    )
}