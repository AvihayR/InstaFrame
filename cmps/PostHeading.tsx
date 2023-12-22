import Image from 'next/image'
import { Post } from '../typings'
import Link from 'next/link'
import ThreeDots from './icons/ThreeDots'

interface PostHeadingProps {
    post: Post | null
}

export function PostHeading({ post }: PostHeadingProps) {

    return (
        <div className="post-owner text-sm flex items-center justify-between px-4 py-3 w-96">
            <div className="profile-container flex items-center">
                {post?.by && <Image className='profile-img cursor-pointer' src={post.by.userImg} width={32} height={32} alt='Profile image' />}
                {post?.by && <h3 className='ms-3.5 font-medium cursor-pointer hover:text-gray-400'>{post.by.username}</h3>}
                <span className='divider block mx-1 text-sm text-gray-500'>•</span>
                <Link href={''} className='text-link-blue font-medium hover:text-sky-600  dark:hover:text-slate-50 '>Follow</Link>
            </div>
            <div className="icon-container hover:text-gray-400 cursor-pointer">
                <ThreeDots />
            </div>
        </div>
    )
}