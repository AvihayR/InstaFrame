import Image from 'next/image'
import { Post, UserToken } from '../typings'
import { PostHeading } from './PostHeading'
import { utilService } from '@/services/util.service'
import { TxtBreaks } from './TxtBreaks'
import { CommentList } from './CommentList'
import { postService } from '@/services/post.service.local'
import { userService } from '@/services/user.service.local'
import { SET_CHOSEN_POST, UPDATE_POST } from '@/store/reducers/posts.reducer'
import { useDispatch, useSelector } from 'react-redux'
import { PostActionsBar } from './PostActionsBar'
import { LikesCounter } from './LikesCounter'
import { useState } from 'react'
import { RootStoreState } from '@/store/store'
import { AddComment } from './AddComment'
const { timeAgo } = utilService

export type LikeCommentFunc = (commentId: string, isLiked?: boolean) => Promise<void>
interface PostDetailsProps {
    post: Post | null
}

export function PostDetails({ post }: PostDetailsProps) {
    const dispatch = useDispatch()
    const loggedUser = useSelector((storeState: RootStoreState) => storeState.userModule.loggedUser)
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)

    async function onLikePost(isLiked = false) {
        //TODO: Add authentication validation before liking with logged user
        let updatedPost

        if (post && loggedUser) {
            if (!isLiked) updatedPost = await postService.likePost(post._id, loggedUser._id, loggedUser.username)
            else updatedPost = await postService.unLikePost(post._id, loggedUser._id)

            dispatch({ type: UPDATE_POST, post: updatedPost })
            dispatch({ type: SET_CHOSEN_POST, post: updatedPost })
        }
        else console.log('Log in to like a comment')
    }

    async function onSavePost(isSaved = false) {
        //TODO: Add authentication validation before saved with logged user
        if (post && loggedUser) {
            if (!isSaved) return await userService.savePostToList(loggedUser._id, post._id)
            else await userService.removePostFromList(loggedUser._id, post._id)
        }
        else console.log('Log in to save a post')
    }

    async function onLikeComment(commentId: string, isLiked = false) {
        //TODO: Add authentication validation before liking with logged user
        let updatedPost

        if (post && loggedUser) {
            if (!isLiked) updatedPost = await postService.likeComment(post._id, commentId, loggedUser._id)
            else updatedPost = await postService.unLikeComment(post._id, commentId, loggedUser._id)

            dispatch({ type: UPDATE_POST, post: updatedPost })
            dispatch({ type: SET_CHOSEN_POST, post: updatedPost })
        }
        else console.log('Log in to like a comment')
    }

    return (
        <div onClick={() => setIsPopoverOpen(false)} className="post-details flex justify-center">

            {post?.imgUrls[0] && (
                <div className="img-container">
                    <Image className='post-img' src={post.imgUrls[0]} alt="Post Image" width={705} height={705} />
                </div>
            )}

            <section className='comments-section flex flex-col'>
                <PostHeading post={post} />

                <div className="comment-list mb-auto">
                    <article className='post-caption flex items-start px-4 py-3'>
                        {post?.by && <Image className='profile-img cursor-pointer rounded-3xl' src={post.by.userImg} width={30} height={30} alt='Profile image' />}
                        <div className="caption-container grid ms-2">
                            <div className="user-container flex items-end">
                                {post?.by && <h3 className='font-medium text-sm cursor-pointer leading-none hover:text-gray-400'>{post.by.username}</h3>}
                            </div>
                            {post?.caption &&
                                <span className='caption text-sm'>
                                    <TxtBreaks str={post.caption} />
                                </span>}
                            {post?.postedAt && <span className='time-ago mt-1 text-xs font-thin leading-none text-gray-400'>{timeAgo(post.postedAt)}</span>}
                        </div>
                    </article>
                    <CommentList comments={post?.comments} onLikeComment={onLikeComment} />
                </div>
                <div className="actions-container flex flex-col">
                    <PostActionsBar post={post as Post} onLikePost={onLikePost} onSavePost={onSavePost} />
                    {post && <LikesCounter likes={post.likedBy} />}
                    <span className='posted-at mx-4 text-xs text-gray-400 mb-4'>
                        {post && utilService.getPostDate(post.postedAt)}
                    </span>
                </div>
                {post && <AddComment postId={post?._id} isPopoverOpen={isPopoverOpen} setIsPopoverOpen={setIsPopoverOpen} />}
            </section>
        </div>
    )
}