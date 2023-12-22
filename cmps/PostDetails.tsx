import Image from 'next/image'
import { Post } from '../typings'
import { PostHeading } from './PostHeading'
import { utilService } from '@/services/util.service'

interface PostDetailsProps {
    post: Post | null
}

export function PostDetails({ post }: PostDetailsProps) {

    const { timeAgo } = utilService

    return (
        <div className="post-details flex">
            <div className="img-container">
                {post?.imgUrls[0] && (
                    <Image className='post-img' src={post.imgUrls[0]} alt="Post Image" width={905} height={905} />
                )}
            </div>
            <section className='comments-section w-full'>
                <PostHeading post={post} />
                <article className='post-caption flex items-start px-4 py-3'>
                    {post?.by && <Image className='profile-img cursor-pointer rounded-3xl' src={post.by.userImg} width={30} height={30} alt='Profile image' />}
                    <div className="caption-container ms-2">
                        <div className="user-container flex items-start">
                            {post?.by && <h3 className='font-medium text-sm cursor-pointer leading-none hover:text-gray-400'>{post.by.username}</h3>}
                            {post?.postedAt && <span className='time-ago ms-1.5 text-xs font-thin leading-none text-gray-400'>{timeAgo(post.postedAt)}</span>}
                        </div>
                        {post?.caption && <p className='caption text-sm'>{post.caption}</p>}
                    </div>

                </article>
            </section>
        </div>
    )
}