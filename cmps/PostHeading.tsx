import Image from 'next/image'
import { Post } from '../typings'
import ThreeDots from './icons/ThreeDots'
import { userService } from '@/services/user.service.local'
import { useDispatch, useSelector } from 'react-redux'
import { RootStoreState } from '@/store/store'
import { useEffect, useState } from 'react'

interface PostHeadingProps {
    post: Post | null
}

export function PostHeading({ post }: PostHeadingProps) {
    const loggedUser = useSelector((storeState: RootStoreState) => storeState.userModule.loggedUser)
    const [isUserFollowed, setIsUserFollowed] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        onCheckFollowed()
    }, [])

    async function onCheckFollowed() {
        post && setIsUserFollowed(await userService.isUserFollowed(post.by.userId))
    }

    async function onToggleFollow() {
        if (!post || !loggedUser) return
        setIsUserFollowed(true)
        await userService.toggleFollowUser(post.by.userId, loggedUser?._id)
    }

    return (
        <div className="post-owner text-sm flex items-center justify-between px-4 py-3">
            <div className="profile-container flex items-center">
                {post?.by && <Image className='profile-img cursor-pointer' src={post.by.userImg} width={30} height={30} alt='Profile image' />}
                {post?.by && <h3 className='ms-2 font-medium cursor-pointer hover:text-gray-400'>{post.by.username}</h3>}

                {!isUserFollowed && post?.by.userId !== loggedUser?._id
                    &&
                    <>
                        <span className='divider block mx-1 text-sm text-gray-500'>•</span>
                        {
                            post?.by && loggedUser &&
                            <div title={`Follow ${post.by.username}`}
                                onClick={onToggleFollow}
                                className='cursor-pointer text-link-blue font-medium hover:text-sky-600  dark:hover:text-slate-50'>
                                Follow
                            </div>
                        }
                    </>
                }

            </div>
            <div className="icon-container hover:text-gray-400 cursor-pointer">
                <ThreeDots />
            </div>
        </div>
    )
}