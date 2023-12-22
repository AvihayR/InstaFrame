import Image from 'next/image'
import { Post } from '../typings'
import { PostHeading } from './PostHeading'

interface PostDetailsProps {
    post: Post | null
}

export function PostDetails({ post }: PostDetailsProps) {

    return (
        <div className="post-details flex">
            <div className="img-container">
                {post?.imgUrls[0] && (
                    <Image className='post-img' src={post.imgUrls[0]} alt="Post Image" width={905} height={905} />
                )}
            </div>
            <section className='comments-section'>
                <PostHeading post={post} />
            </section>
        </div>
    )
}