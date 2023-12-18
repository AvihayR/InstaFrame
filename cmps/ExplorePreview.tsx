import Image from 'next/image'
import { Post, Comment } from '../typings'
import MultiImgIcon from './icons/MultiImgIcon'
interface ExplorePreviewProps {
    post: Post
}

const ExplorePreview: React.FC<ExplorePreviewProps> = ({ post }) => {

    return (
        <div className="preview-card relative">
            {post.imgUrls.length > 1 && (
                <div className="icon-container absolute  top-2 right-2">
                    <MultiImgIcon className='drop-shadow-2xl' />
                </div>
            )}
            <div className='shadow bg-black absolute w-full h-full cursor-pointer transition delay-50 opacity-0 hover:opacity-30' />
            <Image className="explore-img aspect-square object-cover" src={post.imgUrls[0]} alt='image' width={316} height={316} />
        </div>
    )
}

export default ExplorePreview