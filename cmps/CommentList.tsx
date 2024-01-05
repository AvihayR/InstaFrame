import { Comment } from '../typings'
import { CommentPreview } from './CommentPreview'
import { LikeCommentFunc } from './PostDetails'
interface CommentListProps {
    comments: Comment[] | undefined
    onLikeComment: LikeCommentFunc
}

export function CommentList({ comments, onLikeComment }: CommentListProps) {

    return (
        comments?.map(comment => <CommentPreview key={comment.by + comment.postedAt.toString()} comment={comment} onLikeComment={onLikeComment} />)
    )
}