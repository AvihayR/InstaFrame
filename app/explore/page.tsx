'use client'
//

import { useEffect, useState } from 'react'
import { postService } from '../../services/post.service.local'
import ExploreList from '@/cmps/ExploreList'
import { Post } from '../../typings'
import { Entity } from '@/services/async-storage.service'
import { Modal } from '@/cmps/Modal'

export default function ExplorePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        onGetPosts()
    }, [])

    function openModal() {
        setIsModalOpen(true)
    }

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
            <ExploreList posts={posts} openModal={openModal} />
            <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }}>
                <h1>Hello modal!</h1>
            </Modal>
        </section>
    )
}