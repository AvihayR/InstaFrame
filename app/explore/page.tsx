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
import { PostDetails } from '@/cmps/PostDetails'
import { userService } from '@/services/user.service.local'
import { SET_POSTS } from '@/store/reducers/posts.reducer'


export default function ExplorePage() {
    const dispatch = useDispatch()
    const posts = useSelector((storeState: RootStoreState) => storeState.postModule.posts)
    const isModalOpen = useSelector((storeState: RootStoreState) => storeState.systemModule.isPostModalShown) ?? false
    const [chosenPost, setChosenPost] = useState<Post | null>(null)


    useEffect(() => {
        onFetchPosts()
        userService.getEmptyUser()
    }, [])


    async function onFetchPosts() {
        try {
            const res = await postService.getPosts()
            dispatch({ type: SET_POSTS, posts: res })
        } catch (err) {
            console.log('Error loading posts')
            return
        }
    }

    function setIsModalOpen(isShown: boolean) {
        dispatch({ type: SET_IS_MODAL_OPEN, isShown })
    }

    function openPost(post: Post) {
        setChosenPost(post)
        openModal()
    }

    function openModal() {
        setIsModalOpen(true)
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