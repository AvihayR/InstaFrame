import { Post, Comment } from '../typings'

interface ExplorePreviewProps {
    post: Post
}

const ExplorePreview: React.FC<ExplorePreviewProps> = ({ post }) => {
    console.log(post)

    return (
        <h3>Post!</h3>
    )
}

export default ExplorePreview