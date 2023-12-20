import Image from 'next/image'
import { Post, Comment } from '../typings'
import MultiImgIcon from './icons/MultiImgIcon'
import FilledCommentsIcon from './icons/CommentsIcon'
interface ExplorePreviewProps {
    post: Post
    openModal: () => void
    isTall?: boolean
}

const ExplorePreview: React.FC<ExplorePreviewProps> = ({ post, openModal, isTall = false }) => {

    return (
        <div onClick={openModal} className={`preview-card relative ${isTall ? 'tall' : ''}`}>
            {post.imgUrls.length > 1 && (
                <div className="icon-container absolute  top-2 right-2">
                    <MultiImgIcon className='shadowed' />
                </div>
            )}
            <div className='img-backdrop bg-black absolute w-full h-full cursor-pointer transition delay-50 opacity-0' />
            <div className="icon-container flex comments absolute opacity-0 cursor-pointer">
                <FilledCommentsIcon />
                <span className='block mx-1'> {post.comments.length}</span>
            </div>
            <Image className="explore-img aspect-square object-cover" src={post.imgUrls[0]} alt='image' width={316} height={316} />
        </div>
    )
}

export default ExplorePreview