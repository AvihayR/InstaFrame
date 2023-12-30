import Image from 'next/image'
import { Post } from '../typings'
import { PostHeading } from './PostHeading'
import { utilService } from '@/services/util.service'
import { TxtBreaks } from './TxtBreaks'
import { CommentList } from './CommentList'
import { postService } from '@/services/post.service.local'
import { userService } from '@/services/user.service.local'
import { SET_CHOSEN_POST, UPDATE_POST } from '@/store/reducers/posts.reducer'
import { useDispatch } from 'react-redux'
import { PostActionsBar } from './PostActionsBar'
const { timeAgo } = utilService

interface PostDetailsProps {
    post: Post | null
}

export function PostDetails({ post }: PostDetailsProps) {
    const dispatch = useDispatch()

    async function onLikeComment(commentId: string) {
        let loggedUser = await userService.getLoggedinUser()
        if (post && loggedUser) {
            const updatedPost = await postService.likeComment(post._id, commentId, loggedUser._id)
            dispatch({ type: UPDATE_POST, post: updatedPost })
            dispatch({ type: SET_CHOSEN_POST, post: updatedPost })
        }
        else console.log('Log in to like a comment')
    }

    async function onUnLikeComment(commentId: string) {
        let loggedUser = await userService.getLoggedinUser()
        if (post && loggedUser) {
            const updatedPost = await postService.unLikeComment(post._id, commentId, loggedUser._id)
            dispatch({ type: UPDATE_POST, post: updatedPost })
            dispatch({ type: SET_CHOSEN_POST, post: updatedPost })
        }
        else console.log('Log in to unlike a comment')
    }

    return (
        <div className="post-details flex justify-center">

            {post?.imgUrls[0] && (
                <div className="img-container">
                    <Image className='post-img' src={post.imgUrls[0]} alt="Post Image" width={705} height={705} />
                </div>
            )}

            <section className='comments-section'>
                <PostHeading post={post} />

                <div className="comment-list">
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
                    <CommentList comments={post?.comments} onLikeComment={onLikeComment} onUnLikeComment={onUnLikeComment} />
                </div>

                <PostActionsBar />
            </section>
        </div>
    )
}