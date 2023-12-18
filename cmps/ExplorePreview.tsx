import Image from 'next/image'
import { Post, Comment } from '../typings'
interface ExplorePreviewProps {
    post: Post
}

const ExplorePreview: React.FC<ExplorePreviewProps> = ({ post }) => {
    console.log(post)

    return (
        <div className="preview-card">
            <Image className="explore-img aspect-square object-cover" src={post.imgUrls[0]} alt='image' width={316} height={316} />
        </div>
    )
}

export default ExplorePreview