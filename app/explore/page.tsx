'use client'
//

import { useEffect, useState } from 'react'
import { postService } from '../../services/post.service.local'
import ExploreList from '@/cmps/ExploreList'
import { Post } from '../../typings'

export default function ExplorePage() {
    const [posts, setPosts] = useState<Post[]>([]);

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
        <section className="explore-page flex flex-col items-center mx-auto md:px-5 xl:px-0">
            <ExploreList posts={posts} />
        </section>
    )
}