import { Comment } from '../typings'
import { CommentPreview } from './CommentPreview'

interface CommentListProps {
    comments: Comment[] | undefined
}

export function CommentList({ comments }: CommentListProps) {

    return (
        comments?.map(comment => <CommentPreview comment={comment} />)
    )
}