"use client"
import Image from "next/image"
import { TxtBreaks } from "./TxtBreaks"
import { utilService } from "@/services/util.service"
import { Comment } from '../typings'
import HeartIcon from "./icons/HeartIcon"
import { userService } from "@/services/user.service.local"
import { postService } from "@/services/post.service.local"

interface CommentProps {
    comment: Comment | undefined
    onLikeComment: (commentId: string) => Promise<void>
}

export function CommentPreview({ comment, onLikeComment }: CommentProps) {
    const { timeAgo } = utilService

    return (
        <div className="comment-container px-4 py-3 flex items-start justify-between">
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
                        {comment?.postedAt && <span className='time-ago text-xs font-thin leading-none text-gray-400'>{timeAgo(comment.postedAt)}</span>}
                        {comment?.likedBy && comment.likedBy.length > 0 && <span className="liked-by text-xs font-medium text-gray-400 ms-2">
                            {`${comment.likedBy.length} like${comment.likedBy.length > 1 ? 's' : ''}`}
                        </span>}
                    </div>

                </div>
            </article>
            <button className="like-btn" onClick={() => { onLikeComment(comment?.id as string) }}>
                <HeartIcon className="heart-icon" />
            </button>
        </div>
    )
}