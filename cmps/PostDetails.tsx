import Image from 'next/image'
import { Post } from '../typings'
import { PostHeading } from './PostHeading'
import { utilService } from '@/services/util.service'
import { TxtBreaks } from './TxtBreaks'
import { CommentList } from './CommentList'

interface PostDetailsProps {
    post: Post | null
}

export function PostDetails({ post }: PostDetailsProps) {
    const { timeAgo } = utilService


    return (
        <div className="post-details flex justify-center">

            {post?.imgUrls[0] && (
                <div className="img-container">
                    <Image className='post-img' src={post.imgUrls[0]} alt="Post Image" width={705} height={705} />
                </div>
            )}

            <section className='comments-section'>
                <PostHeading post={post} />
                <article className='post-caption flex items-start px-4 py-3'>
                    {post?.by && <Image className='profile-img cursor-pointer rounded-3xl' src={post.by.userImg} width={30} height={30} alt='Profile image' />}
                    <div className="caption-container grid ms-2">
                        <div className="user-container flex items-end">
                            {post?.by && <h3 className='font-medium text-sm cursor-pointer leading-none hover:text-gray-400'>{post.by.username}</h3>}
                        </div>
                        {post?.caption &&
                            <span className='caption text-sm'>
                                <TxtBreaks str={post.caption} />
                            </span>}
                        {post?.postedAt && <span className='time-ago mt-1 text-xs font-thin leading-none text-gray-400'>{timeAgo(post.postedAt)}</span>}
                    </div>
                </article>
                <CommentList comments={post?.comments} />
            </section>
        </div>
    )
}