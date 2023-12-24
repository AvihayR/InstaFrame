'use client'
//
import { useEffect, useState } from 'react'
import { postService } from '../../services/post.service.local'
import ExploreList from '@/cmps/ExploreList'
import { Post } from '../../typings'
import { Modal } from '@/cmps/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { RootStoreState } from '../../store/store'
import { SET_IS_MODAL_OPEN } from '@/store/reducers/system.reducer'
import type { Dispatch } from 'redux'
import { PostDetails } from '@/cmps/PostDetails'
import { userService } from '@/services/user.service.local'


export default function ExplorePage() {
    const dispatch = useDispatch()
    const [posts, setPosts] = useState<Post[]>([])
    const [chosenPost, setChosenPost] = useState<Post | null>(null)


    const isModalOpen = useSelector((storeState: RootStoreState) => storeState.systemModule.isPostModalShown) ?? false
    function setIsModalOpen(isShown: boolean) {
        dispatch({ type: SET_IS_MODAL_OPEN, isShown })
    }

    useEffect(() => {
        onGetPosts()
        userService.getEmptyUser()
    }, [])

    function openPost(post: Post) {
        setChosenPost(post)
        openModal()
    }

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
            <ExploreList posts={posts} openPost={openPost} />
            <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }}>
                <PostDetails post={chosenPost} />
            </Modal>
        </section>
    )
}