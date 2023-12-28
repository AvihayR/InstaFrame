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
        <div className="comment-container px-4 py-3 flex items-center justify-between">
            <article className='comment flex items-start'>
                {comment?.by && <Image className='profile-img cursor-pointer rounded-3xl' src={comment.by.imgUrl} width={30} height={30} alt='Profile image' />}
                <div className="caption-container grid ms-2">
                    <div className="user-container flex items-end">
                        {comment?.by && <h3 className='font-medium text-sm cursor-pointer leading-none hover:text-gray-400'>{comment.by.username}</h3>}
                    </div>
                    {comment?.txt &&
                        <span className='caption text-sm'>
                            <TxtBreaks str={comment.txt} />
                        </span>}
                    {comment?.postedAt && <span className='time-ago mt-1 text-xs font-thin leading-none text-gray-400'>{timeAgo(comment.postedAt)}</span>}
                </div>
            </article>
            <button onClick={() => { onLikeComment(comment?.id as string) }}>
                <HeartIcon className="w-3 h-3" />
            </button>
        </div>
    )
}