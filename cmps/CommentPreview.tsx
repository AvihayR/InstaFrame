const { timeAgo } = utilService
import Image from "next/image"
import { TxtBreaks } from "./TxtBreaks"
import { utilService } from "@/services/util.service"
import { Comment } from '../typings'
import HeartIcon from "./icons/HeartIcon"
import { userService } from "@/services/user.service.local"
import { useEffect, useState } from "react"

interface CommentProps {
    comment: Comment | undefined
    onLikeComment: (commentId: string) => Promise<void>
    onUnLikeComment: (commentId: string) => Promise<void>
}

export function CommentPreview({ comment, onLikeComment, onUnLikeComment }: CommentProps) {
    const loggedUser = userService.getLoggedinUser()
    const [isCommentLiked, setIsCommentLiked] = useState<boolean>(false)

    useEffect(() => {
        if (comment !== undefined) setIsCommentLiked(comment.likedBy.includes(loggedUser?._id))
        console.log('Render Comment')
    }, [])

    async function toggleLike() {
        isCommentLiked ? onUnLikeComment(comment?.id as string) : onLikeComment(comment?.id as string)
        setIsCommentLiked(prevState => !prevState)
    }

    return (
        <div className="comment-container px-4 pb-3 pt-6 flex items-start justify-between gap-4">
            <article className='comment flex items-start'>
                {comment?.by && <Image className='profile-img cursor-pointer rounded-3xl' src={comment.by.imgUrl} width={30} height={30} alt='Profile image' />}
                <div className="caption-container grid ms-2">
                    <p className="text-container">
                        {comment?.by && <span className='username font-medium cursor-pointer leading-none hover:text-gray-400'>{comment.by.username}</span>}
                        {comment?.txt &&
                            <span className='text'>
                                <TxtBreaks str={comment.txt} />
                            </span>}
                    </p>

                    <div className="lower-comment flex items-center">
                        {comment?.postedAt && <span className='time-ago text-xs font-thin leading-4 text-gray-400'>{timeAgo(comment.postedAt)}</span>}
                        {comment?.likedBy && comment.likedBy.length > 0 && <span className="liked-by text-xs font-medium text-gray-400 ms-2">
                            {`${comment.likedBy.length} like${comment.likedBy.length > 1 ? 's' : ''}`}
                        </span>}
                    </div>

                </div>
            </article>
            {loggedUser && <button className="like-btn" onClick={toggleLike}>
                <HeartIcon isLiked={isCommentLiked} className="heart-icon" />
            </button>}
        </div>
    )
}