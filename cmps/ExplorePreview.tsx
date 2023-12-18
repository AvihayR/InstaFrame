import Image from 'next/image'
import { Post, Comment } from '../typings'
interface ExplorePreviewProps {
    post: Post
}

const ExplorePreview: React.FC<ExplorePreviewProps> = ({ post }) => {

    return (
        <div className="preview-card relative">
            <div className='shadow flex bg-black absolute w-full h-full cursor-pointer transition delay-50 opacity-0 hover:opacity-30' />
            <Image className="explore-img aspect-square object-cover" src={post.imgUrls[0]} alt='image' width={316} height={316} />
        </div>
    )
}

export default ExplorePreview