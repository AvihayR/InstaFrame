import { Comment } from '../typings'
import { CommentPreview } from './CommentPreview'

interface CommentListProps {
    comments: Comment[] | undefined
    onLikeComment: (commentId: string) => Promise<void>
}

export function CommentList({ comments, onLikeComment }: CommentListProps) {

    return (
        comments?.map(comment => <CommentPreview key={comment.by + comment.postedAt.toString()} comment={comment} onLikeComment={onLikeComment} />)
    )
}